// Test utility to verify OMDb API integration
// This can be imported and used in any component for testing

export const testOMDbIntegration = async () => {
  const API_KEY = process.env.REACT_APP_API_KEY || process.env.REACT_APP_OMDB_API_KEY;
  
  console.log('🧪 Testing OMDb API Integration...');
  console.log('API Key:', API_KEY ? 'Present' : 'Missing');
  
  if (!API_KEY) {
    console.error('❌ API Key is missing!');
    return false;
  }

  try {
    // Test 1: Search functionality
    console.log('📋 Test 1: Search functionality');
    const searchResponse = await fetch(`http://www.omdbapi.com/?s=batman&apikey=${API_KEY}&type=movie`);
    const searchData = await searchResponse.json();
    
    if (searchData.Response === "True") {
      console.log('✅ Search test passed - Found', searchData.Search?.length, 'movies');
    } else {
      console.log('❌ Search test failed:', searchData.Error);
      return false;
    }

    // Test 2: Movie details functionality
    console.log('📋 Test 2: Movie details functionality');
    const detailsResponse = await fetch(`http://www.omdbapi.com/?i=tt0372784&apikey=${API_KEY}&plot=full`);
    const detailsData = await detailsResponse.json();
    
    if (detailsData.Response === "True") {
      console.log('✅ Details test passed - Movie:', detailsData.Title);
    } else {
      console.log('❌ Details test failed:', detailsData.Error);
      return false;
    }

    console.log('🎉 All OMDb API tests passed!');
    return true;
    
  } catch (error) {
    console.error('❌ API Integration test failed:', error);
    return false;
  }
};

export default testOMDbIntegration;