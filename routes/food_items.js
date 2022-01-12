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
        console.log(req.session.cart);
        res.render('food_items', {
          foodItems,
          cart: req.session.cart,
        });
      })
      .catch(e => {
        res.render('food_items', {"error" : e})
      })
  });

  return router;
}



