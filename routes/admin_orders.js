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
  return router;
};

// router.post('/admin_orders/:id', (req, res) => {

//   res.redirect('admin_orders')
// });


