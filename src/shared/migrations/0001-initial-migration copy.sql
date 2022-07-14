CREATE TABLE Users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  username VARCHAR(255) NOT NULL,
  password CHAR(60) NOT NULL,
  bio VARCHAR(255),
  avatar VARCHAR(255),
  full_name VARCHAR(255),
  short_bio VARCHAR(255)
);
