# AI Career Coach & Job Preparation Platform

## Overview

The AI Career Coach & Job Preparation Platform is a full-stack intelligent web application developed to help students, graduates, career switchers, and job seekers improve their career readiness through Artificial Intelligence.

The platform combines resume analysis, skill extraction, gap detection, personalized learning roadmaps, AI interview simulation, and AI-powered career coaching into a unified ecosystem.

The objective is to transform traditional career preparation into a structured, adaptive, and personalized experience powered by modern AI technologies.

---

## Problem Statement

Many students and job seekers face challenges such as:

* Poorly optimized resumes
* Lack of career direction
* Limited awareness of required industry skills
* Insufficient interview preparation
* Generic learning resources
* Difficulty tracking career progress

Most existing solutions address only a single aspect of career development and lack personalization.

---

## Proposed Solution

The AI Career Coach Platform provides:

* AI Resume Analysis
* Skill Extraction and Classification
* Skill Gap Detection
* Personalized Learning Roadmaps
* AI Career Coaching Assistant
* AI Interview Simulation
* Career Progress Tracking
* Career Readiness Evaluation

---

## Key Features

### Resume Analysis

The resume analysis module enables users to upload resumes and receive detailed AI-generated feedback.

Supported formats:

* PDF
* DOC
* DOCX

Features:

* Automatic text extraction
* Skill identification
* Resume scoring
* Career role prediction
* Gap detection
* Resume improvement recommendations

---

### Intelligent Dashboard

The dashboard provides a centralized overview of the user's career development progress.

Features:

* Career readiness score
* Resume performance analytics
* Skill radar visualization
* AI-generated insights
* Learning roadmap tracking
* Progress monitoring

---

### Personalized Learning Roadmap

The roadmap system generates customized learning plans based on identified weaknesses and missing skills.

Features:

* AI-generated learning paths
* Weekly learning objectives
* Sequential week unlocking
* Progress tracking
* Completion monitoring
* Certificate generation

---

### AI Career Coach

An AI-powered conversational assistant that provides career guidance and learning recommendations.

Capabilities:

* Career advice
* Resume guidance
* Skill development recommendations
* Job search assistance
* Interview preparation support

Features:

* Session-based conversations
* Persistent history for authenticated users
* Guest mode support
* Context-aware responses

---

### AI Interview Simulator

The interview module simulates realistic interview environments.

Supported interview types:

* Technical Interviews
* HR Interviews
* Behavioral Interviews

Features:

* Dynamic question generation
* Country-based customization
* Real-time answer evaluation
* Performance scoring
* Detailed feedback reports

---

## Technology Stack

### Frontend

* Next.js
* React.js
* Tailwind CSS
* Framer Motion
* Axios
* Recharts
* jsPDF

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt
* Multer
* REST APIs

### Database

* MySQL
* phpMyAdmin

### Artificial Intelligence

* Groq API
* LLaMA 3.3 70B

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
Text Extraction
(PDF / DOC / DOCX)
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

Pipeline Summary:

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

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
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

Create the client application:

```bash
npx create-next-app@latest client

cd client
```

Install dependencies:

```bash
npm install axios

npm install framer-motion

npm install recharts

npm install jspdf
```

Run the application:

```bash
npm run dev
```

---

## Local Development

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:5000
```

Database Management:

```text
http://localhost/phpmyadmin/
```

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
│   ├── assets (logo+hero-img)
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
├── screenshots
│
└── README.md
```

---

## Screenshots

Create a `/screenshots` folder and include:

```text
landing-page.png
dashboard.png
resume-analysis.png
roadmap.png
career-coach.png
interview-system.png
```

Example:

```md
### Landing Page

![Landing Page](screenshots/landing-page.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Resume Analysis

![Resume Analysis](screenshots/resume-analysis.png)

### Learning Roadmap

![Roadmap](screenshots/roadmap.png)

### AI Career Coach

![AI Coach](screenshots/career-coach.png)

### Interview System

![Interview System](screenshots/interview-system.png)
```

---

## Security Features

The platform implements multiple security layers:

* JWT Authentication
* Password Hashing using bcrypt
* Protected Routes
* Secure File Upload Validation
* Input Sanitization
* Environment Variable Protection
* Authentication Middleware

---

## Future Enhancements

Planned future improvements include:

* Voice-based interview simulation
* Video interview analysis
* AI avatar mentor
* Live coding assessments
* Mobile application
* Multi-language support
* Job recommendation engine
* ATS resume optimization
* LinkedIn profile analysis
* Advanced career analytics

---

## Project Presentation

Presentation Slides:

https://canva.link/ib1srd3exusgbwj

---

## Author

**Shaymaa Mashaal**

Bachelor of Science in Computer Science

Final Year Graduation Project

Developed as an intelligent career development platform that combines Artificial Intelligence, modern web technologies, and educational guidance to help users become job-ready.

---

## License

This project was developed for educational and academic purposes.

Feel free to modify and extend the system according to your requirements.
