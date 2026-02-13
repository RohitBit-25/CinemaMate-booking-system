import React, { useEffect, useState } from 'react';
import FetchMoviesByGenre from '../API/FetchMoviesByGenre';
import FetchMoviesBySearch from '../API/FetchMoviesBySearch';
import { isLoggedIn } from '../utils/Auth';
import Genres from './Genre';
import MovieCard from './MovieCard';
import RecommendedMovies from './RecommendedMovies';

const MovieList = ({ searchText }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genreIds, setGenreIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userLoggedIn = isLoggedIn();

  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN || '';

  useEffect(() => {
    const fetchMoviesBySearch = async () => {
      if (searchText) {
        setLoading(true);
        setError(null);
        try {
          const response = await FetchMoviesBySearch(
            ACCESS_TOKEN,
            page,
            searchText,
          );
          if (response) {
            const { filteredMovies, totalPages } = response;
            setMovies(filteredMovies);
            setTotalPages(totalPages);
          }
        } catch (err) {
          setError('Failed to search movies. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };

    const fetchMoviesByGenre = async () => {
      if (!searchText) {
        setLoading(true);
        setError(null);
        try {
          const response = await FetchMoviesByGenre(ACCESS_TOKEN, page, genreIds);
          if (response) {
            const { filteredMovies, totalPages } = response;
            setMovies(filteredMovies);
            setTotalPages(totalPages);
          }
        } catch (err) {
          setError('Failed to load movies. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMoviesBySearch();
    fetchMoviesByGenre();
  }, [page, genreIds, searchText, ACCESS_TOKEN]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <Genres setGenreIds={setGenreIds} />
      {userLoggedIn && (
        <div className="mb-12">
          <RecommendedMovies />
        </div>
      )}

      <div className="flex items-center mb-8">
        <div className="w-1 h-8 bg-cinema-red mr-4 rounded-full"></div>
        <h1 className='text-3xl font-display font-bold text-cinema-white'>Now Showing</h1>
      </div>
      
      {loading && (
        <div className="flex justify-center items-center py-24">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cinema-red mx-auto"></div>
            <p className="mt-6 text-cinema-gray animate-pulse">Loading movies...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="text-center py-24 bg-cinema-dark/50 rounded-2xl border border-cinema-red/20">
          <div className="text-cinema-red text-6xl mb-4">⚠️</div>
          <p className="text-cinema-white text-lg font-semibold mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 bg-cinema-red hover:bg-red-700 text-white px-8 py-3 rounded-xl transition-colors shadow-lg shadow-cinema-red/20"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {movies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} hallNumber={index} />
          ))}
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="text-center py-24 bg-cinema-dark/30 rounded-2xl">
          <div className="text-cinema-gray text-6xl mb-4">🎬</div>
          <p className="text-cinema-gray text-lg">No movies found. Try a different search!</p>
        </div>
      )}
      
      {!loading && !error && movies.length > 0 && (
        <div className='flex justify-center mt-12 gap-4'>
          <button
            onClick={handlePrevPage}
            className={`flex items-center gap-2 bg-cinema-dark hover:bg-cinema-black text-cinema-white border border-cinema-gray/20 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${
              page === 1 ? 'opacity-50 cursor-not-allowed hover:bg-cinema-dark' : 'hover:border-cinema-gold/50 hover:shadow-lg'
            }`}
            disabled={page === 1}
          >
            ← Previous
          </button>
          
          <span className="flex items-center px-4 text-cinema-gray font-mono bg-cinema-black/30 rounded-xl border border-cinema-gray/10">
            Page {page} of {totalPages}
          </span>
          
          <button
            onClick={handleNextPage}
            className={`flex items-center gap-2 bg-cinema-dark hover:bg-cinema-black text-cinema-white border border-cinema-gray/20 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${
              page === totalPages ? 'opacity-50 cursor-not-allowed hover:bg-cinema-dark' : 'hover:border-cinema-gold/50 hover:shadow-lg'
            }`}
            disabled={page === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList;
