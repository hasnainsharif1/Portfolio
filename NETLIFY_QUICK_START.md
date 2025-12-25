# ⚡ Netlify Quick Start (5 Minutes)

Fastest way to deploy your portfolio on Netlify.

---

## 🎯 Recommended Setup: Netlify (Frontend) + Render (Backend)

### Step 1: Deploy Backend to Render (2 min)

1. Go to **[Render.com](https://render.com)** → Sign up with GitHub

2. **New Web Service**:
   - Connect GitHub repo
   - **Name**: `hasnain-sharif-backend`
   - **Build**: `npm install`
   - **Start**: `node server.js`
   - **Plan**: Free

3. **Add Environment Variables**:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   PORT=10000
   ```

4. **Deploy** → Copy URL: `https://your-backend.onrender.com`

---

### Step 2: Deploy Frontend to Netlify (3 min)

1. **Go to [Netlify.com](https://netlify.com)** → Sign up with GitHub

2. **Add New Site** → **Import from Git** → Select your repo

3. **Build Settings** (auto-detected):
   - ✅ Build command: `npm run build`
   - ✅ Publish directory: `dist`
   - ✅ Node version: `18`

4. **Environment Variables**:
   - Click "Show advanced" → "New variable"
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend.onrender.com` (from Step 1)

5. **Deploy site** → Wait 2 minutes

6. **Done!** 🎉 Your site: `https://your-site.netlify.app`

---

### Step 3: Update Backend CORS (1 min)

1. **Back to Render** → Environment variables
2. **Add**: `FRONTEND_URL=https://your-site.netlify.app`
3. **Redeploy** (or auto-updates)

---

## ✅ Test Your Site

1. Visit your Netlify URL
2. Check projects load
3. Test contact form
4. Verify email received

---

## 🔧 Troubleshooting

**Build fails?**
- Check Netlify build logs
- Run `npm run build` locally first
- Verify Node version is 18

**API not working?**
- Check `VITE_API_URL` is set correctly
- Verify backend is running
- Check browser console for errors

**CORS errors?**
- Update `FRONTEND_URL` in Render
- Ensure backend URL includes `https://`

---

## 📝 Files Created

- ✅ `netlify.toml` - Netlify configuration (already done!)
- ✅ `NETLIFY_DEPLOY.md` - Full detailed guide

---

## 🎉 You're Live!

Your portfolio is now on Netlify! Share: `https://your-site.netlify.app`

**Need more details?** See `NETLIFY_DEPLOY.md`

