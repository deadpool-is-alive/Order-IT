-- USE orderit;
-- INSERT INTO products
-- (name, description, price, image_url, category, is_veg, available, packaging_cost)
-- VALUES
-- ('Tea', 'Hot milk tea', 10, 'Tea.jpg', 'Beverages', TRUE, TRUE, 5),
-- ('Black Tea', 'Black tea without milk', 10, 'Black Tea.jpg', 'Beverages', TRUE, TRUE, 5),
-- ('Lemon Tea', 'Tea flavored with lemon', 10, 'Lemon Tea.jpg', 'Beverages', TRUE, TRUE, 5),
-- ('Coffee', 'Hot brewed coffee', 15, 'Coffee.jpg', 'Beverages', TRUE, TRUE, 5),
-- ('Black Coffee', 'Black coffee without milk', 15, 'Black Cofee.webp', 'Beverages', TRUE, TRUE, 5),
-- ('Plain Milk', 'Glass of plain milk', 25, 'Milk.avif', 'Beverages', TRUE, TRUE, 5),
-- ('Lemon Soda', 'Refreshing lemon soda', 20, 'Lemon Soda.jpg', 'Beverages', TRUE, TRUE, 5),
-- ('Masala Soda', 'Spiced masala soda', 25, 'Masala Soda.png', 'Beverages', TRUE, TRUE, 5),
-- ('Colddrinks', 'Packaged cold drink', 0, NULL, 'Beverages', TRUE, TRUE, 5),
-- ('Mineral Water', 'Packaged drinking water', 0, 'Water.webp', 'Beverages', TRUE, TRUE, 5),
-- -- SNACKS

-- ('Samosa', 'Crispy fried pastry stuffed with spiced potatoes', 10, 'Samosa.jpg', 'Snacks', TRUE, TRUE, 5),
-- ('Bread Pakoda', 'Bread fritter stuffed with spicy potato filling', 15, 'Bread Pakoda.jpg', 'Snacks', TRUE, TRUE, 5),
-- ('French Fries', 'Crispy deep-fried potato fries', 30, 'French Fries.jpg', 'Snacks', TRUE, TRUE, 5),
-- ('Chilly Potato', 'Crispy potatoes tossed in spicy sauce', 50, 'Chilly Potato.jpg', 'Snacks', TRUE, TRUE, 5),
-- ('Spring Roll', 'Crispy vegetable spring roll', 25, 'Spring roll.jpg', 'Snacks', TRUE, TRUE, 5),
-- ('Pav Bhaji', 'Butter pav served with spiced vegetable mash', 40, 'Pav Bhaji.jpg', 'Snacks', TRUE, TRUE, 5),
-- ('Macroni', 'Masala macaroni pasta', 40, 'Macroni.jpg', 'Snacks', TRUE, TRUE, 5),
-- ('B.B.C', 'Bread Butter Cream snack', 30, NULL, 'Snacks', TRUE, TRUE, 5),
-- ('Butter Toast', 'Toasted bread with butter', 15, 'Butter Toast.jpg', 'Snacks', TRUE, TRUE, 5),
-- ('Egg Half Fry', 'Half-fried egg', 30, 'Egg Half Fry.webp', 'Snacks', FALSE, TRUE, 5),
-- ('Boiled Egg', 'Boiled egg', 25, 'Boiled Egg.webp', 'Snacks', FALSE, TRUE, 5),
-- ('S. Egg Omlette', 'Single egg omelette', 25, 'Egg Omelette.jpg', 'Snacks', FALSE, TRUE, 5),
-- ('D. Egg Omlette', 'Double egg omelette', 35, 'Egg Omelette.jpg', 'Snacks', FALSE, TRUE, 5),

-- -- MAGGIE

-- ('Plain Maggie', 'Classic instant noodles', 30, 'Plain Maggie.jpg', 'Maggie', TRUE, TRUE, 5),
-- ('Masala Maggie', 'Masala flavored instant noodles', 35, 'Masala Maggi.jpg', 'Maggie', TRUE, TRUE, 5),
-- ('Fry Maggie', 'Stir-fried masala noodles', 40, 'Fry Maggie.jpg', 'Maggie', TRUE, TRUE, 5),
-- ('Cheese Maggie', 'Cheesy instant noodles', 50, 'Cheese Maggi.png', 'Maggie', TRUE, TRUE, 5),
-- ('Egg Maggie', 'Instant noodles cooked with egg', 50, 'Egg Maggie.jpg', 'Maggie', FALSE, TRUE, 5),

-- -- BURGERS & SANDWICHES

-- ('Veg Burger', 'Vegetable patty burger', 30, 'Veg Burger.png', 'Burgers & Sandwiches', TRUE, TRUE, 5),
-- ('Cheese Burger', 'Burger loaded with cheese', 40, 'Cheese Burger.png', 'Burgers & Sandwiches', TRUE, TRUE, 5),
-- ('Chicken Burger', 'Chicken patty burger', 70, 'Chicken Burger.png', 'Burgers & Sandwiches', FALSE, TRUE, 5),
-- ('Veg Sandwich', 'Fresh vegetable sandwich', 25, 'Veg Sandwhich .png', 'Burgers & Sandwiches', TRUE, TRUE, 5),
-- ('Cheese Sandwich', 'Cheese-filled sandwich', 30, 'Cheese Sandwich.png', 'Burgers & Sandwiches', TRUE, TRUE, 5),
-- ('Paneer Sandwich', 'Paneer stuffed sandwich', 40, 'Paneeer Sandwich.png', 'Burgers & Sandwiches', TRUE, TRUE, 5),
-- ('Chicken Sandwich', 'Chicken stuffed sandwich', 70, 'Chicken sandwich.png', 'Burgers & Sandwiches', FALSE, TRUE, 5),

