/* Replace with your SQL commands */
CREATE TABLE Books (id SERIAL PRIMARY  KEY,title VARCHAR(150),author VARCHAR(255),total_pages INTEGER,type VARCHAR(100),summary text);

CREATE TABLE Users (id SERIAL PRIMARY  KEY,first_name VARCHAR(255),last_name VARCHAR(255),username VARCHAR(255),password VARCHAR(255));
