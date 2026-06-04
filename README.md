# AI Career Coach & Job Preparation Platform

## Overview

The **AI Career Coach & Job Preparation Platform** is a full-stack intelligent web application developed to help students, graduates, career switchers, and job seekers improve their career readiness through Artificial Intelligence.

The platform combines **resume analysis, skill extraction, gap detection, personalized learning roadmaps, AI interview simulation, and AI-powered career coaching** into a unified ecosystem.

The objective is to transform traditional career preparation into a structured, adaptive, and personalized experience powered by modern AI technologies.

---

## Problem Statement

Many students and job seekers face challenges such as:

- Poorly optimized resumes
- Lack of career direction
- Limited awareness of required industry skills
- Insufficient interview preparation
- Generic learning resources
- Difficulty tracking career progress

Most existing solutions address only a single aspect of career development and lack personalization.

---

## Proposed Solution

The AI Career Coach Platform provides:

- AI Resume Analysis
- Skill Extraction and Classification
- Skill Gap Detection
- Personalized Learning Roadmaps
- AI Career Coaching Assistant
- AI Interview Simulation
- Career Progress Tracking
- Career Readiness Evaluation

---

## Key Features

### Resume Analysis

The resume analysis module enables users to upload resumes and receive detailed AI-generated feedback.

**Supported formats:** PDF, DOC, DOCX

**Features:**
- Automatic text extraction
- Skill identification
- Resume scoring
- Career role prediction
- Gap detection
- Resume improvement recommendations

---

### Intelligent Dashboard

The dashboard provides a centralized overview of the user's career development progress.

**Features:**
- Career readiness score
- Resume performance analytics
- Skill radar visualization
- AI-generated insights
- Learning roadmap tracking
- Progress monitoring

---

### Personalized Learning Roadmap

The roadmap system generates customized learning plans based on identified weaknesses and missing skills.

**Features:**
- AI-generated learning paths
- Weekly learning objectives
- Sequential week unlocking
- Progress tracking
- Completion monitoring
- Certificate generation

---

### AI Career Coach

An AI-powered conversational assistant that provides career guidance and learning recommendations.

**Capabilities:**
- Career advice
- Resume guidance
- Skill development recommendations
- Job search assistance
- Interview preparation support

**Features:**
- Session-based conversations
- Persistent history for authenticated users
- Guest mode support
- Context-aware responses

---

### AI Interview Simulator

The interview module simulates realistic interview environments.

**Supported interview types:** Technical, HR, Behavioral

**Features:**
- Dynamic question generation
- Country-based customization
- Real-time answer evaluation
- Performance scoring
- Detailed feedback reports

---

## Technology Stack

### Frontend
- Next.js
- React.js
- Tailwind CSS
- Framer Motion
- Axios
- Recharts
- jsPDF

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt
- Multer
- REST APIs

### Database
- MySQL
- phpMyAdmin

### Artificial Intelligence
- Groq API
- LLaMA 3.3 70B

---

## System Architecture

```text
┌───────────────────────────┐
│      Next.js Frontend     │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│   Node.js / Express API   │
└───────┬─────────┬─────────┘
        │         │
        ▼         ▼
   MySQL DB    Groq API
                  │
                  ▼
           LLaMA 3.3 70B
```

---

## Resume Analysis Workflow

```text
Resume Upload
      │
      ▼
Text Extraction (PDF / DOC / DOCX)
      │
      ▼
Validation
      │
      ▼
Groq AI Analysis
      │
      ▼
Structured JSON Output
      │
      ▼
React Dashboard UI
```

**Pipeline Summary:**

```text
PDF → Text Extraction → Groq AI → JSON → React UI
```

---

## Application Workflow

```text
User Registration/Login
           │
           ▼
     Resume Upload
           │
           ▼
   Resume Analysis
           │
           ▼
   Skill Extraction
           │
           ▼
    Gap Detection
           │
           ▼
 Dashboard Generation
           │
           ▼
   Roadmap Creation
           │
           ▼
 AI Career Coaching
           │
           ▼
 Interview Practice
           │
           ▼
Final Evaluation Report
```

---

## Database Structure

Main database entities:

```text
Users
Resumes
Skills
UserSkills
ResumeAnalysis
Roadmaps
RoadmapWeeks
RoadmapSteps
ChatSessions
Messages
InterviewSessions
InterviewQuestions
InterviewReports
InterviewProgress
Contacts
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/AI_Career_Coach_Platform.git
cd AI_Career_Coach_Platform
```

---

## Backend Setup

