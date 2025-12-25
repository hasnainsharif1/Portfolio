// Test script to verify email configuration
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

console.log('\n📧 Email Configuration Test\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

// Check if environment variables are loaded
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

console.log(`EMAIL_USER: ${emailUser ? '✅ Set (' + emailUser + ')' : '❌ NOT SET'}`);
console.log(`EMAIL_PASS: ${emailPass ? '✅ Set (' + '*'.repeat(emailPass.length) + ')' : '❌ NOT SET'}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (!emailUser || !emailPass) {
  console.log('❌ Email credentials are missing!');
  console.log('\nTo fix this:');
  console.log('1. Open the .env file in your project root');
  console.log('2. Add your Gmail credentials:');
  console.log('   EMAIL_USER=your-email@gmail.com');
  console.log('   EMAIL_PASS=your-app-password');
  console.log('\nSee EMAIL_SETUP.md for detailed instructions.\n');
  process.exit(1);
}

// Test email connection
console.log('Testing Gmail connection...\n');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Connection failed!');
    console.log('\nError details:');
    console.log(error.message);
    
    if (error.message.includes('Invalid login')) {
      console.log('\n💡 Common issues:');
      console.log('   - Wrong email or password');
      console.log('   - Using regular password instead of App Password');
      console.log('   - 2-Step Verification not enabled');
      console.log('   - App Password not created correctly');
    } else if (error.message.includes('Less secure app')) {
      console.log('\n💡 Enable "Less secure app access" or use App Password');
    }
    console.log('\nSee EMAIL_SETUP.md for help.\n');
    process.exit(1);
  } else {
    console.log('✅ Gmail connection successful!');
    console.log('\nSending test email...\n');
    
    const mailOptions = {
      from: `"Portfolio Test" <${emailUser}>`,
      to: 'hasnainsharif713@gmail.com',
      subject: 'Test Email from Portfolio',
      text: 'This is a test email from your portfolio contact form setup.',
      html: '<p>This is a <strong>test email</strong> from your portfolio contact form setup.</p>',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('❌ Failed to send test email!');
        console.log('Error:', error.message);
        process.exit(1);
      } else {
        console.log('✅ Test email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('\nCheck your inbox at hasnainsharif713@gmail.com');
        console.log('If you received the email, your setup is working correctly!\n');
        process.exit(0);
      }
    });
  }
});

