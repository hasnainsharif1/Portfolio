# How to Get Gmail App Password

## ⚠️ Important
You **CANNOT** use your regular Gmail password. You need to create a special "App Password" from Google.

## Step-by-Step Instructions

### Step 1: Enable 2-Step Verification (if not already enabled)

1. Go to: https://myaccount.google.com/security
2. Look for "2-Step Verification"
3. If it says "Off", click it and follow the steps to enable it
4. You'll need your phone to verify

### Step 2: Create App Password

1. Go to: https://myaccount.google.com/apppasswords
   - If you can't access this link, you need to enable 2-Step Verification first (Step 1)

2. You'll see a page that says "App passwords"

3. Select options:
   - **App**: Choose "Mail"
   - **Device**: Choose "Other (Custom name)"
   - **Name**: Type "Portfolio Contact Form" (or any name you like)

4. Click **"Generate"** button

5. Google will show you a **16-character password** that looks like:
   ```
   abcd efgh ijkl mnop
   ```
   (4 groups of 4 letters, with spaces)

6. **COPY THIS PASSWORD IMMEDIATELY** - you won't be able to see it again!

### Step 3: Add to .env File

Open your `.env` file and paste it like this:

```env
EMAIL_USER=hasnainsharif713@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
PORT=5000
```

**Important Notes:**
- You can keep the spaces or remove them (both work)
- Use the email address that will SEND the emails (hasnainsharif713@gmail.com)
- The App Password is different from your regular password

### Step 4: Save and Restart

1. Save the `.env` file
2. Restart your server: `npm run server` or `npm run dev`
3. You should see: `📧 Email Status: ✅ CONFIGURED`

## Example

If Google gives you: `wxyz abcd efgh ijkl`

Your `.env` should look like:
```env
EMAIL_USER=hasnainsharif713@gmail.com
EMAIL_PASS=wxyz abcd efgh ijkl
PORT=5000
```

Or without spaces (both work):
```env
EMAIL_USER=hasnainsharif713@gmail.com
EMAIL_PASS=wxyzabcdefghijkl
PORT=5000
```

## Troubleshooting

### "App passwords aren't available for your account"
- You need to enable 2-Step Verification first
- Go to: https://myaccount.google.com/security
- Enable 2-Step Verification, then try again

### "Invalid login" error
- Make sure you're using the App Password (not your regular password)
- Make sure there are no extra spaces in the .env file
- Try removing spaces from the App Password

### Still not working?
Run the test: `node test-email.js` to see detailed error messages

