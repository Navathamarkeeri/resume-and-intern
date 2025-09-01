# 🚀 AI Internship Finder - Full Stack Application

A complete AI-powered internship matching platform with resume analysis and profile management.

## 📁 Project Structure

```
resume-and-intern/
├── backend/          # Node.js + Express API
├── frontend/         # React.js Frontend
├── render.yaml       # Render deployment configuration
└── README.md         # This file
```

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js**
- **MongoDB** with Mongoose
- **JWT Authentication**
- **File Upload** (Multer)
- **CORS** enabled

### Frontend
- **React.js** 18
- **React Router** for navigation
- **Modern CSS** with responsive design
- **JWT Token** management

## 🚀 Quick Start

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Internships
- `GET /api/internships` - Fetch all internships
- `POST /api/internships` - Create new internship

### Profile
- `GET /api/profile/me` - Get user profile
- `PUT /api/profile/update` - Update user profile
- `POST /api/profile/upload-resume` - Upload resume

## 🚀 Deployment

This repository is configured for **single deployment** on Render:

1. **Connect to Render** using this repository
2. **Use the `render.yaml`** configuration
3. **Set environment variables**:
   - `MONGO_URI` - MongoDB connection string
   - `REACT_APP_API_URL` - Backend URL

## 📋 Features

- ✅ User authentication (JWT)
- ✅ Profile management
- ✅ Resume upload
- ✅ Internship browsing
- ✅ Responsive design
- ✅ Modern UI/UX

## 🎯 Single Repository Benefits

- **Easier deployment** - One push deploys both
- **Better coordination** - Frontend and backend in sync
- **Simplified CI/CD** - Single pipeline
- **Easier maintenance** - All code in one place

## 🆘 Support

For deployment issues, check the `render.yaml` configuration and ensure all environment variables are set correctly.

---

**Built with ❤️ by Navatha Markeeri**
