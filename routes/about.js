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
    SELECT *;
    `)
    .then(sqlResult => {
      let templateVars = JSON.stringify(sqlResult);
      res.render('about', { templateVars });
    })
    .catch(e => {
      res.render('about', {templateVars: "error" + e})
    })
});

module.exports = router;
