async function FetchGenres(ACCESS_TOKEN) {
  try {
    // OMDb doesn't provide a genres endpoint, so we return a static list
    // of common movie genres that can be used for filtering
    const staticGenres = [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Adventure' },
      { id: 3, name: 'Animation' },
      { id: 4, name: 'Biography' },
      { id: 5, name: 'Comedy' },
      { id: 6, name: 'Crime' },
      { id: 7, name: 'Documentary' },
      { id: 8, name: 'Drama' },
      { id: 9, name: 'Family' },
      { id: 10, name: 'Fantasy' },
      { id: 11, name: 'History' },
      { id: 12, name: 'Horror' },
      { id: 13, name: 'Music' },
      { id: 14, name: 'Mystery' },
      { id: 15, name: 'Romance' },
      { id: 16, name: 'Sci-Fi' },
      { id: 17, name: 'Sport' },
      { id: 18, name: 'Thriller' },
      { id: 19, name: 'War' },
      { id: 20, name: 'Western' }
    ];
    
    // Simulate API delay for consistency
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return staticGenres;
  } catch (error) {
    console.error('Error in FetchGenres:', error);
    return [];
  }
}

export default FetchGenres;
