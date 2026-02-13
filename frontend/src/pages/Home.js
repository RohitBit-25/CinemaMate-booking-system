import React from 'react';
import MovieList from '../components/MovieList';

function Home({ searchText, user }) {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1517604931442-71053e6e2306?q=80&w=2070&auto=format&fit=crop" 
            alt="Cinema Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-black/90 via-cinema-black/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-5xl md:text-8xl font-display font-bold mb-6 leading-tight drop-shadow-2xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cinema-white to-gray-400">Experience</span><br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cinema-gold to-yellow-300">Magic</span> of Movies
            </h1>
            <p className="text-xl md:text-3xl mb-10 text-gray-300 font-light border-l-4 border-cinema-red pl-6">
              From <span className="text-cinema-white font-semibold">Bollywood</span> blockbusters to <span className="text-cinema-white font-semibold">Hollywood</span> hits.
            </p>
            {user && (
              <div className="flex items-center space-x-4 animate-slide-up">
                 <div className="h-[2px] w-12 bg-cinema-gold"></div>
                 <p className="text-xl text-cinema-gold font-display">
                    Welcome back, {user.userName}
                 </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Movie Categories Banner */}
      <div className="bg-cinema-black py-16 border-b border-cinema-dark/50 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cinema-gold/30 to-transparent"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="group text-center p-8 bg-cinema-dark/50 backdrop-blur-sm rounded-2xl border border-cinema-gray/10 hover:border-cinema-gold/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer relative overflow-hidden shadow-xl hover:shadow-cinema-gold/10">
              <div className="absolute inset-0 bg-gradient-to-br from-cinema-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">💃</div>
              <h3 className="font-display font-bold text-cinema-white text-xl mb-1 group-hover:text-cinema-gold transition-colors">Bollywood</h3>
              <p className="text-sm text-cinema-gray font-light">Masala & Magic</p>
            </div>

            <div className="group text-center p-8 bg-cinema-dark/50 backdrop-blur-sm rounded-2xl border border-cinema-gray/10 hover:border-cinema-red/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer relative overflow-hidden shadow-xl hover:shadow-cinema-red/10">
              <div className="absolute inset-0 bg-gradient-to-br from-cinema-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">🎬</div>
              <h3 className="font-display font-bold text-cinema-white text-xl mb-1 group-hover:text-cinema-red transition-colors">Hollywood</h3>
              <p className="text-sm text-cinema-gray font-light">Action & Adventure</p>
            </div>

            <div className="group text-center p-8 bg-cinema-dark/50 backdrop-blur-sm rounded-2xl border border-cinema-gray/10 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer relative overflow-hidden shadow-xl hover:shadow-orange-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">🕺</div>
              <h3 className="font-display font-bold text-cinema-white text-xl mb-1 group-hover:text-orange-400 transition-colors">Tollywood</h3>
              <p className="text-sm text-cinema-gray font-light">Action & Drama</p>
            </div>

            <div className="group text-center p-8 bg-cinema-dark/50 backdrop-blur-sm rounded-2xl border border-cinema-gray/10 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer relative overflow-hidden shadow-xl hover:shadow-purple-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">✨</div>
              <h3 className="font-display font-bold text-cinema-white text-xl mb-1 group-hover:text-purple-400 transition-colors">Premium</h3>
              <p className="text-sm text-cinema-gray font-light">IMAX & Gold Class</p>
            </div>
          </div>
        </div>
      </div>

      <MovieList searchText={searchText} />
    </div>
  );
}

export default Home;
