const express = require('express');
const router  = express.Router();
const cookie = require("cookie-parser");


router.get('/', (req, res) => {
  res.render("login")
});

router.post('/', (req, res) => {
  res.cookie('name', req.params.name)
  res.redirect("/")
})

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
