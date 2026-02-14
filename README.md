# 🎬 CinemaMate - AI-Powered Smart Cinema Booking System

**CinemaMate** is a next-generation movie ticketing platform that combines a premium "Dark Cinema" aesthetic with cutting-edge **Artificial Intelligence**. Built with **React.js** and **Spring Boot**, it offers a seamless booking experience with 3D seat selection, voice commands, and an intelligent AI assistant.

![CinemaMate Banner](https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop)

## ✨ Key Features

### 🧠 Advanced AI Suite
- **🤖 Groq AI Chatbot**: An intelligent assistant powered by **Llama 3** (via Groq API) that answers questions about movies, timings, and prices instantly.
- **🎙️ Voice Search**: Hands-free movie searching using the Web Speech API. "Just say 'Jawan'!"
- **✨ Smart Recommendations**: Personalized movie suggestions based on your booking history and genre preferences.

### 🎟️ Premium Booking Experience
- **Interactive Seat Map**: Visually select seats with distinct categories (Silver, Gold, Premium) and real-time availability.
- **Dynamic Pricing Engine**: Real-time calculation of tickets, convenience fees, and taxes based on seat selection.
- **QR E-Tickets**: Instant QR code generation for paperless entry and verification.
- **Glassmorphism UI**: A stunning, responsive dark-themed interface built with Tailwind CSS.

### 📊 Admin Dashboard
- **Analytics Hub**: Real-time overview of Total Revenue, Tickets Sold, and Active Movies.
- **Movie Management**: Easy interface to add new movies, manage schedules, and update pricing.
- **Ticket Verification**: Integrated scanner to verify QR codes at the cinema entrance.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js (v18)
- **Styling**: Tailwind CSS, Framer Motion (Animations)
- **AI Integration**: Groq SDK, Web Speech API
- **State Management**: React Hooks & Context API
- **Build Tool**: npm / Create React App

### Backend
- **Core**: Java 17, Spring Boot 3.2
- **Database**: MySQL 8.0
- **Build Tool**: Maven
- **Security**: Spring Security (JWT recommended for production)

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites
- **Node.js** (v18 or higher)
- **Java JDK** (v17 or higher)
- **MySQL Server** (v8.0 or higher)

### 1️⃣ Database Setup
1.  Open your MySQL Workbench or Command Line.
2.  Create the database:
    ```sql
    CREATE DATABASE cinema;
    ```
3.  (Optional) The application uses Hibernate `create-drop` or `update` to automatically generate tables. Ensure your credentials are correct in the next step.

### 2️⃣ Backend Setup
1.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```
2.  **Configure Database**:
    - Open `src/main/resources/application.properties`.
    - Update the database credentials:
      ```properties
      spring.datasource.url=jdbc:mysql://localhost:3306/cinema
      spring.datasource.username=YOUR_MYSQL_USERNAME
      spring.datasource.password=YOUR_MYSQL_PASSWORD
      # Hibernate ddl-auto can be 'update' to persist data or 'create-drop' to reset on restart
      spring.jpa.hibernate.ddl-auto=update
      ```
3.  **Run the Server**:
    - **Windows**:
      ```bash
      .\mvnw spring-boot:run
      ```
    - **Mac/Linux**:
      ```bash
      ./mvnw spring-boot:run
      ```
    *The backend server will start at `http://localhost:8080`.*

### 3️⃣ Frontend Setup
1.  **Navigate to the frontend directory** (open a new terminal):
    ```bash
    cd frontend
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Configure Environment**:
    - Create a `.env` file in the `frontend` root (or rename `.env.example`).
    - Add your API keys:
      ```env
      REACT_APP_GROQ_API_KEY=your_groq_api_key_here
      REACT_APP_OMDB_API_KEY=your_omdb_api_key_here
      REACT_APP_BASE_URL=http://localhost:8080/api/v1
      ```
4.  **Launch App**:
    ```bash
    npm start
    ```
    *The application will open at `http://localhost:3000`.*

---

## 🧪 Troubleshooting

- **Backend fails to start?**
  - Check if MySQL is running on port 3306.
  - Verify your username and password in `application.properties`.
  - Ensure nothing else is running on port 8080.

- **Frontend can't connect to backend?**
  - Ensure the Backend is running *before* you start the Frontend.
  - Check the `REACT_APP_BASE_URL` in your `.env` file. It should match the backend URL.
  - Check the browser console (F12) for CORS errors.

- **AI Chatbot not working?**
  - Verify your `REACT_APP_GROQ_API_KEY` is valid.
  - Check the browser console for any API error messages.

---

## 📂 Project Structure

```
cinema-ticket-booking-system/
├── backend/                 # Spring Boot Application
│   ├── src/main/java       # Controllers, Models, Services
│   └── src/main/resources  # Config & Static Assets
│
└── frontend/                # React Application
    ├── public/             # Static files (index.html, icons)
    └── src/
        ├── API/            # Backend API connectors
        ├── components/     # Reusable UI components (SeatPlan, ChatBot)
        ├── pages/          # Full pages (Home, AdminDashboard)
        └── utils/          # Helpers (Groq Service, Formatters)
```

## 👨‍💻 Developer
**Developed with ❤️ by [Mahima]**
*Empowering Cinema with AI*
