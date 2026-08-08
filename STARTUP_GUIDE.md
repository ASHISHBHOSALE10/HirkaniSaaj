# 🚀 Jewelry E-Commerce Microservices - Startup Guide

## 📋 System Requirements

- **Java:** OpenJDK 17+ (you have Java 25.0.1) ✅
- **Maven:** 3.9+ (you have 3.9.12) ✅  
- **MySQL:** 8.0+ (installed but needs auth fix)
- **RabbitMQ:** 3.12+ (running) ✅
- **Docker:** Optional (for alternative MySQL)

## 🔧 Pre-Startup Checklist

### 1. Fix MySQL Authentication (CRITICAL)

**Error You're Seeing:**
```
Access denied for user 'root'@'localhost' (using password: YES)
```

**Quick Fix:**
- See `MYSQL_FIX_GUIDE.md` for detailed solutions
- Recommended: Open MySQL Workbench and run:
  ```sql
  ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
  FLUSH PRIVILEGES;
  ```

### 2. Verify Prerequisites

```powershell
# Check Java
java -version
# Should show: OpenJDK 25.0.1

# Check Maven  
mvn --version
# Should show: Maven 3.9.12

# Check MySQL
netstat -ano | findstr :3306
# Should show port 3306 LISTENING

# Check RabbitMQ
netstat -ano | findstr :5672
# Should show port 5672 LISTENING
```

## 📚 Application Architecture

```
Client
  ↓
[API Gateway Port 8080]
  ↓
  ├→ [User Service Port 8081]      → [MySQL DB: jewellery_users]
  ├→ [Product Service Port 8082]   → [MySQL DB: jewellery_products]
  ├→ [Order Service Port 8083]     → [MySQL DB: jewellery_orders]
  ├→ [Payment Service Port 8084]   → [MySQL DB: jewellery_payments]
  └→ [Notification Service Port 8085] ← [RabbitMQ ← Order/Payment Events]

[Eureka Server Port 8761] - Service Discovery & Registry
```

## 🚀 Startup Steps (In This Order)

### Step 1: Build Everything
```powershell
cd C:\Users\bhosa\Desktop\Ashish\p\untitled
mvn clean install -DskipTests
# Wait ~2 minutes
# Should see: BUILD SUCCESS
```

### Step 2: Start Core Infrastructure (Must start first!)

**Terminal 1 - Eureka Server:**
```powershell
cd C:\Users\bhosa\Desktop\Ashish\p\untitled
java -jar eureka-server\target\eureka-server-0.0.1-SNAPSHOT.jar
# Wait 5-10 seconds for startup
# Should see: Tomcat initialized with port 8761
```

**Terminal 2 - API Gateway:**
```powershell
cd C:\Users\bhosa\Desktop\Ashish\p\untitled
java -jar api-gateway\target\api-gateway-0.0.1-SNAPSHOT.jar
# Wait 5-10 seconds
# Should see: Tomcat initialized with port 8080
```

### Step 3: Start Data Services (After services above are ready)

**Terminal 3 - User Service:**
```powershell
cd C:\Users\bhosa\Desktop\Ashish\p\untitled
java -jar user-service\target\user-service-0.0.1-SNAPSHOT.jar
```

**Terminal 4 - Product Service:**
```powershell
cd C:\Users\bhosa\Desktop\Ashish\p\untitled
java -jar product-service\target\product-service-0.0.1-SNAPSHOT.jar
```

**Terminal 5 - Order Service:**
```powershell
cd C:\Users\bhosa\Desktop\Ashish\p\untitled
java -jar order-service\target\order-service-0.0.1-SNAPSHOT.jar
```

**Terminal 6 - Payment Service:**
```powershell
cd C:\Users\bhosa\Desktop\Ashish\p\untitled
java -jar payment-service\target\payment-service-0.0.1-SNAPSHOT.jar
```

### Step 4: Start Event Consumer

**Terminal 7 - Notification Service:**
```powershell
cd C:\Users\bhosa\Desktop\Ashish\p\untitled
java -jar notification-service\target\notification-service-0.0.1-SNAPSHOT.jar
```

## ✅ Verify All Services Are Running