```bash
cd server
npm install
npm install bcrypt@^5.1.5
npm install express cors mysql2 jsonwebtoken multer dotenv pdf-parse mammoth
npm install groq-sdk
```

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm start
```

---

## Frontend Setup

```bash
npx create-next-app@latest client
cd client
npm install axios framer-motion recharts jspdf
npm run dev
```

---

## Local Development

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Database Management:** http://localhost/phpmyadmin/

---

## API Endpoints

### Authentication
```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
PUT  /api/auth/profile
```

### Resume Analysis
```http
POST /api/upload
GET  /api/dashboard
```

### Learning Roadmaps
```http
POST /api/roadmap/generate
GET  /api/roadmap/latest
GET  /api/roadmap/:id
PUT  /api/roadmap/step/:id
GET  /api/resume/my-resume
```

### AI Career Coach
```http
POST   /api/chat/session
GET    /api/chat/sessions
POST   /api/chat/send
DELETE /api/chat/session/:id
```

### Interview System
```http
POST /api/interview/start
POST /api/interview/answer
GET  /api/interview/:id/questions
GET  /api/interview/:id/progress
POST /api/interview/:id/progress
GET  /api/interview/:id/report
```

### Contact
```http
POST /api/contact
```

---

## Project Structure

```text
AI_Career_Coach_Platform
│
├── client
│   ├── components
│   ├── pages
│   ├── assets (logo + hero-img)
│   ├── services
│   └── public
│
├── server
│   ├── routes
│   ├── controllers
│   ├── middleware
│   ├── services
│   ├── uploads
│   └── config
│
├── UI-screenshots
│
└── README.md
```

---

## Screenshots

All screenshots are stored in the `UI-screenshots/` folder located inside the main project directory.

### 🏠 Home Page

![Home 1](UI-screenshots/home1.png)
![Home 2](UI-screenshots/home2.png)
![Home 3](UI-screenshots/home3.png)
![Home 4](UI-screenshots/home4.png)
![Home 5](UI-screenshots/home5.png)
![Home 6](UI-screenshots/home6.png)

### 👤 About

![About 1](UI-screenshots/about1.png)
![About 2](UI-screenshots/about2.png)

### 🔐 Authentication

#### Sign Up
![Sign Up 1](UI-screenshots/signup1.png)
![Sign Up 2](UI-screenshots/signup2.png)

#### Login
![Login](UI-screenshots/login.png)
![Login Required](UI-screenshots/login%20required.png)

### 📄 Resume Upload & Analysis

![Upload Section](UI-screenshots/uploadsection.png)
![Required Resume 1](UI-screenshots/requiredresume1.png)
![Required Resume 2](UI-screenshots/requiredresume2.png)
![Required Resume 3](UI-screenshots/requiredresume3.png)
![Rejected Resume](UI-screenshots/rejectedresume.png)
![Resume Result 1](UI-screenshots/resume-result1.png)
![Resume Result 2](UI-screenshots/resume-result2.png)

### 📊 Dashboard

![Dashboard 1](UI-screenshots/dashboard1.png)
![Dashboard 2](UI-screenshots/dashboard2.png)
![Dashboard 3](UI-screenshots/dashboard3.png)

### 🗺️ Learning Roadmap

#### Generate Roadmap
![Roadmap Upload Resume](UI-screenshots/roadmap-upload-resume.png)
![Generate Roadmap](UI-screenshots/generate_roadmap.png)
![Generate Roadmap 1](UI-screenshots/genenarte-roadmap1.png)
![Generate Roadmap 2](UI-screenshots/generate-roadmap2.png)
![Generate Roadmap 3](UI-screenshots/generate-roadmap3.png)
![Generate Roadmap 4](UI-screenshots/generate-roadmap4.png)
![Generate Roadmap 5](UI-screenshots/generate_roadmap5.png)
![Generate Roadmap 6](UI-screenshots/generate-roadmap6.png)

#### Roadmap Progress
![Progress Roadmap](UI-screenshots/progress_roadmap.png)
![Tasks Roadmap](UI-screenshots/tasks-roadmap.png)
![Week 1](UI-screenshots/week1.png)
![Week 2](UI-screenshots/week2.png)
![Week 3](UI-screenshots/week3.png)
![Completed Roadmap](UI-screenshots/completed_roadmap.png)

### 🤖 AI Career Coach

![Coach 1](UI-screenshots/chat-session1.png)
![Coach 2](UI-screenshots/chat-session2.png)
![Guest Coach](UI-screenshots/guest_coach.png)

### 🎤 AI Interview Simulator

![Interview Upload Resume](UI-screenshots/interview-upload-resume.png)
![Interview 1](UI-screenshots/interview1.png)
![Interview 2](UI-screenshots/interview2.png)
![Interview 3](UI-screenshots/interview3.png)
![Interview 4](UI-screenshots/interview4.png)
![Interview 5](UI-screenshots/interview5.png)
![Interview 6](UI-screenshots/inetrview6.png)
![Interview 7](UI-screenshots/inetrview7.png)
![Interview 8](UI-screenshots/inetrview8.png)
![Interview 9](UI-screenshots/inetrview9.png)
![Interview 10](UI-screenshots/interview10.png)
![Interview 11](UI-screenshots/interview11.png)

#### Interview Progress & Reports
![Progress Interface](UI-screenshots/progressinterface.png)
![Interview Report 1](UI-screenshots/interview-report1.png)
![Interview Report 2](UI-screenshots/interview-report2.png)
![Interview Report 3](UI-screenshots/interview-report3.png)

### 👥 Profile

![Profile](UI-screenshots/profile.png)

### 📞 Contact

![Contact](UI-screenshots/contact.png)

### 📜 Legal

#### Privacy Policy
![Privacy 1](UI-screenshots/privacy1.png)
![Privacy 2](UI-screenshots/privacy2.png)
![Privacy 3](UI-screenshots/privacy3.png)

#### Terms & Conditions
![Terms 1](UI-screenshots/terms1.png)
![Terms 2](UI-screenshots/terms2.png)

---

## Security Features

The platform implements multiple security layers:

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Secure File Upload Validation
- Input Sanitization
- Environment Variable Protection
- Authentication Middleware

---

## Future Enhancements

Planned future improvements include:

- Voice-based interview simulation
- Video interview analysis
- AI avatar mentor
- Live coding assessments
- Mobile application
- Multi-language support
- Job recommendation engine
- ATS resume optimization
- LinkedIn profile analysis
- Advanced career analytics

---

## Project Presentation

Presentation Slides: https://canva.link/ib1srd3exusgbwj

---

## Author

**Shaymaa Mashaal**

Bachelor of Science in Computer Science — Final Year Graduation Project

Developed as an intelligent career development platform that combines Artificial Intelligence, modern web technologies, and educational guidance to help users become job-ready.

---

## License

This project was developed for educational and academic purposes.

Feel free to modify and extend the system according to your requirements.
