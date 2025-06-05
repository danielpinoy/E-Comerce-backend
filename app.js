const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const itemRoutes = require("./routes/item.routes");
const storeRoutes = require("./routes/store.routes");
const orderRoutes = require("./routes/order.routes");
const favoriteRoutes = require("./routes/favorite.routes");
const wishlistRoutes = require("./routes/wishlist.routes");

// Add CORS middleware here - BEFORE your routes
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://staging.d3c6tklewip7gh.amplifyapp.com",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/favorite", favoriteRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.get("/", (req, res) =>
  res.send("E-commerce API is running with authentication!")
);

module.exports = app;
