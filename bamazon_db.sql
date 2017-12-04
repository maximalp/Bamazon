-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;

-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

CREATE TABLE products (
 item_id INT NOT NULL AUTO_INCREMENT,
 
 product_name VARCHAR(100) NOT NULL,
 
 department_name VARCHAR(100) NOT NULL,
 
 price DECIMAL(10,2) NULL,
 
 stock_quantity INT NULL,
 
 PRIMARY KEY (item_id)

);


SET SQL_SAFE_UPDATES=0;
DELETE FROM products;
SET SQL_SAFE_UPDATES=1;

DROP TABLE products;

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MacBook Pro", "Computers", 1499.99, 50), ("Cat Toy", "Pets", 5.95, 30),
("Timex Watch", "Watches", 79.99, 70), ("White Plate Set", "Housewares", 109.99, 150),  
("Still Life With Woodpecker", "Books", 12.95, 200), ("Tent", "Outdoors", 299.99, 150), ("Snowboard", "Outdoors", 599.99, 350), 
("i7 Intel CPU", "Computers", 319.99, 400), ("Wolf Parade Album", "Music", 24.99, 20);