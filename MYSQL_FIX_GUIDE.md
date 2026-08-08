# MySQL Connection Fix Guide

## Problem
```
ERROR: Access denied for user 'root'@'localhost' (using password: YES)
```

## Root Cause
The MySQL `root` user either doesn't have the password 'root' set, or has a different password configured.

## Solutions

### Option 1: Reset MySQL Root Password (Windows)

1. **Stop MySQL Service:**
   ```powershell
   net stop MySQL80
   ```

2. **Start MySQL with skip-grant-tables:**
   ```powershell
   "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld" --skip-grant-tables
   ```

3. **Connect without password:**
   ```powershell
   "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql" -u root
   ```

4. **Reset password:**
   ```sql
   FLUSH PRIVILEGES;
   ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
   FLUSH PRIVILEGES;
   EXIT;
   ```

5. **Restart MySQL normally:**
   ```powershell
   net start MySQL80
   ```

### Option 2: Use MySQL Workbench (Easiest)

1. Open MySQL Workbench
2. Try connecting to localhost:3306 
3. If prompted for password, use the password from your MySQL installation
4. Once connected, run:
   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
   FLUSH PRIVILEGES;
   ```

### Option 3: Modify my.ini Configuration

1. Find MySQL config: `C:\ProgramData\MySQL\MySQL Server 8.0\my.ini`
2. Under `[mysqld]`, add:
   ```ini
   skip-grant-tables
   ```
3. Restart MySQL
4. Connect and run reset commands from Option 1
5. Remove the `skip-grant-tables` line and restart

### Option 4: Use Docker MySQL (Recommended for Development)

```powershell
# Remove local MySQL if blocking port
# Stop "MySQL80" service

# Run fresh MySQL container
docker run -d `
  --name mysql-dev `
  -e MYSQL_ROOT_PASSWORD=root `
  -p 3306:3306 `
  mysql:8.0

# Test connection
mysql -u root -proot -h 127.0.0.1 -e "SELECT VERSION();"
```

## Verify Configuration

After fixing MySQL, test with:
```powershell
mysql -u root -proot -h localhost -e "SELECT 'SUCCESS' as Status;"
```

You should see: `SUCCESS`

## Application Configuration

The applications are configured to use:
- **Host:** localhost:3306
- **Username:** root
- **Password:** (empty) - or 'root' depending on your setup
- **Driver:** com.mysql.cj.jdbc.Driver
- **Dialect:** MySQL8Dialect

Located in: `*/src/main/resources/application.properties`

## Start Services After MySQL Fix

```powershell
# Rebuild
mvn clean install

# Run Eureka (must start first)
java -jar eureka-server/target/eureka-server-0.0.1-SNAPSHOT.jar

# In separate terminal - Gateway
java -jar api-gateway/target/api-gateway-0.0.1-SNAPSHOT.jar

# In separate terminals - Data services
java -jar user-service/target/user-service-0.0.1-SNAPSHOT.jar
java -jar product-service/target/product-service-0.0.1-SNAPSHOT.jar
java -jar order-service/target/order-service-0.0.1-SNAPSHOT.jar
java -jar payment-service/target/payment-service-0.0.1-SNAPSHOT.jar
java -jar notification-service/target/notification-service-0.0.1-SNAPSHOT.jar
```

## Troubleshooting

**Still getting "Access denied"?**
- Try with no password: `mysql -u root -h localhost`
- Check MySQL is actually running: `tasklist | findstr mysqld`
- Check firewall isn't blocking port 3306

**"Can't connect to MySQL server"?**
- Ensure MySQL service is running: `net start MySQL80`
- Check port: `netstat -ano | findstr :3306`

**Port 3306 already in use?**
- Kill the process: `taskkill /PID <PID> /F`
- Or change MySQL port in `my.ini` and update application properties

## For Production

- Set a strong password instead of 'root'
- Create dedicated database users instead of using root
- Use environment variables for sensitive config
- Never commit passwords in code

