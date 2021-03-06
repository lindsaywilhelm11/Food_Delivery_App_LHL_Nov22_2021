// load .env data into process.env
require("dotenv").config();
const session = require('express-session');

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')


// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));
app.use(cookieParser());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const usersRoutes = require("./routes/users");
// const widgetsRoutes = require("./routes/widgets");
const adminRoutes = require("./routes/admin_orders");
const adminMenu = require("./routes/admin_menu");
const adminPage = require("./routes/admin_page");
const foodItemsRoutes = require("./routes/food_items");
const cartsRoutes = require("./routes/carts");
const aboutRoutes = require("./routes/about");
const loginRoutes = require("./routes/login");
const orderRoutes = require("./routes/order");
const smsRoutes = require("./routes/sms");
const customer_ordersRoutes = require("./routes/customer_orders/customer_orders");
const thankYouRoutes = require("./routes/thank_you");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/api/users", usersRoutes(db));
// app.use("/api/widgets", widgetsRoutes(db));

app.use("/about", aboutRoutes);
app.use("/login", loginRoutes);
app.use("/admin_page", adminPage);
app.use("/admin_orders", adminRoutes(db));
app.use("/admin_menu", adminMenu(db));
app.use("/food_items", foodItemsRoutes(db));
app.use("/order", orderRoutes);
app.use("/carts", cartsRoutes(db));
app.use("/thank_you", thankYouRoutes);
app.use("/customer_orders", customer_ordersRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


