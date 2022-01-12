const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/",(req, res) => {
    db.query(`
    SELECT * FROM orders_details;
    `)
    .then(data => {
      const customerOrders = data.rows;
      res.render('customer_orders', { customerOrders })
    })
    .catch(e => {
      res.render('customer_orders', {"error" : e})
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
  router.post("/edit", (req, res) => {
  });

  router.post("customer_orders/:itemId/delete", (req, res) => {
    const query = `DELETE from customer_ordersId where order_id = $1 AND food_id = $2; `;
    const {customer_ordersId, itemId} = req.params;

    db.query(query, [customer_ordersId, itemId])
      .then((data) => {
      // check if order doesn't exist
        if (data.rows.length === 0) {
          return res.status(404).send();
        }
        res.redirect('/cart');
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  });

  return router;
};
