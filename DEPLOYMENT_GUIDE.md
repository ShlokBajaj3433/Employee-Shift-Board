# Employee Shift Board - Deployment Guide

This guide provides step-by-step instructions to deploy your Employee Shift Board application to production.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Deployment (Railway/Render)](#backend-deployment)
3. [Database Deployment](#database-deployment)
4. [Frontend Deployment (Vercel/Netlify)](#frontend-deployment)
5. [Environment Configuration](#environment-configuration)
6. [Post-Deployment Steps](#post-deployment-steps)

---

## Prerequisites

- GitHub account (to push your code)
- Railway/Render account (for backend)
- Vercel/Netlify account (for frontend)
- PostgreSQL database (Railway provides this)

---

## Step 1: Prepare Your Code

### 1.1 Initialize Git Repository (if not already done)

```bash
cd "c:\codes\SpringBoot\Employee Shift Board"
git init
git add .
git commit -m "Initial commit - Employee Shift Board"
```

### 1.2 Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., `employee-shift-board`)
3. Push your code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/employee-shift-board.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Database (Railway PostgreSQL)

### Option A: Railway (Recommended)

1. Go to https://railway.app/
2. Click **"New Project"** → **"Provision PostgreSQL"**
3. Once created, click on PostgreSQL service
4. Go to **"Variables"** tab and note these values:
   - `PGHOST`
   - `PGPORT`
   - `PGDATABASE`
   - `PGUSER`
   - `PGPASSWORD`

5. Connect to database and run initialization script:
   - Use any PostgreSQL client or Railway's built-in SQL editor
   - Run the contents of `employee/database_reset.sql`

---

## Step 3: Deploy Backend (Spring Boot)

### Option A: Railway

1. Go to https://railway.app/
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your `employee-shift-board` repository
4. Railway will auto-detect the Spring Boot app
5. Set **Root Directory** to `employee`
6. Add environment variables:

```env
SPRING_DATASOURCE_URL=jdbc:postgresql://${PGHOST}:${PGPORT}/${PGDATABASE}
SPRING_DATASOURCE_USERNAME=${PGUSER}
SPRING_DATASOURCE_PASSWORD=${PGPASSWORD}
SPRING_JPA_HIBERNATE_DDL_AUTO=validate
CORS_ORIGIN=https://your-frontend-url.vercel.app
PORT=8080
```

7. Click **"Deploy"**
8. Once deployed, note your backend URL (e.g., `https://employee-shift-board-production.up.railway.app`)

### Option B: Render

1. Go to https://render.com/
2. Click **"New"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: employee-shift-board-backend
   - **Root Directory**: employee
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/emplouyee-0.0.1-SNAPSHOT.jar`
   - **Environment**: Docker or Native
5. Add environment variables (same as Railway)
6. Click **"Create Web Service"**

---

## Step 4: Deploy Frontend (React + Vite)

### Option A: Vercel (Recommended)

1. Go to https://vercel.com/
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
5. Add environment variable:

```env
VITE_API_BASE_URL=https://your-backend-url.railway.app/api
```

6. Click **"Deploy"**

### Option B: Netlify

1. Go to https://netlify.com/
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to GitHub and select your repository
4. Configure:
   - **Base directory**: frontend
   - **Build command**: `npm run build`
   - **Publish directory**: frontend/dist
5. Add environment variable:

```env
VITE_API_BASE_URL=https://your-backend-url.railway.app/api
```

6. Click **"Deploy site"**

---

## Step 5: Update Backend CORS Configuration

After deploying frontend, update your backend's CORS configuration:

1. Go to Railway/Render backend service
2. Update environment variable:

```env
CORS_ORIGIN=https://your-actual-frontend-url.vercel.app
```

3. Redeploy the backend service

---

## Step 6: Update Frontend API URL

Update the frontend to point to your production backend:

Edit `frontend/src/api/axios.js`:

```javascript
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
```

Then redeploy frontend on Vercel/Netlify.

---

## Step 7: Initialize Database with Sample Data

Run the database initialization script on your production database:

```sql
-- Connect to your Railway PostgreSQL database
-- Run the contents of employee/database_reset.sql

-- This will create:
-- - 3 sample employees (EMP001, EMP002, EMP003)
-- - 2 users: admin/admin123, user/user123
-- - 3 sample shifts
```

---

## Step 8: Test Your Deployment

1. Visit your frontend URL (e.g., `https://employee-shift-board.vercel.app`)
2. Login with:
   - **Admin**: username=`admin`, password=`admin123`
   - **User**: username=`user`, password=`user123`
3. Test all features:
   - View dashboard
   - Add/edit/delete employees
   - Assign shifts
   - Search and filter

---

## Environment Variables Summary

### Backend (Railway/Render)

```env
SPRING_DATASOURCE_URL=jdbc:postgresql://HOST:PORT/DATABASE
SPRING_DATASOURCE_USERNAME=username
SPRING_DATASOURCE_PASSWORD=password
SPRING_JPA_HIBERNATE_DDL_AUTO=validate
CORS_ORIGIN=https://your-frontend-url.vercel.app
PORT=8080
```

### Frontend (Vercel/Netlify)

```env
VITE_API_BASE_URL=https://your-backend-url.railway.app/api
```

---

## Common Issues & Solutions

### Issue 1: CORS Error
**Solution**: Make sure `CORS_ORIGIN` in backend matches your frontend URL exactly

### Issue 2: Database Connection Failed
**Solution**: Check database environment variables are correct

### Issue 3: 502 Bad Gateway
**Solution**: Backend might be starting. Wait 1-2 minutes and refresh

### Issue 4: Login Not Working
**Solution**: Make sure you ran `database_reset.sql` on production database

### Issue 5: API Calls Failing
**Solution**: Check `VITE_API_BASE_URL` is set correctly in frontend

---

## Monitoring & Logs

### Railway
- Go to your service → **Deployments** tab → Click latest deployment
- View logs in real-time

### Vercel
- Go to your project → **Deployments** tab → Click latest deployment
- View function logs and build logs

---

## Updating Your Application

### Backend Updates
1. Push changes to GitHub
2. Railway/Render will auto-deploy

### Frontend Updates
1. Push changes to GitHub
2. Vercel/Netlify will auto-deploy

---

## Production Checklist

- [ ] Database initialized with sample data
- [ ] Backend deployed and running
- [ ] Frontend deployed and accessible
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] Can login successfully
- [ ] Can create/view employees
- [ ] Can assign shifts
- [ ] No console errors in browser

---

## Security Recommendations for Production

1. **Change default passwords** - Don't use admin123/user123 in production
2. **Use strong JWT secret** - Update `application.properties` with a strong secret
3. **Enable HTTPS** - Both Railway and Vercel provide HTTPS by default
4. **Restrict CORS** - Set specific frontend URL, not "*"
5. **Use environment-specific configs** - Use `application-production.properties`

---

## Cost Estimates

- **Railway**: Free tier includes $5/month credit (enough for small apps)
- **Vercel**: Free tier for hobby projects
- **PostgreSQL on Railway**: Included in free tier

**Total: FREE** for hobby/small projects

---

## Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test backend API directly using Postman
4. Check browser console for frontend errors

---

**Deployment Date**: December 12, 2025
**Version**: 1.0.0
