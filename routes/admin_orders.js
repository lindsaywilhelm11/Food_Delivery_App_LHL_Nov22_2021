const express = require('express');
const router  = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "123",
  host: "localhost",
  database: "midterm",
});

router.get('/',(req, res) => {
    pool.query(`
    SELECT * FROM orders_details;
    `)
    .then(sqlResult => {
      let templateVars = JSON.stringify(sqlResult);
      res.render('admin_orders', { templateVars })
    })
    .catch(e => {
      res.render('admin_orders', {sqlResult: "error" + e})
    })
});

router.post('/admin_orders/:id', (req, res) => {

  res.redirect('admin_orders')
});


module.exports = router;
