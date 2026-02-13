import React, { useEffect, useState } from 'react';
import FetchMoviesByGenre from '../API/FetchMoviesByGenre';
import RecommendedMovieCard from './RecommendedMovieCard';

// Map textual genres to TMDB IDs
const genreMap = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Family: 10751,
  Fantasy: 14,
  Mystery: 9648,
  'Sci-Fi': 878,
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
  const [loading, setLoading] = useState(true);
  const [recommendationReason, setRecommendationReason] = useState('Based on popular demand');

  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN || '';

  useEffect(() => {
    const getRecommendations = async () => {
      setLoading(true);
      try {
        // 1. Try to get user preferences from local storage
        const prefs = JSON.parse(localStorage.getItem('userPreferences'));
        let targetGenreIds = [];

        if (prefs && prefs.genres) {
          // Find top genres
          const sortedGenres = Object.entries(prefs.genres)
            .sort(([, a], [, b]) => b - a)
            .map(([genre]) => genre);
          
          if (sortedGenres.length > 0) {
            const topGenre = sortedGenres[0];
            setRecommendationReason(`Because you like ${topGenre}`);
            
            // Convert top 3 genres to IDs
            targetGenreIds = sortedGenres.slice(0, 3)
              .map(g => genreMap[g] || genreMap[g.replace(' ', '')]) // Handle potential spacing differences
              .filter(id => id); // Remove undefined
          }
        }

        // 2. Fallback to Action/Comedy if no prefs
        if (targetGenreIds.length === 0) {
          targetGenreIds = [28, 35, 12]; // Action, Comedy, Adventure
          setRecommendationReason('Trending Now');
        }

        // 3. Fetch movies
        const response = await FetchMoviesByGenre(ACCESS_TOKEN, 1, targetGenreIds);
        if (response && response.filteredMovies) {
          // Shuffle and slice to show random 4 movies
          const shuffled = response.filteredMovies.sort(() => 0.5 - Math.random());
          setMovies(shuffled.slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to load recommendations', err);
      } finally {
        setLoading(false);
      }
    };

    getRecommendations();
  }, [ACCESS_TOKEN]);

  if (loading) return null; // Hide while loading to avoid layout jump
  if (movies.length === 0) return null;

  return (
    <div className="mb-12 animate-fade-in">
      <div className="flex items-center justify-between mb-6 px-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-cinema-gold flex items-center gap-2">
            <span className="text-3xl">✨</span> Recommended For You
          </h2>
          <p className="text-cinema-gray text-sm mt-1 border-l-2 border-cinema-red pl-2">
            {recommendationReason}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {movies.map((movie, index) => (
          <div key={movie.id} className="transform hover:-translate-y-2 transition-transform duration-300">
             <RecommendedMovieCard movie={movie} hallNumber={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedMovies;
