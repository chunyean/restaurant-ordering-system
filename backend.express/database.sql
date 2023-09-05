-- create database at postgresql or any others SQL database
create database restaurant_db;

--add extension for uuid generate
CREATE EXTENSION "uuid-ossp";

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
	"name" varchar(100) NOT NULL,
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
	id varchar(10) NOT NULL DEFAULT 'SEI '::text || nextval('employee_id_seq'::regclass),
	"name" varchar(30) NOT NULL,
	"password" varchar(60) NOT NULL,
	contact varchar(10) NOT NULL,
	CONSTRAINT check_id_pattern CHECK ((id ~ '^SEI [0-9]+$'::text)),
	CONSTRAINT employees_pkey PRIMARY KEY (id)
);

CREATE TABLE orders (
	id uuid NOT NULL default uuid_generate_v4(),
	employee_id varchar(10) NULL,
	customer_id int4 NULL,
	"date" date NULL,
	table_number int2 NOT NULL,
	pax integer not null,
	CONSTRAINT orders_pkey PRIMARY KEY (id),
	CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customers(id),
	CONSTRAINT orders_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE order_types (
	order_type varchar(15) NOT NULL,
	CONSTRAINT order_types_pkey PRIMARY KEY (order_type)
);

CREATE TABLE fnb_order_lists (
	id uuid NOT NULL default uuid_generate_v4(),
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
	id uuid NOT NULL default uuid_generate_v4(),
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
	order_id uuid NULL default uuid_generate_v4(),
	payment_id uuid NULL default uuid_generate_v4(),
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

--seed data for F&B items
insert into fnb_item_lists(name, description, price, photo, "type", category) values ('Roasted Broccoli Soup', 'Blend roasted broccoli, cream cheese, and vegetable broth to make a simple, yet delicious soup. Roasting broccoli enhances its flavor, allowing nutty and sweet flavors to develop.','10.00','https://www.allrecipes.com/thmb/KxFjdCyjw6RD0be1BthisS20UNY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8532495-Roasted-Broccoli-Soup-France-C-4x3-1-b692648d98374a84b44a7bb7305d174b.jpg','FOOD','SOUP');
insert into fnb_item_lists(name, description, price, photo, "type", category) values ('Roasted Grape Flatbread', 'Pizza dough or a flatbread are topped with ricotta, mozzarella, and roasted grapes and baked in the oven - a delicious appetizer or side.','14.00','https://www.allrecipes.com/thmb/ObwyWXZcA1P9Y7PbI7KE81f8MLw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7182311GrapeFlatbread4x3-b6fec620c0c5446aac2721bdf61fd74b.jpg','FOOD','APPERTIZER');
insert into fnb_item_lists(name, description, price, photo, "type", category) values ('Crockpot Italian Chicken', 'You only need 3 ingredients for this crockpot Italian chicken with Italian dressing and Parmesan cheese. Nothing could be easier than this for a weekday meal that ready when you get home.','23.00','https://www.allrecipes.com/thmb/cLLmeWO7j9YYI66vL3eZzUL_NKQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7501402crockpot-italian-chicken-recipe-fabeveryday4x3-223051c7188841cb8fd7189958c62f3d.jpg','FOOD','MAIN COURSE');
insert into fnb_item_lists(name, description, price, photo, "type", category) values ('Pasta alla Trapanese', 'I"m excited to share my version of pasta alla Trapanese, featuring Sicily"s amazing tomato pesto. I love the green Genovese-style pesto, but when super-sweet cherry tomatoes are in season, I really believe this is the best pesto.','18.00','https://www.allrecipes.com/thmb/wf2eA6-QuAJfftL37LlXIwPlcwQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7571415_Pasta-alla-Trapanese_Chef-John_4x3-9d9541bc16bf4beda4e634e99780d01d.jpg','FOOD','PASTA');
insert into fnb_item_lists(name, description, price, photo, "type", category) values ('Peach Fritters', 'Making fresh peach fritters with chunks of peaches in a peach batter instead of chunks of peaches in a plain batter changes everything. These fritters are pure peach goodness. Serve with vanilla ice cream and an optional Bourbon whiskey simple syrup.','12.00','https://www.allrecipes.com/thmb/d9XbXITSKusHn6z13xZPqOzG0NU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7564661_Fresh-Peach-Fritters_Chef-John_4x3-8722514350b34165859120b437dee58f.jpg','FOOD','DESSERT');
insert into fnb_item_lists(name, description, price, photo, "type", category) values ('Apple Cider Margarita', 'This apple cider margarita is a nice fall twist on traditional margaritas using apple cider, tequila, cinnamon whiskey, butterscotch schnapps, and lime.','15.00','https://www.allrecipes.com/thmb/KsKmn8YSw-5B1SW0ZudEr0kKqX4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7686376_Apple-Cider-Margaritas_Chef-Mo_4x3-58e42d7f8c1f4064a480caa57920e563.jpg','DRINK','COCKTAIL');
insert into fnb_item_lists(name, description, price, photo, "type", category) values ('The Loose Moose French','A juicy number packed with strawberries and cherries with a hint of spice. ','25.00','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkIohjtMhqFoVpNvVXRTkTuS6YU5Pw0ecqDTqIU_gLxyskl2DA','DRINK','RED WINE');
insert into fnb_item_lists(name, description, price, photo, "type", category) values ('CALABRIA FAMILY WINES','Light straw in colour, this fruit driven Chardonnay displays aromas of grapefruit & lime.','40.00','https://wineconnection.com.sg/media/catalog/product/cache/3e2bbaf775fd7489474b010c6ab9956f/a/u/au40_richland-chardonnay_sg.png','DRINK','WHITE WINE');
insert into fnb_item_lists(name, description, price, photo, "type", category) values ('Asahi Super Dry','Japan"s No.1 Beer Asahi Super Dry has a rich full flavoured body and refreshing dry finish','13.00','https://www.liquorbar.sg/images/2019/products/beer/ASAHI-pint.webp','DRINK','BOTTLE BEER');
insert into fnb_item_lists(name, description, price, photo, "type", category) values ('Dalmore King Alexander III','THE EMBODIMENT OF BRAVERY In 1263, Colin of Kintail, Chief of the Clan Mackenzie, took a bold decision to stand up and be counted, and felled a charging stag which attacked King Alexander III of Scotland.','400.00','https://www.liquorbar.sg/images/2019/products/whisky/dalmore-king-alexander-iiis.webp','DRINK','SPIRIT');
insert into fnb_item_lists(name, description, price, photo, "type", category) values ('Coke','Coke products were sold in over 200 countries worldwide, with consumers drinking more than 1.8 billion company beverage servings each day.','8.00','https://overricesg.com/wp-content/uploads/2021/07/coke.jpg','DRINK','SOFT DRINK');
insert into fnb_item_lists(name, description, price, photo, "type", category) values ('GREEN JUICE','This Green Juice Recipe is packed with kale, cucumbers, celery, lemon, ginger, and apples! Loaded with fruits and veggies, this juice is healthy and delicious!','14.00','https://showmetheyummy.com/wp-content/uploads/2016/03/Green-Juice-Show-Me-the-Yummy-6-683x1024.jpg','DRINK','JUICE');

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