const express = require("express");

const itemsRouter = express.Router();

const { getItems } = require("../controllers/itemsController");
const { postItems } = require("../controllers/itemsController");
const { addToFavs } = require("../controllers/itemsController");
const { getFavItems } = require("../controllers/itemsController");

itemsRouter.get("/items", getItems);
itemsRouter.post("/items", postItems);
itemsRouter.post("/addToFavs", addToFavs);
itemsRouter.get("/favItems", getFavItems);

exports.itemsRouter = itemsRouter;
