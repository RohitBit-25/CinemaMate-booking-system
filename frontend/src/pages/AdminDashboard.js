import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    ticketsSold: 0,
    moviesShowing: 8, // Mock for now as movies are external
    upcomingMovies: 3 // Mock
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/orders`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
          
          // Calculate Stats
          let totalRevenue = 0;
          let totalTickets = 0;
          
          data.forEach(order => {
             const ticketCount = order.seat ? order.seat.length : 0;
             const orderValue = order.moviePrice * ticketCount; // Assuming price is per ticket
             totalRevenue += orderValue;
             totalTickets += ticketCount;
          });

          setStats(prev => ({
            ...prev,
            totalSales: totalRevenue,
            ticketsSold: totalTickets
          }));
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        // Fallback to mock data if backend not ready
        setStats({
            totalSales: 154300,
            ticketsSold: 420,
            moviesShowing: 8,
            upcomingMovies: 3
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-cinema-black text-cinema-white font-sans flex text-base">
      {/* Sidebar */}
      <div className="w-64 bg-cinema-dark border-r border-cinema-gray/10 hidden md:block">
        <div className="p-6">
          <h2 className="text-2xl font-display font-bold text-cinema-gold">
            Cinema<span className="text-cinema-red">Mate</span>
          </h2>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'overview' ? 'bg-cinema-red text-white shadow-lg shadow-cinema-red/20' : 'text-cinema-gray hover:text-white hover:bg-white/5'}`}
          >
            📊 Overview
          </button>
          <button 
            onClick={() => setActiveTab('movies')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'movies' ? 'bg-cinema-red text-white shadow-lg shadow-cinema-red/20' : 'text-cinema-gray hover:text-white hover:bg-white/5'}`}
          >
            🎬 Movies
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'users' ? 'bg-cinema-red text-white shadow-lg shadow-cinema-red/20' : 'text-cinema-gray hover:text-white hover:bg-white/5'}`}
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
            <h1 className="text-3xl font-display font-bold text-white">Dashboard</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${stats.totalSales === 154300 ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></span>
              <p className="text-cinema-gray text-sm">
                {stats.totalSales === 154300 ? 'Offline Mode (Mock Data)' : 'Live System Active'}
              </p>
            </div>
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
              <div className="bg-cinema-dark p-6 rounded-2xl border border-cinema-gray/10 hover:border-cinema-gold/30 transition-all shadow-lg">
                <p className="text-cinema-gray text-sm mb-1 font-medium">Total Revenue</p>
                <h3 className="text-3xl font-bold text-green-400">₹{stats.totalSales.toLocaleString()}</h3>
                <p className="text-green-500 text-xs mt-2 font-medium">↑ Live Updates</p>
              </div>
              <div className="bg-cinema-dark p-6 rounded-2xl border border-cinema-gray/10 hover:border-cinema-gold/30 transition-all shadow-lg">
                <p className="text-cinema-gray text-sm mb-1 font-medium">Tickets Sold</p>
                <h3 className="text-3xl font-bold text-cinema-gold">{stats.ticketsSold}</h3>
                <p className="text-cinema-gold text-xs mt-2 font-medium">Total Bookings</p>
              </div>
              <div className="bg-cinema-dark p-6 rounded-2xl border border-cinema-gray/10 hover:border-cinema-gold/30 transition-all shadow-lg">
                <p className="text-cinema-gray text-sm mb-1 font-medium">Movies Live</p>
                <h3 className="text-3xl font-bold text-white">{stats.moviesShowing}</h3>
                <p className="text-cinema-gray text-xs mt-2 font-medium">Across 4 screens</p>
              </div>
              <div className="bg-cinema-dark p-6 rounded-2xl border border-cinema-gray/10 hover:border-cinema-gold/30 transition-all shadow-lg">
                <p className="text-cinema-gray text-sm mb-1 font-medium">Upcoming</p>
                <h3 className="text-3xl font-bold text-blue-400">{stats.upcomingMovies}</h3>
                <p className="text-blue-500 text-xs mt-2 font-medium">Releasing Soon</p>
              </div>
            </div>

            {/* Recent Bookings & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Bookings */}
              <div className="lg:col-span-2 bg-cinema-dark rounded-2xl border border-cinema-gray/10 p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                  <span>🎟️</span> Recent Bookings
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                  {loading ? (
                       <p className="text-cinema-gray text-center py-4">Loading bookings...</p>
                  ) : orders.length > 0 ? (
                      [...orders].reverse().slice(0, 10).map((booking) => (
                        <div key={booking.orderId} className="flex items-center justify-between p-4 bg-cinema-black/50 rounded-xl hover:bg-cinema-black transition-colors border border-cinema-gray/5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-cinema-red/20 text-cinema-red flex items-center justify-center font-bold text-xs">
                              #{booking.orderId}
                            </div>
                            <div>
                              <p className="font-bold text-white">{booking.userName || `User ${booking.customerId}`}</p>
                              <p className="text-xs text-cinema-gray">{booking.movieTitle}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-cinema-gold">₹{booking.moviePrice * (booking.seat ? booking.seat.length : 1)}</p>
                            <p className="text-xs text-cinema-gray">{new Date(booking.created_at || Date.now()).toLocaleTimeString()}</p>
                          </div>
                        </div>
                      ))
                  ) : (
                      <p className="text-cinema-gray text-center py-4">No bookings found yet.</p>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-cinema-red to-red-900 rounded-2xl p-6 text-white shadow-xl">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-3 transition-colors backdrop-blur-sm font-medium">
                    <span>➕</span> Add New Movie
                  </button>
                  <button className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-3 transition-colors backdrop-blur-sm font-medium">
                    <span>📅</span> Update Schedule
                  </button>
                  <button className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-3 transition-colors backdrop-blur-sm font-medium">
                    <span>📢</span> Create Promotion
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'movies' && (
           <div className="space-y-8 animate-fade-in">
             <div className="flex justify-between items-center">
               <h2 className="text-2xl font-bold text-white">Movie Management</h2>
               <button className="bg-cinema-gold text-cinema-black px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-yellow-400 transition-colors">
                 + Add New Movie
               </button>
             </div>

             {/* Movie List Table */}
             <div className="bg-cinema-dark rounded-2xl border border-cinema-gray/10 overflow-hidden shadow-lg">
               <table className="w-full text-left">
                 <thead className="bg-cinema-black/50 text-cinema-gray uppercase text-xs font-bold">
                   <tr>
                     <th className="p-4">Movie</th>
                     <th className="p-4">Genre</th>
                     <th className="p-4">Language</th>
                     <th className="p-4">Status</th>
                     <th className="p-4 text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-cinema-gray/10">
                   {[
                     { id: 1, title: 'Jawan', genre: 'Action, Thriller', lang: 'Hindi', status: 'Active' },
                     { id: 2, title: 'Oppenheimer', genre: 'Biography, Drama', lang: 'English', status: 'Active' },
                     { id: 3, title: 'Gadar 2', genre: 'Action, Drama', lang: 'Hindi', status: 'Active' },
                     { id: 4, title: 'Dream Girl 2', genre: 'Comedy', lang: 'Hindi', status: 'Coming Soon' },
                   ].map((movie) => (
                     <tr key={movie.id} className="hover:bg-white/5 transition-colors">
                       <td className="p-4 font-bold text-white">{movie.title}</td>
                       <td className="p-4 text-cinema-gray">{movie.genre}</td>
                       <td className="p-4 text-cinema-gray">{movie.lang}</td>
                       <td className="p-4">
                         <span className={`px-2 py-1 rounded text-xs font-bold ${movie.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                           {movie.status}
                         </span>
                       </td>
                       <td className="p-4 text-right space-x-2">
                         <button className="text-blue-400 hover:text-blue-300">✏️</button>
                         <button className="text-red-400 hover:text-red-300">🗑️</button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>

             {/* Add Movie Form (Mock UI) */}
             <div className="bg-cinema-dark/50 p-6 rounded-2xl border border-cinema-gray/10 mt-8">
               <h3 className="text-xl font-bold mb-4 text-cinema-gold">Add New Movie</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-cinema-gray text-sm mb-2">Movie Title</label>
                   <input type="text" className="w-full bg-cinema-black border border-cinema-gray/30 rounded-lg p-3 text-white focus:border-cinema-gold outline-none focus:ring-1 focus:ring-cinema-gold" placeholder="e.g. Dunki" />
                 </div>
                 <div>
                   <label className="block text-cinema-gray text-sm mb-2">Poster URL</label>
                   <input type="text" className="w-full bg-cinema-black border border-cinema-gray/30 rounded-lg p-3 text-white focus:border-cinema-gold outline-none focus:ring-1 focus:ring-cinema-gold" placeholder="https://..." />
                 </div>
                 <div>
                   <label className="block text-cinema-gray text-sm mb-2">Genre</label>
                   <input type="text" className="w-full bg-cinema-black border border-cinema-gray/30 rounded-lg p-3 text-white focus:border-cinema-gold outline-none focus:ring-1 focus:ring-cinema-gold" placeholder="Action, Drama" />
                 </div>
                 <div>
                   <label className="block text-cinema-gray text-sm mb-2">Release Date</label>
                   <input type="date" className="w-full bg-cinema-black border border-cinema-gray/30 rounded-lg p-3 text-white focus:border-cinema-gold outline-none focus:ring-1 focus:ring-cinema-gold" />
                 </div>
               </div>
               <div className="mt-6 flex justify-end">
                 <button className="bg-cinema-red hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-cinema-red/20 transform hover:scale-105">
                   Save Movie
                 </button>
               </div>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
