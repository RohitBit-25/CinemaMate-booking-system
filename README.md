# 🇮🇳 CinemaMate - India's Premier Movie Booking App



**CinemaMate** is your ultimate destination for booking the latest **Bollywood**, **Tollywood**, and **Hollywood** blockbusters! Built with **React** and **Spring Boot 3.2**, we bring the magic of Indian cinema right to your screen with a premium, "Dark Cinema" aesthetic.

## 🎬 Features - The Full 'Paisa Vasool' Experience

### For Movie Buffs (Users)
- **✨ Premium Dark Theme**: Experience the grandeur of a multiplex from your device.
- **🎟️ Visual Seat Booking**: Choose your favorite spot! balcony, club, or executive class using our interactive 3D-style seat map.
- **💰 Transparent Pricing (INR)**: No hidden charges! Clear breakdown of Ticket Price + GST + Convenience Fee in **₹**.
- **🔎 Smart Search**: Find your favorite Khan, Kapoor, or Kumar movies instantly.
- **📱 QR E-Tickets**: Go paperless! Flash your QR code at the entry - just like a VIP.
- **🍿 Food & Beverages**: (Coming Soon) Pre-book your Samosas and Popcorn combo!

### For Developers (Tech Stack)
- **Frontend**: React.js, Tailwind CSS (Styled for Indian aesthetics).
- **Backend**: Java 21, Spring Boot 3.2 (Robust & Scalable).
- **Database**: MySQL 8+ (Stores all your bookings securely).

---

## 🚀 Jai Ho! Let's Get Started

### Prerequisites
- **Java JDK 21+**
- **Node.js 18+** & **npm**
- **MySQL 8.0+**

### 1️⃣ Backend Setup (The Engine)

1. **Clone the repository**
   ```bash
   git clone https://github.com/RohitBit-25/CinemaMate-booking-system.git
   cd backend
   ```

2. **Database Setup (MySQL)**
   - Open your MySQL Workbench or secure command line.
   - Create a database called `cinema`.
   - Update `src/main/resources/application.properties` with your MySQL credentials:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/cinema
     spring.datasource.username=YOUR_USERNAME
     spring.datasource.password=YOUR_PASSWORD
     ```

3. **Run the Show**
   ```bash
   # Using Maven Wrapper
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```
   The backend will start serving at `http://localhost:8080`.

### 2️⃣ Frontend Setup (The Big Screen)

1. **Go to Frontend**
   ```bash
   cd frontend
   ```

2. **Configure Environment**
   - Create a `.env` file.
   - Add your TMDB API keys (Get them from [themoviedb.org](https://www.themoviedb.org/settings/api)):
     ```env
     REACT_APP_API_KEY=your_api_key_here
     REACT_APP_ACCESS_TOKEN=your_read_access_token_here
     REACT_APP_BASE_URL=http://localhost:8080
     ```

3. **Light, Camera, Action!**
   ```bash
   npm install
   npm start
   ```
   Open `http://localhost:3000` to book your first 'First Day First Show' ticket!

---

## 🐛 Troubleshooting (Jugaad Fixes)

- **Backend not starting?**
  - Check if MySQL is running. "Bhai, database on hai na?"
  - Verify `JAVA_HOME` path.

- **UI looks broken?**
  - Run `npm run build` to fix Tailwind CSS issues. "Refresh karke dekho!"

---

## 📜 License
This project is licensed under the MIT License. Made with ❤️ in India.
