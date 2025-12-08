# Employee Shift Board - Backend

A professional Spring Boot REST API for managing employee shifts with JWT authentication.

## 🏗️ Project Structure (Industry Standard)

```
com.employeeboard.employee
├── controller/          # REST Controllers (API endpoints)
│   ├── AuthController.java
│   ├── EmployeeController.java
│   └── ShiftController.java
├── service/            # Business Logic Layer
│   ├── AuthService.java
│   ├── UserService.java
│   ├── EmployeeService.java
│   └── ShiftService.java
├── repository/         # Data Access Layer (JPA Repositories)
│   ├── UserRepository.java
│   ├── EmployeeRepository.java
│   └── ShiftRepository.java
├── model/             # Entity Classes (Database Models)
│   ├── User.java
│   ├── Employee.java
│   └── Shift.java
├── dto/               # Data Transfer Objects
│   ├── LoginRequest.java
│   ├── AuthResponse.java
│   └── ShiftRequest.java
├── security/          # Security Configuration
│   ├── SecurityConfig.java
│   ├── JwtUtil.java
│   ├── JwtAuthenticationFilter.java
│   └── CustomUserDetailsService.java
├── exception/         # Exception Handling
│   └── GlobalExceptionHandler.java
├── config/            # Application Configuration
│   └── DataSeeder.java
└── EmplouyeeApplication.java  # Main Application
```

## 🚀 Features

- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - Admin and User roles
- **RESTful API** - Standard REST endpoints
- **Data Validation** - Input validation with custom error messages
- **Exception Handling** - Centralized error handling
- **Database Seeding** - Auto-create default users on startup

## 📋 API Endpoints

### Authentication
- `POST /api/auth/login` - User login (returns JWT token)

### Employees (Admin Only)
- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

### Shifts
- `POST /api/shifts` - Create shift (Admin only)
- `GET /api/shifts?employee={id}&date={date}` - Get shifts with filters
- `DELETE /api/shifts/{id}` - Delete shift (Admin only)

## 🔐 Default Users

The application automatically creates two users on startup:

**Admin User:**
- Username: `admin`
- Password: `admin123`
- Role: `ADMIN`

**Regular User:**
- Username: `user`
- Password: `user123`
- Role: `USER`

## 🛠️ Technologies

- **Spring Boot 4.0.0** - Framework
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - Database ORM
- **PostgreSQL** - Database
- **JWT (jjwt)** - Token generation
- **Hibernate Validator** - Input validation
- **Maven** - Build tool

## ⚙️ Configuration

Update `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/employee_shift_db
spring.datasource.username=postgres
spring.datasource.password=your_password

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT
jwt.secret=your_secret_key_here
jwt.expiration=86400000
```

## 🏃 Running the Application

```bash
# Navigate to project directory
cd employee

# Run with Maven
mvn spring-boot:run

# Or build and run JAR
mvn clean package
java -jar target/emplouyee-0.0.1-SNAPSHOT.jar
```

The application will start on `http://localhost:8080`

## 📝 Testing

```bash
# Run all tests
mvn test

# Run with coverage
mvn clean test jacoco:report
```

## 🔍 Example API Calls

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Get Employees (with JWT)
```bash
curl -X GET http://localhost:8080/api/employees \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create Shift
```bash
curl -X POST http://localhost:8080/api/shifts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"employeeId":1,"date":"2025-12-10","shiftType":"MORNING"}'
```

## 📦 Database Schema

### users
- id (Primary Key)
- username (Unique)
- password (BCrypt hashed)
- role (ADMIN/USER)

### employees
- id (Primary Key)
- name
- email
- phone

### shifts
- id (Primary Key)
- employee_id (Foreign Key)
- date
- shift_type

## 🎯 Best Practices Implemented

 **Layered Architecture** - Separation of concerns (Controller → Service → Repository)  
 **DTO Pattern** - Request/Response objects separate from entities  
 **Repository Pattern** - Data access abstraction  
 **Service Layer** - Business logic isolation  
 **Exception Handling** - Centralized error management  
 **Security** - JWT + Role-based access control  
 **Validation** - Input validation with meaningful error messages  
 **Code Organization** - Standard package structure  
 **CORS Support** - Cross-origin resource sharing enabled  
 **Clean Code** - Following Java naming conventions

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security)
- [JWT.io](https://jwt.io/)
