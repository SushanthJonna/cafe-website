# ☕ The Haven — Café Website

This is a full-stack modern café website built with **Angular 19** and **FastAPI**.

## How to Run the Project Locally

The project is split into two parts: the backend API (Python) and the frontend UI (Angular). You need to run both at the same time in two separate terminal windows.

### 1. Start the Backend API (FastAPI)

Open a terminal and navigate to the backend folder:
```bash
cd C:\Users\Sushanth\.gemini\antigravity\scratch\cafe-website\backend
```

Run the FastAPI server using Uvicorn:
```bash
python -m uvicorn main:app --reload --port 8000
```
*The backend will start running on `http://127.0.0.1:8000`. It automatically creates a `cafe.db` SQLite database file inside the backend folder to store your messages and reviews.*

### 2. Start the Frontend (Angular)

Open a **second** new terminal and navigate to the frontend folder:
```bash
cd C:\Users\Sushanth\.gemini\antigravity\scratch\cafe-website\frontend
```

Run the Angular development server:
```bash
npm start
```
*The Angular site will build and start running. Once it says "Application bundle generation complete", you can open **http://localhost:4200** in your web browser to view the site.*

---

## How to Access the Secret Admin Panel

To prevent public visitors from seeing the admin login page, **there are no buttons or links to the admin panel on the main website.**

Only the café owner (you!) knows how to access it.

**To view your messages and delete reviews:**
1. Manually type this URL into your browser's address bar: **`http://localhost:4200/admin`**
2. When the login screen appears, enter your secret passcode: **`brewhaven2026`**
3. You will unlock the dashboard to read customer messages and manage reviews!
