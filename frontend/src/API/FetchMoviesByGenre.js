async function FetchMoviesByGenre(ACCESS_TOKEN, page, genreIds) {
  // OMDb doesn't support genre-based discovery like TMDb
  // Instead, we'll search for popular movies by genre names
  // This is a workaround since OMDb is more limited
  
  try {
    // Map genre IDs to genre names (from our static list)
    const genreMap = {
      1: 'Action', 2: 'Adventure', 3: 'Animation', 4: 'Biography', 5: 'Comedy',
      6: 'Crime', 7: 'Documentary', 8: 'Drama', 9: 'Family', 10: 'Fantasy',
      11: 'History', 12: 'Horror', 13: 'Music', 14: 'Mystery', 15: 'Romance',
      16: 'Sci-Fi', 17: 'Sport', 18: 'Thriller', 19: 'War', 20: 'Western'
    };

    if (genreIds.length === 0) {
      // If no genre selected, return popular movies (search for common terms)
      const searchTerms = ['movie', 'film', 'cinema'];
      const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
      
      const url = `http://www.omdbapi.com/?s=${randomTerm}&apikey=${ACCESS_TOKEN}&page=${page}&type=movie`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "True" && data.Search) {
        const transformedMovies = data.Search.map(movie => ({
          id: movie.imdbID,
          title: movie.Title,
          name: movie.Title,
          media_type: 'movie',
          overview: '',
          release_date: movie.Year,
          poster_path: movie.Poster !== "N/A" ? movie.Poster : null,
          backdrop_path: movie.Poster !== "N/A" ? movie.Poster : null,
          vote_average: 0,
          genre_ids: [],
          adult: false,
          // Add default language
          original_language: 'en',
          Language: 'English'
        }));

        const filteredMovies = transformedMovies.filter(
          (movie) => movie.poster_path !== null,
        );

        const totalResults = parseInt(data.totalResults) || 0;
        const totalPages = Math.ceil(totalResults / 10);

        return { filteredMovies, totalPages };
      }
    } else {
      // Search by the first selected genre
      const selectedGenre = genreMap[genreIds[0]] || 'movie';
      const url = `http://www.omdbapi.com/?s=${selectedGenre}&apikey=${ACCESS_TOKEN}&page=${page}&type=movie`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "True" && data.Search) {
        const transformedMovies = data.Search.map(movie => ({
          id: movie.imdbID,
          title: movie.Title,
          name: movie.Title,
          media_type: 'movie',
          overview: '',
          release_date: movie.Year,
          poster_path: movie.Poster !== "N/A" ? movie.Poster : null,
          backdrop_path: movie.Poster !== "N/A" ? movie.Poster : null,
          vote_average: 0,
          genre_ids: genreIds,
          adult: false,
          // Add default language
          original_language: 'en',
          Language: 'English'
        }));

        const filteredMovies = transformedMovies.filter(
          (movie) => movie.poster_path !== null,
        );

        const totalResults = parseInt(data.totalResults) || 0;
        const totalPages = Math.ceil(totalResults / 10);

        return { filteredMovies, totalPages };
      }
    }

    return { filteredMovies: [], totalPages: 0 };
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return { filteredMovies: [], totalPages: 0 };
  }
}

export default FetchMoviesByGenre;
