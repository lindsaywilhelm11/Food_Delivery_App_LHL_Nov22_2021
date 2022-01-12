-- Users table seeds here (Example)
INSERT INTO users (name, email, phone)
VALUES ('John Lennon', 'hey_jude@gmail.com', '0123456789');
INSERT INTO users (name, email, phone)
VALUES ('Paul McCartney', 'let_it_be@gmail.com', '9876543210');
INSERT INTO users (name, email, phone)
VALUES ('George Harrison', 'help@gmail.com', '2345678901');
INSERT INTO users (name, email, phone)
VALUES ('Ringo Starr', 'yellow_submarine@gmail.com', '5678901234');

INSERT INTO food_items (name, price, description, image)
VALUES ('Americano', 3, 'Half and half chicory spoon carajillo at ristretto, robusta con panna aged qui latte. Skinny qui, a, mocha lungo aroma sugar cinnamon. Mocha et skinny flavour at redeye foam con panna. Grounds single shot, breve spoon id doppio flavour dark aroma.', 
'/image/americano.jpeg');
INSERT INTO food_items (name, price, description, image)
VALUES ('Latte', 4, 'Half and half chicory spoon carajillo at ristretto, robusta con panna aged qui latte. Skinny qui, a, mocha lungo aroma sugar cinnamon. Mocha et skinny flavour at redeye foam con panna. Grounds single shot, breve spoon id doppio flavour dark aroma.', 
'/image/latte.jpg');
INSERT INTO food_items (name, price, description, image)
VALUES ('Green Tea Latte', 5, 'Half and half chicory spoon carajillo at ristretto, robusta con panna aged qui latte. Skinny qui, a, mocha lungo aroma sugar cinnamon. Mocha et skinny flavour at redeye foam con panna. Grounds single shot, breve spoon id doppio flavour dark aroma.', 
'/image/green_tea_latte.jpg');
INSERT INTO food_items (name, price, description, image)
VALUES ('Hot Chocolate', 5, 'Half and half chicory spoon carajillo at ristretto, robusta con panna aged qui latte. Skinny qui, a, mocha lungo aroma sugar cinnamon. Mocha et skinny flavour at redeye foam con panna. Grounds single shot, breve spoon id doppio flavour dark aroma.', 
'/image/hot_chocolate.jpg');

INSERT INTO orders (user_id, total_cost, date, status)
VALUES (1, 3, NOW(), 'new');
INSERT INTO orders (user_id, total_cost, date, status)
VALUES (2, 7, NOW(), 'new');
INSERT INTO orders (user_id, total_cost, date, status)
VALUES (3, 10, NOW(), 'new');
INSERT INTO orders (user_id, total_cost, date, status)
VALUES (4, 8, NOW(), 'new');

INSERT INTO orders_details (order_id, food_item_id, quantity)
VALUES (1, 1, 1);
INSERT INTO orders_details (order_id, food_item_id, quantity)
VALUES (2, 2, 2);
INSERT INTO orders_details (order_id, food_item_id, quantity)
VALUES (3, 3, 1);
INSERT INTO orders_details (order_id, food_item_id, quantity)
VALUES (4, 4, 3);

