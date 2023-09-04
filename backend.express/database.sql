-- create database at postgresql or any others SQL database
create database restaurant_db;

CREATE TABLE fnb_item_lists (
    id SMALLSERIAL PRIMARY KEY,
    name VARCHAR(30) not null,
    description text not null,
    price DECIMAL(6,2) not null,
    photo text not null,
    type varchar(10) check(type in ('Food', 'Drink')),
    categories varchar(15) check(type in ('Appertizer', 'Soup', 'Main Course', 'Pasta', 'Dessert', 'Cocktail', 'Red Wine', 'White Wine', 'Bottle Beer', 'Spirit', 'Soft Drink', 'Juice')),
    isDeleted BOOLEAN default false
);

create table customers (
	id smallserial primary key,
	username varchar(30) not null,
	password varchar(60) not null,
	contact varchar(10) not null
);

-- create the sequence for employee id to start from 100
CREATE SEQUENCE employee_id_seq START 100;

-- nextval function used to generate the next value in a sequence.
CREATE TABLE employees (
    id TEXT DEFAULT 'SEI' || nextval('employee_id_seq') NOT null primary key,
    name VARCHAR(30) NOT NULL,
    password varchar(60) not null,
    contact varchar(10) not null,
    CONSTRAINT check_id_pattern CHECK (id ~ '^SEI[0-9]+$')
);

create table orders (
	id uuid primary key, 
	employee_id text references employees(id),
	customer_id integer references customers(id),
	date date,
	table_number smallint not null
);

create table fnb_order_lists (
	id uuid primary key,
	order_id uuid references orders(id),
	fnb_item_list_id smallserial references fnb_item_lists(id),
	quantity integer not null,
	total_price decimal(6,2),
	order_type varchar(15) check (order_type in ('Dine in', 'Take Away', 'Delivery'))
);

create table payments (
	id uuid primary key,
	employee_id varchar(8) references employees(id),
	date date,
	nett_amount decimal(6,2),
	gst decimal(6,2),
	service_charge decimal(6,2),
	total_amount decimal(6,2)
);

create table order_payment (
	order_id uuid references orders(id),
	payment_id uuid references payments(id)
);