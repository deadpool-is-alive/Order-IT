
create TABLE iitk_database (
	id INT AUTO_INCREMENT UNIQUE,
	roll_num VARCHAR(15) NOT NULL PRIMARY KEY,
    email_address VARCHAR(50) UNIQUE NOT NULL,
    resident_type ENUM(
		'Resident',
        'Alum'
	) DEFAULT 'Resident'
);

CREATE TABLE users (
    id INT AUTO_INCREMENT UNIQUE,
    roll_num VARCHAR(15) UNIQUE NOT NULL PRIMARY KEY,
    email_address VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    
    CONSTRAINT fk_user_roll FOREIGN KEY(roll_num) REFERENCES iitk_database(roll_num) ON DELETE CASCADE,
    CONSTRAINT fk_user_email FOREIGN KEY (email_address) REFERENCES iitk_database(email_address) ON DELETE CASCADE
);


ALTER TABLE orders
ADD COLUMN roll_num VARCHAR(15) NOT NULL after id;

-- 1. Turn off foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

-- 2. Clear out both tables (since order_items depends on orders, clear both)
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;

-- 3. Turn the safety checks back on
SET FOREIGN_KEY_CHECKS = 1;
ALTER TABLE orders
ADD CONSTRAINT fk_orders_user_roll
FOREIGN KEY (customer_rollnum) references users(roll_num)
ON UPDATE CASCADE
ON DELETE RESTRICT;

ALTER TABLE orders
DROP FOREIGN KEY fk_orders_user_roll;
ALTER TABLE orders
DROP COLUMN roll_num;
SELECT * FROM orders;
DESCRIBE orders;

INSERT INTO iitk_database
(roll_num, email_address)
VALUES
(230158, 'anshk23@iitk.ac.in');

ALTER TABLE users
ADD COLUMN name VARCHAR(100) NOT NULL DEFAULT '' AFTER password,
ADD COLUMN phone_number VARCHAR(15) NOT NULL DEFAULT '' AFTER name;

INSERT INTO iitk_database
(roll_num, email_address)
VALUES
(241179, 'vishvasp24@iitk.ac.in');

SELECT * FROM iitk_database;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE users;
TRUNCATE TABLE iitk_database;
SET FOREIGN_KEY_CHECKS = 1;