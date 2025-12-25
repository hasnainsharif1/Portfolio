# 🛠️ Local Development Setup

Guide to run your portfolio locally for development.

---

## Quick Start

### Option 1: Run Both Servers Together (Recommended)

```bash
npm run dev
```

This command runs both the backend (Express) and frontend (Vite) servers simultaneously.

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173

---

### Option 2: Run Servers Separately

**Terminal 1 - Backend:**
```bash
npm run server
```
Backend runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
npm start
```
Frontend runs on: http://localhost:5173

---

## Environment Setup

### 1. Create `.env` file (if not exists)

Create a `.env` file in the root directory:

```env
EMAIL_USER=hasnainsharif713@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=5000
NODE_ENV=development
```

**Note**: 
- Get Gmail App Password from: https://myaccount.google.com/apppasswords
- See `EMAIL_SETUP.md` for detailed instructions

### 2. Install Dependencies

```bash
npm install
```

---

## How It Works

### Development Mode

1. **Backend (Express)** runs on `http://localhost:5000`
   - Handles API requests: `/api/projects`, `/api/contact`
   - Sends emails via Nodemailer

2. **Frontend (Vite)** runs on `http://localhost:5173`
   - Uses Vite proxy to forward `/api/*` requests to backend
   - No `VITE_API_URL` needed in development (uses proxy)

3. **Vite Proxy Configuration** (in `vite.config.ts`):
   ```typescript
   proxy: {
     '/api': {
       target: 'http://localhost:5000',
       changeOrigin: true,
     }
   }
   ```

### Production Mode

- Frontend uses `VITE_API_URL` environment variable
- Points to deployed backend URL (e.g., Render, Railway)

---

## Troubleshooting

### Error: "Could not load projects from the server"

**Problem**: Backend is not running

**Solution**:
1. Make sure backend is running:
   ```bash
   npm run server
   ```
   Or use:
   ```bash
   npm run dev
   ```

2. Test backend directly:
   - Open: http://localhost:5000/api/health
   - Should return: `{"status":"ok","message":"Hasnain Sharif Portfolio Backend is running"}`

3. Check backend logs for errors

---

### Error: "Port 5000 already in use"

**Problem**: Another process is using port 5000

**Solution**:
1. **Option 1**: Change port in `.env`:
   ```env
   PORT=5001
   ```

2. **Option 2**: Kill the process using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -ti:5000 | xargs kill
   ```

---

### Error: "Email not sending"

**Problem**: Email credentials not configured

**Solution**:
1. Check `.env` file exists and has:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   ```

2. Verify Gmail App Password is correct
   - See `EMAIL_SETUP.md` for instructions

3. Test email configuration:
   ```bash
   node test-email.js
   ```

---

### Frontend can't connect to backend

**Problem**: CORS or proxy issues

**Solution**:
1. **Check backend is running**:
   - Visit: http://localhost:5000/api/health

2. **Check browser console** (F12):
   - Look for CORS errors
   - Check network tab for failed requests

3. **Verify Vite proxy**:
   - Check `vite.config.ts` has proxy configuration
   - Restart Vite dev server

4. **Clear browser cache**:
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

---

### Projects not loading

**Problem**: API endpoint not responding

**Solution**:
1. **Test backend directly**:
   ```bash
   curl http://localhost:5000/api/projects
   ```
   Or visit in browser: http://localhost:5000/api/projects

2. **Check backend logs**:
   - Look for errors in terminal where backend is running

3. **Verify server.js**:
   - Check `PROJECTS` array exists in `server.js`
   - Verify `/api/projects` route is defined

---

## Development Workflow

### 1. Start Development

```bash
npm run dev
```

This starts both servers. You should see:
- Backend: `✅ Server is listening on port 5000`
- Frontend: `Local: http://localhost:5173/`

### 2. Make Changes

- **Frontend changes**: Auto-reloads in browser
- **Backend changes**: Restart backend server (Ctrl+C, then `npm run server`)

### 3. Test Features

- Visit: http://localhost:5173
- Test contact form
- Check projects load
- Verify email sending

### 4. Build for Production

```bash
npm run build
```

Creates `dist/` folder with production build.

---

## File Structure

```
Portfolio/
├── .env                 # Environment variables (not in git)
├── server.js            # Express backend
├── components/          # React components
├── vite.config.ts       # Vite configuration (includes proxy)
├── package.json         # Dependencies and scripts
└── dist/                # Production build (generated)
```

---

## Environment Variables

### Development (`.env` file)

```env
EMAIL_USER=hasnainsharif713@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=5000
NODE_ENV=development
```

### Production (on hosting platform)

**Backend**:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=10000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**Frontend**:
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## Common Commands

```bash
# Install dependencies
npm install

# Run both servers (recommended)
npm run dev

# Run backend only
npm run server

# Run frontend only
npm start

# Build for production
npm run build

# Preview production build
npm run preview

# Test email configuration
node test-email.js
```

---

## Next Steps

1. ✅ Set up `.env` file with email credentials
2. ✅ Run `npm run dev`
3. ✅ Visit http://localhost:5173
4. ✅ Test all features
5. ✅ Ready to deploy!

---

## Need Help?

- Check backend logs in terminal
- Check browser console (F12) for errors
- Verify `.env` file is configured
- Test backend directly: http://localhost:5000/api/health

---

**Happy Coding! 🚀**

