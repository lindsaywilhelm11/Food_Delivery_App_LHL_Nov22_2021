const express = require('express');
const router  = express.Router();


router.get('/', (req, res) => {
  res.render("admin_page")
});

router.post('/', (req, res) => {
  res.cookie('name', req.params.name)
  res.redirect("admin_orders")
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
