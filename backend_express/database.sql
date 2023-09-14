-- create database at postgresql or any others SQL database
create database restaurant_db;

--add extension for uuid generate
CREATE EXTENSION "uuid-ossp";

CREATE TABLE "types" (
	"type" varchar(15) NOT NULL,
	CONSTRAINT types_pkey PRIMARY KEY (type)
);

CREATE TABLE categories (
	category varchar(15) NOT NULL,
	CONSTRAINT categories_pkey PRIMARY KEY (category)
);

CREATE SEQUENCE item_id_seq START 10001;
CREATE TABLE items (
	id int4 NOT NULL DEFAULT nextval('item_id_seq'::regclass),
	"name" varchar(100) NOT NULL,
	description text NOT NULL,
	price numeric(6, 2) NOT NULL,
	photo varchar(255) NOT NULL,
	"type" varchar(15) NULL,
	category varchar(15) NULL,
	isdeleted bool NULL DEFAULT false,
	CONSTRAINT items_pkey PRIMARY KEY (id),
	CONSTRAINT items_category_fkey FOREIGN KEY (category) REFERENCES categories(category),
	CONSTRAINT items_type_fkey FOREIGN KEY ("type") REFERENCES "types"("type")
);

CREATE TABLE order_histories (
	customer_id int4 NOT NULL,
	payment_id uuid NOT NULL,
	CONSTRAINT order_histories_pkey PRIMARY KEY (customer_id, payment_id),
	CONSTRAINT fk_id FOREIGN KEY (customer_id) REFERENCES customers(id),
	CONSTRAINT pfk_id FOREIGN KEY (payment_id) REFERENCES payments(id)
);

CREATE SEQUENCE customer_id_seq START 20001;
CREATE TABLE customers (
	id int4 NOT NULL DEFAULT nextval('customer_id_seq'::regclass),
	username varchar(30) NOT NULL,
	"password" varchar(60) NOT NULL,
	contact varchar(10) NOT NULL,
	CONSTRAINT customers_pkey PRIMARY KEY (id)
);

CREATE SEQUENCE employee_id_seq START 100;
CREATE TABLE employees (
	id varchar(10) NOT NULL DEFAULT (('SEI '::text || nextval('employee_id_seq'::regclass))),
	"name" varchar(30) NOT NULL,
	"password" varchar(60) NOT NULL,
	contact varchar(10) NOT NULL,
	is_resigned bool NULL DEFAULT false,
	CONSTRAINT check_id_pattern CHECK (((id)::text ~ '^SEI [0-9]+$'::text)),
	CONSTRAINT employees_pkey PRIMARY KEY (id)
);

CREATE TABLE orders (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	customer_id int4 NULL,
	"date" timestamp NULL DEFAULT now(),
	table_number int2 NOT NULL,
	pax int4 NOT NULL,
	is_voidorder bool NULL DEFAULT false,
	is_payment bool NULL DEFAULT false,
	employee_id varchar(10) NULL,
	CONSTRAINT orders_pkey PRIMARY KEY (id),
	CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customers(id),
	CONSTRAINT orders_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE order_types (
	order_type varchar(15) NOT NULL,
	CONSTRAINT order_types_pkey PRIMARY KEY (order_type)
);

CREATE TABLE order_lists (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	order_id uuid NULL,
	item_id int4 NULL,
	quantity smallserial NULL,
	total_price numeric(6, 2) NULL,
	order_type varchar(15) NULL,
	unit_price numeric(6, 2) NULL,
	CONSTRAINT order_lists_pkey PRIMARY KEY (id),
	CONSTRAINT order_lists_item_id_fkey FOREIGN KEY (item_id) REFERENCES items(id),
	CONSTRAINT order_lists_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id),
	CONSTRAINT order_lists_order_type_fkey FOREIGN KEY (order_type) REFERENCES order_types(order_type)
);

CREATE TABLE payments (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	employee_id varchar(10) NULL,
	"date" timestamp NULL DEFAULT now(),
	nett_amount numeric(6, 2) NULL,
	service_charge numeric(6, 2) NULL,
	gst numeric(6, 2) NULL,
	total_amount numeric(6, 2) NULL,
	is_completed bool NULL DEFAULT false,
	table_number int4 NULL,
	CONSTRAINT payments_pkey PRIMARY KEY (id),
	CONSTRAINT payments_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE order_payment (
	order_id uuid NULL,
	payment_id uuid NULL,
	CONSTRAINT order_payment_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id),
	CONSTRAINT order_payment_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES payments(id)
);

