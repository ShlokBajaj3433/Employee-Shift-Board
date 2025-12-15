# Employee Shift Board

A full-stack application for managing employee shifts with JWT authentication and role-based access control.

## 🏗️ Tech Stack

### Backend
- **Spring Boot 4.0.0** - Java REST API
- **Spring Security** - JWT Authentication
- **PostgreSQL** - Database
- **Maven** - Build tool

### Frontend
- **React 18** - UI Framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Axios** - HTTP client

## 🚀 Deployment

### Backend (Railway)

1. Create a new project on [Railway](https://railway.app)
2. Add a PostgreSQL database service
3. Add a new service from GitHub repo (select backend folder)
4. Add environment variables:
   ```
   DATABASE_URL=${PGHOST}:${PGPORT}/${PGDATABASE}
   DATABASE_USERNAME=${PGUSER}
   DATABASE_PASSWORD=${PGPASSWORD}
   JWT_SECRET=your_secure_jwt_secret_key
   JWT_EXPIRATION=86400000
   SPRING_PROFILES_ACTIVE=production
   ```
5. Deploy!

### Frontend (Vercel)

1. Import your GitHub repo to [Vercel](https://vercel.com)
2. Set root directory to `frontend`
3. Add environment variable:
   ```
   VITE_API_BASE_URL=https://your-railway-backend.up.railway.app/api
   ```
4. Deploy!

## 💻 Local Development

### Prerequisites
- Java 21+
- Node.js 18+
- PostgreSQL 14+
- Maven 3.8+

### Backend Setup

```bash
cd employee

# Copy environment file
cp .env.example .env

# Update .env with your database credentials

# Install dependencies and run
mvn clean install
mvn spring-boot:run
```

Backend runs on http://localhost:8080

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Run development server
npm run dev
```

Frontend runs on http://localhost:3000

## 🔐 Default Credentials

**Admin:**
- Username: `admin`
- Password: `admin123`

**User:**
- Username: `user`
- Password: `user123`

## 📋 API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Employees (Admin only)
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

### Shifts
- `GET /api/shifts` - Get shifts (with filters)
- `POST /api/shifts` - Create shift (Admin only)
- `DELETE /api/shifts/{id}` - Delete shift (Admin only)

## 📁 Project Structure

```
employee/                    # Backend
├── src/main/java/com/employeeboard/employee/
│   ├── controller/         # REST Controllers
│   ├── service/           # Business Logic
│   ├── repository/        # Data Access
│   ├── model/             # Entities
│   ├── dto/               # Data Transfer Objects
│   ├── security/          # Security Config
│   └── exception/         # Exception Handling
└── src/main/resources/
    └── application.properties

frontend/                   # Frontend
├── src/
│   ├── components/        # React Components
│   ├── pages/            # Page Components
│   ├── context/          # Context Providers
│   └── api/              # API Configuration
└── public/
```

## 🛠️ Environment Variables

### Backend (.env)
```env
DATABASE_URL=jdbc:postgresql://localhost:5432/employee_shift_board
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=86400000
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=development
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8080/api

<!-- Vercel frontend deployment update -->
```

