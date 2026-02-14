import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './layout/Footer';
import NavBar from './layout/NavBar';
import ChatBot from './components/ChatBot';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Offers from './pages/Offers';
import ComingSoon from './pages/ComingSoon';
import Support from './pages/Support';

function App() {
  const [user, setUser] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userPreferences');
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <div className='min-h-screen flex flex-col bg-cinema-black text-cinema-white font-sans'>
      <BrowserRouter>
        <Routes>
          {/* Admin Route */}
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
                       element={<Home searchText={searchText} setSearchText={handleSearch} user={user} />}
                     />
                     <Route path='/movie/:id' element={<MovieDetails />} />
                     <Route path='/offers' element={<Offers />} />
                     <Route path='/coming-soon' element={<ComingSoon />} />
                     <Route path='/support' element={<Support />} />
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
