async function updateOccupiedSeatsInHall(BASE_URL, hallUpdate) {
  const url = `${BASE_URL}/movie/${hallUpdate.movieId}/${hallUpdate.movieSession}`;
  try {
    console.log('UpdateSeatsInHall - Sending request to:', url);
    console.log('UpdateSeatsInHall - Request data:', JSON.stringify(hallUpdate, null, 2));
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hallUpdate),
    });

    console.log('UpdateSeatsInHall - Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('UpdateSeatsInHall - Failed. Status:', response.status, 'Error:', errorText);
      throw new Error(`Failed to update occupied seats. Status: ${response.status}, Error: ${errorText}`);
    }

    const responseData = await response.json();
    console.log('UpdateSeatsInHall - Success:', responseData);
    return true;
  } catch (error) {
    console.error('UpdateSeatsInHall - Error updating occupied seats:', error);
    return false;
  }
}

export default updateOccupiedSeatsInHall;
