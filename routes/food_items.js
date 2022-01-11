const express = require('express');
const router  = express.Router();

// Brows menu
module.exports = (db) => {
  router.get("/", (req, res) => {
      db.query(`
      SELECT * FROM food_items;
      `)
      .then(data => {
        const foodItems = data.rows;
        res.render('food_items', {foodItems});
      })
      .catch(e => {
        res.render('food_items', {"error" : e})
      })
  });

  // router.post('/food_items/:id', (req, res) => {

  //   res.redirect('food_items')
  // });

  return router;
}

