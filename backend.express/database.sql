-- create database at postgresql or any others SQL database
create database restaurant_db;

CREATE TABLE categories (
	category varchar(15) NOT NULL,
	CONSTRAINT categories_pkey PRIMARY KEY (category)
);

CREATE TABLE "types" (
	"type" varchar(15) NOT NULL,
	CONSTRAINT types_pkey PRIMARY KEY (type)
);

CREATE TABLE fnb_item_lists (
	id smallserial NOT NULL,
	"name" varchar(30) NOT NULL,
	description text NOT NULL,
	price numeric(6, 2) NOT NULL,
	photo varchar(255) NOT NULL,
	"type" varchar(15) NULL,
	category varchar(15) NULL,
	isdeleted bool NULL DEFAULT false,
	CONSTRAINT fnb_item_lists_pkey PRIMARY KEY (id),
	CONSTRAINT fnb_item_lists_category_fkey FOREIGN KEY (category) REFERENCES categories(category),
	CONSTRAINT fnb_item_lists_type_fkey FOREIGN KEY ("type") REFERENCES "types"("type")
);

CREATE TABLE customers (
	id smallserial NOT NULL,
	username varchar(30) NOT NULL,
	"password" varchar(60) NOT NULL,
	contact varchar(10) NOT NULL,
	CONSTRAINT customers_pkey PRIMARY KEY (id)
);

-- create the sequence for employee id to start from 100
CREATE SEQUENCE employee_id_seq START 100;

-- nextval function used to generate the next value in a sequence.
CREATE TABLE employees (
	id text NOT NULL DEFAULT 'SEI'::text || nextval('employee_id_seq'::regclass),
	"name" varchar(30) NOT NULL,
	"password" varchar(60) NOT NULL,
	contact varchar(10) NOT NULL,
	CONSTRAINT check_id_pattern CHECK ((id ~ '^SEI[0-9]+$'::text)),
	CONSTRAINT employees_pkey PRIMARY KEY (id)
);

CREATE TABLE orders (
	id uuid NOT NULL,
	employee_id text NULL,
	customer_id int4 NULL,
	"date" date NULL,
	table_number int2 NOT NULL,
	CONSTRAINT orders_pkey PRIMARY KEY (id),
	CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customers(id),
	CONSTRAINT orders_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE order_types (
	order_type varchar(15) NOT NULL,
	CONSTRAINT order_types_pkey PRIMARY KEY (order_type)
);

CREATE TABLE fnb_order_lists (
	id uuid NOT NULL,
	order_id uuid NULL,
	fnb_item_list_id smallserial NOT NULL,
	quantity int4 NOT NULL,
	total_price numeric(6, 2) NULL,
	order_type varchar(15) NULL,
	CONSTRAINT fnb_order_lists_pkey PRIMARY KEY (id),
	CONSTRAINT fnb_order_lists_fnb_item_list_id_fkey FOREIGN KEY (fnb_item_list_id) REFERENCES fnb_item_lists(id),
	CONSTRAINT fnb_order_lists_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id),
	CONSTRAINT fnb_order_lists_order_type_fkey FOREIGN KEY (order_type) REFERENCES order_types(order_type)
);

CREATE TABLE payments (
	id uuid NOT NULL,
	employee_id varchar(8) NULL,
	"date" date NULL,
	nett_amount numeric(6, 2) NULL,
	gst numeric(6, 2) NULL,
	service_charge numeric(6, 2) NULL,
	total_amount numeric(6, 2) NULL,
	CONSTRAINT payments_pkey PRIMARY KEY (id),
	CONSTRAINT payments_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES employees(id)
);


CREATE TABLE order_payment (
	order_id uuid NULL,
	payment_id uuid NULL,
	CONSTRAINT order_payment_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id),
	CONSTRAINT order_payment_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES payments(id)
);

--seed data into types table
insert into types values ('FOOD');
insert into types values ('DRINK');

--seed data into categories table
insert into categories values ('APPERTIZER');
insert into categories values ('SOUP');
insert into categories values ('MAIN COURSE');
insert into categories values ('PASTA');
insert into categories values ('DESSERT');
insert into categories values ('COCKTAIL');
insert into categories values ('RED WINE');
insert into categories values ('WHITE WINE');
insert into categories values ('BOTTLE BEER');
insert into categories values ('SPIRIT');
insert into categories values ('SOFT DRINK');
insert into categories values ('JUICE');

--seed data into order_types table
insert into order_types values ('DINE IN');
insert into order_types values ('TAKE_AWAY');
insert into order_types values ('DELIVERY');
-------------------------------------------------------
CREATE TABLE fnb_item_lists (
    id SMALLSERIAL PRIMARY KEY,
    name VARCHAR(30) not null,
    description text not null,
    price DECIMAL(6,2) not null,
    photo text not null,
    type varchar(10) check(type in ('Food', 'Drink')),
    category varchar(15) check(type in ('Appertizer', 'Soup', 'Main Course', 'Pasta', 'Dessert', 'Cocktail', 'Red Wine', 'White Wine', 'Bottle Beer', 'Spirit', 'Soft Drink', 'Juice')),
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
    id TEXT DEFAULT 'SEI ' || nextval('employee_id_seq') NOT null primary key,
    name VARCHAR(30) NOT NULL,
    password varchar(60) not null,
    contact varchar(10) not null,
    CONSTRAINT check_id_pattern CHECK (id ~ '^SEI [0-9]+$')
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