-- -- SOUTH INDIAN

-- ('Paper Dosa', 'Crispy thin South Indian dosa', 40, 'Plain Dosa.png', 'South Indian', TRUE, TRUE, 5),
-- ('Masala Dosa', 'Dosa stuffed with spiced potato filling', 50, 'Masala Dosa.png', 'South Indian', TRUE, TRUE, 5),
-- ('Paneer Dosa', 'Dosa stuffed with paneer filling', 70, 'Paneer Dosa.jpg', 'South Indian', TRUE, TRUE, 5),
-- ('Aloo/Paneer Dosa', 'Dosa stuffed with potato and paneer filling', 60, NULL, 'South Indian', TRUE, TRUE, 5),
-- ('Idli Sambhar', 'Steamed idli served with sambhar', 40, 'Idli.jpeg', 'South Indian', TRUE, TRUE, 5),

-- -- PASTA

-- ('Red Sauce Pasta', 'Pasta cooked in tangy tomato red sauce', 50, 'Red Sauce Pasta.webp', 'Pasta', TRUE, TRUE, 5),
-- ('White Sauce Pasta', 'Pasta cooked in creamy white sauce', 70, 'White Sauce Pasta.jpg', 'Pasta', TRUE, TRUE, 5),
-- -- CHINESE

-- ('Veg Noodles', 'Stir-fried noodles with mixed vegetables', 40, 'Veg Noodles.jpg', 'Chinese', TRUE, TRUE, 5),
-- ('Paneer Noodles', 'Stir-fried noodles with paneer', 50, 'Paneer Noodels.avif', 'Chinese', TRUE, TRUE, 5),
-- ('Egg Noodles', 'Stir-fried noodles with egg', 60, 'Egg Noodels.png', 'Chinese', FALSE, TRUE, 5),
-- ('Chicken Noodles', 'Stir-fried noodles with chicken', 90, 'Chicken Noodels.png', 'Chinese', FALSE, TRUE, 5),

-- ('Fried Rice', 'Vegetable fried rice', 50, NULL, 'Chinese', TRUE, TRUE, 5),
-- ('Paneer Fried Rice', 'Fried rice with paneer', 60, 'Paneer Fried Rice.jpg', 'Chinese', TRUE, TRUE, 5),
-- ('Egg Fried Rice', 'Fried rice with egg', 70, 'Egg-Fried-Rice.jpg', 'Chinese', FALSE, TRUE, 5),
-- ('Chicken Fried Rice', 'Fried rice with chicken', 100, 'Chicken Fried Rice.jpg', 'Chinese', FALSE, TRUE, 5),

-- ('Veg Manchurian', 'Vegetable dumplings tossed in Manchurian sauce', 50, 'Veg Manchurian.png', 'Chinese', TRUE, TRUE, 5),

-- -- ROLLS

-- ('Veg Roll', 'Vegetable stuffed roll', 40, 'Veg Roll.jpg', 'Rolls', TRUE, TRUE, 5),
-- ('Paneer Roll', 'Paneer stuffed roll', 50, 'Paneer Roll.jpg', 'Rolls', TRUE, TRUE, 5),
-- ('Cheese Roll', 'Cheese stuffed roll', 60, NULL, 'Rolls', TRUE, TRUE, 5),
-- ('Chicken Roll', 'Chicken stuffed roll', 90, 'Chicken Roll.jpg', 'Rolls', FALSE, TRUE, 5),
-- ('Chicken Egg Roll', 'Chicken and egg stuffed roll', 100, NULL, 'Rolls', FALSE, TRUE, 5),
-- ('S. Egg Roll', 'Single egg roll', 30, 'Egg Roll.png', 'Rolls', FALSE, TRUE, 5),
-- ('D. Egg Roll', 'Double egg roll', 45, 'Egg Roll.png', 'Rolls', FALSE, TRUE, 5),

-- -- PARATHAS

-- ('Aloo Paratha', 'Whole wheat flatbread stuffed with spiced potatoes', 20, 'Aloo Paratha.png', 'Parathas', TRUE, TRUE, 5),
-- ('Pyaaz Paratha', 'Whole wheat flatbread stuffed with onions', 30, 'Pyaaz Paratha.png', 'Parathas', TRUE, TRUE, 5),
-- ('Gobhi Paratha', 'Whole wheat flatbread stuffed with cauliflower', 30, 'Gobi Paratha.png', 'Parathas', TRUE, TRUE, 5),
-- ('Aloo/Pyaaz Paratha', 'Whole wheat flatbread stuffed with potato and onion', 30, NULL, 'Parathas', TRUE, TRUE, 5),
-- ('Paneer Paratha + Dahi', 'Paneer stuffed paratha served with curd', 50, 'Paneer Paratha.jpg', 'Parathas', TRUE, TRUE, 5),
-- ('Mix Paratha', 'Mixed vegetable stuffed paratha', 30, 'Mix Paratha.png', 'Parathas', TRUE, TRUE, 5),
-- ('Plain Paratha', 'Plain whole wheat paratha', 10, 'Plain Paratha.png', 'Parathas', TRUE, TRUE, 5),

