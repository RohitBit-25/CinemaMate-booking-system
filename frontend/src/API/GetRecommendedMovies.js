async function GetRecommendedMovies(userId) {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/order/${userId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });

    if (response.status === 404) {
      console.log('User orders not found');
      return null;
    }

    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    
    // Validate the response structure
    if (!data || typeof data !== 'object') {
      console.warn('Invalid response structure from GetRecommendedMovies');
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching recommended movies:', error);
    return null;
  }
}

export default GetRecommendedMovies;
