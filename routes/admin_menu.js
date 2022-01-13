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
        res.render('admin_menu', {
          foodItems,
          cart: req.session.cart,
        });
      })
      .catch(e => {
        res.render('admin_menu', {"error" : e})
      })
  });

  router.post("/:id/delete", (req, res) => {
    db.query (`
    DELETE FROM food_items WHERE id = $1;
    `, [req.params.id])
    .then(data => {
      console.log(data);
      res.redirect("/admin_menu");
    }) 
    .catch(e => {
      res.render('admin_menu', {"error" : e})
    })
  });

  return router;
}



