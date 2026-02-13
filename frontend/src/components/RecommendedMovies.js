import React, { useEffect, useState } from 'react';
import FetchMoviesByGenre from '../API/FetchMoviesByGenre';
import GetRecommendedMovies from '../API/GetRecommendedMovies';
import { isLoggedIn } from '../utils/Auth';
import RecommendedMovieCard from './RecommendedMovieCard';

const genres = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Family: 10751,
  Fantasy: 14,
  Mystery: 9648,
  ScienceFiction: 878,
  Drama: 18,
  Horror: 27,
  Thriller: 53,
  Music: 10402,
  History: 36,
  War: 10752,
  Romance: 10749,
  Crime: 80,
};

const RecommendedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [, setRecommendedMovies] = useState([]);
  const [userId, setUserId] = useState(null);
  const [genreIds, setGenreIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userLoggedIn = isLoggedIn();

  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN || '';

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        if (genreIds.length > 0) {
          setLoading(true);
          setError(null);
          const response = await FetchMoviesByGenre(ACCESS_TOKEN, page, genreIds);
          if (response) {
            const { filteredMovies, totalPages } = response;
            setMovies(filteredMovies || []);
            setTotalPages(totalPages || 1);
          }
        }
      } catch (err) {
        console.error('Error fetching movies by genre:', err);
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByGenre();
  }, [page, genreIds, ACCESS_TOKEN]);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        if (userId) {
          setLoading(true);
          setError(null);
          const recommendedMoviesData = await GetRecommendedMovies(userId);
          if (
            recommendedMoviesData &&
            recommendedMoviesData.movieGenres &&
            Array.isArray(recommendedMoviesData.movieGenres) &&
            recommendedMoviesData.movieGenres.length > 0
          ) {
            const recommendedGenres = Object.keys(genres).filter((genre) =>
              recommendedMoviesData.movieGenres.includes(genre),
            );
            const recommendedGenreIds = recommendedGenres.map(
              (genre) => genres[genre],
            );
            setRecommendedMovies(recommendedMoviesData);
            setGenreIds(recommendedGenreIds);
          } else {
            console.log('No movie genres found for recommendations, using defaults');
            // Set some default genres if no recommendations found
            setGenreIds([28, 35, 18]); // Action, Comedy, Drama
          }
        } else {
          // If no user is logged in, show default popular genres
          console.log('No user logged in, using default genres');
          setGenreIds([28, 35, 18]); // Action, Comedy, Drama
        }
      } catch (err) {
        console.error('Error fetching recommended movies:', err);
        setError('Failed to load recommendations');
        // Fallback to default genres
        setGenreIds([28, 35, 18]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedMovies();
  }, [userId]);

  useEffect(() => {
    try {
      if (userLoggedIn && userLoggedIn.userId) {
        setUserId(userLoggedIn.userId);
      } else {
        setUserId(null);
        // If no user is logged in, still initialize with default genres
        setGenreIds([28, 35, 18]); // Action, Comedy, Drama
        setLoading(false);
      }
    } catch (err) {
      console.error('Error setting user ID:', err);
      setUserId(null);
      setGenreIds([28, 35, 18]);
      setLoading(false);
    }
  }, [userLoggedIn]);

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

  const startIndex = page - 1;

  const displayedMovies = movies.slice(startIndex, startIndex + 6);

  if (loading) {
    return (
      <div className='container mx-auto pt-4'>
        <div className='flex justify-center items-center py-8'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-red-600'></div>
          <span className='ml-2 text-gray-600'>Loading movies...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto pt-4'>
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {movies && movies.length > 0 && (
        <div className='container mx-auto pt-4'>
          <h1 className='text-left font-bold pb-4'>
            {userLoggedIn ? 'Recommended Movies' : 'Popular Movies'}
          </h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {displayedMovies.map((movie, index) => (
              <RecommendedMovieCard
                key={movie.id}
                movie={movie}
                hallNumber={index}
              />
            ))}
          </div>
          <div className='flex justify-center mt-1'>
            <button
              onClick={handlePrevPage}
              className={`bg-red-500 hover:bg-red-700 text-white rounded px-3 py-1 text-sm font-semibold mx-2 my-2 cursor-pointer ${
                page === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              className={`bg-red-500 hover:bg-red-700 text-white rounded px-3 py-1 text-sm font-semibold mx-2 my-2 cursor-pointer ${
                page === totalPages ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {!loading && movies.length === 0 && (
        <div className='container mx-auto pt-4'>
          <div className='text-center py-8'>
            <p className='text-gray-600'>No movies available at the moment.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendedMovies;
