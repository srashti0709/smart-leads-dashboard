# 🚀 Smart Leads Dashboard

A full-stack MERN application for managing and tracking leads efficiently with authentication, role-based access, and a clean dashboard UI.

---

## 🌐 Live Links

- 🔗 Frontend: https://your-vercel-url.vercel.app
- 🔗 Backend API: https://smart-leads-dashboard-dfxv.onrender.com/api

---

## ⚙️ Tech Stack

### Frontend:
- React (Vite)
- TypeScript
- Axios
- Tailwind CSS / CSS Modules (if used)

### Backend:
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- CORS enabled API

### Deployment:
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📁 Project Structure
smart-leads-dashboard/
│
├── frontend/                      # React + Vite App
│   ├── dist/                      # build output (auto-generated)
│   ├── public/
│   ├── src/
│   │   ├── api/                  # axios / API calls
│   │   ├── assets/               # images, icons
│   │   ├── components/           # reusable UI components
│   │   ├── context/              # global state (auth, etc.)
│   │   ├── hooks/               # custom hooks
│   │   ├── pages/               # route pages (Login, Dashboard, etc.)
│   │   ├── routes/              # route definitions
│   │   ├── types/               # TypeScript types/interfaces
│   │   ├── utils/               # helper functions
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── App.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── .env
│
├── backend/                      # Node + Express API
│   ├── dist/                     # compiled TS output
│   ├── src/
│   │   ├── controllers/         # business logic
│   │   ├── middleware/          # auth, error handling
│   │   ├── models/              # MongoDB schemas
│   │   ├── routes/              # API routes
│   │   ├── utils/               # helpers (JWT, etc.)
│   │   ├── app.ts               # express app setup
│   │   └── server.ts            # entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── .env
│
├── docker-compose.yml
├── .gitignore
└── README.md

---

## 🚀 Features

- 🔐 User authentication (Login/Register)
- 👤 Role-based access (Admin/User)
- 📊 Lead management dashboard
- ➕ Add, update, delete leads
- 🔍 Filter & search leads
- 🌐 REST API integration
- ☁️ Cloud database (MongoDB Atlas)

---

## 🛠️ Setup Instructions

### 1. Clone repo
```bash
git clone https://github.com/your-username/smart-leads-dashboard.git
cd smart-leads-dashboard
```
### 2. Backend setup
cd backend
npm install
npm run dev

Create .env file:

MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
PORT=5000
3. Frontend setup
cd frontend
npm install
npm run dev

Create .env file:

VITE_API_URL=https://smart-leads-dashboard-dfxv.onrender.com/api
🔐 Environment Variables
Variable	Description
MONGO_URI	MongoDB connection URL
JWT_SECRET	Secret key for auth


📦 API Endpoints
Method	Endpoint	Description
POST	/api/auth/login	User login
POST	/api/auth/register	User register
GET	/api/leads	Get all leads
POST	/api/leads	Create new lead
PUT	/api/leads/:id	Update lead
DELETE	/api/leads/:id	Delete lead

🧠 Future Improvements
Drag & drop pipeline
Email automation
Analytics dashboard
AI-based lead scoring

👨‍💻 Author

Built by Srashti Shakya

---

# 📌 WHERE YOU NEED TO CHANGE THINGS

## 1. 🔗 GitHub URL
Replace:
```md
https://github.com/srashti0709/smart-leads-dashboard.git
```
#2. 🌐 Frontend URL
https://smart-leads-dashboard-inky.vercel.app/login
