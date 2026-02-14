import React from 'react';

const ComingSoon = () => {
    // Simulated upcoming movies data
    const upcomingMovies = [
        { id: 1, title: "Avatar 3: The Seed Bearer", date: "Dec 2024", genre: "Sci-Fi", image: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmPA.jpg" },
        { id: 2, title: "Mission: Impossible 8", date: "May 2025", genre: "Action", image: "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg" },
        { id: 3, title: "Avengers: Secret Wars", date: "May 2026", genre: "Sipuerhero", image: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" },
        { id: 4, title: "The Batman Part II", date: "Oct 2025", genre: "Crime", image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg" },
        { id: 5, title: "Spider-Man: Beyond the Spider-Verse", date: "TBA 2025", genre: "Animation", image: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg" },
        { id: 6, title: "Fantastic Four", date: "Nov 2025", genre: "Action", image: "https://image.tmdb.org/t/p/w500/c7k4N7t8x7x9x7x9.jpg" }, // Use placeholder if fails
    ];

    return (
        <div className="min-h-screen bg-cinema-black text-white pt-24 pb-12 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-16 animate-fade-in">
                    <span className="text-cinema-red font-bold tracking-widest uppercase text-sm mb-2 block">Mark Your Calendars</span>
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Coming Soon</h1>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {upcomingMovies.map((movie) => (
                        <div key={movie.id} className="group relative aspect-[2/3] bg-gray-800 rounded-xl overflow-hidden cursor-pointer">
                            <img 
                                src={movie.image} 
                                alt={movie.title} 
                                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                onError={(e) => e.target.src = 'https://via.placeholder.com/300x450?text=Poster+Coming+Soon'}
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                            
                            <div className="absolute bottom-0 left-0 p-4 w-full">
                                <span className="text-xs font-bold text-cinema-gold mb-1 block">{movie.date}</span>
                                <h3 className="text-lg font-bold leading-tight mb-1 group-hover:text-cinema-red transition-colors">{movie.title}</h3>
                                <span className="text-xs text-gray-400">{movie.genre}</span>
                            </div>

                            <button className="absolute top-2 right-2 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-cinema-red">
                                🔔
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;
