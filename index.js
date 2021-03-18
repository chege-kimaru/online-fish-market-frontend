const express = require("express");
const app = new express();

app.use(express.static(__dirname + "/public"));

const handlebars = require("express-handlebars").create({
  defaultLayout: "main",
  helpers: {
    section: function (name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    },
  },
  extname: ".hbs",
});

app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

app.get("/", (req, res) => {
  return res.render("location-shops");
});

app.get("/contact", (req, res) => {
  return res.render("contact");
});

app.get("/login", (req, res) => {
  return res.render("login");
});

app.get("/register", (req, res) => {
  return res.render("register");
});

app.get("/add-shop", (req, res) => {
  return res.render("add-shop");
});

app.get("/my-shops", (req, res) => {
  return res.render("my-shops");
});

app.get("/shops", (req, res) => {
  return res.render("all-shops");
});

app.get("/location-shops", (req, res) => {
  return res.render("lcation-shops");
});

app.get("/add-product", (req, res) => {
  return res.render("add-product");
});

app.get("/products", (req, res) => {
  return res.render("products", { shopId: req.query.shopId });
});

app.get("/product-details", (req, res) => {
  return res.render("product-details", { productId: req.query.productId });
});

app.get("/checkout", (req, res) => {
  return res.render("checkout");
});

app.get("/customer-orders", (req, res) => {
  return res.render("customer-orders");
});

app.get("/seller-orders", (req, res) => {
  return res.render("seller-orders");
});

app.listen(4000);
