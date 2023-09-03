create database restaurant_db;

CREATE TABLE fnb_categories (
    id SMALLSERIAL PRIMARY KEY,
    fnb_type VARCHAR(10),
    name VARCHAR(20)
);

CREATE TABLE fnb_item_lists (
    id SMALLSERIAL PRIMARY KEY,
    name VARCHAR(30),
    description TEXT,
    price DECIMAL(6,2),
    photo TEXT,
    categories_id INTEGER REFERENCES fnb_categories(id),
    isDeleted BOOLEAN
);

create table customers (
	id smallserial primary key,
	password int4 not null,
	"name" varchar(40),
	contact varchar(10)
);

CREATE SEQUENCE employee_id_seq START 100;
CREATE TABLE employees (
    id TEXT DEFAULT 'SEI' || nextval('employee_id_seq') NOT null primary key,
    name VARCHAR(255) NOT NULL,
    password varchar(8) not null,
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
	quantity integer not null
);

create table payments (
	id uuid primary key,
	employee_id varchar(8) references employees(id),
	date date,
	nett_amount decimal(6,2),
	gst decimal(6,2),
	service_charge decimal(6,2),
	total_amount decimal(6,2)
)

create table order_payment (
	order_id uuid references orders(id),
	payment_id uuid references payments(id)
)