-- SQL to create application databases and user for the Jewellery microservices
-- Run as an administrative user (root) in MySQL Workbench: open a new SQL tab and execute.

-- Create databases
CREATE DATABASE IF NOT EXISTS jewellery_orders;
CREATE DATABASE IF NOT EXISTS jewellery_payments;
CREATE DATABASE IF NOT EXISTS jewellery_users;
CREATE DATABASE IF NOT EXISTS jewellery_products;

-- Create user for localhost and grant privileges
CREATE USER IF NOT EXISTS 'Ash'@'localhost' IDENTIFIED BY '9ki8nrjjis';
GRANT ALL PRIVILEGES ON jewellery_orders.* TO 'Ash'@'localhost';
GRANT ALL PRIVILEGES ON jewellery_payments.* TO 'Ash'@'localhost';
GRANT ALL PRIVILEGES ON jewellery_users.* TO 'Ash'@'localhost';
GRANT ALL PRIVILEGES ON jewellery_products.* TO 'Ash'@'localhost';
FLUSH PRIVILEGES;

-- Optional: allow connections from any host (uncomment only if you need remote access)
-- CREATE USER IF NOT EXISTS 'Ash'@'%' IDENTIFIED BY '9ki8nrjjis';
-- GRANT ALL PRIVILEGES ON jewellery_orders.* TO 'Ash'@'%';
-- GRANT ALL PRIVILEGES ON jewellery_payments.* TO 'Ash'@'%';
-- GRANT ALL PRIVILEGES ON jewellery_users.* TO 'Ash'@'%';
-- GRANT ALL PRIVILEGES ON jewellery_products.* TO 'Ash'@'%';
-- FLUSH PRIVILEGES;

-- Tips:
-- 1) In MySQL Workbench: connect as root/admin, paste and execute this script.
-- 2) After running, create a new connection in Workbench with user 'Ash' and the password to test.
-- 3) If services still fail to connect, start the desired microservice and check application logs for Hikari / datasource messages.
