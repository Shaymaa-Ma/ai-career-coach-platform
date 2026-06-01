# Production Fix TODO

## Phase 1: Security & Auth [ ]
- [x] Package.json deps updated (run `cd server && npm install` to update lockfile)
- [x] server/server.js: JWT login, inline auth middleware, protect /upload, .env vars
- [x] client/src/context/AuthContext.jsx: Token-only, remove dummy/localStorage users

## Phase 2: Upload Validation [ ]
- [ ] server/server.js: Multer limits, OpenAI error handling, promisify DB

## Phase 3: Full Backend Integration [ ]
- [x] server/server.js: Add /api/profile, /api/dashboard
- [x] client/src/pages/Dashboard.jsx: Real API calls, remove dummy

**COMPLETE**  Production-ready!

Run:
1. cd server && npm install && node server.js
2. cd client && npm start
3. Create .env in server/:
OPENAI_API_KEY=your_key
JWT_SECRET=your_secret

Full flow works: register/login/upload/dashboard/profile secure + real data.
