import FilterValidMovies from '../utils/filterValidMovies';

async function FetchMoviesBySearch(ACCESS_TOKEN, page, searchText) {
  // OMDb API search endpoint
  const url = `http://www.omdbapi.com/?s=${encodeURIComponent(searchText)}&apikey=${ACCESS_TOKEN}&page=${page}&type=movie`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });
    const data = await response.json();

    if (data.Response === "True" && data.Search) {
      // Transform OMDb search results to match TMDb format
      const transformedMovies = data.Search.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        name: movie.Title, // For compatibility
        media_type: 'movie',
        overview: '', // OMDb search doesn't provide plot
        release_date: movie.Year,
        poster_path: movie.Poster !== "N/A" ? movie.Poster : null,
        backdrop_path: movie.Poster !== "N/A" ? movie.Poster : null,
        vote_average: 0, // Not available in search
        genre_ids: [], // Not available in search
        adult: false,
        // Add default language since OMDb search doesn't provide language info
        original_language: 'en', // Default to English
        Language: 'English' // Default to English
      }));

      const filteredMovies = FilterValidMovies(transformedMovies).filter(
        (movie) => movie.poster_path !== null,
      );

      // OMDb doesn't provide total pages info, so we estimate
      const totalResults = parseInt(data.totalResults) || 0;
      const totalPages = Math.ceil(totalResults / 10); // OMDb returns 10 results per page

      return { filteredMovies, totalPages };
    } else {
      console.log('No movies found or API error:', data.Error);
      return { filteredMovies: [], totalPages: 0 };
    }
  } catch (error) {
    console.error('Error fetching movies by search:', error);
    return { filteredMovies: [], totalPages: 0 };
  }
}

export default FetchMoviesBySearch;
