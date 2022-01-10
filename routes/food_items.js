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
    SELECT * FROM food_items;
    `)
    .then(sqlResult => {
      let templateVars = JSON.stringify(sqlResult);
      res.render('food_items', { templateVars });
    })
    .catch(e => {
      res.render('food_items', {templateVars: "error" + e})
    })
});

router.post('/food_items/:id', (req, res) => {

  res.redirect('food_items')
});


module.exports = router;
