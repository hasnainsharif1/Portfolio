# Quick Email Setup Guide

## ⚠️ Problem
Your contact form saves data but emails are NOT being sent because email credentials are missing.

## ✅ Solution (3 Steps)

### Step 1: Get Gmail App Password

1. Go to: https://myaccount.google.com/apppasswords
2. If you see "App passwords aren't available", enable 2-Step Verification first:
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification
   - Then go back to App Passwords

3. Create App Password:
   - Select "Mail"
   - Select "Other (Custom name)"
   - Type: "Portfolio"
   - Click "Generate"
   - **COPY the 16-character password** (looks like: `abcd efgh ijkl mnop`)

### Step 2: Edit .env File

Open `.env` file in your project and add:

```env
EMAIL_USER=hasnainsharif713@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
PORT=5000
```

**Important:** 
- Replace `abcd efgh ijkl mnop` with your actual app password
- You can remove spaces or keep them (both work)
- Use the email that will SEND the emails (your Gmail account)

### Step 3: Restart Server

1. Stop the server (Ctrl+C)
2. Start again: `npm run server` or `npm run dev`
3. You should see: `📧 Email Status: ✅ CONFIGURED`

### Step 4: Test

1. Submit a test message through your contact form
2. Check your email at `hasnainsharif713@gmail.com`
3. You should receive the email!

## 🧪 Test Email Configuration

Run this command to test your email setup:
```bash
node test-email.js
```

This will:
- ✅ Check if credentials are set
- ✅ Test Gmail connection
- ✅ Send a test email

## ❌ Common Issues

### "Invalid login" error
- You're using your regular password instead of App Password
- Get a new App Password from the link above

### "Less secure app" error
- Use App Password (not regular password)
- App Passwords work even with 2-Step Verification

### Still not working?
1. Make sure .env file is in the project root (same folder as server.js)
2. Make sure there are NO spaces around the `=` sign
3. Restart the server after editing .env
4. Check server console for error messages

## 📝 Current Status

Run `node test-email.js` to check your current configuration.