-- -- PANEER

-- ('Shahi Paneer', 'Paneer cooked in rich creamy gravy', 50, 'Shahi Paneer.png', 'Paneer', TRUE, TRUE, 5),
-- ('Matar Paneer', 'Paneer and green peas cooked in spiced gravy', 50, 'Matar Paneer.png', 'Paneer', TRUE, TRUE, 5),
-- ('Paneer Butter Masala', 'Paneer cooked in buttery tomato gravy', 55, 'Paneer Butter Masala.png', 'Paneer', TRUE, TRUE, 5),
-- ('Kadhai Paneer', 'Paneer cooked with capsicum and spices in kadhai style', 65, 'Kadhai Paneer.png', 'Paneer', TRUE, TRUE, 5),
-- ('Paneer Do Pyaza', 'Paneer cooked with onions and spices', 65, 'Panner Do Pyaaza.jpg', 'Paneer', TRUE, TRUE, 5),
-- ('Handi Paneer', 'Paneer prepared in traditional handi gravy', 65, 'Handi Paneer.png', 'Paneer', TRUE, TRUE, 5),
-- ('Malai Methi Paneer', 'Creamy paneer flavored with fenugreek', 70, 'Methi Malai Paneer.png', 'Paneer', TRUE, TRUE, 5),
-- ('Tawa Paneer', 'Paneer cooked on tawa with spices', 70, 'Tawa Paneer.png', 'Paneer', TRUE, TRUE, 5),
-- ('Paneer Lapeta', 'Paneer cooked in rich spiced gravy', 70, NULL, 'Paneer', TRUE, TRUE, 5),
-- ('Mumtaz Paneer', 'Special paneer curry in rich gravy', 70, 'Mumtaaz Paneer.png', 'Paneer', TRUE, TRUE, 5),
-- ('Achari Paneer', 'Paneer cooked with pickling spices', 70, 'Achari Paneer.png', 'Paneer', TRUE, TRUE, 5),
-- ('Paneer Tikka Masala', 'Paneer tikka pieces in spicy masala gravy', 70, 'Paneer Tikka Masala.png', 'Paneer', TRUE, TRUE, 5),
-- ('Green Chilly Paneer', 'Paneer cooked with green chillies and spices', 70, 'Greeen Chili Paneer.png', 'Paneer', TRUE, TRUE, 5),
-- ('Chilly Paneer', 'Paneer tossed in spicy Indo-Chinese sauce', 70, 'Chilly Paneer.png', 'Paneer', TRUE, TRUE, 5),
-- ('Paneer Bhurji', 'Scrambled paneer cooked with onions and spices', 70, 'Panner Bhurji.png', 'Paneer', TRUE, TRUE, 5),
-- ('Lacha Paneer', 'Shredded paneer cooked in rich gravy', 75, NULL, 'Paneer', TRUE, TRUE, 5),
-- ('Hyderabadi Paneer', 'Paneer prepared in Hyderabadi style gravy', 75, 'Hyderabadi Paneer.png', 'Paneer', TRUE, TRUE, 5),

-- -- RICE

-- ('Plain Rice', 'Steamed plain rice', 25, 'Plain Rice.avif', 'Rice', TRUE, TRUE, 5),
-- ('Jeera Rice', 'Rice flavored with cumin seeds', 30, 'Jeera-Rice.jpg', 'Rice', TRUE, TRUE, 5),
-- ('Pyaaz Tamatar Rice', 'Rice cooked with onion and tomato', 45, 'Pyaaz Tamatar Rice.png', 'Rice', TRUE, TRUE, 5),
-- ('Veg Biryani', 'Aromatic rice cooked with mixed vegetables and spices', 50, 'Veg Biryani.png', 'Rice', TRUE, TRUE, 5),
-- ('Egg Biryani', 'Spiced rice cooked with eggs', 60, 'Egg Biryani.jpg', 'Rice', FALSE, TRUE, 5),
-- ('Chicken Biryani', 'Spiced rice cooked with chicken', 90, 'Chicken Biryani.png', 'Rice', FALSE, TRUE, 5),
-- ('Paneer Butter Rice', 'Rice cooked with paneer in buttery gravy', 70, NULL, 'Rice', TRUE, TRUE, 5),
-- ('Chicken Butter Rice', 'Rice cooked with chicken in buttery gravy', 100, 'Chicken Butter Rice.png', 'Rice', FALSE, TRUE, 5),
-- ('DCBM', 'Special rice preparation (DCBM)', 50, NULL, 'Rice', TRUE, TRUE, 5),

-- -- SABJIYAN

