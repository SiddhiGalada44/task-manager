# Task Manager — Frontend

A clean, minimal React frontend for the Task Manager API. Supports user authentication and full task management.

🔗 **Live App:** https://task-manager-efjb.vercel.app  
🔗 **Backend API:** https://task-manager-api-production-944a.up.railway.app

---

## Tech Stack

- **Framework:** React
- **Deployment:** Vercel
- **API:** Fetch (native browser API)
- **Styling:** Inline styles — no CSS framework

---

## Features

- User registration and login
- JWT token stored in memory for the session
- Create, complete, and delete tasks
- Tasks split into pending and completed sections
- Clean minimal UI — no dependencies beyond React

---

## Project Structure

```
task-manager-frontend/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Root component — handles auth state
│   ├── Auth.js         # Login and register screen
│   ├── Tasks.js        # Task dashboard
│   ├── api.js          # All API calls to the backend
│   ├── index.js        # React entry point
│   └── index.css       # Global base styles
└── package.json
```

---

## Running Locally

### 1. Clone the repo
```bash
git clone https://github.com/SiddhiGalada44/task-manager-frontend.git
cd task-manager-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the dev server
```bash
npm start
```

App runs at `http://localhost:3000`

---

## Connecting to the API

All API calls are in `src/api.js`. The base URL points to the live Railway backend by default:

```javascript
const BASE_URL = "https://task-manager-api-production-944a.up.railway.app";
```

To run against a local backend instead, change it to:

```javascript
const BASE_URL = "http://localhost:8000";
```

---

## How it works

```
User logs in
      ↓
JWT token stored in React state
      ↓
Token sent as Authorization header on every task request
      ↓
Flask API verifies token → returns user's tasks
      ↓
React updates UI instantly on add / complete / delete
```

---

## Related

- **Backend repo:** [task-manager-api](https://github.com/SiddhiGalada44/task-manager-api)
