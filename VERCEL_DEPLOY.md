# 🚀 Complete Vercel Deployment Guide

Comprehensive guide to deploy your portfolio on Vercel (free tier).

---

## 📋 Table of Contents

1. [Option 1: Vercel Frontend + Render Backend (Recommended)](#option-1-vercel--render)
2. [Option 2: Vercel Full-Stack (Frontend + Serverless Functions)](#option-2-vercel-full-stack)
3. [Vercel Configuration](#vercel-configuration)
4. [Custom Domain Setup](#custom-domain)
5. [Advanced Features](#advanced-features)

---

## Option 1: Vercel Frontend + Render Backend ⭐ RECOMMENDED

This is the easiest and most reliable approach.

### Step 1: Deploy Backend to Render

1. **Go to [Render.com](https://render.com)**
   - Sign up with GitHub (free)
   - Verify your email

2. **Create New Web Service**:
   - Click "New +" button → "Web Service"
   - Connect your GitHub account
   - Select your repository

3. **Configure Service**:
   - **Name**: `hasnain-sharif-portfolio-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `./` (leave empty)
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free

4. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable":
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   PORT=10000
   NODE_ENV=production
   ```
   (Add `FRONTEND_URL` after frontend deploys)

5. **Create Web Service**:
   - Click "Create Web Service"
   - Wait 3-5 minutes for first deployment
   - Copy your backend URL: `https://your-backend-name.onrender.com`

6. **Test Backend**:
   - Visit: `https://your-backend-name.onrender.com/api/health`
   - Should return: `{"status":"ok","message":"Hasnain Sharif Portfolio Backend is running"}`

---

### Step 2: Deploy Frontend to Vercel

1. **Go to [Vercel.com](https://vercel.com)**
   - Sign up with GitHub (free)
   - Authorize Vercel to access your repositories

2. **Import Project**:
   - Click "Add New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**:
   Vercel auto-detects Vite projects, but verify:
   - **Framework Preset**: `Vite` ✅
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` ✅
   - **Output Directory**: `dist` ✅
   - **Install Command**: `npm install` ✅

4. **Add Environment Variables**:
   - Click "Environment Variables"
   - Click "Add" → Add:
     - **Key**: `VITE_API_URL`
     - **Value**: `https://your-backend-name.onrender.com`
     - **Environments**: Select all (Production, Preview, Development)
   - Click "Save"

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Watch the build logs in real-time
   - Build completes → Your site is live! 🎉

6. **Get Your URL**:
   - Vercel provides: `https://your-project-name.vercel.app`
   - This is your live portfolio URL!

---

### Step 3: Update Backend CORS

1. **Go back to Render dashboard**

2. **Update Environment Variables**:
   - Add new variable:
     - **Key**: `FRONTEND_URL`
     - **Value**: `https://your-project-name.vercel.app`
   - Click "Save Changes"

3. **Redeploy** (or auto-updates):
   - Render will automatically redeploy
   - Or click "Manual Deploy" → "Deploy latest commit"

---

### Step 4: Verify Everything Works

1. **Visit your Vercel URL**

2. **Test Features**:
   - ✅ Homepage loads
   - ✅ Navigation works
   - ✅ Projects section loads (from backend)
   - ✅ Contact form submits
   - ✅ Check email for test message

3. **Check Browser Console** (F12):
   - No errors should appear
   - API calls should succeed

---

## Option 2: Vercel Full-Stack (Frontend + Serverless Functions)

Deploy everything on Vercel using serverless functions. **More complex but keeps everything in one place.**

### Step 1: Convert Express Backend to Vercel Functions

1. **Create `api/` directory** in project root:
   ```bash
   mkdir api
   ```

2. **Create `api/contact.js`**:
   ```javascript
   import nodemailer from 'nodemailer';

   export default async function handler(req, res) {
     // Only allow POST
     if (req.method !== 'POST') {
       return res.status(405).json({ error: 'Method not allowed' });
     }

     const { name, email, subject, message } = req.body;

     // Validate
     if (!name || !email || !message) {
       return res.status(400).json({ error: 'Missing required fields' });
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

       return res.status(200).json({ success: true, message: 'Email sent!' });
     } catch (error) {
       console.error('Email error:', error);
       return res.status(500).json({ error: 'Failed to send email' });
     }
   }
   ```

3. **Create `api/projects.js`**:
   ```javascript
   // Copy PROJECTS array from server.js
   const PROJECTS = [
     {
       id: 'p1',
       title: 'FYP - Skill Exchange Platform',
       // ... your projects
     },
     // ... rest
   ];

   export default async function handler(req, res) {
     return res.status(200).json(PROJECTS);
   }
   ```

4. **Update frontend API calls**:
   - Change `/api/contact` to `/api/contact` (Vercel routes automatically)
   - Change `/api/projects` to `/api/projects`

5. **Update `vercel.json`** (if needed):
   ```json
   {
     "functions": {
       "api/*.js": {
         "runtime": "nodejs18.x"
       }
     }
   }
   ```

6. **Add Environment Variables in Vercel**:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   ```

**Note**: This requires refactoring. Option 1 is much easier and recommended.

---

## Vercel Configuration

The `vercel.json` file is already created with optimal settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

This handles:
- ✅ SPA routing (all routes → index.html)
- ✅ Asset caching (1 year for static assets)
- ✅ Build configuration
- ✅ Framework detection

---

## Custom Domain Setup

### Step 1: Add Domain in Vercel

1. **Go to Project Settings** → **Domains**

2. **Add Domain**:
   - Enter your domain (e.g., `hasnainsharif.com`)
   - Click "Add"

3. **Configure DNS**:
   - Vercel shows DNS records to add
   - You'll see something like:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

### Step 2: Update DNS Records

1. **Go to your domain registrar** (GoDaddy, Namecheap, etc.)

2. **Find DNS Management**:
   - Usually in "DNS Settings" or "Domain Management"

3. **Add Records**:
   - Add the A record for root domain
   - Add the CNAME record for www subdomain
   - Save changes

4. **Wait for Propagation**:
   - Usually 5-60 minutes
   - Can check with: `nslookup yourdomain.com`

### Step 3: SSL Certificate

- ✅ **Automatic**: Vercel provisions SSL automatically
- ✅ **Free**: No cost for SSL certificates
- ✅ **Auto-renewal**: Certificates renew automatically
- ✅ **HTTPS**: Your site will use HTTPS automatically

---

## Advanced Features

### 1. Preview Deployments

**What it is**: Every pull request gets a preview URL

**How it works**:
- Create a PR → Vercel automatically creates preview
- Get unique URL: `https://your-project-git-branch.vercel.app`
- Test changes before merging
- Share with team for review

**Enable**: Automatic, no configuration needed!

### 2. Branch Deployments

**What it is**: Deploy different branches

**How to use**:
1. Go to Project Settings → Git
2. Configure branch deployments
3. Each branch gets its own URL

**Use cases**:
- `main` → Production
- `develop` → Staging
- `feature/*` → Feature previews

### 3. Environment Variables

**Types**:
- **Production**: Live site
- **Preview**: PR previews
- **Development**: Local dev (via Vercel CLI)

**Best Practices**:
- Use different values for each environment
- Never commit secrets
- Use Vercel dashboard for sensitive data

### 4. Analytics

**Vercel Analytics** (included in free tier):
- Page views
- Unique visitors
- Performance metrics
- Real-time data

**Enable**:
1. Go to Project Settings → Analytics
2. Enable "Web Analytics"
3. View in dashboard

### 5. Speed Insights

**What it is**: Real user performance metrics

**Enable**:
1. Install: `npm install @vercel/speed-insights`
2. Add to your app:
   ```typescript
   import { SpeedInsights } from '@vercel/speed-insights/react';
   
   function App() {
     return (
       <>
         <YourApp />
         <SpeedInsights />
       </>
     );
   }
   ```

---

## Environment Variables Setup

### In Vercel Dashboard:

1. **Go to Project Settings** → **Environment Variables**

2. **Add Variables**:

**For Frontend (Option 1)**:
```
VITE_API_URL=https://your-backend-name.onrender.com
```

**For Full-Stack (Option 2)**:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

3. **Select Environments**:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

4. **Save** → Redeploy if needed

---

## Testing Your Deployment

### 1. Basic Checks

- [ ] Homepage loads
- [ ] All sections visible
- [ ] Navigation works
- [ ] Mobile responsive

### 2. Backend Integration

- [ ] Projects load from backend
- [ ] Contact form submits
- [ ] Email received
- [ ] No console errors

### 3. Performance

- [ ] Fast page load
- [ ] Images optimized
- [ ] Smooth animations
- [ ] Good Lighthouse score

### 4. Cross-Browser

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## Troubleshooting

### Build Fails

**Problem**: Build command fails
- **Solution**: 
  - Check Vercel build logs
  - Run `npm run build` locally
  - Verify Node version (use 18+)
  - Check for TypeScript errors

**Problem**: Dependencies not found
- **Solution**: 
  - Verify `package.json` has all dependencies
  - Check `package-lock.json` is committed
  - Clear build cache in Vercel

### Environment Variables

**Problem**: Variables not working
- **Solution**: 
  - Must start with `VITE_` for Vite
  - Redeploy after adding variables
  - Check variable is in correct environment
  - Verify no typos in variable name

### API Issues

**Problem**: CORS errors
- **Solution**: 
  - Update backend CORS with Vercel URL
  - Check `VITE_API_URL` is set correctly
  - Ensure backend URL uses `https://`

**Problem**: 404 on API routes
- **Solution**: 
  - Verify backend is running
  - Test backend URL directly
  - Check environment variable value
  - Look at network tab in browser

### Routing Issues

**Problem**: 404 on refresh
- **Solution**: 
  - `vercel.json` handles this
  - Verify rewrite rule exists
  - Check build output has `index.html`

---

## Vercel Free Tier Limits

✅ **What's Free**:
- Unlimited deployments
- 100 GB bandwidth/month
- 100 GB-hours serverless function execution
- Custom domains
- Automatic HTTPS/SSL
- Preview deployments
- Analytics (basic)
- Team collaboration

⚠️ **Limitations**:
- Bandwidth: 100 GB/month (plenty for portfolio)
- Function execution: 100 GB-hours/month (more than enough)
- Build minutes: Unlimited (unlike some platforms)

---

## Quick Deploy Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed to Render (if using Option 1)
- [ ] Backend URL copied
- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Environment variables added
- [ ] Build settings verified
- [ ] Site deployed successfully
- [ ] Frontend URL tested
- [ ] Backend CORS updated
- [ ] Contact form tested
- [ ] Projects loading correctly
- [ ] Custom domain added (optional)

---

## 🎉 You're Live!

Your portfolio is now deployed on Vercel! Share: `https://your-project-name.vercel.app`

**Need help?** Check Vercel docs: https://vercel.com/docs

---

## Next Steps

1. ✅ Test all features
2. ✅ Add custom domain
3. ✅ Enable analytics
4. ✅ Set up preview deployments
5. ✅ Share your portfolio!

---

## 💡 Pro Tips

1. **Automatic Deployments**: Every push = auto-deploy (no manual steps!)
2. **Preview URLs**: Share PR previews with clients/team
3. **Rollback**: Easy rollback to previous deployments
4. **Monitoring**: Built-in error tracking and analytics
5. **Performance**: Vercel Edge Network = fast global CDN

---

**Happy Deploying! 🚀**

