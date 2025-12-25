# 🚀 Netlify Deployment Guide

Complete guide to deploy your portfolio on Netlify (free tier).

---

## 📋 Table of Contents

1. [Option 1: Netlify Frontend + Render Backend (Recommended)](#option-1-netlify--render)
2. [Option 2: Netlify Full-Stack (Frontend + Functions)](#option-2-netlify-full-stack)
3. [Netlify Configuration Files](#netlify-configuration)

---

## Option 1: Netlify Frontend + Render Backend ⭐ RECOMMENDED

This is the easiest approach - deploy frontend on Netlify and backend on Render.

### Step 1: Deploy Backend to Render

1. **Go to [Render.com](https://render.com)** → Sign up with GitHub (free)

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `hasnain-sharif-portfolio-backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `node server.js`
     - **Plan**: Free

3. **Add Environment Variables**:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   PORT=10000
   NODE_ENV=production
   FRONTEND_URL=https://your-site.netlify.app (update after frontend deploys)
   ```

4. **Deploy** → Copy your backend URL: `https://your-backend-name.onrender.com`

---

### Step 2: Deploy Frontend to Netlify

1. **Go to [Netlify.com](https://netlify.com)** → Sign up with GitHub (free)

2. **Add New Site**:
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

3. **Configure Build Settings**:
   - **Base directory**: `./` (leave empty)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18` (or latest LTS)

4. **Add Environment Variables**:
   - Go to Site settings → Environment variables
   - Add:
     ```
     VITE_API_URL=https://your-backend-name.onrender.com
     ```
     (Use the URL from Step 1)

5. **Deploy**:
   - Click "Deploy site"
   - Wait 2-3 minutes for build to complete
   - Your site is live! 🎉

6. **Get your Netlify URL**: `https://your-site-name.netlify.app`

---

### Step 3: Update Backend CORS

1. **Go back to Render dashboard**

2. **Update Environment Variable**:
   ```
   FRONTEND_URL=https://your-site-name.netlify.app
   ```

3. **Redeploy** (or it will auto-update)

---

### Step 4: Configure Netlify (Optional)

1. **Custom Domain** (if you have one):
   - Go to Site settings → Domain management
   - Add your custom domain
   - Netlify will provide DNS instructions
   - SSL is automatic and free

2. **Form Handling** (if needed):
   - Netlify has built-in form handling
   - But your Express backend handles forms, so this isn't needed

3. **Redirects** (for SPA routing):
   - Already configured in `netlify.toml` (see below)

---

## Option 2: Netlify Full-Stack (Frontend + Functions)

Deploy everything on Netlify using serverless functions. **More complex but keeps everything in one place.**

### Step 1: Convert Express Backend to Netlify Functions

1. **Create `netlify/functions/` directory**:
   ```bash
   mkdir -p netlify/functions
   ```

2. **Create `netlify/functions/contact.js`**:
   ```javascript
   const nodemailer = require('nodemailer');

   exports.handler = async (event, context) => {
     // Only allow POST
     if (event.httpMethod !== 'POST') {
       return {
         statusCode: 405,
         body: JSON.stringify({ error: 'Method not allowed' })
       };
     }

     const { name, email, subject, message } = JSON.parse(event.body);

     // Validate
     if (!name || !email || !message) {
       return {
         statusCode: 400,
         body: JSON.stringify({ error: 'Missing required fields' })
       };
     }

     // Send email
     const transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASS,
       },
     });

     try {
       await transporter.sendMail({
         from: `"${name}" <${process.env.EMAIL_USER}>`,
         replyTo: email,
         to: 'hasnainsharif713@gmail.com',
         subject: `Portfolio Contact: ${subject || 'No Subject'}`,
         text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
       });

       return {
         statusCode: 200,
         body: JSON.stringify({ success: true, message: 'Email sent!' })
       };
     } catch (error) {
       return {
         statusCode: 500,
         body: JSON.stringify({ error: 'Failed to send email' })
       };
     }
   };
   ```

3. **Create `netlify/functions/projects.js`**:
   ```javascript
   const PROJECTS = [
     {
       id: 'p1',
       title: 'FYP - Skill Exchange Platform',
       // ... your projects data
     },
     // ... rest of projects
   ];

   exports.handler = async (event, context) => {
     return {
       statusCode: 200,
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(PROJECTS)
     };
   };
   ```

4. **Update `package.json`** to include Netlify CLI:
   ```json
   {
     "scripts": {
       "netlify:dev": "netlify dev"
     },
     "devDependencies": {
       "netlify-cli": "^17.0.0"
     }
   }
   ```

5. **Update frontend API calls**:
   - Change `/api/contact` to `/api/contact` (Netlify automatically routes to functions)
   - Change `/api/projects` to `/api/projects`

### Step 2: Deploy to Netlify

1. **Push code to GitHub**

2. **Deploy on Netlify**:
   - Import project
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Add Environment Variables**:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   VITE_API_URL= (leave empty, functions are at /api/)
   ```

4. **Deploy** → Done!

**Note**: This approach requires refactoring your Express app. Option 1 is much easier.

---

## Netlify Configuration

I've created `netlify.toml` for you with optimal settings:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

This file handles:
- ✅ SPA routing (redirects all routes to index.html)
- ✅ Asset caching
- ✅ Build configuration

---

## Environment Variables Setup

### In Netlify Dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add these variables:

**For Frontend (Option 1)**:
```
VITE_API_URL=https://your-backend-name.onrender.com
```

**For Full-Stack (Option 2)**:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

---

## Testing Your Deployment

1. **Visit your Netlify URL**: `https://your-site.netlify.app`

2. **Test Features**:
   - ✅ Homepage loads
   - ✅ Projects section loads (from backend)
   - ✅ Contact form submits successfully
   - ✅ Email received in inbox

3. **Check Browser Console**:
   - Open DevTools (F12)
   - Look for any errors
   - Verify API calls are going to correct URL

---

## Custom Domain Setup

1. **In Netlify Dashboard**:
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter your domain (e.g., `hasnainsharif.com`)

2. **Configure DNS**:
   - Netlify will show you DNS records to add
   - Add them in your domain registrar (GoDaddy, Namecheap, etc.)
   - Wait for DNS propagation (5-60 minutes)

3. **SSL Certificate**:
   - Netlify automatically provisions SSL
   - HTTPS is enabled automatically
   - No additional configuration needed

---

## Netlify Features You Can Use

### 1. **Deploy Previews**
- Every pull request gets a preview URL
- Test changes before merging
- Automatic and free

### 2. **Branch Deploys**
- Deploy different branches
- Test staging environment
- Useful for development

### 3. **Form Handling** (if you switch)
- Netlify has built-in form handling
- No backend needed for simple forms
- But your Express backend works fine

### 4. **Analytics** (optional, paid)
- Track visitors
- Page views
- Performance metrics

---

## Troubleshooting

### Build Fails

**Problem**: Build command fails
- **Solution**: Check build logs in Netlify dashboard
- Verify Node version (use 18 or latest LTS)
- Run `npm run build` locally first to catch errors

**Problem**: Environment variables not working
- **Solution**: 
  - Check variable names start with `VITE_` for frontend
  - Redeploy after adding variables
  - Clear build cache if needed

### API Calls Fail

**Problem**: CORS errors
- **Solution**: 
  - Verify backend CORS includes your Netlify URL
  - Check `VITE_API_URL` is set correctly
  - Ensure backend URL uses `https://`

**Problem**: 404 on API routes
- **Solution**: 
  - Verify backend is running (check Render dashboard)
  - Test backend URL directly: `https://your-backend.onrender.com/api/health`
  - Check environment variable is set

### Routing Issues

**Problem**: 404 on page refresh
- **Solution**: 
  - `netlify.toml` should handle this
  - Verify redirect rule is present
  - Check build output includes `index.html`

---

## Netlify Free Tier Limits

✅ **What's Free**:
- 100 GB bandwidth/month
- 300 build minutes/month
- Unlimited sites
- Custom domains
- Automatic HTTPS/SSL
- Deploy previews
- Form submissions (100/month)

⚠️ **Limitations**:
- Build minutes: 300/month (usually enough)
- Bandwidth: 100 GB/month (plenty for portfolio)
- Form submissions: 100/month (your backend handles this, so unlimited)

---

## Quick Deploy Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed to Render (if using Option 1)
- [ ] Backend URL copied
- [ ] Netlify site created
- [ ] Environment variables added
- [ ] Build settings configured
- [ ] Site deployed successfully
- [ ] Frontend URL tested
- [ ] Backend CORS updated with Netlify URL
- [ ] Contact form tested
- [ ] Projects loading correctly
- [ ] Custom domain added (optional)

---

## 🎉 You're Live!

Your portfolio is now deployed on Netlify! Share your URL: `https://your-site.netlify.app`

**Need help?** Check Netlify docs: https://docs.netlify.com

---

## Next Steps

1. ✅ Test all features
2. ✅ Add custom domain (optional)
3. ✅ Set up analytics (optional)
4. ✅ Share your portfolio!

