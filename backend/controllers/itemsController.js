const { addeditems } = require("../models/itemsmodel.js");
const { authuser } = require("../models/authmodel.js");

// Get all transactions for logged-in user
exports.getItems = (req, res, next) => {
  console.log(req.url, req.method);
  console.log("Request Reached Successfully /get");

  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  addeditems
    .find({ userId: req.session.userId })
    .sort({ date: -1 })
    .then((items) => {
      return res.json(items);
    })
    .catch((err) => {
      console.log("Error fetching items:", err);
      return res.json({ error: "Failed to fetch items" });
    });
};

// Get transactions by type (expense or earning) for logged-in user
exports.getItemsByType = (req, res, next) => {
  const type = req.params.type; // 'expense' or 'earning'
  console.log(req.url, req.method, "Type:", type);

  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!["expense", "earning"].includes(type)) {
    return res.json({ error: "Invalid type" });
  }

  addeditems
    .find({ userId: req.session.userId, type })
    .sort({ date: -1 })
    .then((items) => {
      return res.json(items);
    })
    .catch((err) => {
      console.log("Error fetching items by type:", err);
      return res.json({ error: "Failed to fetch items" });
    });
};

// Post new expense or earning
exports.postItems = (req, res, next) => {
  console.log(req.url, req.method, req.body);
  console.log("Request Reached Successfully /post");

  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const newItem = new addeditems({
    userId: req.session.userId,
    productName: req.body.productName,
    amount: req.body.amount || 0,
    category: req.body.category || "other",
    description: req.body.description || "",
    date: req.body.date || new Date(),
    type: req.body.type || "expense",
  });

  newItem
    .save()
    .then((savedItem) => {
      console.log("Saved transaction:", savedItem);
      return res.json({ refetch: true, data: savedItem });
    })
    .catch((err) => {
      console.log("Error while saving transaction:", err);
      return res.json({ error: "Failed to save transaction" });
    });
};

// Delete item (user can only delete their own)
exports.deleteItem = (req, res, next) => {
  console.log(req.url, req.method, req.body);

  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const itemId = req.body.itemId;

  addeditems
    .findByIdAndDelete({ _id: itemId, userId: req.session.userId })
    .then((result) => {
      if (!result) {
        return res
          .status(403)
          .json({ error: "Not authorized to delete this item" });
      }
      console.log("Item deleted:", itemId);
      return res.json({ success: true, refetch: true });
    })
    .catch((err) => {
      console.log("Error while deleting item:", err);
      return res.json({ error: "Failed to delete item" });
    });
};

// Add to favorites (keeping for backward compatibility)
exports.addToFavs = async (req, res, next) => {
  console.log(req.url, req.method, req.body);

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

// Get favorite items (keeping for backward compatibility)
exports.getFavItems = async (req, res, next) => {
  if (req.session.isLoggedIn && req.session.userId) {
    const user = await authuser
      .findById(req.session.userId)
      .populate("favourites");
    return res.json(user.favourites);
  } else {
    return res.json({ status: "not logged in" });
  }
};
