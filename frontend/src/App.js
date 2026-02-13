import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './layout/Footer';
import NavBar from './layout/NavBar';
import ChatBot from './components/ChatBot';
import AdminDashboard from './pages/AdminDashboard'; // Import Admin Dashboard

// ... (existing imports)

function App() {
  // ... (existing code)

  return (
    <div className='min-h-screen flex flex-col bg-cinema-black text-cinema-white font-sans'>
      <BrowserRouter>
        <Routes>
          {/* Admin Route - Separate from main layout if desired, but here keeping inside for simplicity, 
              though typically Admin would have its own layout without standard Navbar/Footer. 
              For now, let's keep it simple. */}
          <Route path='/admin' element={<AdminDashboard />} />

          {/* Main App Routes */}
          <Route
            path='*'
            element={
              <>
                <NavBar
                  user={user}
                  onSearch={handleSearch}
                  onLogin={handleLogin}
                  onLogout={handleLogout}
                />
                <div className="flex-grow">
                  <Routes>
                    <Route
                      path='/'
                      element={<Home searchText={searchText} user={user} />}
                    />
                    <Route path='/movie/:id' element={<MovieDetails />} />
                  </Routes>
                </div>
                <ChatBot />
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
