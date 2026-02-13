import React from 'react';
import MovieSessions from '../mockData/MovieSessions';
import FormatDate from '../utils/formatDate';
import RecommendedSessionInfo from './RecommendedSessionInfo';

const RecommendedMovieCard = ({ movie, hallNumber }) => {
  const movieSessions = MovieSessions(movie, hallNumber);
  
  const getImageSrc = () => {
    if (movie.poster_path) {
      if (movie.poster_path.startsWith('http')) {
        return movie.poster_path;
      }
      return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    }
    return 'https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image';
  };

  return (
    <div className='bg-white shadow-md rounded-lg overflow-hidden flex hover:shadow-lg transition-shadow duration-300'>
      <div className='relative w-1/2 h-72'>
        <img
          src={getImageSrc()}
          alt={movie.title}
          className='w-full h-full object-cover'
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image';
          }}
        />
      </div>
      <div className='p-2 flex-1 flex flex-col justify-between'>
        <div>
          <h3 className='text-[14px] font-semibold text-left'>{movie.title}</h3> 
        </div>
        <div className='text-left text-xs'> 
          <div>
            <div>
              <RecommendedSessionInfo movieSessions={movieSessions} movieId={movie.id} />
            </div>
          </div>
          <div>
            <span className='text-gray-500'>
              Release Date: {FormatDate(movie.release_date)}
            </span>
          </div>
          <div>
            <span className='text-gray-500'>
              Rating: {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedMovieCard;
