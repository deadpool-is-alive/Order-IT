CREATE DATABASE orderit;
USE orderit;


CREATE TABLE products(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255),
    category VARCHAR(50),
    is_veg BOOLEAN DEFAULT TRUE,
    available BOOLEAN DEFAULT TRUE
    );
    
CREATE TABLE orders (
	id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20),
    customer_address TEXT,
    total_price DECIMAL(10,2),
    status ENUM(
		'Pending',
        'Preparing',
        'Ready',
        'Delivered'
	) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    
CREATE TABLE order_items (
	id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2),
    
    FOREIGN KEY (order_id)
		REFERENCES orders(id)
        ON DELETE CASCADE,
        
	FOREIGN KEY (product_id)
		REFERENCES products(id)
);

USE orderit;
ALTER TABLE orders 
ADD delivery BOOLEAN DEFAULT FALSE;

ALTER TABLE products
ADD packaging_cost DECIMAL(10,2) DEFAULT 0.00;

ALTER TABLE order_items
ADD packaging_cost DECIMAL(10,2) DEFAULT 0.00;

SELECT * FROM order_items;
SELECT * FROM orders;
SELECT * FROM products;

ALTER TABLE orders
MODIFY COLUMN status ENUM(
    'Pending',
    'Preparing',
    'Ready',
    'Delivered',
    'Cancelled'
) DEFAULT 'Pending';

DESCRIBE orders;

ALTER TABLE orders 
ADD customer_rollnum VARCHAR(15);

ALTER TABLE orders
MODIFY COLUMN status ENUM(
    'Pending',
    'Preparing',
    'Ready',
    'Delivered',
    'Paid',
    'Credited',
    'Cancelled'
) DEFAULT 'Pending';

SET SQL_SAFE_UPDATES = 0;
UPDATE orders
SET status = 'Paid'
WHERE status = 'Delivered';
SET SQL_SAFE_UPDATES = 1;

ALTER TABLE orders
MODIFY COLUMN status ENUM(
    'Pending',
    'Preparing',
    'Ready',
    'Paid',
    'Credit',
    'Cancelled'
) DEFAULT 'Pending';


SELECT * FROM products;

DESCRIBE orders;