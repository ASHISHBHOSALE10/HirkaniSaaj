# 💎 HirkaniSaaj (हिरकणी साज) - Complete Project Guide

This guide converts the deep-dive technical doc into a practical, actionable runbook for developers: how to install, configure, build, run, and troubleshoot the HirkaniSaaj microservices project locally.

Contents
- Project overview & architecture
- Ports and components
- Prerequisites
- Configuration and environment variables
- Database and RabbitMQ setup
- Build & run (backend and frontend)
- Useful commands (logs, ports, stop/restart)
- Troubleshooting
- Testing and QA
- Deployment notes & FAQs

---

## 1) Project overview
HirkaniSaaj is a multi-module Spring Boot + React microservices sample e-commerce platform. Main modules:
- eureka-server: Service registry (8761)
- api-gateway: Spring Cloud Gateway (8080)
- user-service: Users, auth (8081)
- product-service: Products & catalog (8082)
- order-service: Orders, publishes events to RabbitMQ (8083)
- payment-service: Payment simulation (8084)
- notification-service: Consumes events (RabbitMQ) and sends notifications (8085)
- jewelry-frontend: React storefront (3000)

Each backend service uses its own MySQL database (database-per-service) and registers with Eureka for discovery. RabbitMQ handles asynchronous events.

---

## 2) Ports
- Frontend: http://localhost:3000
- Eureka: http://localhost:8761
- API Gateway: http://localhost:8080
- User: http://localhost:8081
- Product: http://localhost:8082
- Order: http://localhost:8083
- Payment: http://localhost:8084
- Notification: http://localhost:8085

Actuator health endpoints: /actuator/health (if enabled)

---

## 3) Prerequisites
- Java 17+ (JDK 17 recommended; project compiled for Java 17+) — verify with `java -version`
- Maven 3.6+ (`mvn -v`)
- Node.js 18+ and npm (`node -v`, `npm -v`)
- MySQL 8.x running on localhost:3306 (or change JDBC URL)
- RabbitMQ running on localhost:5672 (default guest/guest)
- Recommended: Postman or curl for API tests

---

## 4) Configuration (what to edit)
Files: each service has src/main/resources/application.properties containing port, datasource, Eureka URL, and RabbitMQ settings.
Key properties to check:
- spring.datasource.url (JDBC URL) e.g. jdbc:mysql://localhost:3306/jewellery_users?createDatabaseIfNotExist=true
- spring.datasource.username / spring.datasource.password
- eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka/
- spring.rabbitmq.host / spring.rabbitmq.port / spring.rabbitmq.username / spring.rabbitmq.password (where applicable)

Secrets: passwords are masked in the repo. Prefer using environment variables or a local application-{profile}.properties for credentials.

---

## 5) Create databases and DB user (quick SQL)
Run the included script create-dbs-and-user.sql as root in MySQL to create databases and a user:

- SQL file: create-dbs-and-user.sql
- It creates databases: jewellery_users, jewellery_products, jewellery_orders, jewellery_payments
- It creates user 'Ash'@'localhost' with password '9ki8nrjjis'

If you prefer the username 'jewellery' change either the SQL script or the services' application.properties to match.

Example (run in MySQL shell):
1. Open MySQL as root: mysql -u root -p
2. SOURCE /path/to/create-dbs-and-user.sql

---

## 6) RabbitMQ setup
- Default guest/guest works for local development when connecting from localhost.
- If RabbitMQ uses a different username, create a user matching service config and grant permissions:
  - rabbitmqctl add_user Ash 9ki8nrjjis
  - rabbitmqctl set_permissions -p / Ash ".*" ".*" ".*"

Check management UI (if enabled): http://localhost:15672 (guest/guest)

---

## 7) Build the entire backend (recommended order)
From repository root:

1. mvn clean install -DskipTests
   - Builds all modules and creates jars in module/target/

If only changed modules need build, use `mvn -pl module-name -am package`.

---

## 8) Run services locally
There are two approaches: background (Start-Process) or foreground (java -jar). Foreground is recommended for debugging since logs stream to the terminal.

A. Foreground (each in its own terminal):
1. Start Eureka:
   cd eureka-server
   java -jar target/eureka-server-0.0.1-SNAPSHOT.jar

2. Start API Gateway:
   cd ../api-gateway
   java -jar target/api-gateway-0.0.1-SNAPSHOT.jar

3. Start services (each in separate terminal):
   cd ../user-service
   java -jar target/user-service-0.0.1-SNAPSHOT.jar

   Repeat for product-service, order-service, payment-service, notification-service.

