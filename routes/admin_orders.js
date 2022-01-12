const express = require('express');
const router = express.Router();

// Show customer orders to the browser
module.exports = (db) => {
  router.get("/", (req, res) => {
    // ヘッダーを取得
    db.query(`
      SELECT orders.id, users.name, date, total_cost 
      FROM orders
      JOIN users ON user_id = users.id
      `)
      .then(headerSqlResultInfo => {
        const headerSqlResult = headerSqlResultInfo.rows;
        // 詳細のSQL
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
          // 全部終わったら全部の結果が帰ってくる
          // const adminOrders = data.rows;
          let adminOrders = [];
          // 2022-01-10 11:41:30.559891
          for (let i = 0; i < headerSqlResult.length; i++) {
            const header = headerSqlResult[i];
            adminOrders.push({
              id: header.id,
              name: header.name,
              time: header.date.toString().split(' ')[4].slice(0,5),
              totalprice: header.total_cost,
              items: allDetails[i].map(sqlResult => ({
                itemname: sqlResult.name,
                quantity: sqlResult.quantity
              }))
            })
          }
          // adminOrders = [{
          //     id: 1,
          //     name: 'Steve',
          //     time: '12:15',
          //     totalprice: '5',
          //     items: [
          //       {
          //         itemname: 'latte',
          //         quantity: 1
          //       },
          //       {
          //         itemname: 'cappuccino',
          //         quantity: 2
          //       },
          //       {
          //         itemname: 'green tea flapetino',
          //         quantity: 1
          //       },
          //     ]
          //   }
          // ];
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

  // Recieve form data from item_new.ejs
  // router.post("/", (req, res) => {
  //   const name = ;
  //   const price = ;
  //   const desc = ;
  //   const image = ;
  //   res.redirect("/food_items");
  // });

  // Show "create new item form" page to the browser
  router.get("/newitem", (req, res) => {
    const newItem =
      res.render("item_new");
  });

  // どのorderをupdateするのか判断するためにorder id受け取んないといけない
  router.get("/updatestatus", (req, res) => {
    // todo implement;
    // admin_ordersにリダイレクトできるといいね
  });

  return router;
};





