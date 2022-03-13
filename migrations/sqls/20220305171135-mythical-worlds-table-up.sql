/* Replace with your SQL commands */


CREATE TABLE Users (id SERIAL PRIMARY  KEY,first_name VARCHAR(255),last_name VARCHAR(255),username VARCHAR(255),password VARCHAR(255));

CREATE TABLE Products (id SERIAL PRIMARY  KEY,
name VARCHAR(255) NOT NULL,
price INTEGER NOT NULL);

CREATE TABLE Orders (id SERIAL PRIMARY  KEY,
status VARCHAR(255) NOT NULL,
user_id INTEGER references Users(id));

CREATE TABLE Order_Products (id SERIAL PRIMARY KEY,quantity INTEGER ,order_id INTEGER references Orders(id),product_id INTEGER references Products(id));