-- ('Aloo Matar', 'Potato and green peas curry', 35, 'Aloo Matar.png', 'Sabjiyan', TRUE, TRUE, 5),
-- ('Aloo Tamatar', 'Potato cooked in tomato gravy', 35, 'Aloo Tamatar.jpg', 'Sabjiyan', TRUE, TRUE, 5),
-- ('Aloo Jeera', 'Potatoes tempered with cumin seeds', 35, 'Aloo jeera.jpg', 'Sabjiyan', TRUE, TRUE, 5),
-- ('Aloo Pyaaz Fry', 'Stir-fried potatoes and onions', 35, 'Aloo Pyaaz fry.jpeg', 'Sabjiyan', TRUE, TRUE, 5),
-- ('Aloo Shimla Fry', 'Stir-fried potatoes and capsicum', 35, 'Aloo Shimla.jpg', 'Sabjiyan', TRUE, TRUE, 5),
-- ('Aloo Methi', 'Potatoes cooked with fenugreek leaves', 40, 'Aloo Methi.jpg', 'Sabjiyan', TRUE, TRUE, 5),
-- ('Aloo Dum', 'Spiced dum-style potato curry', 50, 'Aloo Dum.jpg', 'Sabjiyan', TRUE, TRUE, 5),
-- ('Mix Veg', 'Mixed vegetable curry', 50, 'Mix veg.jpg', 'Sabjiyan', TRUE, TRUE, 5),
-- ('Bhindi Fry', 'Stir-fried okra with spices', 40, 'Bhindi Fry.jpg', 'Sabjiyan', TRUE, TRUE, 5),
-- ('Gobhi Fry', 'Stir-fried cauliflower with spices', 40, 'Gobi fry.jpg', 'Sabjiyan', TRUE, TRUE, 5),
-- ('Chana Masala', 'Chickpeas cooked in spicy gravy', 50, 'Chana Masala.jpg', 'Sabjiyan', TRUE, TRUE, 5),
-- ('Rajma', 'Kidney beans cooked in rich gravy', 50, 'Rajma.webp', 'Sabjiyan', TRUE, TRUE, 5),
-- ('Chilly Mushroom', 'Mushrooms tossed in spicy Indo-Chinese sauce', 65, 'Chilly Mushroom.jpg', 'Sabjiyan', TRUE, TRUE, 5),
-- ('Matar Mushroom', 'Mushroom and peas curry', 65, 'Matar Mushroon.webp', 'Sabjiyan', TRUE, TRUE, 5),
-- ('Mushroom Curry', 'Mushrooms cooked in flavorful curry gravy', 60, 'Mushroom Curry.jpg', 'Sabjiyan', TRUE, TRUE, 5),

-- -- NON VEG

-- ('Chicken Curry', 'Chicken cooked in traditional spicy curry gravy', 90, 'Chicken Curry.jpg', 'Non Veg', FALSE, TRUE, 5),
-- ('Butter Chicken', 'Chicken cooked in rich buttery tomato gravy', 95, 'Butter Chicken.jpg', 'Non Veg', FALSE, TRUE, 5),
-- ('Kadhai Chicken', 'Chicken cooked with capsicum and spices in kadhai style', 100, 'Kadhai Chicken.png', 'Non Veg', FALSE, TRUE, 5),
-- ('Handi Chicken', 'Chicken prepared in traditional handi gravy', 100, 'Handi Chicken.jpg', 'Non Veg', FALSE, TRUE, 5),
-- ('Chicken Korma', 'Chicken cooked in creamy aromatic korma gravy', 110, 'Chicken Korma.jpg', 'Non Veg', FALSE, TRUE, 5),
-- ('Chicken Mughlai', 'Chicken cooked in rich Mughlai-style gravy', 110, 'Chicken Mughlai.jpg', 'Non Veg', FALSE, TRUE, 5),
-- ('Chicken Lapeta', 'Chicken cooked in rich spiced gravy', 110, 'Chicken Lapeta.webp', 'Non Veg', FALSE, TRUE, 5),
-- ('Chicken Mumtaz', 'Special chicken curry in rich gravy', 110, 'Chicken Mumtaaz.jpg', 'Non Veg', FALSE, TRUE, 5),
-- ('Chilly Chicken', 'Chicken tossed in spicy Indo-Chinese sauce', 100, 'Chilli Chicken.jpg', 'Non Veg', FALSE, TRUE, 5),
-- ('Egg Curry', 'Boiled eggs cooked in spicy curry gravy', 45, 'Egg Curry.jpg', 'Non Veg', FALSE, TRUE, 5),
-- ('Egg Bhurji', 'Scrambled eggs cooked with onions and spices', 45, 'Egg Bhurji.jpg', 'Non Veg', FALSE, TRUE, 5),
-- ('Egg Lapeta', 'Egg preparation cooked in rich spiced gravy', 60, NULL, 'Non Veg', FALSE, TRUE, 5),

-- -- ROTI

-- ('Tawa Roti', 'Soft whole wheat flatbread cooked on tawa', 5, 'Roti.png', 'Roti', TRUE, TRUE, 5),
-- ('Butter Roti', 'Whole wheat roti topped with butter', 7, NULL, 'Roti', TRUE, TRUE, 5),
-- ('Tandoori Roti', 'Whole wheat roti baked in tandoor', 6, 'Tandoori Root.jpg', 'Roti', TRUE, TRUE, 5),
-- ('Tandoori Butter Roti', 'Tandoori roti topped with butter', 8, 'Tandoori Root.jpg', 'Roti', TRUE, TRUE, 5),
-- ('Butter Naan', 'Soft naan bread topped with butter', 15, 'Butter Naan.webp', 'Roti', TRUE, TRUE, 5),
-- ('Garlic Naan', 'Naan flavored with garlic and herbs', 20, 'Garlic Naan.webp', 'Roti', TRUE, TRUE, 5),
-- ('Lacha Paratha', 'Layered flaky whole wheat paratha', 10, 'Lachha Paratha.jpg', 'Roti', TRUE, TRUE, 5);


