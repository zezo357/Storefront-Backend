
# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
| route function | route type | token_required | body_has_Data | example     |   |   |   |   |   |
|----------------|------------|----------------|---------------|-------------|---|---|---|---|---|
| index          | get        | No             | No            | /products   |   |   |   |   |   |
| show           | get        | No             | No            | /products/1 |   |   |   |   |   |
| create         | post       | yes            | yes           | /products/  |   |   |   |   |   |
| update         | put        | yes            | yes           | /products/1 |   |   |   |   |   |
| delete         | delete     | yes            | yes           | /products/1 |   |   |   |   |   |



#### Users
| route function | route type | token_required | body_has_Data | example         |   |   |   |   |   |
|----------------|------------|----------------|---------------|-----------------|---|---|---|---|---|
| index          | get        | No             | No            | /users          |   |   |   |   |   |
| show           | get        | No             | No            | /users/1        |   |   |   |   |   |
| register       | post       | No             | yes           | /users/register |   |   |   |   |   |
| signIn         | post       | No             | yes           | /users/signIn   |   |   |   |   |   |
| update         | put        | yes            | yes           | /users/1        |   |   |   |   |   |
| delete         | delete     | yes            | yes           | /users/1        |   |   |   |   |   |


#### Orders
| route function | route type | token_required | body_has_Data | example                  |   |   |   |   |   |
|----------------|------------|----------------|---------------|--------------------------|---|---|---|---|---|
| index          | get        | No             | No            | /orders                  |   |   |   |   |   |
| show           | get        | No             | No            | /orders/1                |   |   |   |   |   |
| create         | post       | yes            | yes           | /orders/                 |   |   |   |   |   |
| add product    | post       | yes            | yes           | /orders/add_product/1    |   |   |   |   |   |
| remove product | post       | yes            | yes           | /orders/remove_product/1 |   |   |   |   |   |
| update         | put        | yes            | yes           | /orders/1                |   |   |   |   |   |
| delete         | delete     | yes            | yes           | /orders/1                |   |   |   |   |   |
|                |            |                |               


## Data Shapes
#### Product
| variable | data_type | database_type       |   |   |   |   |   |   |   |
|----------|-----------|---------------------|---|---|---|---|---|---|---|
| id       | number    | SERIAL PRIMARY  KEY |   |   |   |   |   |   |   |
| name     | string    | VARCHAR(255)        |   |   |   |   |   |   |   |
| price    | number    | INTEGER             |   |   |   |   |   |   |   |


#### User
| variable   | data_type | database_type       |   |   |   |   |   |   |   |
|------------|-----------|---------------------|---|---|---|---|---|---|---|
| id         | number    | SERIAL PRIMARY  KEY |   |   |   |   |   |   |   |
| first_name | string    | VARCHAR(255)        |   |   |   |   |   |   |   |
| last_name  | string    | VARCHAR(255)        |   |   |   |   |   |   |   |
| username   | string    | VARCHAR(255)        |   |   |   |   |   |   |   |
| password   | string    | VARCHAR(255)        |   |   |   |   |   |   |   |


#### Orders
| variable | data_type | database_type       |   |   |   |   |   |   |   |
|----------|-----------|---------------------|---|---|---|---|---|---|---|
| id       | number    | SERIAL PRIMARY  KEY |   |   |   |   |   |   |   |
| status   | string    | VARCHAR(255)        |   |   |   |   |   |   |   |
| user_id  | number    | INTEGER             |   |   |   |   |   |   |   |

#### productInOrder
| variable   | data_type | database_type |   |   |   |   |   |   |   |
|------------|-----------|---------------|---|---|---|---|---|---|---|
| quantity   | number    | INTEGER       |   |   |   |   |   |   |   |
| order_id   | number    | INTEGER       |   |   |   |   |   |   |   |
| product_id | number    | INTEGER       |   |   |   |   |   |   |   |
