# Hasnain Sharif Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Express.

## 🚀 Features

- **Modern UI/UX** - Beautiful, responsive design with smooth animations
- **Contact Form** - Functional contact form with email notifications
- **Portfolio Showcase** - Display your projects and skills
- **Express Backend** - RESTful API for contact form submissions
- **TypeScript** - Type-safe codebase
- **Vite** - Fast development and build tooling

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/hasnain-sharif-portfolio.git
cd hasnain-sharif-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your email credentials (see `EMAIL_SETUP.md` for details):
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=5000
```

## 🚀 Running the Project

### Development Mode (Frontend + Backend)
```bash
npm run dev
```
This starts both the frontend (Vite) and backend (Express) server concurrently.

### Frontend Only
```bash
npm start
```
Runs the Vite dev server on `http://localhost:5173`

### Backend Only
```bash
npm run server
```
Runs the Express server on `http://localhost:5000`

### Production Build
```bash
npm run build
```
Builds the project for production in the `dist` folder.

## 📁 Project Structure

```
hasnain-sharif-portfolio/
├── components/          # React components
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Portfolio.tsx
│   └── Services.tsx
├── server.js           # Express backend server
├── App.tsx             # Main React app
├── index.tsx           # Entry point
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## 🔧 Configuration

### Email Setup
To enable email notifications from the contact form:
1. Get a Gmail App Password (see `EMAIL_SETUP.md`)
2. Add credentials to `.env` file
3. Restart the server

### API Endpoints

- `GET /api/health` - Health check
- `GET /api/projects` - Get portfolio projects
- `POST /api/contact` - Submit contact form

## 📝 Environment Variables

Create a `.env` file with:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=5000
```

## 🧪 Testing Email Configuration

```bash
node test-email.js
```

## 📦 Technologies Used

- **Frontend:**
  - React 18
  - TypeScript
  - Vite
  - Framer Motion (animations)
  - Lucide React (icons)
  - Tailwind CSS (styling)

- **Backend:**
  - Express.js
  - Node.js
  - Nodemailer (email sending)
  - CORS

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Hasnain Sharif

## 🙏 Acknowledgments

- Built with modern web technologies
- Responsive design principles
- Best practices for React and Express
