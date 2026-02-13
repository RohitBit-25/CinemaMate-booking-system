import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock Data for Admin
  const stats = {
    totalSales: 154300,
    ticketsSold: 420,
    moviesShowing: 8,
    upcomingMovies: 3
  };

  const recentBookings = [
    { id: 'BK102', user: 'Rahul Kumar', movie: 'Jawan', amount: 450, time: '10 min ago' },
    { id: 'BK101', user: 'Priya Singh', movie: 'Oppenheimer', amount: 900, time: '25 min ago' },
    { id: 'BK100', user: 'Amit Sharma', movie: 'Gadar 2', amount: 300, time: '1 hour ago' },
  ];

  return (
    <div className="min-h-screen bg-cinema-black text-cinema-white font-sans flex">
      {/* Sidebar */}
      <div className="w-64 bg-cinema-dark border-r border-cinema-gray/10 hidden md:block">
        <div className="p-6">
          <h2 className="text-2xl font-display font-bold text-cinema-gold">
            Cinema<span className="text-cinema-red">Admin</span>
          </h2>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-cinema-red text-white shadow-lg shadow-cinema-red/20' : 'text-cinema-gray hover:bg-white/5'}`}
          >
            📊 Overview
          </button>
          <button 
            onClick={() => setActiveTab('movies')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'movies' ? 'bg-cinema-red text-white shadow-lg shadow-cinema-red/20' : 'text-cinema-gray hover:bg-white/5'}`}
          >
            🎬 Movies
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'users' ? 'bg-cinema-red text-white shadow-lg shadow-cinema-red/20' : 'text-cinema-gray hover:bg-white/5'}`}
          >
            👥 Users
          </button>
          
          <div className="pt-8 mt-8 border-t border-cinema-gray/10">
            <button 
              onClick={() => navigate('/')}
              className="w-full text-left px-4 py-3 text-cinema-gray hover:text-white transition-colors flex items-center gap-2"
            >
              ⬅ Back to Site
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">Dashboard</h1>
            <p className="text-cinema-gray">Welcome back, Administrator</p>
          </div>
          <div className="bg-cinema-dark p-2 rounded-full border border-cinema-gray/20">
            <span className="w-10 h-10 bg-cinema-gold rounded-full flex items-center justify-center text-cinema-black font-bold text-lg">
              A
            </span>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-cinema-dark p-6 rounded-2xl border border-cinema-gray/10 hover:border-cinema-gold/30 transition-all">
                <p className="text-cinema-gray text-sm mb-1">Total Revenue</p>
                <h3 className="text-3xl font-bold text-green-400">₹{stats.totalSales.toLocaleString()}</h3>
                <p className="text-green-500 text-xs mt-2">↑ 12% from last week</p>
              </div>
              <div className="bg-cinema-dark p-6 rounded-2xl border border-cinema-gray/10 hover:border-cinema-gold/30 transition-all">
                <p className="text-cinema-gray text-sm mb-1">Tickets Sold</p>
                <h3 className="text-3xl font-bold text-cinema-gold">{stats.ticketsSold}</h3>
                <p className="text-cinema-gold text-xs mt-2">Today's bookings</p>
              </div>
              <div className="bg-cinema-dark p-6 rounded-2xl border border-cinema-gray/10 hover:border-cinema-gold/30 transition-all">
                <p className="text-cinema-gray text-sm mb-1">Movies Live</p>
                <h3 className="text-3xl font-bold text-cinema-white">{stats.moviesShowing}</h3>
                <p className="text-cinema-gray text-xs mt-2">Across 4 screens</p>
              </div>
              <div className="bg-cinema-dark p-6 rounded-2xl border border-cinema-gray/10 hover:border-cinema-gold/30 transition-all">
                <p className="text-cinema-gray text-sm mb-1">Upcoming</p>
                <h3 className="text-3xl font-bold text-blue-400">{stats.upcomingMovies}</h3>
                <p className="text-blue-500 text-xs mt-2">Releasing this Friday</p>
              </div>
            </div>

            {/* Recent Bookings & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Bookings */}
              <div className="lg:col-span-2 bg-cinema-dark rounded-2xl border border-cinema-gray/10 p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span>🎟️</span> Recent Bookings
                </h3>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-cinema-black/50 rounded-xl hover:bg-cinema-black transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-cinema-red/20 text-cinema-red flex items-center justify-center font-bold text-xs">
                          {booking.id}
                        </div>
                        <div>
                          <p className="font-bold text-white">{booking.user}</p>
                          <p className="text-xs text-cinema-gray">{booking.movie}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-cinema-gold">₹{booking.amount}</p>
                        <p className="text-xs text-cinema-gray">{booking.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-cinema-red to-red-900 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-3 transition-colors backdrop-blur-sm">
                    <span>➕</span> Add New Movie
                  </button>
                  <button className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-3 transition-colors backdrop-blur-sm">
                    <span>📅</span> Update Schedule
                  </button>
                  <button className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-3 transition-colors backdrop-blur-sm">
                    <span>📢</span> Create Promotion
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'movies' && (
           <div className="text-center py-20 animate-fade-in">
             <h2 className="text-2xl text-cinema-gray">Movie Management Implementation Pending...</h2>
             {/* This section will be implemented in the next step */}
           </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
