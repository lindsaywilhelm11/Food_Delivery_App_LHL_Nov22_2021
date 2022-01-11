const express = require('express');
const router  = express.Router();

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

  // router.post("/", (req, res) => {
  //   const name = ;
  //   const price = ;
  //   const desc = ;
  //   const image = ;
  //   res.redirect("/food_items");
  // });

  return router;
};

// router.get("/admin", (req, res) => {

//     res.render("item_new", templateVars);
// });