CREATE TABLE carts (
	customer_id int4 NOT NULL,
	item_id int4 NOT NULL,
	"name" varchar(100) NULL,
	quantity smallserial NOT NULL,
	unit_price numeric(6, 2) NULL,
	nett_amount numeric(6, 2) NULL,
	CONSTRAINT cart_fk FOREIGN KEY (customer_id) REFERENCES public.customers(id),
	CONSTRAINT cart_fk_1 FOREIGN KEY (item_id) REFERENCES public.items(id)
);

-- function to calculate for all GST, Service Charge and Total Amount
CREATE FUNCTION allCalculation()
RETURNS trigger AS 
$$
BEGIN
  IF NEW.service_charge IS NULL THEN
    NEW.service_charge = NEW.nett_amount * 0.1;
  END IF;

  IF NEW.gst IS NULL THEN
    NEW.gst = (NEW.nett_amount + NEW.service_charge) * 0.08;
  END IF;

  IF NEW.total_amount IS NULL THEN
    NEW.total_amount = NEW.nett_amount + NEW.service_charge + NEW.gst;
  END IF;

  RETURN NEW;
END
$$
LANGUAGE plpgsql
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER;


--function to calculate Nett Amount
CREATE FUNCTION nettAmount()
RETURNS trigger AS 
$$
BEGIN
  IF NEW.nett_amount IS null THEN
    NEW.nett_amount = NEW.quantity * NEW.unit_price;
  END IF;
  RETURN NEW;
END
$$
LANGUAGE plpgsql
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER;

-- function to re-calculate when quantity has been update
CREATE OR REPLACE FUNCTION update_totalprice()
RETURNS TRIGGER AS $$
BEGIN
  NEW.total_price = NEW.quantity * NEW.unit_price;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_totalprice
BEFORE UPDATE OF quantity ON order_lists
FOR EACH ROW
EXECUTE FUNCTION update_totalprice();

CREATE TRIGGER nettAmount
  BEFORE INSERT OR UPDATE 
  ON cart

FOR EACH ROW 
  EXECUTE PROCEDURE nettAmount();
 
CREATE TRIGGER allCalculation
  before INSERT OR UPDATE 
  ON payments

FOR EACH ROW 
  EXECUTE PROCEDURE allCalculation();

INSERT INTO employees (name, password, contact) values ('user1', 'password1', 12345678):

insert into types values ('FOOD');
insert into types values ('DRINK');

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

insert into order_types values ('DINE IN');
insert into order_types values ('TAKE_AWAY');
insert into order_types values ('DELIVERY');

