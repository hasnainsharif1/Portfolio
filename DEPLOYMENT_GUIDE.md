# 🚀 Free Deployment Guide for Hasnain Sharif Portfolio

This guide covers multiple free hosting options for your portfolio. Choose the one that best fits your needs.

---

## 📋 Table of Contents

1. [Option 1: Vercel (Frontend) + Render (Backend) - RECOMMENDED](#option-1-vercel--render)
2. [Option 2: Netlify (Frontend) + Railway (Backend)](#option-2-netlify--railway)
3. [Option 3: Vercel Full-Stack (Frontend + API Routes)](#option-3-vercel-full-stack)
4. [Option 4: Render (Both Frontend & Backend)](#option-4-render-full-stack)
5. [Pre-Deployment Checklist](#pre-deployment-checklist)

---

## Option 1: Vercel (Frontend) + Render (Backend) ⭐ RECOMMENDED

**Why this combo?**
- ✅ Vercel: Best performance for React apps, automatic deployments
- ✅ Render: Free tier with persistent backend, easy setup
- ✅ Both have excellent free tiers

### Step 1: Deploy Backend to Render

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Go to Render.com** and sign up (free with GitHub)

3. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `hasnain-sharif-portfolio-backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `node server.js`
     - **Plan**: Free

4. **Add Environment Variables** in Render dashboard:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   PORT=10000
   NODE_ENV=production
   ```

5. **Deploy** - Render will automatically deploy your backend
   - Note your backend URL: `https://your-backend-name.onrender.com`

### Step 2: Update Frontend API Configuration

Before deploying frontend, update the API base URL:

1. **Create a `.env.production` file** in your project root:
   ```env
   VITE_API_URL=https://your-backend-name.onrender.com
   ```

2. **Update `vite.config.ts`** to use environment variable:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     server: {
       host: true,
       proxy: {
         '/api': {
           target: process.env.VITE_API_URL || 'http://localhost:5000',
           changeOrigin: true,
           secure: false,
         }
       }
     }
   });
   ```

3. **Update API calls in components** to use the environment variable:
   - In `components/Contact.tsx` and `components/Portfolio.tsx`, change:
     ```typescript
     const response = await fetch('/api/contact', {
     ```
     to:
     ```typescript
     const apiUrl = import.meta.env.VITE_API_URL || '';
     const response = await fetch(`${apiUrl}/api/contact`, {
     ```

### Step 3: Deploy Frontend to Vercel

1. **Go to Vercel.com** and sign up (free with GitHub)

2. **Import your GitHub repository**
   - Click "Add New Project"
   - Select your repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `./`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Add Environment Variable**:
   ```
   VITE_API_URL=https://your-backend-name.onrender.com
   ```

4. **Deploy** - Vercel will automatically deploy and give you a URL

5. **Custom Domain (Optional)**: Add your custom domain in Vercel settings

---

## Option 2: Netlify (Frontend) + Railway (Backend)

### Backend on Railway

1. **Sign up at Railway.app** (free tier available)

2. **Create New Project** → "Deploy from GitHub repo"

3. **Configure**:
   - **Start Command**: `node server.js`
   - **Environment Variables**: Add EMAIL_USER, EMAIL_PASS, PORT

4. **Get your Railway backend URL**

### Frontend on Netlify

1. **Sign up at Netlify.com** (free)

2. **New site from Git** → Connect GitHub repo

3. **Build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

4. **Environment variables**:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```

5. **Deploy** - Netlify will build and deploy automatically

---

## Option 3: Vercel Full-Stack (Frontend + API Routes)

Convert your Express backend to Vercel serverless functions.

### Step 1: Create API Routes Structure

1. **Create `api/` folder** in your project root

2. **Move backend logic to Vercel functions**:
   - Create `api/contact.js` for contact form
   - Create `api/projects.js` for projects
   - Create `api/health.js` for health check

3. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

4. **Deploy**:
   ```bash
   vercel
   ```

**Note**: This requires refactoring your Express app to Vercel serverless functions. More complex but keeps everything in one place.

---

## Option 4: Render (Both Frontend & Backend)

Deploy both services on Render (simpler but may have slower cold starts).

### Backend Service (Same as Option 1, Step 1)

### Frontend Service

1. **Create another Web Service** on Render
2. **Configure**:
   - **Name**: `hasnain-sharif-portfolio-frontend`
   - **Environment**: `Static Site`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

3. **Add Environment Variable**:
   ```
   VITE_API_URL=https://your-backend-name.onrender.com
   ```

4. **Deploy**

---

## Pre-Deployment Checklist

### ✅ Before Deploying

- [ ] Push all code to GitHub
- [ ] Test locally with `npm run build`
- [ ] Update API URLs in frontend code
- [ ] Set up environment variables
- [ ] Test contact form functionality
- [ ] Verify email credentials work
- [ ] Check that all images/assets load correctly

### ✅ Environment Variables Needed

**Backend (.env on hosting platform)**:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=10000 (or platform default)
NODE_ENV=production
```

**Frontend (on hosting platform)**:
```
VITE_API_URL=https://your-backend-url.com
```

### ✅ Files to Update Before Deployment

1. **Update `components/Contact.tsx`**:
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL || '';
   const response = await fetch(`${apiUrl}/api/contact`, {
   ```

2. **Update `components/Portfolio.tsx`**:
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL || '';
   const response = await fetch(`${apiUrl}/api/projects`);
   ```

3. **Update `vite.config.ts`** (for production):
   ```typescript
   export default defineConfig({
     plugins: [react()],
     server: {
       host: true,
       proxy: {
         '/api': {
           target: process.env.VITE_API_URL || 'http://localhost:5000',
           changeOrigin: true,
           secure: false,
         }
       }
     },
     build: {
       outDir: 'dist',
     }
   });
   ```

---

## 🎯 Quick Start (Recommended: Vercel + Render)

1. **Deploy Backend to Render** (5 minutes)
   - Sign up → New Web Service → Connect GitHub
   - Build: `npm install`, Start: `node server.js`
   - Add env vars: EMAIL_USER, EMAIL_PASS, PORT

2. **Update Frontend Code** (2 minutes)
   - Add environment variable support
   - Update API fetch calls

3. **Deploy Frontend to Vercel** (3 minutes)
   - Sign up → Import Project → Deploy
   - Add VITE_API_URL env var

**Total time: ~10 minutes!**

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: Backend not starting
- Check environment variables are set correctly
- Verify PORT is set (Render uses 10000 by default)
- Check build logs in Render dashboard

**Problem**: Email not sending
- Verify EMAIL_USER and EMAIL_PASS are correct
- Check Gmail App Password is valid
- Review server logs for error messages

### Frontend Issues

**Problem**: API calls failing
- Verify VITE_API_URL is set correctly
- Check CORS settings in server.js
- Ensure backend URL includes `https://`

**Problem**: Build failing
- Run `npm run build` locally first to catch errors
- Check Node.js version compatibility
- Review build logs

### CORS Issues

If you get CORS errors, update `server.js`:
```javascript
app.use(cors({
  origin: [
    'https://your-frontend-url.vercel.app',
    'https://your-custom-domain.com',
    'http://localhost:5173' // for local dev
  ],
  credentials: true
}));
```

---

## 📊 Free Tier Limits

### Vercel
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Custom domains
- ✅ Automatic HTTPS

### Render
- ✅ 750 hours/month (enough for 24/7)
- ✅ Automatic SSL
- ⚠️ Spins down after 15 min inactivity (cold start ~30s)

### Netlify
- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Custom domains

### Railway
- ✅ $5 credit/month (usually enough for small apps)
- ⚠️ Credit expires after 30 days

---

## 🎉 After Deployment

1. **Test your live site**:
   - Visit your frontend URL
   - Test contact form
   - Verify projects load
   - Check mobile responsiveness

2. **Set up custom domain** (optional):
   - Add domain in Vercel/Netlify settings
   - Update DNS records
   - SSL is automatic

3. **Monitor**:
   - Check Render/Railway logs for backend
   - Monitor Vercel/Netlify analytics
   - Set up error tracking (optional)

---

## 💡 Pro Tips

1. **Use environment variables** - Never commit secrets to GitHub
2. **Enable auto-deploy** - Push to main branch = automatic deployment
3. **Set up staging** - Use preview deployments for testing
4. **Monitor cold starts** - Render free tier has cold starts, consider upgrading if needed
5. **Backup your data** - messages.json is stored on server, consider database for production

---

## 🆘 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Railway Docs**: https://docs.railway.app

---

**Good luck with your deployment! 🚀**

