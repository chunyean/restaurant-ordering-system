# Restaurant-Ordering-System

## Table of Contents

1. Introduction
2. Features
3. Preview and screen shoot 
4. Getting Started
5. Tachnology
6. References



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
   > VITE_SERVER=http://localhost:[port] (this port should be same as backend-express)
4. backend-epress .env file should put:
   (This project I'm using ***PostgreSQL*** as database)
   > NAME=[same username as your database]
   > PASSWORD=[same password as your database]
   > HOST=localhost
   > DB_PORT=5432
   > DATABASE=restaurant_db
   > PORT=[port]
   > ACCESS_SECRET=[any alphanumeric string as your secret key]


PORT=8000
   