insert into items(name, description, price, photo, "type", category) values ('Roasted Broccoli Soup', 'Blend roasted broccoli, cream cheese, and vegetable broth to make a simple, yet delicious soup. Roasting broccoli enhances its flavor, allowing nutty and sweet flavors to develop.','10.00','https://www.allrecipes.com/thmb/KxFjdCyjw6RD0be1BthisS20UNY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8532495-Roasted-Broccoli-Soup-France-C-4x3-1-b692648d98374a84b44a7bb7305d174b.jpg','FOOD','SOUP');
insert into items(name, description, price, photo, "type", category) values ('Roasted Grape Flatbread', 'Pizza dough or a flatbread are topped with ricotta, mozzarella, and roasted grapes and baked in the oven - a delicious appetizer or side.','14.00','https://www.allrecipes.com/thmb/ObwyWXZcA1P9Y7PbI7KE81f8MLw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7182311GrapeFlatbread4x3-b6fec620c0c5446aac2721bdf61fd74b.jpg','FOOD','APPERTIZER');
insert into items(name, description, price, photo, "type", category) values ('Crockpot Italian Chicken', 'You only need 3 ingredients for this crockpot Italian chicken with Italian dressing and Parmesan cheese. Nothing could be easier than this for a weekday meal that ready when you get home.','23.00','https://www.allrecipes.com/thmb/cLLmeWO7j9YYI66vL3eZzUL_NKQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7501402crockpot-italian-chicken-recipe-fabeveryday4x3-223051c7188841cb8fd7189958c62f3d.jpg','FOOD','MAIN COURSE');
insert into items(name, description, price, photo, "type", category) values ('Pasta alla Trapanese', 'I"m excited to share my version of pasta alla Trapanese, featuring Sicily"s amazing tomato pesto. I love the green Genovese-style pesto, but when super-sweet cherry tomatoes are in season, I really believe this is the best pesto.','18.00','https://www.allrecipes.com/thmb/wf2eA6-QuAJfftL37LlXIwPlcwQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7571415_Pasta-alla-Trapanese_Chef-John_4x3-9d9541bc16bf4beda4e634e99780d01d.jpg','FOOD','PASTA');
insert into items(name, description, price, photo, "type", category) values ('Peach Fritters', 'Making fresh peach fritters with chunks of peaches in a peach batter instead of chunks of peaches in a plain batter changes everything. These fritters are pure peach goodness. Serve with vanilla ice cream and an optional Bourbon whiskey simple syrup.','12.00','https://www.allrecipes.com/thmb/d9XbXITSKusHn6z13xZPqOzG0NU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7564661_Fresh-Peach-Fritters_Chef-John_4x3-8722514350b34165859120b437dee58f.jpg','FOOD','DESSERT');
insert into items(name, description, price, photo, "type", category) values ('Apple Cider Margarita', 'This apple cider margarita is a nice fall twist on traditional margaritas using apple cider, tequila, cinnamon whiskey, butterscotch schnapps, and lime.','15.00','https://www.allrecipes.com/thmb/KsKmn8YSw-5B1SW0ZudEr0kKqX4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7686376_Apple-Cider-Margaritas_Chef-Mo_4x3-58e42d7f8c1f4064a480caa57920e563.jpg','DRINK','COCKTAIL');
insert into items(name, description, price, photo, "type", category) values ('The Loose Moose French','A juicy number packed with strawberries and cherries with a hint of spice. ','25.00','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkIohjtMhqFoVpNvVXRTkTuS6YU5Pw0ecqDTqIU_gLxyskl2DA','DRINK','RED WINE');
insert into items(name, description, price, photo, "type", category) values ('CALABRIA FAMILY WINES','Light straw in colour, this fruit driven Chardonnay displays aromas of grapefruit & lime.','40.00','https://wineconnection.com.sg/media/catalog/product/cache/3e2bbaf775fd7489474b010c6ab9956f/a/u/au40_richland-chardonnay_sg.png','DRINK','WHITE WINE');
insert into items(name, description, price, photo, "type", category) values ('Asahi Super Dry','Japan"s No.1 Beer Asahi Super Dry has a rich full flavoured body and refreshing dry finish','13.00','https://www.liquorbar.sg/images/2019/products/beer/ASAHI-pint.webp','DRINK','BOTTLE BEER');
insert into items(name, description, price, photo, "type", category) values ('Dalmore King Alexander III','THE EMBODIMENT OF BRAVERY In 1263, Colin of Kintail, Chief of the Clan Mackenzie, took a bold decision to stand up and be counted, and felled a charging stag which attacked King Alexander III of Scotland.','400.00','https://www.liquorbar.sg/images/2019/products/whisky/dalmore-king-alexander-iiis.webp','DRINK','SPIRIT');
insert into items(name, description, price, photo, "type", category) values ('Coke','Coke products were sold in over 200 countries worldwide, with consumers drinking more than 1.8 billion company beverage servings each day.','8.00','https://overricesg.com/wp-content/uploads/2021/07/coke.jpg','DRINK','SOFT DRINK');
insert into items(name, description, price, photo, "type", category) values ('GREEN JUICE','This Green Juice Recipe is packed with kale, cucumbers, celery, lemon, ginger, and apples! Loaded with fruits and veggies, this juice is healthy and delicious!','14.00','https://showmetheyummy.com/wp-content/uploads/2016/03/Green-Juice-Show-Me-the-Yummy-6-683x1024.jpg','DRINK','JUICE');