B. Frontend:
cd jewelry-frontend
npm install
npm start

Notes:
- Start backend before frontend so the gateway and services are discoverable.
- For quick dev cycles use `mvn -DskipTests spring-boot:run` in a module to skip packaging.

---

## 9) Useful commands (Windows PowerShell examples)
- List processes referencing repo: Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'untitled' }
- Check listening ports: Get-NetTCPConnection -State Listen | Where-Object { @(8761,8080,8081,8082,8083,8084,8085,3000) -contains $_.LocalPort }
- Tail logs when running in foreground: logs appear in terminal; when started with Start-Process, check Windows Event Viewer or run in foreground instead.
- Stop a process: Stop-Process -Id <PID> -Force

---

## 10) Troubleshooting (common issues & fixes)
1. Hibernate cannot obtain JDBC connection / Hikari errors
   - Cause: wrong DB credentials, DB not running, user mismatch.
   - Fix: Ensure MySQL is running, databases exist, and application.properties credentials match the MySQL user. Run create-dbs-and-user.sql or change service properties to the intended DB user.

2. RabbitMQ connection refused
   - Cause: RabbitMQ not running or wrong credentials/host/port.
   - Fix: Start RabbitMQ, verify port 5672 listening: `Test-NetConnection -ComputerName localhost -Port 5672` or `rabbitmqctl status`.

3. API Gateway 404 on root
   - Cause: Gateway does not serve content at root; it proxies to services. Test /actuator/health or a service route.

4. Frontend not reachable (3000)
   - Cause: dev server not started or port conflict.
   - Fix: start `npm start`, check that process listens on 3000 with `Get-NetTCPConnection`.

5. JAR repackage error during Maven build (unable to rename jar)
   - Cause: existing jar is in use by a running process. Stop running jars before rebuilding.

6. Services not registering with Eureka
   - Cause: eureka.client.serviceUrl.defaultZone incorrect, network problems, or Eureka not started.
   - Fix: start Eureka first and confirm http://localhost:8761 is up.

---

## 11) Health checks & verification
- Verify Eureka UI: http://localhost:8761 shows registered instances.
- Verify each service: http://localhost:8081/actuator/health (and change port per service)
- Verify frontend: http://localhost:3000

---

## 12) Logs & debugging
- Run services in foreground for immediate logs.
- For background processes started via Start-Process, capture stdout/stderr by starting with `java -jar > logs/service.log 2>&1`.
- Grep logs for ERROR or exceptions.

---

## 13) Development tips
- Use Postman collections (not included) to exercise endpoints: register user, login, create product, place order, simulate payment.
- Seed data via SQL INSERTs for faster testing.
- Use IntelliJ or VS Code to open individual modules when debugging.

---

## 14) CI / Testing
- Unit/integration tests are standard Maven tests. Run `mvn test` for modules.
- The monorepo builds with `mvn clean install` — avoid running tests on slow machines using `-DskipTests` during iterative development.

---

## 15) Deployment notes
- For production: use an external MySQL instance, secured RabbitMQ, environment-specific configs, and containerization (Docker) or Kubernetes. Externalize secrets using Vault or environment variables.
- Replace embedded Tomcat with production-ready configuration and tune connection pools.

---

## 16) Quick reference: Example flow to get running locally
1. Start MySQL & RabbitMQ (local services)
2. Open terminal at repo root: `mvn clean install -DskipTests`
3. In separate terminals run (foreground):
   - `java -jar eureka-server/target/*.jar`
   - `java -jar api-gateway/target/*.jar`
   - `java -jar user-service/target/*.jar`
   - `java -jar product-service/target/*.jar`
   - `java -jar order-service/target/*.jar`
   - `java -jar payment-service/target/*.jar`
   - `java -jar notification-service/target/*.jar`
4. Start frontend: `cd jewelry-frontend && npm install && npm start`
5. Visit http://localhost:3000 (storefront) and confirm backend health via http://localhost:8761

---

## 17) FAQs
Q: Why do services show Hikari/connection errors even though MySQL is running?
A: Check that the service's configured DB user/password matches a MySQL user with privileges on the target DB. If using the provided SQL script, use the 'Ash' user or update application.properties to use 'jewellery' after creating that user.

Q: How to change DB credentials without committing secrets?
A: Use environment-specific application.properties (application-local.properties) or set environment variables (SPRING_DATASOURCE_USERNAME/PASSWORD) when launching.

---

If you'd like, the next actions can be:
- Add a docker-compose.yml to spin up MySQL, RabbitMQ, and all services for a reproducible dev environment.
- Add a Postman collection for smoke tests.

End of guide.
