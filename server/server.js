// Express
const express = require("express");
const app = express();

// Body-parser
const bodyParser = require("body-parser");

// Include users.js and discount.js file from the api folder to get the routes
const userRoutes = require("./api/routes/users");
const discountRoutes = require("./api/routes/discounts");
const discount_userRoutes = require("./api/routes/discount_user");

// Configure body-parser settings// Notes:
// urlencoded is for bodies that have UTF-8 encoding.
// {extended: true} to use nested objects.
app.use(bodyParser.urlencoded({ extended: true }));

// Parse json with body-parser
app.use(bodyParser.json());

// Setup api routes with express
app.use("/api/users", userRoutes);
app.use("/api/discounts", discountRoutes);
app.use("/api/discount_user", discount_userRoutes);

// Server will listen  'port' 3000
const port = 3000;

// Express returns an HTTP server ready to use
app.listen(port, () => console.log("[Server] online " + new Date()));
