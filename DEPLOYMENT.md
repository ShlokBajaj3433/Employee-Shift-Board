# Employee Shift Board - Deployment Guide

## 📦 What's Been Set Up

✅ Backend `.gitignore` - Excludes build files, IDE configs, and sensitive data  
✅ Frontend `.gitignore` - Excludes node_modules and build artifacts  
✅ Environment variable configuration for both backend and frontend  
✅ Railway deployment config (`railway.json`, `nixpacks.toml`, `Procfile`)  
✅ Vercel deployment config (`vercel.json`)  
✅ Production Spring Boot profile  
✅ Comprehensive README with deployment instructions  

## 🚀 Deployment Steps

### 1️⃣ Push to GitHub

```bash
cd "C:\codes\SpringBoot\Employee Shift Board"
git init
git add .
git commit -m "Initial commit: Employee Shift Board application"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/employee-shift-board.git
git push -u origin main
```

### 2️⃣ Deploy Backend to Railway

1. Go to [railway.app](https://railway.app) and sign in
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. **Add PostgreSQL Database:**
   - Click **"+ New"** → **"Database"** → **"PostgreSQL"**
5. **Configure Backend Service:**
   - Click **"+ New"** → **"GitHub Repo"**
   - Set **Root Directory**: `employee`
   - Add environment variables:
     ```
     SPRING_PROFILES_ACTIVE=production
     DATABASE_URL=postgresql://${{Postgres.PGUSER}}:${{Postgres.PGPASSWORD}}@${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/${{Postgres.PGDATABASE}}
     DATABASE_USERNAME=${{Postgres.PGUSER}}
     DATABASE_PASSWORD=${{Postgres.PGPASSWORD}}
     JWT_SECRET=your_super_secret_jwt_key_change_this_to_random_string
     JWT_EXPIRATION=86400000
     ```
6. Click **"Deploy"** and wait for build to complete
7. Copy your backend URL (e.g., `https://your-app.up.railway.app`)

### 3️⃣ Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variable:
   ```
   VITE_API_BASE_URL=https://your-railway-backend.up.railway.app/api
   ```
   *(Replace with your Railway backend URL)*
6. Click **"Deploy"**

### 4️⃣ Update Backend CORS

After deploying frontend, update the CORS configuration in `SecurityConfig.java`:

```java
configuration.setAllowedOrigins(Arrays.asList(
    "http://localhost:3000",
    "https://your-vercel-app.vercel.app"  // Add your Vercel URL
));
```

Commit and push changes - Railway will auto-deploy.

## 🔐 Security Checklist

- [ ] Change `JWT_SECRET` to a strong random string (min 256 bits)
- [ ] Use Railway's generated PostgreSQL credentials
- [ ] Never commit `.env` files to Git
- [ ] Enable Railway's private networking for database
- [ ] Set up Railway's automatic SSL certificates

## ✅ Testing Deployment

1. Open your Vercel frontend URL
2. Login with:
   - Username: `admin` / Password: `admin123`
   - Username: `user` / Password: `user123`
3. Test creating employees and shifts

## 🛠️ Local Development

**Backend:**
```bash
cd employee
cp .env.example .env
# Edit .env with your local database credentials
mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
cp .env.example .env
# .env should have: VITE_API_BASE_URL=http://localhost:8080/api
npm install
npm run dev
```

## 📝 Environment Variables Summary

**Backend (.env):**
- `DATABASE_URL` - PostgreSQL connection string
- `DATABASE_USERNAME` - Database user
- `DATABASE_PASSWORD` - Database password
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRATION` - Token expiration time (milliseconds)
- `SERVER_PORT` - Server port (default: 8080)
- `SPRING_PROFILES_ACTIVE` - Spring profile (development/production)

**Frontend (.env):**
- `VITE_API_BASE_URL` - Backend API URL

## 🎯 Railway Features

- ✅ Automatic deployments on git push
- ✅ Free PostgreSQL database (500 MB)
- ✅ Environment variable management
- ✅ Build logs and monitoring
- ✅ Custom domains support

## 🎨 Vercel Features

- ✅ Automatic deployments on git push
- ✅ Preview deployments for PRs
- ✅ Global CDN
- ✅ Custom domains support
- ✅ Edge functions support

---

**Need Help?** Check the main README.md for API documentation and architecture details.
