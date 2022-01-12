const express = require('express');
const router  = express.Router();

// Cart
module.exports = (db) => {
  router.get("/", (req, res) => {
    const cart = req.session.cart || {};
    const ids = Object.keys(cart);
    const cartItems = [];
    console.log(ids)
    if (ids.length === 0) {
      return res.render('cart', {
        cartItems,
      })
    }
    db.query(`
      SELECT * FROM food_items WHERE id in (${ids.join(',')})
      `)
      .then(data => {
        console.log(123)
        for (const item of data.rows) {
          const quantity = req.session.cart[item.id];
          console.log(quantity)
          cartItems.push(
            Object.assign({}, item, { quantity })
          );
        }
        res.render('cart', {
          cartItems,
        });
      })
      .catch(e => {
        console.log(e);
        res.render('cart', {
          cartItems,
          "error" : e,
        })
      })
  });
  router.post("/", (req, res) => {
    let cart = {};
    if (req.session.cart) {
      cart = req.session.cart;
    }
    if (!cart[req.body.food_item_id]) {
      cart[req.body.food_item_id] = 0;
    }
    cart[req.body.food_item_id]++;
    req.session.cart = cart;
    res.redirect('food_items');
  });
  return router;
}


router.post("/orderId/:item_id/delete", (req, res) => {
  const query = `DELETE from order_foods where order_id = $1 AND food_id = $2; `;
  const {orderId, item_id} = req.params;

  db.query(query, [orderId, item_id])
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

