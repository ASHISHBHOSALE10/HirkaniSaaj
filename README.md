# 💎 HirkaniSaaj (हिरकणी साज) - Royal Jewellery E-Commerce Microservices

> **Note for Interviewers & Learners**: For a deep-dive explanation of the microservices architecture, JWT security, and detailed end-to-end workflows, please see the [**PROJECT_DOCUMENTATION.md**](./PROJECT_DOCUMENTATION.md) file.

**HirkaniSaaj** (हिरकणी साज) is an enterprise full-stack e-commerce platform built with **Spring Boot 3 / Spring Cloud** microservices and a modern **React** storefront celebrating royal Maratha & Indian Haute Joaillerie (Kolhapuri Saaj, Peshwai Thushi, Temple Gold, Solitaire Diamonds).

---

## 🏗 Architecture Overview

```text
[ React Frontend (3000) ]
          |
          v
[ API Gateway (8080) ]
          |
    -------------------------------------------------------
    |                |                   |                |
[User Service] [Product Service]   [Order Service]   [Payment Service]
  (8081)           (8082)              (8083)            (8084)
    |                |                   |                |
  [DB]             [DB]                [DB]             [DB]
                                         |                |
                                   [ RabbitMQ ] --- [Notification Service]
                                                          (8085)

[ Eureka Server (8761) ] - Service Discovery & Registry
```

---

## ⚡ Services & Ports

| Service | Port | Description |
|---|---|---|
| **eureka-server** | `8761` | Service Registration & Discovery (Netflix Eureka) |
| **api-gateway** | `8080` | Entry point, load balancing, routing, and CORS |
| **user-service** | `8081` | User registration, login (JWT), profile management |
| **product-service** | `8082` | Royal jewelry catalogue, categories, search, CRUD |
| **order-service** | `8083` | Order placement, status tracking, RabbitMQ events |
| **payment-service** | `8084` | Payment processing simulation & verification |
| **notification-service** | `8085` | Asynchronous email/SMS notification consumers |
| **jewelry-frontend** | `3000` | React luxury storefront with royal Maratha theme |

---

## 🛠 Tech Stack

- **Backend**: Java 17+, Spring Boot 3.3.x, Spring Cloud 2023.x (Eureka & Gateway)
- **Database**: MySQL 8.x (Isolated database per service)
- **Messaging**: RabbitMQ (Event-driven asynchronous messaging)
- **Security**: Stateless JSON Web Tokens (JWT) & Spring Security
- **Frontend**: React 19, Framer Motion, Lucide Icons, Vanilla CSS Design System
- **Build Tool**: Apache Maven (Multi-module project), npm

---

## 🚀 How to Run

### Prerequisites
1. **Java 17+** & **Maven 3.9+**
2. **Node.js 18+** & **npm**
3. **MySQL 8.x** running on `localhost:3306` (with databases created or auto-created)
4. **RabbitMQ** running on `localhost:5672` (default `guest/guest`)

### Quick Start Order:
```powershell
# 1. Build backend microservices
mvn clean install -DskipTests

# 2. Start Eureka Discovery Server (Port 8761)
java -jar eureka-server/target/eureka-server-0.0.1-SNAPSHOT.jar

# 3. Start API Gateway (Port 8080)
java -jar api-gateway/target/api-gateway-0.0.1-SNAPSHOT.jar

# 4. Start Microservices (Separate terminals)
java -jar user-service/target/user-service-0.0.1-SNAPSHOT.jar
java -jar product-service/target/product-service-0.0.1-SNAPSHOT.jar
java -jar order-service/target/order-service-0.0.1-SNAPSHOT.jar
java -jar payment-service/target/payment-service-0.0.1-SNAPSHOT.jar
java -jar notification-service/target/notification-service-0.0.1-SNAPSHOT.jar

# 5. Start Frontend (Port 3000)
cd jewelry-frontend
npm start
```

Visit the storefront at **http://localhost:3000**.
