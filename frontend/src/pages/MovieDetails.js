import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FetchMovieDetails from '../API/GetMovieDetails';
import SeatPlan from '../components/SeatPlan';
import FormatDate from '../utils/formatDate';
import FormatRuntime from '../utils/formatRuntime';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY || '';

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await FetchMovieDetails(id, API_KEY);
      setMovie(movieData);
    };

    fetchData();
  }, [id, API_KEY]);

  if (!movie) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading movie details...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-5xl mx-auto'>
          <div className='flex flex-wrap justify-center items-start'>
            <div className='w-full md:w-1/2 lg:w-1/3 flex justify-center mb-8 md:mb-0'>
              <img
                src={movie.poster_path && movie.poster_path.startsWith('http') 
                  ? movie.poster_path 
                  : movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image'
                }
                alt={movie.title}
                className='w-full h-auto rounded-lg shadow-lg'
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image';
                }}
              />
            </div>
            <div className='w-full md:w-1/2 lg:w-2/3 px-6 text-left'>
              <h2 className='text-3xl font-semibold'>{movie.title}</h2>
              <p className='text-gray-800 mt-2 text-justify text-sm md:text-sm lg:text-base'>
                {movie.overview}
              </p>
              <p className='text-gray-800 mt-2 text-sm md:text-sm lg:text-base'>
                <b>Genres:</b>{' '}
                {movie.genres && movie.genres.length > 0 ? movie.genres.map((genre) => genre.name).join(', ') : 'N/A'}
              </p>
              <p className='text-gray-800 mt-2 text-sm md:text-sm lg:text-base'>
                <b>Tagline:</b> {movie.tagline}
              </p>
              <p className='text-gray-800 mt-1 text-sm md:text-sm lg:text-base'>
                <b>Runtime:</b> {FormatRuntime(movie.runtime)}
              </p>
              <p className='text-gray-800 mt-1 text-sm md:text-sm lg:text-base'>
                <b>Rating:</b> {movie.vote_average && movie.vote_average > 0 ? movie.vote_average.toFixed(1) : 'N/A'}
              </p>
              <p className='text-gray-800 mt-2 text-sm md:text-sm lg:text-base'>
                <b>Release Date:</b> {FormatDate(movie.release_date)}
              </p>
              <p className='text-gray-800 mt-2 text-sm md:text-sm lg:text-base'>
                <b>Production Companies:</b>{' '}
                {movie.production_companies && movie.production_companies.length > 0 
                  ? movie.production_companies.map((company) => company.name).join(', ')
                  : 'N/A'}
              </p>
              <p className='text-gray-800 mt-2 text-sm md:text-sm lg:text-base'>
                <b>Production Countries:</b>{' '}
                {movie.production_countries && movie.production_countries.length > 0
                  ? movie.production_countries.map((country) => country.name).join(', ')
                  : 'N/A'}
              </p>
              <p className='text-gray-800 mt-2 text-sm md:text-sm lg:text-base'>
                <b>Spoken Languages:</b>{' '}
                {movie.spoken_languages && movie.spoken_languages.length > 0
                  ? movie.spoken_languages.map((lang) => lang.english_name).join(', ')
                  : 'N/A'}
              </p>
              <p className='text-gray-800 mt-2 text-sm md:text-sm lg:text-base'>
                <b>Budget:</b> {movie.budget && movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : 'N/A'}
              </p>
              <p className='text-gray-800 mt-2 text-sm md:text-sm lg:text-base'>
                <b>Revenue:</b> {movie.revenue && movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : 'N/A'}
              </p>
              {movie.homepage && (
                <a
                  className='text-blue-500 mt-2 block'
                  href={movie.homepage}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Visit Homepage
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <SeatPlan movie={movie} />
    </div>
  );
};

export default MovieDetails;
