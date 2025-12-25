# ⚡ Quick Deployment Guide (10 Minutes)

## 🎯 Recommended: Vercel (Frontend) + Render (Backend)

### Step 1: Deploy Backend to Render (5 min)

1. **Go to [Render.com](https://render.com)** → Sign up with GitHub (free)

2. **Click "New +" → "Web Service"**

3. **Connect your GitHub repository**

4. **Configure**:
   - **Name**: `hasnain-sharif-portfolio-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free

5. **Add Environment Variables** (in Render dashboard):
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   PORT=10000
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend.vercel.app (add after frontend deploys)
   ```

6. **Click "Create Web Service"** → Wait for deployment

7. **Copy your backend URL**: `https://your-backend-name.onrender.com`

---

### Step 2: Deploy Frontend to Vercel (3 min)

1. **Go to [Vercel.com](https://vercel.com)** → Sign up with GitHub (free)

2. **Click "Add New Project"**

3. **Import your GitHub repository**

4. **Configure** (auto-detected):
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Add Environment Variable**:
   ```
   VITE_API_URL=https://your-backend-name.onrender.com
   ```
   (Use the URL from Step 1)

6. **Click "Deploy"** → Wait 2-3 minutes

7. **Your site is live!** 🎉
   - Frontend URL: `https://your-project.vercel.app`
   - Backend URL: `https://your-backend-name.onrender.com`

---

### Step 3: Update Backend CORS (2 min)

1. **Go back to Render dashboard**

2. **Update Environment Variable**:
   ```
   FRONTEND_URL=https://your-project.vercel.app
   ```

3. **Redeploy** (or it will auto-update)

---

## ✅ Test Your Deployment

1. Visit your Vercel URL
2. Check if projects load (from backend)
3. Test contact form submission
4. Check email inbox for test message

---

## 🔧 Troubleshooting

### Backend not responding?
- Check Render logs for errors
- Verify environment variables are set
- Ensure PORT is set to 10000

### Frontend can't reach backend?
- Verify `VITE_API_URL` is set correctly in Vercel
- Check CORS settings in server.js
- Ensure backend URL includes `https://`

### Contact form not working?
- Check browser console for errors
- Verify backend is running (visit `/api/health`)
- Check email credentials in Render

---

## 📝 Important Notes

- **Render free tier**: Spins down after 15 min inactivity (first request takes ~30s)
- **Vercel**: Unlimited deployments, automatic HTTPS
- **Environment variables**: Never commit `.env` file to GitHub
- **Custom domain**: Add in Vercel/Render settings (free SSL)

---

## 🎉 You're Done!

Your portfolio is now live on the internet! Share your Vercel URL with the world.

**Need more details?** See `DEPLOYMENT_GUIDE.md` for comprehensive instructions.

