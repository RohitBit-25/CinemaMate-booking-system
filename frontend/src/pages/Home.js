import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieList from '../components/MovieList';
import Newsletter from '../components/Newsletter';

function Home({ searchText, setSearchText, user }) {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setSearchText(category);
    const element = document.getElementById('movie-list-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop",
      title: "Experience the Magic",
      subtitle: "Immerse yourself in upcoming blockbusters and exclusive premieres."
    },
    {
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
        title: "IMAX & Gold Class",
        subtitle: "Luxury seating, gourmet dining, and crystal-clear screens."
    },
    {
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?q=80&w=2052&auto=format&fit=crop",
        title: "Blockbuster Season",
        subtitle: "Book your tickets now for the biggest hits of the year."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const scrollToMovies = () => {
    const element = document.getElementById('movie-list-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-cinema-black min-h-screen font-sans selection:bg-cinema-gold/30">
      {/* Dynamic Hero Section */}
      <div className="relative h-[85vh] w-full overflow-hidden group">
        
        {/* Slides */}
        {heroSlides.map((slide, index) => (
            <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeHeroSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
                <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-[10s]"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/40 to-transparent" />
                 <div className="absolute inset-0 bg-black/20" /> {/* Dimmer */}
            </div>
        ))}
        
        {/* Content Overlay */}
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-start">
          <div className="max-w-4xl space-y-6 animate-fade-in pl-4 border-l-4 border-cinema-gold">
             <div className="inline-block px-3 py-1 rounded-full bg-cinema-gold/20 backdrop-blur-md border border-cinema-gold/30 mb-2">
                <span className="text-cinema-gold text-xs md:text-sm font-bold tracking-widest uppercase">
                    Now Trending
                </span>
             </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-tight text-white drop-shadow-2xl">
              {heroSlides[activeHeroSlide].title}
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-200 max-w-2xl font-light leading-relaxed drop-shadow-md">
              {heroSlides[activeHeroSlide].subtitle}
            </p>

            <div className="flex flex-wrap gap-4 pt-6">
              <button 
                onClick={scrollToMovies}
                className="group relative px-8 py-4 bg-cinema-red text-white font-bold rounded-full overflow-hidden shadow-xl shadow-cinema-red/20 transition-all duration-300 hover:scale-105 hover:shadow-cinema-red/40"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <span className="relative flex items-center gap-2">
                  Get Tickets <span className="text-xl">🎟️</span>
                </span>
              </button>
              
              <button 
                 onClick={() => navigate('/offers')}
                 className="px-8 py-4 bg-white/5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 hover:border-cinema-gold hover:text-cinema-gold transition-all duration-300 backdrop-blur-sm"
              >
                View Offers
              </button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 right-10 z-30 flex gap-2">
            {heroSlides.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setActiveHeroSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${index === activeHeroSlide ? 'w-8 bg-cinema-gold' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                />
            ))}
        </div>
      </div>

      {/* "Coming Soon" Carousel Section */}
      <div className="py-20 bg-cinema-dark/30 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cinema-black/40 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-4xl font-display font-bold text-white mb-2">Coming Soon</h2>
                    <p className="text-gray-400">Be the first to watch the next big thing.</p>
                </div>
                <button onClick={() => navigate('/coming-soon')} className="text-cinema-gold hover:text-white transition-colors font-semibold text-sm">View All &rarr;</button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="group relative aspect-[2/3] rounded-2xl overflow-hidden bg-gray-800 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2">
                        <img 
                            src={`https://image.tmdb.org/t/p/w500/qA5kPYZA7FkVvqcEfJRoOy4kpHg.jpg`} /* Placeholder for unreleased movies */
                            alt="Coming Soon" 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                            onError={(e) => e.target.src = 'https://via.placeholder.com/300x450?text=Coming+Soon'}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                         <div className="absolute bottom-0 left-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1 block">Releasing Dec 2024</span>
                            <h3 className="text-xl font-bold text-white leading-tight">Future Blockbuster {item}</h3>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-cinema-gold/20 hover:text-cinema-gold">
                            🔔
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Interactive Categories (Polished from V1) */}
      <div className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Choose Your Vibe</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Explore our curated collections designed for every cinematic taste.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {/* Card 1 */}
           <div onClick={() => handleCategoryClick('Hindi')} className="cursor-pointer group relative h-64 bg-gradient-to-br from-pink-900/20 to-cinema-dark border border-white/5 p-8 rounded-3xl overflow-hidden hover:border-pink-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-500/10">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl group-hover:bg-pink-500/30 transition-all" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">💃</div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-pink-400 transition-colors">Bollywood</h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">Drama, Music & Masala</p>
                </div>
              </div>
           </div>

           {/* Card 2 */}
           <div onClick={() => handleCategoryClick('Action')} className="cursor-pointer group relative h-64 bg-gradient-to-br from-red-900/20 to-cinema-dark border border-white/5 p-8 rounded-3xl overflow-hidden hover:border-red-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-500/10">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-red-500/20 rounded-full blur-3xl group-hover:bg-red-500/30 transition-all" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">🎬</div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors">Hollywood</h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">Blockbusters & Action</p>
                </div>
              </div>
           </div>

           {/* Card 3 */}
            <div onClick={() => handleCategoryClick('IMAX')} className="cursor-pointer group relative h-64 bg-gradient-to-br from-purple-900/20 to-cinema-dark border border-white/5 p-8 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">✨</div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">Premium</h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">IMAX & Gold Class</p>
                </div>
              </div>
           </div>

           {/* Card 4 */}
           <div onClick={() => alert("Food pre-booking coming soon!")} className="cursor-pointer group relative h-64 bg-gradient-to-br from-green-900/20 to-cinema-dark border border-white/5 p-8 rounded-3xl overflow-hidden hover:border-green-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/10">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-green-500/20 rounded-full blur-3xl group-hover:bg-green-500/30 transition-all" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">🍿</div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">Food & Drinks</h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">Pre-book your snacks</p>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div id="movie-list-section" className="relative z-10 bg-gradient-to-b from-cinema-black to-cinema-dark/50 pt-10 pb-20">
        <div className="container mx-auto px-4">
             <div className="flex items-center justify-between mb-12">
                 <div className="flex items-center space-x-4">
                    <div className="w-1.5 h-10 bg-gradient-to-b from-cinema-gold to-orange-500 rounded-full"></div>
                    <h2 className="text-4xl font-display font-bold text-white">Now Showing</h2>
                 </div>
                 {/* Filter/Sort Placeholders could go here */}
             </div>
            <MovieList searchText={searchText} />
        </div>
      </div>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}

export default Home;
