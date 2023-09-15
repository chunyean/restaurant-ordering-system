## Table of Contents

1. Introduction
2. Features
3. Getting Started
4. ORM(Object–relational mapping)
5. Preview and screen shoot 
6. Tachnology
7. References


## Introduction
This Restaurant Ordering System is a website software application which process from customer side until front-of-house staff to do payment. This apps will improve the efficiency of restaurant taking order from customer. It will help to reduce work load for front-of-hosue staf. Customer side will experience to view menu and place an order, front-of-house staff can place order, view each table order and do payment 

## Features
- ***User Authentication*** = user can create account, log in and track each order follow by table number
- ***Menu Management*** = user can go through each F&B items that display out
- ***Order Management*** = user can preview and adjust the quantity before place an order and update quantity or cancel order by admin user 
- ***Payment*** = user can view all the charge by payment adn will generate receipt to show customer.

## Getting Started
1. Clone my repository from github.
2. Add individual .env file into backend-express folder and frontend folder
3. frontend .env file should put:
   - VITE_SERVER=http://localhost:[port] (this port should be same as backend-express)
4. backend-epress .env file should put:
   (This project I'm using ***PostgreSQL*** as database)
   - NAME=[same username as your database]
   - PASSWORD=[same password as your database]
   - HOST=localhost
   - DB_PORT=5432
   - DATABASE=restaurant_db
   - PORT=[port]
   - ACCESS_SECRET=[any alphanumeric string as your secret key]
5. inside backend-express having one file call database.sql. It's contain all the SQL script that need to build up database and all the table.
   inside database.sql file contain the script state at below which use to create first employee in the database. (first employee id will be: SEI 100
   `INSERT INTO employees (name, password, contact) values ('user1', 'password1', 12345678):`
6. based on my SQL Script to create database. The database name is call **restaurant_db**.

## ORM(Object–relational mapping)
This is my ORM for the whole project
![drawSQL-copy-of-project-4-export-2023-09-15](https://github.com/chunyean/restaurant-ordering-system/assets/135581973/53decfba-652c-4faa-b99b-0d516a8ae33c)

## Preview and Screen shot
Sign up page for customer. They need to provide username, contact and password to sign up an account.
<img width="953" alt="pic1" src="https://github.com/chunyean/restaurant-ordering-system/assets/135581973/cfa379ec-bcf5-417e-9d58-4a6bf2f93f36">

Sign in page for customer based on username and password 
<img width="954" alt="pic2" src="https://github.com/chunyean/restaurant-ordering-system/assets/135581973/9f308869-0c3d-45ad-a15e-b9adb53b1dc1">

After login will show food page. Food page will display out the food menu based on category. customer can clik ADD button, it will add into cart. By default it will be quantity = 1
<img width="934" alt="pic3" src="https://github.com/chunyean/restaurant-ordering-system/assets/135581973/07d61c5d-c365-493f-88b5-637caa8fd5c1">

Beverage page will be same as food page. you will notice number contain at shopping cart will be different after ADD buttton had been click.
<img width="935" alt="pic4" src="https://github.com/chunyean/restaurant-ordering-system/assets/135581973/ce4154c2-6875-46af-96a2-d6b53447dcb6">

This one is overlay modal after you click on the item. From this page customer can also order different quantity based on customer prefer.
<img width="903" alt="pic11" src="https://github.com/chunyean/restaurant-ordering-system/assets/135581973/e6077734-fa6d-4368-8099-66578f7cfad6">

When click shopping cart will come to this page. By this page customer can view what they have been order. From here you can edit quantity and delete the items based on customer prefer. Fill up table number and pax, after confirm all the order click on **Submit button**, it will send into system.
<img width="952" alt="pic5" src="https://github.com/chunyean/restaurant-ordering-system/assets/135581973/8bf5348b-9b7c-4051-97cf-6b207afdbe99">

Go to path="/admin" will direct to employee page. Login with employee id and password
<img width="950" alt="pic6" src="https://github.com/chunyean/restaurant-ordering-system/assets/135581973/068f55fe-29b8-47b6-82df-ea02ea3d1e02">

Greeting usename is a hidden selection for **Register Staff**. Employee id which display here will be the id for the staff that going to register. This id is importnat need to use it when login 
<img width="945" alt="pic12" src="https://github.com/chunyean/restaurant-ordering-system/assets/135581973/1858cac0-89e0-48f3-800a-1ccf5c5eb556">

This page is show out all the table number
<img width="953" alt="pic7" src="https://github.com/chunyean/restaurant-ordering-system/assets/135581973/b2ddce97-2f88-414a-9c21-b70f7c8db79a">

Click into the table number, employee can help customer to admend order quantity, delete or void order and start to payment process for customer.
<img width="950" alt="pic8" src="https://github.com/chunyean/restaurant-ordering-system/assets/135581973/f4789ae0-5a9c-45a4-8b65-cbdc0574ba9b">

Payment review wioll show out all the info of F&B item that order by the customer based on table number. Here will show price, service charge, gst and total amount. It's also provide input cash amount and show out balance.
<img width="923" alt="pic9" src="https://github.com/chunyean/restaurant-ordering-system/assets/135581973/4499871c-52a2-4e16-8910-83834178f633">

Once payment complete will display receipt.
<img width="939" alt="pic10" src="https://github.com/chunyean/restaurant-ordering-system/assets/135581973/c3438009-8704-48b1-bd1b-064a87904acd">

## Technology
- HTML
- CSS
- Javascript
- React
- PostgreSQL (database)
- Express
- Figma
- https://online.visual-paradigm.com/ (draw component directory for frontend) 
- https://drawsql.app/ (draw ORD for backend)
  
## References
- https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
- https://blog.knoldus.com/how-to-create-auto-incremented-alphanumeric-id-in-postgres/
- https://stackoverflow.com/questions/910763/how-to-set-a-postgresql-default-value-datestamp-like-yyyymm
- https://dba.stackexchange.com/questions/153017/how-do-i-install-enable-the-uuid-ossp-extension-on-postgres-9-3
- https://www.postgresql.org/docs/9.2/functions-array.html
- https://bobbyhadz.com/blog/css-button-width-fit-text#:~:text=To%20adjust%20a%20button's%20width%20to%20fit%20the%20text%2C%20set,the%20size%20of%20its%20content.
- https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-temporary-table/
- https://stackoverflow.com/questions/65413820/insert-into-table-if-exists-or-else-create-table
- https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-group-by/
- https://www.postgresqltutorial.com/postgresql-aggregate-functions/postgresql-count-function/
- https://stackoverflow.com/questions/51154136/how-to-save-a-calculation-as-a-default-value-in-a-postgresqls-table-column
- https://www.youtube.com/watch?v=FbAQABnEOUE
- https://stackoverflow.com/questions/39229079/check-if-trigger-exists
- https://stackoverflow.com/questions/71397282/prevent-onclick-of-base-element-if-onclick-of-overlay-button-is-clicked
- https://stackoverflow.com/questions/64838587/how-to-properly-use-usehistory-from-react-router-dom
- https://stackoverflow.com/questions/2388115/get-locale-short-date-format-using-javascript



