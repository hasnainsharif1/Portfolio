# 🔧 Fix: "Could not load projects from the server"

## Problem

Your frontend on Vercel can't connect to your backend because the `VITE_API_URL` environment variable is not set.

---

## ✅ Solution: Add Environment Variable in Vercel

### Step 1: Get Your Backend URL

1. Go to your **Render dashboard** (or wherever you deployed the backend)
2. Find your backend service
3. Copy the URL (should look like): `https://your-backend-name.onrender.com`

**Test it works**: Visit `https://your-backend-name.onrender.com/api/health`
- Should return: `{"status":"ok","message":"Hasnain Sharif Portfolio Backend is running"}`

---

### Step 2: Add Environment Variable in Vercel

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project

2. **Go to Settings**
   - Click on your project
   - Click **"Settings"** tab (top navigation)

3. **Add Environment Variable**
   - Click **"Environment Variables"** (left sidebar)
   - Click **"Add New"** button
   - Fill in:
     - **Key**: `VITE_API_URL`
     - **Value**: `https://your-backend-name.onrender.com` (your actual backend URL)
     - **Environments**: Select all three:
       - ✅ Production
       - ✅ Preview  
       - ✅ Development
   - Click **"Save"**

4. **Redeploy**
   - Go to **"Deployments"** tab
   - Click the **"..."** menu on the latest deployment
   - Click **"Redeploy"**
   - Or push a new commit to trigger auto-deploy

---

### Step 3: Update Backend CORS

1. **Go to Render Dashboard**
   - Select your backend service
   - Go to **"Environment"** tab

2. **Add/Update Environment Variable**
   - Add or update:
     - **Key**: `FRONTEND_URL`
     - **Value**: `https://your-project-name.vercel.app` (your Vercel URL)
   - Click **"Save Changes"**

3. **Redeploy Backend** (if needed)
   - Render will auto-redeploy, or manually trigger it

---

## ✅ Verify It Works

1. **Wait for Vercel redeploy** (2-3 minutes)

2. **Visit your Vercel URL**: `https://your-project.vercel.app`

3. **Open Browser Console** (F12):
   - Go to **Network** tab
   - Refresh the page
   - Look for request to `/api/projects`
   - Should show **200 OK** status

4. **Check Projects Section**:
   - Projects should load from backend
   - No error message

5. **Test Contact Form**:
   - Submit a test message
   - Should work without errors

---

## 🔍 Debugging Steps

### Check 1: Is Backend Running?

Visit your backend health endpoint:
```
https://your-backend-name.onrender.com/api/health
```

**Expected**: JSON response with status "ok"

**If not working**:
- Check Render logs for errors
- Verify backend is deployed
- Check environment variables in Render

---

### Check 2: Is Environment Variable Set?

1. In Vercel, go to **Settings** → **Environment Variables**
2. Verify `VITE_API_URL` exists
3. Verify value is correct (starts with `https://`)
4. Verify it's enabled for **Production** environment

---

### Check 3: Check Browser Console

1. Open your live site
2. Press **F12** to open DevTools
3. Go to **Console** tab
4. Look for errors:
   - ❌ `Failed to fetch` → CORS or network issue
   - ❌ `404 Not Found` → Wrong API URL
   - ❌ `Network Error` → Backend not reachable

4. Go to **Network** tab:
   - Refresh page
   - Look for `/api/projects` request
   - Check the **Request URL** (should be your backend URL)
   - Check **Status** (should be 200)

---

### Check 4: CORS Configuration

In your backend `server.js`, CORS should allow your Vercel domain:

```javascript
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    /\.vercel\.app$/,  // This allows all Vercel domains
  ].filter(Boolean),
  credentials: true
}));
```

**Verify**:
- `FRONTEND_URL` is set in Render with your Vercel URL
- Regex `/\.vercel\.app$/` is present (allows all Vercel subdomains)

---

## 🚨 Common Issues

### Issue 1: Environment Variable Not Applied

**Symptom**: Variable added but still not working

**Fix**:
- Make sure to **redeploy** after adding variable
- Variables are only available in new builds
- Check variable is enabled for **Production** environment

---

### Issue 2: CORS Error

**Symptom**: Browser console shows CORS error

**Fix**:
1. Update `FRONTEND_URL` in Render with exact Vercel URL
2. Verify CORS regex includes `.vercel.app`
3. Redeploy backend

---

### Issue 3: Backend Cold Start (Render Free Tier)

**Symptom**: First request takes 30+ seconds

**Fix**:
- This is normal for Render free tier
- Backend spins down after 15 min inactivity
- First request wakes it up (takes ~30s)
- Subsequent requests are fast
- Consider upgrading if needed

---

### Issue 4: Wrong Backend URL

**Symptom**: 404 errors or connection refused

**Fix**:
1. Verify backend URL in Render dashboard
2. Test backend directly: `https://your-backend.onrender.com/api/health`
3. Update `VITE_API_URL` in Vercel with correct URL
4. Make sure URL includes `https://` (not `http://`)

---

## 📝 Quick Checklist

- [ ] Backend deployed and running (test `/api/health`)
- [ ] `VITE_API_URL` added in Vercel with backend URL
- [ ] Environment variable enabled for Production
- [ ] Vercel project redeployed after adding variable
- [ ] `FRONTEND_URL` set in Render with Vercel URL
- [ ] Backend CORS allows Vercel domains
- [ ] Tested in browser console (no errors)
- [ ] Projects load successfully
- [ ] Contact form works

---

## 🎯 Still Not Working?

1. **Check Vercel Build Logs**:
   - Go to Deployments → Latest deployment
   - Check for build errors
   - Verify environment variables are shown in logs

2. **Check Render Logs**:
   - Go to Render dashboard → Your service → Logs
   - Look for errors or connection attempts

3. **Test Backend Directly**:
   ```bash
   curl https://your-backend.onrender.com/api/projects
   ```
   Should return JSON with projects

4. **Test Frontend API Call**:
   - Open browser console on your live site
   - Run:
   ```javascript
   fetch('https://your-backend.onrender.com/api/projects')
     .then(r => r.json())
     .then(console.log)
   ```
   Should return projects array

---

## ✅ Success Indicators

When everything works:
- ✅ Projects section loads with data
- ✅ No error message in UI
- ✅ Browser console shows no errors
- ✅ Network tab shows successful `/api/projects` request
- ✅ Contact form submits successfully
- ✅ Email received in inbox

---

**Need more help?** Check the deployment guides:
- `VERCEL_QUICK_START.md`
- `VERCEL_DEPLOY.md`
- `QUICK_DEPLOY.md`

