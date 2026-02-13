import React from 'react';
import MovieList from '../components/MovieList';

function Home({ searchText, user }) {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cinema-black/80 via-cinema-black/70 to-cinema-black"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in drop-shadow-2xl">
            Experience <span className="text-cinema-red">Cinema</span> <br/> Like Never Before
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto animate-slide-up">
            Book the best seats for the latest blockbusters in seconds.
          </p>
          {user && (
            <p className="text-lg text-cinema-gold font-medium animate-fade-in animation-delay-400 bg-cinema-black/50 inline-block px-6 py-2 rounded-full backdrop-blur-sm border border-cinema-gold/30">
              Welcome back, {user.userName} 🎬
            </p>
          )}
        </div>
      </div>

      {/* Movie Categories Banner */}
      <div className="bg-cinema-black py-12 border-b border-cinema-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="group text-center p-6 bg-cinema-dark rounded-xl border border-cinema-gray/10 hover:border-cinema-gold/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cinema-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">🎭</div>
              <h3 className="font-semibold text-cinema-white text-lg">Bollywood</h3>
              <p className="text-sm text-cinema-gray">Hindi Blockbusters</p>
            </div>
            <div className="group text-center p-6 bg-cinema-dark rounded-xl border border-cinema-gray/10 hover:border-cinema-red/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cinema-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">🌍</div>
              <h3 className="font-semibold text-cinema-white text-lg">Hollywood</h3>
              <p className="text-sm text-cinema-gray">Global Hits</p>
            </div>
            <div className="group text-center p-6 bg-cinema-dark rounded-xl border border-cinema-gray/10 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">🎪</div>
              <h3 className="font-semibold text-cinema-white text-lg">Regional</h3>
              <p className="text-sm text-cinema-gray">Tamil, Telugu & More</p>
            </div>
            <div className="group text-center p-6 bg-cinema-dark rounded-xl border border-cinema-gray/10 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">✨</div>
              <h3 className="font-semibold text-cinema-white text-lg">Premium</h3>
              <p className="text-sm text-cinema-gray">IMAX & 4DX</p>
            </div>
          </div>
        </div>
      </div>

      <MovieList searchText={searchText} />
    </div>
  );
}

export default Home;
