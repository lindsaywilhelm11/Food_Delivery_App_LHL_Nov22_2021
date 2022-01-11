const express = require('express');
const router  = express.Router();

// Show customer orders to the browser
module.exports = (db) => {
  router.get("/",(req, res) => {
      db.query(`
      SELECT * FROM orders_details;
      `)
      .then(data => {
        const adminOrders = data.rows;
        res.render('admin_orders', { adminOrders })
      })
      .catch(e => {
        res.render('admin_orders', {"error" : e})
      })
  });

  // Recieve form data from item_new.ejs
  // router.post("/", (req, res) => {
  //   const name = ;
  //   const price = ;
  //   const desc = ;
  //   const image = ;
  //   res.redirect("/food_items");
  // });

  // Show "create new item form" page to the browser
  router.get("/items/new", (req, res) => {
    const templateVars = {
      user: users[req.session["user_id"]],
    };
    if (!req.session.user_id) {
      res.redirect("/login");
    } else {
      res.render("item_new", templateVars);
    }
  });

  return router;
};