```powershell
# Check if all ports are listening
netstat -ano | findstr "LISTENING" | findstr ":80"

# Should show all 7 ports:
# 8080 - API Gateway ✅
# 8081 - User Service
# 8082 - Product Service
# 8083 - Order Service
# 8084 - Payment Service
# 8085 - Notification Service
# 8761 - Eureka Server ✅
```

## 🌐 Access Applications

| Service | URL | Purpose |
|---------|-----|---------|
| **Eureka Dashboard** | http://localhost:8761 | Service Registry & Discovery |
| **API Gateway** | http://localhost:8080 | Main entry point |
| **Swagger/OpenAPI** | http://localhost:8080/swagger-ui.html | API Documentation |
| **User Service** | http://localhost:8081 | User management & JWT |
| **Product Service** | http://localhost:8082 | Product catalog |
| **Order Service** | http://localhost:8083 | Order management |
| **Payment Service** | http://localhost:8084 | Payment processing |

## 🧪 Test API Endpoints

### 1. Register User
```bash
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'
```

### 2. Login
```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'
```

### 3. Get Products
```bash
curl http://localhost:8080/api/products
```

## ❌ Troubleshooting

### Service Won't Start - MySQL Error
```
ERROR: HHH000342: Could not obtain connection to query metadata
```
**Solution:** Fix MySQL password (see MYSQL_FIX_GUIDE.md)

### Service Won't Start - Port Already in Use
```powershell
# Find process using the port
netstat -ano | findstr :8080

# Kill the process
taskkill /PID <PID> /F
```

### Service Won't Connect to Eureka
- Ensure Eureka Server started first
- Check firewall isn't blocking port 8761
- Verify eureka.client.serviceUrl.defaultZone in application.properties

### Service Won't Connect to MySQL
- Check MySQL is running: `netstat -ano | findstr :3306`
- Try: `mysql -u root -proot -h localhost`
- If fails, run password reset commands in MYSQL_FIX_GUIDE.md

### Service Won't Connect to RabbitMQ
- Check RabbitMQ container: `docker ps | grep rabbitmq`
- Restart if needed: `docker restart rabbitmq`
- Or start fresh: `docker run -d -p 5672:5672 -p 15672:15672 --name rabbitmq rabbitmq:3-management`

## 🔄 Stop All Services

```powershell
# Kill all Java processes
Get-Process java | ForEach-Object { Stop-Process -Id $_.Id -Force }

# Or use Task Manager: Ctrl+Shift+Esc → Find java.exe → End Task
```

## 📊 Monitor Services

### Check Logs
Each service will output logs to console. Look for:
```
✅ Good Sign:
   - "Tomcat initialized with port XXXX"
   - "Successfully registered with Eureka"
   - "Started XXXApplication"

❌ Bad Sign:
   - "Failed to obtain JDBC Connection"
   - "Connection refused"
   - "ERROR"
```

### Check Eureka Dashboard
Visit http://localhost:8761 and verify:
- All instances show as "UP"
- No instance in "OUT_OF_SERVICE"

## 💾 Database Notes

The following databases are created automatically on first run:
- `jewellery_users`
- `jewellery_products`
- `jewellery_orders`
- `jewellery_payments`

Tables are created automatically via Hibernate (spring.jpa.hibernate.ddl-auto=validate)

## 🔐 Security Notes

**Current Setup (Development Only):**
- JWT tokens used for auth
- RabbitMQ with default guest/guest credentials
- MySQL root user with password

**For Production:**
- Change all default passwords
- Use SSL/TLS for all connections
- Implement API rate limiting
- Add API key authentication
- Enable CORS properly
- Use environment variables for secrets

## 📝 Key Files

- `pom.xml` - Maven configuration
- `*/src/main/resources/application.properties` - Service configs
- `.logs/*.log` - Service logs
- `MYSQL_FIX_GUIDE.md` - MySQL troubleshooting

## 🆘 Support

For detailed troubleshooting:
1. Check service logs (console output)
2. Review MYSQL_FIX_GUIDE.md
3. Check firewall/antivirus isn't blocking ports
4. Verify all prerequisites are installed
5. Check Eureka dashboard at http://localhost:8761

---

**Last Updated:** 2026-07-19
**Status:** Core services running ✅
