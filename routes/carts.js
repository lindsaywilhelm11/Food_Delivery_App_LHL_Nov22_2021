const express = require('express');
const router  = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
let session;
// Cart
module.exports = (db) => {
  router.get("/", (req, res) => {
    const cart = req.session.cart || {};
    console.log("hi", cart);
    const ids = Object.keys(cart);
    const cartItems = [];
    // console.log('cart', ids)
    // console.log('cookie-session', req.session.cart);
    if (ids.length === 0) {
      return res.render('cart', {
        cartItems,
      })
    }
    db.query(`
      SELECT * FROM food_items WHERE id in (${ids.join(',')})
      `)
      .then(data => {
        // console.log(123)
        for (const item of data.rows) {
          const quantity = req.session.cart[item.id];
          // console.log(quantity)
          cartItems.push(
            Object.assign({}, item, { quantity })
          );
        }
        console.log(cartItems);
        res.render('cart', {
          cartItems,
        });
      })
      .catch(e => {
        // console.log(e);
        res.render('cart', {
          cartItems,
          "error" : e,
        })
      })

      router.post('/place_order', (req, res) => {
        const cart = req.session.cart || {};
        const ids = Object.keys(cart);
        const cartItems = [];
        db.query(`
          SELECT * FROM food_items WHERE id in (${ids.join(',')})
        `)
        .then(data => {
        // console.log(123)
          for (const item of data.rows) {
            const quantity = req.session.cart[item.id];
          // console.log(quantity)
            cartItems.push(
              Object.assign({}, item, { quantity })
            );
          }
        })
        .then(data => {
        // looping through cart items
        // adding individual price of each item to cartTotalCost
        let cartTotalCost = 0;
        for (const order of cartItems) {
          cartTotalCost += order.price;
        }
        // using the cartTotalCost to create a new order
        // User is currently hardcoded because there is no login or logout functionality
        db.query(`
        INSERT INTO orders (user_id, total_cost, date, status)
        VALUES (1, $1, NOW(), 'new');`, [cartTotalCost])
        .then(data => {
          console.log('Insert Statement', data)
        })
        .then(
        // After order is created, we want to grab order.id to create individual order details
        // multiple users and total cost may be the same so we are only returning the most recent order created
        // this wouldn't work as a full app with different users using it but for midterm it will do
          db.query(`
          SELECT id FROM orders WHERE total_cost = $1 AND user_id = 1
          ORDER BY id DESC;`, [cartTotalCost])
          .then(res => {
            const orderID = res.rows[0];
            res.cookie('orderID', orderID);
          // we are looping through each individual item of the cart and creating an order detail of it
          // using the orderID that was returned from the search query and using individual cartItem.id and cartItem.quantity
            for (const cartItem of cartItems) {
              console.log('Creating Order', cartItem.id, cartItem.quantity)
              db.query(`
              INSERT INTO orders_details (order_id, food_item_id, quantity)
              VALUES ($1, $2, $3);`, [orderID.id, cartItem.id, cartItem.quantity])
              .then(data => {
                return data;
              })
            }
          // once the order and all order details are created, we can then clear the cart and redirect use to thank_you page
            // cartItems = [];
            // req.session = null;
          })
            .then(
        // .then(
        //   res.redirect("/thank_you")))

            client.messages
              .create({
                body: 'Your order has been received and will be ready in 5 minutes!',
                from: '+13658000732', //(365) 800-0732
                to: '+15197885111'
              })
              .then(message => console.log(message.sid))
              .then(res.redirect("/thank_you"))
              .then(req.session.cart = null)
            )
          )
        })
        })
      
      // router.post("/delete", (req, res) => {
      //   db.query (`
      //   DELETE FROM food_items WHERE id = $1;
      //   `, [req.params.id])
      //   .then(data => {
      //     console.log(data);
      //     res.redirect("/admin_menu");
      //   }) 
      //   .catch(e => {
      //     res.render('admin_menu', {"error" : e})
      //   })
      // });

    });
    
    router.get("/delete", (req, res) => {
      // const item = db[item]
      console.log(db);
      db.query(`UPDATE FROM orders SET status = canceled WHERE id = ?`)
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
        cartItems = [];
        req.session.cart = null;
        console.log("hello", req.session, cartItems)
        res.redirect('/food_items')
    });

  router.get("/delete", (req, res) => {
    req.session = [];
    res.redirect('/food_items')
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
    res.cookie("session", JSON.stringify(req.session))
    res.redirect('food_items');
  });
  return router;
}

return router;