SET SQL_SAFE_UPDATES = 0;
UPDATE products
SET image_url = 'Lemon Soda.jpg'
WHERE name='Lemon Soda';
SET SQL_SAFE_UPDATES = 1;
SELECT * FROM products;

SET FOREIGN_KEY_CHECKS = 0;

-- Empty the table and reset ID
TRUNCATE TABLE products;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO products
(name, description, price, image_url, category, is_veg, available, packaging_cost)
VALUES
('Tea', 'Hot milk tea', 10, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Tea.webp', 'Beverages', TRUE, TRUE, 5),
('Black Tea', 'Black tea without milk', 10, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Black%20Tea.webp', 'Beverages', TRUE, TRUE, 5),
('Lemon Tea', 'Tea flavored with lemon', 10, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Lemon%20Tea.webp', 'Beverages', TRUE, TRUE, 5),
('Coffee', 'Hot brewed coffee', 15, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Coffee.webp', 'Beverages', TRUE, TRUE, 5),
('Black Coffee', 'Black coffee without milk', 15, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Black%20Cofee.webp', 'Beverages', TRUE, TRUE, 5),
('Plain Milk', 'Glass of plain milk', 25, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Milk.webp', 'Beverages', TRUE, TRUE, 5),
('Lemon Soda', 'Refreshing lemon soda', 20, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Lemon%20Soda.webp', 'Beverages', TRUE, TRUE, 5),
('Masala Soda', 'Spiced masala soda', 25, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Masala%20Soda.webp', 'Beverages', TRUE, TRUE, 5),
('Colddrinks', 'Packaged cold drink', 0, NULL, 'Beverages', TRUE, TRUE, 5),
('Mineral Water', 'Packaged drinking water', 0, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Water.webp', 'Beverages', TRUE, TRUE, 5),
-- SNACKS

('Samosa', 'Crispy fried pastry stuffed with spiced potatoes', 10, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Samosa.webp', 'Snacks', TRUE, TRUE, 5),
('Bread Pakoda', 'Bread fritter stuffed with spicy potato filling', 15, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Bread%20Pakoda.webp', 'Snacks', TRUE, TRUE, 5),
('French Fries', 'Crispy deep-fried potato fries', 30, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/French%20Fries.webp', 'Snacks', TRUE, TRUE, 5),
('Chilly Potato', 'Crispy potatoes tossed in spicy sauce', 50, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Chilly%20Potato.webp', 'Snacks', TRUE, TRUE, 5),
('Spring Roll', 'Crispy vegetable spring roll', 25, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Spring%20roll.webp', 'Snacks', TRUE, TRUE, 5),
('Pav Bhaji', 'Butter pav served with spiced vegetable mash', 40, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Pav%20Bhaji.webp', 'Snacks', TRUE, TRUE, 5),
('Macroni', 'Masala macaroni pasta', 40, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Macroni.webp', 'Snacks', TRUE, TRUE, 5),
('B.B.C', 'Bread Butter Cream snack', 30, NULL, 'Snacks', TRUE, TRUE, 5),
('Butter Toast', 'Toasted bread with butter', 15, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Butter%20Toast.webp', 'Snacks', TRUE, TRUE, 5),
('Egg Half Fry', 'Half-fried egg', 30, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Egg%20Half%20Fry.webp', 'Snacks', FALSE, TRUE, 5),
('Boiled Egg', 'Boiled egg', 25, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Boiled%20Egg.webp', 'Snacks', FALSE, TRUE, 5),
('S. Egg Omlette', 'Single egg omelette', 25, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Egg%20Omelette.webp', 'Snacks', FALSE, TRUE, 5),
('D. Egg Omlette', 'Double egg omelette', 35, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Egg%20Omelette.webp', 'Snacks', FALSE, TRUE, 5),

-- MAGGIE

('Plain Maggie', 'Classic instant noodles', 30, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Plain%20Maggie.webp', 'Maggie', TRUE, TRUE, 5),
('Masala Maggie', 'Masala flavored instant noodles', 35, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Masala%20Maggi.webp', 'Maggie', TRUE, TRUE, 5),
('Fry Maggie', 'Stir-fried masala noodles', 40, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Fry%20Maggie.webp', 'Maggie', TRUE, TRUE, 5),
('Cheese Maggie', 'Cheesy instant noodles', 50, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Cheese%20Maggi.webp', 'Maggie', TRUE, TRUE, 5),
('Egg Maggie', 'Instant noodles cooked with egg', 50, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Egg%20Maggie.webp', 'Maggie', FALSE, TRUE, 5),

-- BURGERS & SANDWICHES

('Veg Burger', 'Vegetable patty burger', 30, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Veg%20Burger.webp', 'Burgers & Sandwiches', TRUE, TRUE, 5),
('Cheese Burger', 'Burger loaded with cheese', 40, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Cheese%20Burger.webp', 'Burgers & Sandwiches', TRUE, TRUE, 5),
('Chicken Burger', 'Chicken patty burger', 70, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Chicken%20Burger.webp', 'Burgers & Sandwiches', FALSE, TRUE, 5),
('Veg Sandwich', 'Fresh vegetable sandwich', 25, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Veg%20Sandwhich%20.webp', 'Burgers & Sandwiches', TRUE, TRUE, 5),
('Cheese Sandwich', 'Cheese-filled sandwich', 30, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Cheese%20Sandwich.webp', 'Burgers & Sandwiches', TRUE, TRUE, 5),
('Paneer Sandwich', 'Paneer stuffed sandwich', 40, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Paneeer%20Sandwich.webp', 'Burgers & Sandwiches', TRUE, TRUE, 5),
('Chicken Sandwich', 'Chicken stuffed sandwich', 70, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Chicken%20sandwich.webp', 'Burgers & Sandwiches', FALSE, TRUE, 5),

-- SOUTH INDIAN

('Paper Dosa', 'Crispy thin South Indian dosa', 40, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Plain%20Dosa.webp', 'South Indian', TRUE, TRUE, 5),
('Masala Dosa', 'Dosa stuffed with spiced potato filling', 50, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Masala%20Dosa.webp', 'South Indian', TRUE, TRUE, 5),
('Paneer Dosa', 'Dosa stuffed with paneer filling', 70, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Paneer%20Dosa.webp', 'South Indian', TRUE, TRUE, 5),
('Aloo/Paneer Dosa', 'Dosa stuffed with potato and paneer filling', 60, NULL, 'South Indian', TRUE, TRUE, 5),
('Idli Sambhar', 'Steamed idli served with sambhar', 40, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Idli.webp', 'South Indian', TRUE, TRUE, 5),

-- PASTA

('Red Sauce Pasta', 'Pasta cooked in tangy tomato red sauce', 50, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Red%20Sauce%20Pasta.webp', 'Pasta', TRUE, TRUE, 5),
('White Sauce Pasta', 'Pasta cooked in creamy white sauce', 70, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/White%20Sauce%20Pasta.webp', 'Pasta', TRUE, TRUE, 5),
-- CHINESE

('Veg Noodles', 'Stir-fried noodles with mixed vegetables', 40, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Veg%20Noodles.webp', 'Chinese', TRUE, TRUE, 5),
('Paneer Noodles', 'Stir-fried noodles with paneer', 50, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Paneer%20Noodels.webp', 'Chinese', TRUE, TRUE, 5),
('Egg Noodles', 'Stir-fried noodles with egg', 60, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Egg%20Noodels.webp', 'Chinese', FALSE, TRUE, 5),
('Chicken Noodles', 'Stir-fried noodles with chicken', 90, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Chicken%20Noodels.webp', 'Chinese', FALSE, TRUE, 5),

('Fried Rice', 'Vegetable fried rice', 50, NULL, 'Chinese', TRUE, TRUE, 5),
('Paneer Fried Rice', 'Fried rice with paneer', 60, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Paneer%20Fried%20Rice.webp', 'Chinese', TRUE, TRUE, 5),
('Egg Fried Rice', 'Fried rice with egg', 70, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Egg-Fried-Rice.webp', 'Chinese', FALSE, TRUE, 5),
('Chicken Fried Rice', 'Fried rice with chicken', 100, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Chicken%20Fried%20Rice.webp', 'Chinese', FALSE, TRUE, 5),

('Veg Manchurian', 'Vegetable dumplings tossed in Manchurian sauce', 50, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Veg%20Manchurian.webp', 'Chinese', TRUE, TRUE, 5),

-- ROLLS

('Veg Roll', 'Vegetable stuffed roll', 40, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Veg%20Roll.webp', 'Rolls', TRUE, TRUE, 5),
('Paneer Roll', 'Paneer stuffed roll', 50, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Paneer%20Roll.webp', 'Rolls', TRUE, TRUE, 5),
('Cheese Roll', 'Cheese stuffed roll', 60, NULL, 'Rolls', TRUE, TRUE, 5),
('Chicken Roll', 'Chicken stuffed roll', 90, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Chicken%20Roll.webp', 'Rolls', FALSE, TRUE, 5),
('Chicken Egg Roll', 'Chicken and egg stuffed roll', 100, NULL, 'Rolls', FALSE, TRUE, 5),
('S. Egg Roll', 'Single egg roll', 30, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Egg%20Roll.webp', 'Rolls', FALSE, TRUE, 5),
('D. Egg Roll', 'Double egg roll', 45, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Egg%20Roll.webp', 'Rolls', FALSE, TRUE, 5),

-- PARATHAS

('Aloo Paratha', 'Whole wheat flatbread stuffed with spiced potatoes', 20, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Aloo%20Paratha.webp', 'Parathas', TRUE, TRUE, 5),
('Pyaaz Paratha', 'Whole wheat flatbread stuffed with onions', 30, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Pyaaz%20Paratha.webp', 'Parathas', TRUE, TRUE, 5),
('Gobhi Paratha', 'Whole wheat flatbread stuffed with cauliflower', 30, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Gobi%20Paratha.webp', 'Parathas', TRUE, TRUE, 5),
('Aloo/Pyaaz Paratha', 'Whole wheat flatbread stuffed with potato and onion', 30, NULL, 'Parathas', TRUE, TRUE, 5),
('Paneer Paratha + Dahi', 'Paneer stuffed paratha served with curd', 50, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Paneer%20Paratha.webp', 'Parathas', TRUE, TRUE, 5),
('Mix Paratha', 'Mixed vegetable stuffed paratha', 30, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Mix%20Paratha.webp', 'Parathas', TRUE, TRUE, 5),
('Plain Paratha', 'Plain whole wheat paratha', 10, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Plain%20Paratha.webp', 'Parathas', TRUE, TRUE, 5),
-- PANEER

('Shahi Paneer', 'Paneer cooked in rich creamy gravy', 50, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Shahi%20Paneer.webp', 'Paneer', TRUE, TRUE, 5),
('Matar Paneer', 'Paneer and green peas cooked in spiced gravy', 50, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Matar%20Paneer.webp', 'Paneer', TRUE, TRUE, 5),
('Paneer Butter Masala', 'Paneer cooked in buttery tomato gravy', 55, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Paneer%20Butter%20Masala.webp', 'Paneer', TRUE, TRUE, 5),
('Kadhai Paneer', 'Paneer cooked with capsicum and spices in kadhai style', 65, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Kadhai%20Paneer.webp', 'Paneer', TRUE, TRUE, 5),
('Paneer Do Pyaza', 'Paneer cooked with onions and spices', 65, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Panner%20Do%20Pyaaza.webp', 'Paneer', TRUE, TRUE, 5),
('Handi Paneer', 'Paneer prepared in traditional handi gravy', 65, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Handi%20Paneer.webp', 'Paneer', TRUE, TRUE, 5),
('Malai Methi Paneer', 'Creamy paneer flavored with fenugreek', 70, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Methi%20Malai%20Paneer.webp', 'Paneer', TRUE, TRUE, 5),
('Tawa Paneer', 'Paneer cooked on tawa with spices', 70, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Tawa%20Paneer.webp', 'Paneer', TRUE, TRUE, 5),
('Paneer Lapeta', 'Paneer cooked in rich spiced gravy', 70, NULL, 'Paneer', TRUE, TRUE, 5),
('Mumtaz Paneer', 'Special paneer curry in rich gravy', 70, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Mumtaaz%20Paneer.webp', 'Paneer', TRUE, TRUE, 5),
('Achari Paneer', 'Paneer cooked with pickling spices', 70, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Achari%20Paneer.webp', 'Paneer', TRUE, TRUE, 5),
('Paneer Tikka Masala', 'Paneer tikka pieces in spicy masala gravy', 70, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Paneer%20Tikka%20Masala.webp', 'Paneer', TRUE, TRUE, 5),
('Green Chilly Paneer', 'Paneer cooked with green chillies and spices', 70, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Greeen%20Chili%20Paneer.webp', 'Paneer', TRUE, TRUE, 5),
('Chilly Paneer', 'Paneer tossed in spicy Indo-Chinese sauce', 70, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Chilly%20Paneer.webp', 'Paneer', TRUE, TRUE, 5),
('Paneer Bhurji', 'Scrambled paneer cooked with onions and spices', 70, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Panner%20Bhurji.webp', 'Paneer', TRUE, TRUE, 5),
('Lacha Paneer', 'Shredded paneer cooked in rich gravy', 75, NULL, 'Paneer', TRUE, TRUE, 5),
('Hyderabadi Paneer', 'Paneer prepared in Hyderabadi style gravy', 75, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Hyderabadi%20Paneer.webp', 'Paneer', TRUE, TRUE, 5),

-- RICE

('Plain Rice', 'Steamed plain rice', 25, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Plain%20Rice.webp', 'Rice', TRUE, TRUE, 5),
('Jeera Rice', 'Rice flavored with cumin seeds', 30, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Jeera-Rice.webp', 'Rice', TRUE, TRUE, 5),
('Pyaaz Tamatar Rice', 'Rice cooked with onion and tomato', 45, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Pyaaz%20Tamatar%20Rice.webp', 'Rice', TRUE, TRUE, 5),
('Veg Biryani', 'Aromatic rice cooked with mixed vegetables and spices', 50, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Veg%20Biryani.webp', 'Rice', TRUE, TRUE, 5),
('Egg Biryani', 'Spiced rice cooked with eggs', 60, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Egg%20Biryani.webp', 'Rice', FALSE, TRUE, 5),
('Chicken Biryani', 'Spiced rice cooked with chicken', 90, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Chicken%20Biryani.webp', 'Rice', FALSE, TRUE, 5),
('Paneer Butter Rice', 'Rice cooked with paneer in buttery gravy', 70, NULL, 'Rice', TRUE, TRUE, 5),
('Chicken Butter Rice', 'Rice cooked with chicken in buttery gravy', 100, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Chicken%20Butter%20Rice.webp', 'Rice', FALSE, TRUE, 5),
('DCBM', 'Special rice preparation (DCBM)', 50, NULL, 'Rice', TRUE, TRUE, 5),
-- SABJIYAN

('Aloo Matar', 'Potato and green peas curry', 35, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Aloo%20Matar.webp', 'Sabjiyan', TRUE, TRUE, 5),
('Aloo Tamatar', 'Potato cooked in tomato gravy', 35, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Aloo%20Tamatar.webp', 'Sabjiyan', TRUE, TRUE, 5),
('Aloo Jeera', 'Potatoes tempered with cumin seeds', 35, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Aloo%20jeera.webp', 'Sabjiyan', TRUE, TRUE, 5),
('Aloo Pyaaz Fry', 'Stir-fried potatoes and onions', 35, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Aloo%20Pyaaz%20fry.webp', 'Sabjiyan', TRUE, TRUE, 5),
('Aloo Shimla Fry', 'Stir-fried potatoes and capsicum', 35, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Aloo%20Shimla.webp', 'Sabjiyan', TRUE, TRUE, 5),
('Aloo Methi', 'Potatoes cooked with fenugreek leaves', 40, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Aloo%20Methi.webp', 'Sabjiyan', TRUE, TRUE, 5),
('Aloo Dum', 'Spiced dum-style potato curry', 50, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Aloo%20Dum.webp', 'Sabjiyan', TRUE, TRUE, 5),
('Mix Veg', 'Mixed vegetable curry', 50, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Mix%20veg.webp', 'Sabjiyan', TRUE, TRUE, 5),
('Bhindi Fry', 'Stir-fried okra with spices', 40, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Bhindi%20Fry.webp', 'Sabjiyan', TRUE, TRUE, 5),
('Gobhi Fry', 'Stir-fried cauliflower with spices', 40, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Gobi%20fry.webp', 'Sabjiyan', TRUE, TRUE, 5),
('Chana Masala', 'Chickpeas cooked in spicy gravy', 50, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Chana%20Masala.webp', 'Sabjiyan', TRUE, TRUE, 5),
('Rajma', 'Kidney beans cooked in rich gravy', 50, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Rajma.webp', 'Sabjiyan', TRUE, TRUE, 5),
('Chilly Mushroom', 'Mushrooms tossed in spicy Indo-Chinese sauce', 65, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Chilly%20Mushroom.webp', 'Sabjiyan', TRUE, TRUE, 5),
('Matar Mushroom', 'Mushroom and peas curry', 65, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Matar%20Mushroon.webp', 'Sabjiyan', TRUE, TRUE, 5),
('Mushroom Curry', 'Mushrooms cooked in flavorful curry gravy', 60, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Mushroom%20Curry.webp', 'Sabjiyan', TRUE, TRUE, 5),

-- NON VEG

('Chicken Curry', 'Chicken cooked in traditional spicy curry gravy', 90, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Chicken%20Curry.webp', 'Non Veg', FALSE, TRUE, 5),
('Butter Chicken', 'Chicken cooked in rich buttery tomato gravy', 95, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Butter%20Chicken.webp', 'Non Veg', FALSE, TRUE, 5),
('Kadhai Chicken', 'Chicken cooked with capsicum and spices in kadhai style', 100, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Kadhai%20Chicken.webp', 'Non Veg', FALSE, TRUE, 5),
('Handi Chicken', 'Chicken prepared in traditional handi gravy', 100, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Handi%20Chicken.webp', 'Non Veg', FALSE, TRUE, 5),
('Chicken Korma', 'Chicken cooked in creamy aromatic korma gravy', 110, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Chicken%20Korma.webp', 'Non Veg', FALSE, TRUE, 5),
('Chicken Mughlai', 'Chicken cooked in rich Mughlai-style gravy', 110, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Chicken%20Mughlai.webp', 'Non Veg', FALSE, TRUE, 5),
('Chicken Lapeta', 'Chicken cooked in rich spiced gravy', 110, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Chicken%20Lapeta.webp', 'Non Veg', FALSE, TRUE, 5),
('Chicken Mumtaz', 'Special chicken curry in rich gravy', 110, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Chicken%20Mumtaaz.webp', 'Non Veg', FALSE, TRUE, 5),
('Chilly Chicken', 'Chicken tossed in spicy Indo-Chinese sauce', 100, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Chilli%20Chicken.webp', 'Non Veg', FALSE, TRUE, 5),
('Egg Curry', 'Boiled eggs cooked in spicy curry gravy', 45, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Egg%20Curry.webp', 'Non Veg', FALSE, TRUE, 5),
('Egg Bhurji', 'Scrambled eggs cooked with onions and spices', 45, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Egg%20Bhurji.webp', 'Non Veg', FALSE, TRUE, 5),
('Egg Lapeta', 'Egg preparation cooked in rich spiced gravy', 60, NULL, 'Non Veg', FALSE, TRUE, 5),

-- ROTI

('Tawa Roti', 'Soft whole wheat flatbread cooked on tawa', 5, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Roti.webp', 'Roti', TRUE, TRUE, 5),
('Butter Roti', 'Whole wheat roti topped with butter', 7, NULL, 'Roti', TRUE, TRUE, 5),
('Tandoori Roti', 'Whole wheat roti baked in tandoor', 6, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Tandoori%20Root.webp', 'Roti', TRUE, TRUE, 5),
('Tandoori Butter Roti', 'Tandoori roti topped with butter', 8, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Tandoori%20Root.webp', 'Roti', TRUE, TRUE, 5),
('Butter Naan', 'Soft naan bread topped with butter', 15, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Butter%20Naan.webp', 'Roti', TRUE, TRUE, 5),
('Garlic Naan', 'Naan flavored with garlic and herbs', 20, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Garlic%20Naan.webp', 'Roti', TRUE, TRUE, 5),
('Lacha Paratha', 'Layered flaky whole wheat paratha', 10, 'https://ethsfsxltbuqmkvczqqt.supabase.co/storage/v1/object/public/menu-images/Lachha%20Paratha.webp', 'Roti', TRUE, TRUE, 5);
