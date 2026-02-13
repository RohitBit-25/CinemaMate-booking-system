async function BuyTickets(BASE_URL, formData) {
  try {
    console.log('BuyTickets - Sending request to:', `${BASE_URL}/order`);
    console.log('BuyTickets - Request data:', JSON.stringify(formData, null, 2));
    
    const response = await fetch(`${BASE_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log('BuyTickets - Response status:', response.status);
    console.log('BuyTickets - Response headers:', response.headers);

    if (response.ok) {
      const responseData = await response.json();
      console.log('BuyTickets - Order successful:', responseData);
      return true;
    } else {
      const errorText = await response.text();
      console.error('BuyTickets - Order failed. Status:', response.status, 'Error:', errorText);
      return false;
    }
  } catch (error) {
    console.error('BuyTickets - Network error occurred while ordering:', error);
    return false;
  }
}

export default BuyTickets;
