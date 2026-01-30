IPL Insights – Full-Stack Web Application

IPL Insights is a full-stack web application that provides analytical insights into the Indian Premier League (IPL).
The platform exposes structured backend APIs and a modern frontend dashboard to explore teams, standings, and player statistics for the IPL 2022 season.

This project demonstrates real-world backend design, API development, database modeling, and a clean, responsive frontend UI.

🖥️ Frontend

Built with React + Tailwind CSS

Modern dashboard-style UI

Fully responsive (desktop & mobile)

Interactive charts and tables

Clean navigation with client-side routing

Loading, empty, and error states handled

⚙️ Backend

RESTful APIs built using Node.js + Express

PostgreSQL (Supabase) database

ORM using Prisma

Pagination and filtering support

Centralized error handling

API documentation using Swagger (OpenAPI)

APIs tested using Swagger UI & Postman

📊 Application Pages
1️⃣ Main Dashboard (Home)

Entry point of the application

Clickable navigation cards for:

Teams

Standings

Stats

2️⃣ Teams

Grid-based layout displaying all IPL teams

Team logo and name

Clicking a team opens the Team Overview

3️⃣ Team Overview

Team logo and title header

Multiple charts showing:

Top run scorers

Top wicket takers

Strike rate distribution

Economy rate

Data visualized using bar charts

4️⃣ Standings

Points table for IPL 2022

Rank, matches played, wins, losses, points, NRR

Team logos included

Season-based filtering

5️⃣ Stats

Batting and bowling insights

Leaderboard-style table

Rank-based highlighting

Season selector

Charts aligned with tabular data

🧱 Database Design

The database schema is normalized and designed for scalability.
It includes entities such as:

Teams

Players

Matches

Batting statistics

Bowling statistics

Standings

📄 Database Schema Document:
Included in the repository as Database schema.docx 

Database schema

🔌 Backend API Plan & Endpoints

The backend exposes the following REST APIs:

1️⃣ Teams
GET /api/teams


Returns all IPL teams.

2️⃣ Players by Team
GET /api/teams/:id/players


Returns players belonging to a specific team.

3️⃣ Top Batters (Season)
GET /api/stats/batting/top?season=2022&limit=10


Returns top batters for the selected season.

4️⃣ Top Bowlers (Season)
GET /api/stats/bowling/top?season=2022&limit=10


Returns top bowlers for the selected season.

5️⃣ Standings (Points Table)
GET /api/standings?season=2022


Returns IPL points table for the selected season.

6️⃣ Team Overview
GET /api/teams/:id/overview


Returns aggregated performance data for a team.

🩺 Health Check
GET /health

📘 API Documentation (Swagger UI)

Swagger UI is enabled using OpenAPI

Available at:

/api-docs


Includes:

Endpoint descriptions

Query parameters

Sample responses

APIs were tested using:

Swagger UI

Postman

🧪 API Testing

All APIs were tested using Postman

Swagger UI was used for interactive API validation

API testing was performed using IPL 2022 season data

🧰 Tech Stack
Frontend

React (Vite)

Tailwind CSS

React Router

Axios

Recharts

Backend

Node.js

Express.js

Prisma ORM

PostgreSQL (Supabase)

Swagger (OpenAPI)

📂 Project Structure
ipl-insights/
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   └── main.jsx
│
└── README.md


Home Dashboard
![alt text](image-1.png)

Teams Grid
![alt text](image-2.png)
Team Overview Analytics
![alt text](image-3.png)
Stats Page
![alt text](image-4.png)
Standings Table
![alt text](image-5.png)
Swagger UI
![alt text](image-6.png)
api testing 
![alt text](image-7.png)
database schema
![alt text](image-8.png)

⚙️ Environment Variables
Backend (.env)
DATABASE_URL=postgresql://DIRECT_DATABASE_URL="postgresql://postgres:ipldemo2026@db.zxbeqyhttjmyjcfjxulb.supabase.co:5432/postgres?sslmode=require"

PORT=5000

Frontend
VITE_API_BASE_URL=>

🚀 Deployment

Frontend: Deployed on Vercel

Backend: Deployed on cloud platform (Render / Railway)

Database: Supabase PostgreSQL