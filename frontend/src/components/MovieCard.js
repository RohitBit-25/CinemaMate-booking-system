import React from 'react';
import MovieSessions from '../mockData/MovieSessions';
import FormatDate from '../utils/formatDate';
import SessionInfo from './SessionInfo';

const MovieCard = ({ movie, hallNumber }) => {
  const movieSessions = MovieSessions(movie, hallNumber);
  
  // Handle image source - OMDb provides direct URLs, not relative paths
  const getImageSrc = () => {
    if (movie.poster_path) {
      // If it's already a full URL (OMDb format), use it directly
      if (movie.poster_path.startsWith('http')) {
        return movie.poster_path;
      }
      // Otherwise, assume it's TMDb format and construct URL
      return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    }
    // Fallback placeholder image
    return 'https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image';
  };

  return (
    <div className='group relative bg-cinema-dark/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-cinema-gold/30 hover:shadow-2xl hover:shadow-cinema-gold/10 transform hover:-translate-y-2 h-full flex flex-col'>
      <div className='relative overflow-hidden aspect-[2/3]'>
        <img
          src={getImageSrc()}
          alt={movie.title}
          className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450/1e293b/94a3b8?text=No+Image';
          }}
        />
        {/* Overlay gradient and Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Book Now Button (Slide Up) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center z-10">
          <button className="w-full bg-gradient-to-r from-cinema-red to-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-cinema-red/30 flex items-center justify-center gap-2 hover:scale-105 transition-transform">
            <span>🎟️</span>
            <span>Book Seat</span>
          </button>
        </div>
        
        {/* Rating Badge */}
        {movie.vote_average && movie.vote_average > 0 && (
          <div className='absolute top-3 right-3 bg-black/60 backdrop-blur-md text-cinema-gold px-2 py-1 rounded-lg text-xs font-bold border border-cinema-gold/30 flex items-center gap-1 shadow-lg'>
            <span>⭐</span> {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>
      
      <div className='p-5 flex flex-col flex-grow'>
        <h3 className='text-lg font-display font-bold text-white mb-2 line-clamp-1 group-hover:text-cinema-gold transition-colors'>{movie.title}</h3>
        
        <div className='text-xs text-gray-400 mb-4 flex items-center gap-2'>
          <span className="bg-white/5 px-2 py-1 rounded-md">📅 {FormatDate(movie.release_date)}</span>
          <span>•</span>
          <span className="uppercase tracking-wide text-cinema-gray-dark">Action</span>
        </div>

        <div className='mt-auto pt-4 border-t border-white/5'>
          <SessionInfo movieSessions={movieSessions} movieId={movie.id} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
