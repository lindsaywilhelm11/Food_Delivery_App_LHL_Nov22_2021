const express = require('express');
const router  = express.Router();

router.get("/", (req, res) => {
  let cookie = res.cookie('user_id', req.params.id)
  if (cookie) {
    res.redirect("./food_items")
  }

});


module.exports = router;




// app.get('/register', (req, res) => {
//   res.render('register');
//  });

//  app.get('/menu', (req, res) => {
//   res.render('menu');
//  });

//  app.get('/about', (req, res) => {
//   res.render('about');
//  });
