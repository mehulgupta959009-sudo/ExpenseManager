const express = require("express");

const itemsRouter = express.Router();

const {
  getItems,
  getItemsByType,
  postItems,
  deleteItem,
  addToFavs,
  getFavItems,
} = require("../controllers/itemsController");

const { isAuthenticated } = require("../middleware/authMiddleware");

// Transaction routes (protected with auth)
itemsRouter.get("/items", isAuthenticated, getItems);
itemsRouter.get("/items/:type", isAuthenticated, getItemsByType);
itemsRouter.post("/items", isAuthenticated, postItems);
itemsRouter.post("/items/delete", isAuthenticated, deleteItem);

// Favorites routes (keeping for backward compatibility)
itemsRouter.post("/addToFavs", addToFavs);
itemsRouter.get("/favItems", getFavItems);

exports.itemsRouter = itemsRouter;
