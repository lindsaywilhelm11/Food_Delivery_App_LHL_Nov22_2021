// Client facing scripts here
var CART_KEY = 'cart';
/**
 {
   1: 2, // id: quantity
 }
 */
function addToCart(foodItemId) {
  var cart = localStorage.getItem(CART_KEY);
    console.log(cart);
    if (cart) {
      cart = JSON.parse(cart);
    } else {
      cart = {};
    }

    if (!cart[foodItemId]) {
      cart[foodItemId] = 0
    }

    cart[foodItemId] += 1;
    console.log(cart);
    console.log(JSON.stringify(cart));
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
$(function() {
  $('.add-button').on('click', function() {
    console.log(123);
    var foodItemId = $(this).parent().find('.food-item-id-to-cart').val();
    console.log(foodItemId);
    addToCart(foodItemId);
  });
});
