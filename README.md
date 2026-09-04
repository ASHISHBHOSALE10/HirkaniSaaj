# HirkaniSaaj

A luxury jewelry e-commerce platform built as a Spring Boot microservices architecture with a React storefront. The project delivers a polished frontend experience for premium bridal and heritage jewelry, backed by a modular backend for users, products, orders, payments, and notifications.

## Overview

HirkaniSaaj is designed around a multi-service architecture to model a real-world commerce system with independent domains, service discovery, API routing, and asynchronous messaging.

### Core architecture
- Frontend: React storefront
- API gateway: Spring Cloud Gateway
- Service discovery: Netflix Eureka
- User management: JWT-based authentication and authorization
- Catalog: Product and category management
- Orders and payments: Order creation and payment simulation
- Messaging: RabbitMQ for event-driven processing
- Notifications: Event consumer for order and payment updates

## Tech stack

### Backend
- Java 17
- Spring Boot 3
- Spring Cloud
- Spring Security
- MySQL
- RabbitMQ
- Maven multi-module build

### Frontend
- React
- React Router
- Framer Motion
- Lucide icons
- Custom luxury styling system

## Project structure

```text
HirkaniSaaj/
├── api-gateway/
├── eureka-server/
├── user-service/
├── product-service/
├── order-service/
├── payment-service/
├── notification-service/
├── jewelry-frontend/
├── pom.xml
├── README.md
├── create-dbs-and-user.sql
└── PROJECT_DOCUMENTATION.md
```

## Features
- Royal Maratha and heritage-inspired jewelry storefront
- JWT-based login and user registration
- Product browsing and filtering by category and price
- Shopping cart and checkout flow
- Order placement with event publishing
- Payment simulation and status updates
- Notification service using RabbitMQ
- Service discovery and gateway-based API routing

## Prerequisites

Before running the project locally, install:
- Java 17+
- Maven 3.9+
- Node.js 18+
- MySQL 8+
- RabbitMQ

## Local setup

### 1) Create the databases
Run the SQL script at the root:

```bash
mysql -u root -p
SOURCE create-dbs-and-user.sql
```

### 2) Build the backend
From the root directory:

```bash
mvn clean install -DskipTests
```

### 3) Start infrastructure services
Start MySQL and RabbitMQ locally before starting the app services.

### 4) Run the services
Open separate terminals and start the services in this order:

```bash
cd eureka-server
java -jar target/eureka-server-0.0.1-SNAPSHOT.jar
```

```bash
cd ../api-gateway
java -jar target/api-gateway-0.0.1-SNAPSHOT.jar
```

```bash
cd ../user-service
java -jar target/user-service-0.0.1-SNAPSHOT.jar
```

```bash
cd ../product-service
java -jar target/product-service-0.0.1-SNAPSHOT.jar
```

```bash
cd ../order-service
java -jar target/order-service-0.0.1-SNAPSHOT.jar
```

```bash
cd ../payment-service
java -jar target/payment-service-0.0.1-SNAPSHOT.jar
```

```bash
cd ../notification-service
java -jar target/notification-service-0.0.1-SNAPSHOT.jar
```

### 5) Start the frontend
```bash
cd jewelry-frontend
npm install
npm start
```

Then open:
- Frontend: http://localhost:3000
- Eureka: http://localhost:8761
- Gateway: http://localhost:8080

## Configuration notes

Each service contains an `application.properties` file with database, gateway, and RabbitMQ settings. Update them to match your local environment and avoid committing secrets to version control.

## Environment and security

- Store sensitive credentials in environment variables or local profile-specific config files
- Keep `.env` and secret files out of version control
- Avoid committing real credentials, keys, or deployment identifiers

## Development conventions

This project follows a practical service-oriented structure with a clear separation between:
- infrastructure services
- business services
- frontend presentation layer
- shared configuration and docs

## License

This project is for educational and portfolio demonstration purposes.

## Contact

For project details or collaboration inquiries, please refer to the repository owner and documentation files included in this project.

---

For deeper system design, event flow, and service logic, see `PROJECT_DOCUMENTATION.md`.
