DROP DATABASE IF EXISTS `instagram`;

CREATE DATABASE IF NOT EXISTS `instagram`;

USE `instagram`;

CREATE TABLE users (
  id VARCHAR(64) PRIMARY KEY NOT NULL UNIQUE,
  username VARCHAR(25) NOT NULL UNIQUE,
  email VARCHAR(60) NOT NULL UNIQUE,
  password VARCHAR(80) NOT NULL
);

INSERT INTO users (id, username, email, password) 
  VALUES 
    ('bd7ea65b-882c-4970-95fb-de981ddbfa66', 'zezinho', 'ze@mail.com', '$2a$10$U1c2VW8sKYlCVZzzUQ4KU.HzMk8y0l4/d/.Ct/Wo7.dE/Df43VyKG'),
    ('d47f4831-1307-4482-9ebd-9bc4f20e51ef', 'maria', 'ma@mail.com', '$2a$10$U1c2VW8sKYlCVZzzUQ4KU.HzMk8y0l4/d/.Ct/Wo7.dE/Df43VyKG');

CREATE TABLE photos (
  id VARCHAR(64) PRIMARY KEY NOT NULL UNIQUE,
  owner_id VARCHAR(64) NOT NULL,
  url VARCHAR(255) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users (id)
);

INSERT INTO photos (id, owner_id, url, active) 
  VALUES 
    ('ce7738c6-fc7b-4cb7-9b5f-006edefc85f3', 'bd7ea65b-882c-4970-95fb-de981ddbfa66', 'https://apiinstagramclone.s3.amazonaws.com/1671839750322-print.png', true),
    ('06360e1c-7d09-4e4a-9b04-186c2b4a26ba', 'd47f4831-1307-4482-9ebd-9bc4f20e51ef', 'https://apiinstagramclone.s3.amazonaws.com/1671888080727-print.png', true);