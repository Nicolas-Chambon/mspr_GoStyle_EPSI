DROP DATABASE IF EXISTS gostyle_coupon;
CREATE DATABASE gostyle_coupon;

\c gostyle_coupon;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id uuid UNIQUE DEFAULT uuid_generate_v4 (),
  email VARCHAR(128) NOT NULL UNIQUE,
  password VARCHAR(128) NOT NULL,
  registered BIGINT,
  token VARCHAR(128) UNIQUE,
  createdtime BIGINT,
  emailVerified BOOLEAN,
  tokenusedbefore BOOLEAN,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  reset_password_token VARCHAR(128) UNIQUE,
  reset_password_expires BIGINT,
  reset_password_token_used BOOLEAN,
  PRIMARY KEY (email)
);

CREATE TABLE discount (
  discount_id SERIAL,
  discount_name VARCHAR(255),
  discount_brand VARCHAR(255),
  discount_description VARCHAR(255),
  discount_image TEXT,
  discount_link TEXT,
  discount_expiration DATE,
  discount_city VARCHAR(255),
  PRIMARY KEY (discount_id)
);


CREATE TABLE user_discount (
    user_id uuid NOT NULL,
    discount_id int NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (discount_id) REFERENCES discount(discount_id),
    PRIMARY KEY (user_id, discount_id)
);
