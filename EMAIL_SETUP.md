# Email Setup Instructions

## Problem
Your contact form is saving data to `messages.json` but emails are not being sent because email credentials are not configured.

## Solution: Set Up Gmail Email

### Step 1: Create a `.env` file
Create a file named `.env` in the root directory of your project (same folder as `server.js`).

### Step 2: Get Gmail App Password

**Important:** You cannot use your regular Gmail password. You need to create an "App Password".

1. **Enable 2-Step Verification** (if not already enabled):
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Create App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Select "Other (Custom name)" as the device
   - Enter name: "Portfolio Contact Form"
   - Click "Generate"
   - **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

### Step 3: Add Credentials to `.env` file

Add these lines to your `.env` file:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
PORT=5000
```

**Example:**
```env
EMAIL_USER=hasnainsharif713@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
PORT=5000
```

**Note:** Remove spaces from the app password when pasting (or keep them, nodemailer handles both).

### Step 4: Restart Your Server

After creating/updating the `.env` file:
1. Stop the server (if running)
2. Start it again: `npm run server` or `npm run dev`

### Step 5: Test

Submit a test message through your contact form. You should now receive an email at `hasnainsharif713@gmail.com` with the form data.

## Current Status

✅ Form data is being saved to `messages.json`  
❌ Emails are not being sent (running in mock mode)  
✅ Server is working correctly  

Once you add the `.env` file with credentials, emails will be sent automatically!

## Alternative: Use a Different Email Service

If you prefer not to use Gmail, you can modify `server.js` to use:
- Outlook/Hotmail
- SendGrid
- Mailgun
- AWS SES
- Or any SMTP service

Just update the `nodemailer.createTransport()` configuration in `server.js`.

