const express = require('express');
const router = express.Router();
// const Order = require('../models/order');

// GET: /orders
router.get('/', (req, res) => {
  res.render("order")
});

router.get('/', function(_req, res) {
  Order.find().then(function(orders) {
    res.render('order/index', {orders});
  });
});

// GET: /orders/4
router.get('/:id/show', function(req, res) {
  const id = req.params.id;
  Order.findOne({_id: id}).then(function(order) {
    res.render('order/show', {order: order});
  });
});

// POST: /orders/4/pickup
router.post('/:orderId/pickup', function(req, res) {
  const id = req.params.orderId;

  Order.findOne({_id: id}).then(function(order) {
    order.status = 'Shipped';
    order.notificationStatus = 'Queued';

    order.save()
      .then(function() {
        return order.sendSmsNotification('Your order will be ready for pickup in 20 minutes!', getCallbackUri(req));
      })
      .then(function() {
        res.redirect(`/order/${id}/show`);
      })
      .catch(function(err) {
        res.status(500).send(err.message);
      });
  });
});

// POST: /orders/4/deliver
router.post('/:orderId/deliver', function(req, res) {
  const id = req.params.orderId;

  Order.findOne({_id: id})
    .then(function(order) {
      order.status = 'Delivered';
      order.notificationStatus = 'Queued';
      order.save()
        .then(function() {
          return order.sendSmsNotification('Your clothes have been delivered', getCallbackUri(req));
        })
        .then(function() {
          res.redirect(`/order/${id}/show`);
        })
        .catch(function(err) {
          res.status(500).send(err.message);
        });
    })
});


// POST: /orders/4/status/update
router.post('/:orderId/status/update', function(req, res) {
  const id = req.params.orderId;

  const notificationStatus = req.body.MessageStatus;

  Order.findOne({_id: id})
    .then(function(order) {
      order.notificationStatus = notificationStatus.charAt(0).toUpperCase() + notificationStatus.slice(1);
      return order.save();
    })
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.status(500).send(err.message);
    });
});

function getCallbackUri(req) {
  return `http://${req.headers.host}/order/${req.params.orderId}/status/update`;
};

module.exports = router;


