# Jewellery E-commerce Microservices

This project is a complete Spring Boot 3 microservices platform for a jewellery e-commerce application.

## Architecture Overview

```text
[ Client ] -> [ API Gateway (8080) ]
                      |
      ------------------------------------------
      |           |            |               |
[User Svc]  [Product Svc] [Order Svc]    [Payment Svc]
 (8081)       (8082)        (8083)          (8084)
      |           |            |               |
    [DB]        [DB]         [DB]            [DB]
                               |               |
                         [ RabbitMQ ] --- [Notification Svc]
                                               (8085)

[ Eureka Server (8761) ] - Service Discovery
```

## Services and Ports

| Service | Port | Description |
|---------|------|-------------|
| eureka-server | 8761 | Service Registration & Discovery |
| api-gateway | 8080 | Entry point, routing, and CORS |
| user-service | 8081 | User registration, login (JWT), profile |
| product-service | 8082 | Product and category management |
| order-service | 8083 | Order placement and status management |
| payment-service | 8084 | Payment simulation and processing |
| notification-service | 8085 | Async notifications via RabbitMQ |

## Tech Stack

- **Java 17**
- **Spring Boot 3.3.x**
- **Spring Cloud 2023.x** (Gateway, Eureka)
- **MySQL** (Persistence)
- **RabbitMQ** (Messaging)
- **JWT** (Security)
- **Maven** (Build Tool)
- **Lombok** (Boilerplate reduction)

## How to Run

### Prerequisites
1. **MySQL**: Ensure MySQL is running on `localhost:3306`. Create a root user with password `root` (or update `application.properties` in each service). The databases will be created automatically.
2. **RabbitMQ**: Ensure RabbitMQ is running on `localhost:5672` with default credentials `guest/guest`.

### Steps
1. Clone the repository.
2. Build the project using Maven: `mvn clean install`
3. Start the services in the following order:
   - `eureka-server`
   - `api-gateway`
   - `user-service`
   - `product-service`
   - `order-service`
   - `payment-service`
   - `notification-service`

## API Endpoints

### User Service
- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Login and get JWT token
- `GET /api/users/{id}`: Get user details
- `GET /api/users/`: List all users (Admin)

### Product Service
- `GET /api/products/`: List all products
- `GET /api/products/{id}`: Get product by ID
- `GET /api/products/category/{categoryId}`: Filter products by category
- `POST /api/products/`: Create product (Seller/Admin)
- `PUT /api/products/{id}`: Update product
- `DELETE /api/products/{id}`: Delete product

### Order Service
- `POST /api/orders/`: Place an order
- `GET /api/orders/{id}`: Get order details
- `GET /api/orders/user/{userId}`: Get orders for a user
- `PUT /api/orders/{id}/status`: Update order status
- `DELETE /api/orders/{id}/cancel`: Cancel an order

### Payment Service
- `POST /api/payments/process`: Process payment for an order
- `GET /api/payments/{orderId}`: Get payment status for an order
