const express = require("express");
const cors = require("cors");

const session = require("express-session");
const mongodbSession = require("connect-mongodb-session")(session);

const { authRouter } = require("./auth/authrouter");
const { default: mongoose } = require("mongoose");
const { itemsRouter } = require("./routes/itemsRouter");

// const DBPath = "mongodb://localhost:27017/expense_manager_DB";
const DBPath =
  "mongodb+srv://expensemanager:root1234@cluster0.ndaxhwo.mongodb.net";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.1.2:5173",
      "http://192.168.43.81:5173",
      "https://expense-manager-silk-five.vercel.app",
    ], // Your React app URL
    credentials: true,
  }),
);

const store = mongodbSession({
  uri: DBPath,
  collection: "sessions",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);

app.use(
  session({
    secret: "my secret new key",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: false,
      httpOnly: true, // 🔥 important
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);
app.use(itemsRouter);
app.use(authRouter);

const PORT = 3001;

mongoose
  .connect(DBPath)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log("Server Started on http://192.168.43.81:" + PORT);
      console.log("Local access: http://localhost:" + PORT);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
