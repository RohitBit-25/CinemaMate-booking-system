import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './layout/Footer';
import NavBar from './layout/NavBar';
import ChatBot from './components/ChatBot';

// ... (existing imports)

function App() {
  // ... (existing code)

  return (
    <div className='min-h-screen flex flex-col bg-cinema-black text-cinema-white font-sans'>
      <BrowserRouter>
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
        <ChatBot /> {/* AI Assistant */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
