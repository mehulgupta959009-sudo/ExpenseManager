const { addeditems } = require("../models/itemsmodel.js");
const { authuser } = require("../models/authmodel.js");

exports.getItems = (req, res, next) => {
  console.log(req.url, req.method);
  console.log("Request Reached Successfully /get");

  const items = addeditems.find().then((items) => {
    return res.json(items);
  });
};

exports.postItems = (req, res, next) => {
  console.log(req.url, req.method, req.body);
  console.log("Request Reached Successfully /post");

  const newItem = new addeditems({
    expenseReason: req.body.expenseReason,
    price: req.body.price,
    itemType: req.body.itemType,
  });
  newItem
    .save()
    .then(() => {
      console.log("Saved user details:", {
        expenseReason: req.body.expenseReason,
        price: req.body.price,
        itemType: req.body.itemType,
      });
    })
    .catch((err) => {
      console.log("Error while saving user details:", err);
    });

  return res.json({ refetch: true });
};

// exports.deleteItem = (req, res, next) => {
//   console.log(req.url, req.method, req.body);
//   console.log("Request Reached Successfully /delete");

// };

exports.addToFavs = async (req, res, next) => {
  console.log(
    req.url,
    req.method,
    req.body,
    req.session.isLoggedIn,
    req.session.userId,
  );

  // Check if user is logged in
  if (req.session.isLoggedIn && req.session.userId) {
    const itemId = req.body.itemId;
    const user = await authuser.findById(req.session.userId);

    if (user.favourites.includes(itemId)) {
      console.log("Item already in favourites");
      return res.json({ status: "already in favs", success: false });
    }

    user.favourites.push(itemId);
    await user.save();
    console.log("Added to favs");
    res.json({ status: "added in favs", success: true });
  } else {
    console.log("User not logged in");
    return res.json({ status: "not logged in", success: false });
  }
};

exports.getFavItems = async (req, res, next) => {
  if (req.session.isLoggedIn && req.session.userId) {
    const user = await authuser
      .findById(req.session.userId)
      .populate("favourites");

    // here
    const items = addeditems.find().then((items) => {
      return res.json(items);
    });
    // return res.json(user.favourites);
  } else {
    return res.json({ status: "not logged in" });
  }
};
