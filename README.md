Project Title

Study Buddy AI — An Autonomous AI Tutor that helps students with homework, explains concepts, and keeps them motivated.

🧠 Overview

Study Buddy AI is an intelligent study assistant built using n8n, React, Supabase, and OpenAI.
It acts as a personal AI tutor, helping students understand complex concepts, solve homework problems, and stay consistent in their studies with motivational nudges.

🎯 Problem Statement

Students often face challenges in understanding tough concepts, managing their homework load, and maintaining motivation.
Most learning tools lack personalization and automation, making self-study ineffective.

💡 Proposed Solution

Study Buddy AI provides:

🧩 AI-powered concept explanations and step-by-step homework help

⏰ Automated motivational reminders and progress tracking

🔄 n8n workflows to orchestrate AI logic and data flow

🧠 Data storage, authentication, and analytics through Supabase

🏗️ System Architecture
Frontend (React)  <-->  n8n (Workflow Orchestration)  <-->  OpenAI (LLM)
                                 |
                            Supabase (Database + Auth)


Workflow example (n8n):

User asks a question on the React app.

n8n webhook receives and routes the query.

OpenAI generates a detailed explanation.

Response stored in Supabase and sent back to frontend.

n8n triggers daily motivational messages.

⚙️ Tech Stack
Component	Technology
Frontend	React.js
Backend / DB	Supabase
Workflow Automation	n8n
AI Engine	OpenAI GPT API
Hosting (optional)	Vercel / Netlify
🧩 Key Features

💬 AI Chatbot Tutor – Ask doubts, get answers instantly

📘 Homework Solver – Step-by-step help

🔔 Motivation System – AI-driven reminders via n8n

📊 Progress Tracker – Stores student activity in Supabase

⚡ Automated Workflows – All orchestration handled by n8n

🧰 Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/yourusername/study-buddy-ai.git
cd study-buddy-ai

2️⃣ Setup Frontend (React)
cd frontend
npm install
npm start

3️⃣ Setup Database (Supabase)

Create a Supabase project

Add tables: users, queries, responses

Add .env file with credentials

4️⃣ Setup n8n Workflow

Import your n8n JSON file (autonomous tutor workflow)

Add your OpenAI API key and Supabase credentials

Activate workflow

5️⃣ Run Locally
n8n start

📸 Demo (Add Images Later)

React Web Interface

Supabase Dashboard

n8n Workflow Editor

AI Chat Example

🔮 Future Scope

Voice-based AI tutor

Gamified learning experience

Mobile app integration

Advanced analytics dashboard
