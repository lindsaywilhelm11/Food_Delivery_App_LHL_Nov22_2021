const express = require('express');
const router  = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
});

// app.use('/user/:id', function (req, res, next) {   console.log('Request Type:', req.method)

// Cart
module.exports = (db) => {
  router.get("/", (req, res) => {
    const customer_orders = req.session.customer_orders|| {};
    const id1 = Object.keys(customer_orders);
    const customer_orders = [];
    console.log(id1)
    if (id1.length === 0) {
      return res.render('customer_orders', {
        customer_orders,
      })
    }
    db.query(`
      SELECT * FROM food_items WHERE id in (${id1.join(',')})
      `)
      .then(data => {
        console.log(123)
        for (const item of data.rows) {
          const quantity = req.session.customer_orders[item.id1];
          console.log(quantity)
          customer_orders.push(
            Object.assign({}, item, { quantity })
          );
        }
        res.render('customer_order', {
          customer_orders,
        });
      })
      .catch(e => {
        console.log(e);
        res.render('customer_order', {
          customer_orders,
          "error" : e,
        })
      })
  });

  router.post("/", (req, res) => {
    let customer_orders = {};
    if (req.session.cart) {
      customer_orders = req.session.customer_orders;
    }
    if (!customer_orders[req.body.food_item_id]) {
      customer_orders[req.body.food_item_id] = 0;
    }
    customer_orders[req.body.food_item_id]++;
    req.session.customer_orders = customer_orders;
    res.redirect('food_items');
  });
  return router;
}



router.post("/edit", function (req, res) => {




}








}





router.post("/delete",customer_orders/:id/delete (req, res) => {


}




