const express = require('express');
const router  = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
});

// app.use('/user/:id', function (req, res, next) {   console.log('Request Type:', req.method)

router.get('/user/:id', function (req, res) => {
  if (req.params.id === '0')
  else ()
}, function (req, res,) {
  // render a regular page
  res.render('regular')
  pool:query(`
    SELECT * FROM orders_details;
    `)
    .then(sqlResult => {
      let templateVars = JSON.stringify(sqlResult);
      res.render('orders_details', { templateVars });

}

})

router.post("/edit", function (req, res) => {




}


router.post("/add",customer_orders (req, res) => {





}





router.post("/delete",customer_orders/:id/delete (req, res) => {


}



module.exports = router;
