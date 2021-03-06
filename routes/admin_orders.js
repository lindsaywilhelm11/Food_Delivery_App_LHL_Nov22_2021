const express = require('express');
const router = express.Router();

// Show customer orders to the browser
module.exports = (db) => {
  router.get("/", (req, res) => {
    // Obtain header information from SQL
    db.query(`
      SELECT orders.id, users.name, date, total_cost, status
      FROM orders
      JOIN users ON user_id = users.id
      WHERE status != 'complete'
      ORDER BY date DESC;
      `)
      .then(headerSqlResultInfo => {
        const headerSqlResult = headerSqlResultInfo.rows;
        // SQL details
        const sqlPromiseList = [];
        for (const header of headerSqlResult) {
          sqlPromiseList.push(db.query(`
            SELECT food_items.name, quantity 
            FROM orders_details
            JOIN food_items ON food_item_id = food_items.id
            WHERE order_id = ${header.id};
          `));
        }

        Promise.all(sqlPromiseList).then(allResultInfos => {
          const allDetails = allResultInfos.map(allResultInfo => allResultInfo.rows);
          // Mayu note : 全部終わったら全部の結果が帰ってくる 
          // const adminOrders = data.rows;
          let adminOrders = [];
          for (let i = 0; i < headerSqlResult.length; i++) {
            const header = headerSqlResult[i];
            adminOrders.push({
              id: header.id,
              name: header.name,
              // 2022-01-10 11:41:30.559891 -> 11:41
              time: header.date.toString().split(' ')[4].slice(0,5),
              totalprice: header.total_cost,
              status: header.status,
              items: allDetails[i].map(sqlResult => ({
                itemname: sqlResult.name,
                quantity: sqlResult.quantity
              }))
            })
          }
          
          res.render('admin_orders', { adminOrders })
        })
        .catch(e => {
          res.render('admin_orders', { "error": e })
        })
      })
      .catch(e => {
        res.render('admin_orders', { "error": e })
      })
  });

  // Show "create new item form" page to the browser
  router.get("/newitem", (req, res) => {
    res.render("item_new");
  });
  // Recieve form data from item_new.ejs
  router.post("/newitem", (req, res) => {
    const name = req.body.new_item_name;
    const price = req.body.new_item_price;
    const desc = req.body.new_item_description;
    const image = req.body.new_item_image;
    db.query (`
    INSERT INTO food_items (name, price, description, image)
    VALUES ($1, $2, $3, $4);
    `, [name, price, desc, image])
    .then(data => {
      console.log(data);
      res.redirect("/admin_menu");
    }) 
    .catch(error =>{
      res.status(500).json({error: error.message})
    })
  });

  // To update status
  router.get("/:id/updatestatus/:status", (req, res) => {
    db.query (`
      UPDATE orders
      SET status = $2
      WHERE id = $1;
    `,[req.params.id, req.params.status])
    .then(data => {
         res.redirect("/admin_orders");
    })
  });
  return router;
};





