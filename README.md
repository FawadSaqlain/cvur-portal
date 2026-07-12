# CVUR Portal - Course Review Management System

A comprehensive full-stack application for managing and publishing course reviews at COMSATS University. CVUR Portal enables students to submit anonymous ratings for courses and instructors, while providing administrators with tools to manage academic offerings, timetables, and rating analytics.

**Live Demo:** [https://cvur-portal.vercel.app](https://cvur-portal.vercel.app)

---

## What This is

CVUR Portal is a **course review and rating platform** designed for academic institutions. It serves as a bridge between students and university administration, allowing students to provide constructive feedback on courses and teaching quality while maintaining anonymity. Administrators gain insights into course performance through analytics dashboards and can manage the academic data that structures the rating system.

---

## Stack

- **Frontend:** React 19 + Vite, Redux Toolkit for state management, React Router v7 for navigation
- **Backend:** Express.js, EJS templating engine
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT-based with email verification, bcryptjs password hashing
- **File Storage:** Vercel Blob for production file uploads, local filesystem fallback
- **UI/UX:** FontAwesome 7 icons, Chart.js for analytics visualization
- **Deployment:** Vercel (optimized for serverless environment)

---

## How It's Organized

cvur-portal/ ├── client/ React frontend (SPA) │ ├── src/ │ │ ├── pages/ React page components │ │ │ ├── HomePage.jsx │ │ │ ├── LoginPage.jsx │ │ │ ├── StudentGiveReviewPage.jsx │ │ │ ├── StudentEditReviewPage.jsx │ │ │ ├── RatingsBrowsePage.jsx │ │ │ └── ProfilePage.jsx │ │ ├── features/ Redux slices & feature logic │ │ │ ├── auth/ Authentication state & actions │ │ │ └── ratings/ Ratings state & actions │ │ ├── components/ Reusable React components │ │ ├── routes/ Route configuration │ │ └── lib/ Utility functions & helpers │ ├── vite.config.js Vite build config │ └── package.json │ ├── review-app/ Express.js backend │ ├── models/ MongoDB schemas (Mongoose) │ │ ├── user.js Student & admin users │ │ ├── offering.js Course offerings (course + teacher + term) │ │ ├── rating.js Student ratings & feedback │ │ ├── ratingSummary.js Aggregated rating statistics │ │ ├── course.js │ │ ├── teacher.js │ │ ├── department.js │ │ ├── program.js │ │ ├── term.js Academic term metadata │ │ ├── audit.js Action logging for compliance │ │ └── verificationToken.js Email verification │ │ │ ├── controllers/ Business logic handlers │ │ ├── authController.js Auth, signup, password reset │ │ ├── ratingController.js Rating submission & viewing │ │ ├── ratingApiController.js JSON API for ratings │ │ ├── timetableController.js Admin timetable management │ │ └── adminUsersController.js Admin user management │ │ │ ├── routes/ HTTP endpoint definitions │ │ ├── auth.js /api/auth │ │ ├── ratings.js /ratings & /api/ratings │ │ ├── api-admin.js /api/admin (admin operations) │ │ ├── adminTimetable.js /admin (timetable UI) │ │ └── views.js Server-rendered pages │ │ │ ├── middleware/ Express middleware │ │ └── loginRequire.js Authentication guards │ │ │ ├── views/ EJS templates (server-rendered pages) │ ├── public/ Static assets │ ├── bin/www HTTP server startup │ ├── app.js Express app setup & routes │ ├── .env.example Environment template │ └── package.json │ ├── docs/ Documentation └── README.md

Code

## How It Fits Together

**Frontend → Backend Flow:**

1. **Authentication Layer** (`client/features/auth` + `review-app/controllers/authController.js`)
   - Users sign up with campus email, receive OTP verification
   - JWT tokens issued on login, stored in Redux state
   - Protected routes require valid JWT

2. **Rating Submission** (`client/pages/StudentGiveReviewPage.jsx` + `review-app/controllers/ratingController.js`)
   - Students browse course offerings linked to current semester
   - Submit anonymous ratings with questions/feedback
   - Ratings persist to MongoDB with timestamp & student ID reference

3. **Rating Analytics** (`client/pages/RatingsBrowsePage.jsx` + `review-app/controllers/ratingApiController.js`)
   - Charts visualize aggregated scores using Chart.js
   - Students can browse all published ratings anonymously
   - Rating summaries computed server-side for performance

4. **Admin Dashboard** (server-rendered EJS in `review-app/views`)
   - Manual course/offering management
   - Timetable uploads via Excel parsing
   - User account approval & management
   - Rating compliance auditing

**Data Flow:**
- MongoDB stores all mutable state (users, ratings, courses)
- File uploads go to Vercel Blob (production) or `/tmp/uploads` (dev)
- Express middleware validates JWT on protected endpoints
- EJS templates render admin pages; React SPA handles student-facing UI

---

## How to Run It

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas URI)
- npm or yarn

### Development

**1. Backend Setup**

```bash
cd review-app
npm install

# Create .env from .env.example
cp .env.example .env
# Edit .env with your MongoDB URI and secrets
nano .env

# Seed admin account
npm run seed-admin

# Start server (runs on port 4000 by default)
npm start
2. Frontend Setup (in separate terminal)

bash
cd client
npm install

# Start Vite dev server (runs on port 5173 by default)
npm run dev
Frontend will proxy API requests to http://localhost:4000.

Production Build
bash
# Build frontend
cd client
npm run build

# Vercel automatically detects and deploys both `review-app/` and `client/` directories
Environment Variables
Backend (.env in review-app/):

Dotenv
PORT=4000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/review-app
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=1h
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=supersecret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
COMSATS_ALLOWED_DOMAINS=vehari.comsats.edu.pk
Frontend: Configured in client/vite.config.js with API base pointing to backend.

Key Features
✅ Student Features

Sign up with campus email verification
Browse course timetable
Submit anonymous course reviews
View aggregated rating statistics & charts
Edit own ratings within 7-day window
Complete profile with academic info
✅ Admin Features

Manage course offerings (create, edit, delete)
Upload bulk timetables via Excel
Approve/manage student and staff accounts
View rating analytics & trends
Audit trail of platform actions
Manual class/offering management
✅ Security

Password hashing with bcryptjs
JWT authentication with expiry
Email verification for signups
CORS protection
MongoDB schema validation
Admin action audit logging
✅ Technical Highlights

Redux state management for predictable data flow
Vite for fast frontend builds
Serverless-ready (Vercel deployment)
File upload support (10MB limit)
Responsive UI with FontAwesome icons
