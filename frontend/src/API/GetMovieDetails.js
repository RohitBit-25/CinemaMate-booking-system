async function FetchMovieDetails(id, API_KEY) {
    try {
      // OMDb API expects IMDb ID (starts with 'tt') or movie title
      // If id is a number (TMDb format), we'll search by title first
      let url;
      if (id.toString().startsWith('tt')) {
        // Already an IMDb ID
        url = `http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}&plot=full`;
      } else {
        // Assume it's a movie title or TMDb ID - search by IMDb ID if available
        url = `http://www.omdbapi.com/?i=tt${id.toString().padStart(7, '0')}&apikey=${API_KEY}&plot=full`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      // Transform OMDb response to match expected TMDb format
      if (data.Response === "True") {
        return {
          id: data.imdbID,
          title: data.Title,
          overview: data.Plot,
          release_date: data.Released,
          runtime: parseInt(data.Runtime) || 0,
          vote_average: parseFloat(data.imdbRating) || 0,
          poster_path: data.Poster !== "N/A" ? data.Poster : null,
          backdrop_path: data.Poster !== "N/A" ? data.Poster : null,
          genres: data.Genre ? data.Genre.split(', ').map(name => ({ name })) : [],
          production_companies: data.Production ? [{ name: data.Production }] : [],
          tagline: data.Plot,
          budget: 0,
          revenue: 0,
          // Add language information from OMDb
          original_language: data.Language ? data.Language.split(',')[0].trim().substring(0, 2).toLowerCase() : 'en',
          Language: data.Language || 'English',
          // Add missing fields that MovieDetails component expects
          production_countries: data.Country ? data.Country.split(', ').map(name => ({ name })) : [],
          spoken_languages: data.Language ? data.Language.split(', ').map(lang => ({ english_name: lang.trim() })) : [],
          homepage: data.Website && data.Website !== "N/A" ? data.Website : null
        };
      } else {
        console.error('OMDb API Error:', data.Error);
        return null;
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  };
  
  export default FetchMovieDetails;