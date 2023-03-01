CREATE TABLE IF NOT EXISTS inventorydb.public.role (
  id varchar(60) primary key,
  name varchar(60) not null, 
  description varchar(60) not null
);

CREATE TABLE IF NOT EXISTS inventorydb.public.user (
  id varchar(60) primary key,
  name varchar(60) not null, 
  email varchar(60) not null,
  password varchar(60) not null
);