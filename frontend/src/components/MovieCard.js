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
    <div className='bg-cinema-dark rounded-xl overflow-hidden shadow-lg border border-cinema-gray/10 hover:shadow-cinema-red/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 cursor-pointer group h-full flex flex-col'>
      <div className='relative overflow-hidden aspect-[2/3]'>
        <img
          src={getImageSrc()}
          alt={movie.title}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450/1e293b/94a3b8?text=No+Image';
          }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-transparent to-transparent opacity-60"></div>
        
        {/* Rating Badge */}
        {movie.vote_average && movie.vote_average > 0 && (
          <div className='absolute top-3 right-3 bg-cinema-black/80 backdrop-blur-md text-cinema-gold px-2 py-1 rounded-lg text-xs font-bold border border-cinema-gold/30 flex items-center gap-1'>
            <span>⭐</span> {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>
      
      <div className='p-4 flex flex-col flex-grow'>
        <h3 className='text-lg font-bold text-cinema-white mb-1 line-clamp-1 group-hover:text-cinema-red transition-colors'>{movie.title}</h3>
        
        <div className='text-xs text-cinema-gray mb-4 flex items-center gap-2'>
          <span>📅 {FormatDate(movie.release_date)}</span>
          <span>•</span>
          <span className="uppercase tracking-wide">Action</span>
        </div>

        <div className='mt-auto pt-3 border-t border-cinema-gray/10'>
          <SessionInfo movieSessions={movieSessions} movieId={movie.id} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
