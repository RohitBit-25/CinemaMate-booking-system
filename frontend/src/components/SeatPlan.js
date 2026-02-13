import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BuyTickets from '../API/BuyTickets';
import getSeatPlan from '../API/GetSeatPlan';
import updateSeatsInHall from '../API/UpdateSeatsInHall';
import generateRandomOccupiedSeats from '../utils/GenerateRandomOccupiedSeats';
import MovieSessions from '../mockData/MovieSessions';
import SeatSelector from './SeatSelector';
import SeatShowcase from './SeatShowcase';
import Ticket from './Ticket';

// Indian cinema seat categories like IndiaHallShow
const seatCategories = {
  premium: { price: 300, color: 'bg-yellow-400', name: 'Premium', rows: [0, 1] },
  gold: { price: 250, color: 'bg-orange-400', name: 'Gold', rows: [2, 3, 4] },
  silver: { price: 150, color: 'bg-gray-400', name: 'Silver', rows: [5, 6, 7] }
};

const movies = [
  {
    title: '',
    occupied: generateRandomOccupiedSeats(1, 64, 64),
  },
];

function SeatPlan({ movie }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [recommendedSeat, setRecommendedSeat] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);
  const navigate = useNavigate();
  const [movieSession, setMovieSession] = useState(null);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  const [seatPlan, setSeatPlan] = useState(null);
  
  // Loading and error states for better user feedback
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingStep, setBookingStep] = useState('');

  // Function to get seat category based on seat number
  const getSeatCategory = (seatNumber) => {
    const row = Math.floor(seatNumber / 8); // Assuming 8 seats per row
    if (seatCategories.premium.rows.includes(row)) return 'premium';
    if (seatCategories.gold.rows.includes(row)) return 'gold';
    return 'silver';
  };

  // Function to get seat price based on category
  const getSeatPrice = (seatNumber) => {
    const category = getSeatCategory(seatNumber);
    return seatCategories[category].price;
  };

  useEffect(() => {
    const storedMovieSession = JSON.parse(localStorage.getItem('movieSession'));
    if (storedMovieSession) {
      setMovieSession(storedMovieSession);
    }
  }, []);

  useEffect(() => {
    const fetchSeatPlan = async () => {
      try {
        if (movieSession && movieSession.time) {
          // Convert OMDb movie ID to numeric ID for backend API call
          const numericMovieId = movie.id ? parseInt(movie.id.replace(/\D/g, '')) || Math.abs(movie.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) : Date.now();
          const data = await getSeatPlan(numericMovieId, movieSession);
          setSeatPlan(data);
        }
      } catch (error) {
        console.error('Error fetching seat plan:', error);
      }
    };

    if (movieSession) {
      fetchSeatPlan();
    }
  }, [movie.id, movieSession]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserName(storedUser.userName);
      setUserId(storedUser.userId);
    }
  }, []);

  const occupiedSeats =
    seatPlan && seatPlan.length > 0 ? seatPlan : movies[0].occupied;

  const availableSeats = [27, 28, 29, 30, 35, 36, 37, 38, 43, 44, 45, 46];

  const filteredAvailableSeats = availableSeats.filter(
    (seat) => !occupiedSeats.includes(seat),
  );

  useEffect(() => {
    let recommended = null;
    for (let i = 0; i < filteredAvailableSeats.length; i++) {
      const seat = filteredAvailableSeats[i];
      if (!occupiedSeats.includes(seat)) {
        recommended = seat;
        break;
      }
    }
    setRecommendedSeat(recommended);
  }, [filteredAvailableSeats, occupiedSeats]);

  let selectedSeatText = '';
  if (selectedSeats.length > 0) {
    selectedSeatText = selectedSeats.map((seat) => seat + 1).join(', ');
  }

  // Calculate pricing breakdown like IndiaHallShow
  const basePrice = selectedSeats.reduce((total, seatNumber) => {
    return total + getSeatPrice(seatNumber);
  }, 0);
  
  const convenienceFee = selectedSeats.length > 0 ? 25 * selectedSeats.length : 0; // ₹25 per ticket
  const handlingCharges = selectedSeats.length > 0 ? 15 : 0; // ₹15 flat handling charge
  const taxes = Math.round((basePrice + convenienceFee) * 0.18); // 18% GST
  const totalPrice = basePrice + convenienceFee + handlingCharges + taxes;

  const isAnySeatSelected = selectedSeats.length > 0;

  const handleButtonClick = async (e) => {
    e.preventDefault();
    const isAnySeatSelected = selectedSeats.length > 0;

    if (isAnySeatSelected) {
      try {
        // Validation checks before booking
        if (!movieSession || !movieSession.time) {
          throw new Error('Please select a show time before booking tickets.');
        }

        if (!movie || !movie.id) {
          throw new Error('Movie information is missing. Please refresh the page.');
        }

        if (!BASE_URL) {
          throw new Error('Backend connection is not configured. Please check your setup.');
        }

        console.log('Starting booking process...');
        console.log('Movie Session:', movieSession);
        console.log('Selected Seats:', selectedSeats);
        console.log('Movie object structure:', movie);
        console.log('Movie title:', movie?.title || movie?.Title);
        console.log('Movie genres:', movie?.genres || movie?.Genre);

        // Clear any previous errors and start loading
        setBookingError('');
        setIsBooking(true);
        setShowSuccess(false);

        const orderSeats = selectedSeats;
        const updatedOccupiedSeats = [...orderSeats, ...occupiedSeats];

        const order = {
          customerId: userId || Math.floor(Math.random() * 1000000),
          userName: userName || '',
          orderDate: new Date().toISOString(),
          seats: [...orderSeats, ...occupiedSeats],
          seat: orderSeats,
          movie: {
            id: movie.id,
            title: movie.title || movie.Title || 'Movie Title',
            genres: movie.genres ? 
              (Array.isArray(movie.genres) ? movie.genres.map((genre) => genre.name).join(', ') : movie.genres) :
              (movie.Genre || 'Unknown'),
            runtime: movie.runtime || movie.Runtime || 0,
            language: movie.original_language || movie.Language || 'English',
            price: totalPrice, // Use total price including fees
          },
        };

        // Convert OMDb movie ID (string like "tt1234567") to numeric ID for backend
        const numericMovieId = movie.id ? parseInt(movie.id.replace(/\D/g, '')) || Math.abs(movie.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) : Date.now();
        
        const myOrder = {
          customerId: order.customerId,
          orderDate: order.orderDate,
          movieId: numericMovieId,
          movieTitle: order.movie.title,
          movieGenres: order.movie.genres,
          movieRuntime: order.movie.runtime,
          movieLanguage: order.movie.language,
          moviePrice: order.movie.price,
          basePrice: basePrice,
          convenienceFee: convenienceFee,
          handlingCharges: handlingCharges,
          taxes: taxes,
          seat: order.seat,
          userName: order.userName,
          // Also include the nested movie object for backward compatibility
          movie: order.movie,
        };

        const hallUpdate = {
          movieId: numericMovieId,
          movieSession: movieSession.time,
          orderTime: order.orderDate,
          updatedSeats: updatedOccupiedSeats,
        };

        // Step 1: Update seats in cinema hall
        setBookingStep('Reserving seats...');
        console.log('Updating seat occupancy...');
        const updateSuccess = await updateSeatsInHall(BASE_URL, hallUpdate);

        if (updateSuccess) {
          console.log('Seat occupancy updated successfully');
          
          // Step 2: Create booking order
          setBookingStep('Confirming booking...');
          console.log('Processing booking...');
          const buyTickets = await BuyTickets(BASE_URL, myOrder);
          
          if (buyTickets) {
            setBookingStep('Generating ticket...');
            console.log('Booking successful!');
            setCompletedOrder(myOrder);
            setSuccessPopupVisible(true);
            setShowSuccess(true);
            
            // Show success message briefly
            setTimeout(() => {
              setShowSuccess(false);
            }, 3000);
          } else {
            throw new Error('Failed to create booking order');
          }
        } else {
          throw new Error('Failed to update seat occupancy');
        }
      } catch (error) {
        console.error('Booking failed:', error);
        
        // Provide specific error messages based on the error type
        let errorMessage = 'Booking failed. Please try again.';
        
        if (error.message.includes('Movie session')) {
          errorMessage = 'Please select a show time before booking tickets.';
        } else if (error.message.includes('Movie information')) {
          errorMessage = 'Movie data is missing. Please refresh the page and try again.';
        } else if (error.message.includes('Backend connection')) {
          errorMessage = 'Unable to connect to booking service. Please check your internet connection.';
        } else if (error.message.includes('seat occupancy')) {
          errorMessage = 'Failed to reserve seats. They may have been taken by another user.';
        } else if (error.message.includes('booking order')) {
          errorMessage = 'Seats reserved but failed to create booking. Please contact support.';
        } else if (error.message.includes('NetworkError') || error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        } else {
          errorMessage = error.message || 'Unexpected error occurred. Please try again.';
        }
        
        setBookingError(errorMessage);
      } finally {
        setIsBooking(false);
        setBookingStep('');
      }
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full md:w-1/2 lg:w-2/3 px-6'>
        <h2 className='mb-8 text-2xl font-semibold text-center'>
          Choose your seats by clicking on the available seats
        </h2>

        {/* Movie Session Selection */}
        {movie && !movieSession && (
          <div className='mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
            <h3 className='text-lg font-semibold mb-3 text-blue-900'>Select Show Time</h3>
            <p className='text-sm text-blue-700 mb-4'>Please select a show time to continue with seat selection:</p>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
              {MovieSessions(movie, 1).slice(0, 8).map((session, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMovieSession(session);
                    localStorage.setItem('movieSession', JSON.stringify(session));
                  }}
                  className='bg-white hover:bg-blue-100 border border-blue-300 rounded-lg px-3 py-2 text-sm font-medium text-blue-900 transition-colors duration-200'
                >
                  {session.time}
                  <br />
                  <span className='text-xs text-blue-600'>{session.language}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {movieSession && (
          <div className='mb-4 p-3 bg-green-50 border border-green-200 rounded-lg'>
            <div className='flex items-center justify-between'>
              <div>
                <span className='text-green-800 font-medium'>Selected Show: </span>
                <span className='text-green-900 font-bold'>{movieSession.time}</span>
                <span className='text-green-700 ml-2'>{movieSession.language}</span>
              </div>
              <button
                onClick={() => {
                  setMovieSession(null);
                  localStorage.removeItem('movieSession');
                }}
                className='text-green-600 hover:text-green-800 text-sm underline'
              >
                Change Time
              </button>
            </div>
          </div>
        )}
      </div>

      <div className='CinemaPlan max-w-5xl mx-auto w-full'>
        {/* Mobile-friendly seat container with horizontal scroll */}
        <div className="w-full overflow-x-auto pb-8 pt-4 px-4 scrollbar-hide">
          <div className="min-w-max mx-auto">
            <SeatSelector
              movie={{ ...movies[0], occupied: occupiedSeats }}
              selectedSeats={selectedSeats}
              recommendedSeat={recommendedSeat}
              onSelectedSeatsChange={(selectedSeats) =>
                setSelectedSeats(selectedSeats)
              }
              onRecommendedSeatChange={(recommendedSeat) =>
                setRecommendedSeat(recommendedSeat)
              }
            />
          </div>
        </div>
        <SeatShowcase />

        <div className='info mb-8 p-6 bg-cinema-dark rounded-2xl border border-cinema-gray/10 shadow-xl'>
          <div className='flex items-center justify-between mb-4'>
            <p className='text-lg text-cinema-gray'>
              Selected Seats: {' '}
              <span className='font-bold text-cinema-white ml-2 text-xl'>
                {selectedSeats.length > 0 ? selectedSeatText : 'None'}
              </span>
            </p>
            <div className='bg-cinema-black/50 px-4 py-2 rounded-lg'>
              <span className='text-cinema-gray text-sm'>Count: </span>
              <span className='text-cinema-red font-bold text-lg'>{selectedSeats.length}</span>
            </div>
          </div>
          
          {selectedSeats.length > 0 && (
            <div className="mt-6 border-t border-cinema-gray/20 pt-6">
              <h4 className="font-display font-bold mb-4 text-xl text-cinema-gold">Booking Summary</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Seat Details */}
                <div className="space-y-2">
                  <h5 className="font-medium mb-3 text-cinema-white border-b border-cinema-gray/20 pb-2">Seat Breakdown</h5>
                  {selectedSeats.map((seat) => {
                    const category = getSeatCategory(seat);
                    const price = getSeatPrice(seat);
                    return (
                      <div key={seat} className="flex justify-between text-sm text-cinema-gray">
                        <span>Seat {seat + 1} ({seatCategories[category].name})</span>
                        <span className="text-cinema-white">₹{price}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Price Breakdown */}
                <div className="bg-cinema-black/30 p-4 rounded-xl space-y-3">
                  <div className="flex justify-between text-sm text-cinema-gray">
                    <span>Tickets ({selectedSeats.length})</span>
                    <span>₹{basePrice}</span>
                  </div>
                  <div className="flex justify-between text-sm text-cinema-gray">
                    <span>Convenience Fee</span>
                    <span>₹{convenienceFee}</span>
                  </div>
                  <div className="flex justify-between text-sm text-cinema-gray">
                    <span>Handling Charges</span>
                    <span>₹{handlingCharges}</span>
                  </div>
                  <div className="flex justify-between text-sm text-cinema-gray">
                    <span>GST (18%)</span>
                    <span>₹{taxes}</span>
                  </div>
                  <div className="border-t border-cinema-gray/20 my-2 pt-2 flex justify-between font-bold text-lg items-center">
                    <span className="text-cinema-white">Total Amount</span>
                    <span className='text-cinema-gold text-2xl'>₹{totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Booking Status Messages */}
        {bookingError && (
          <div className='mb-6 p-4 bg-red-900/20 border border-cinema-red text-cinema-red rounded-xl animate-fade-in'>
            <div className='flex items-center gap-3'>
              <span className='text-2xl'>❌</span>
              <div>
                <p className='font-bold'>Booking Failed</p>
                <p className='text-sm opacity-90'>{bookingError}</p>
              </div>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-cinema-black/80 backdrop-blur-md animate-fade-in'>
            <div className='bg-cinema-dark rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 transform animate-bounce-in border border-cinema-gold/30 relative overflow-hidden'>
              {/* Gold Glow Effect */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cinema-gold via-yellow-200 to-cinema-gold"></div>
              
              {/* Celebration Header */}
              <div className='text-center mb-8'>
                <div className='text-7xl mb-4 animate-bounce'>🎉</div>
                <h2 className='text-3xl font-display font-bold text-cinema-white mb-2 tracking-wide'>
                  BOOKING CONFIRMED
                </h2>
                <p className='text-cinema-gray text-lg'>
                  See you at the movies!
                </p>
              </div>

              {/* Ticket Details */}
              <div className='bg-cinema-black/50 rounded-2xl p-6 mb-6 border border-cinema-gray/20'>
                <div className='grid grid-cols-2 gap-y-6 gap-x-4 text-center'>
                  <div>
                    <p className='text-xs uppercase tracking-wider text-cinema-gray mb-1'>Movie</p>
                    <p className='font-bold text-cinema-white truncate'>{movie?.title || movie?.Title}</p>
                  </div>
                  <div>
                    <p className='text-xs uppercase tracking-wider text-cinema-gray mb-1'>Seats</p>
                    <p className='font-bold text-cinema-white'>{selectedSeats.length}</p>
                  </div>
                  <div>
                    <p className='text-xs uppercase tracking-wider text-cinema-gray mb-1'>Show Time</p>
                    <p className='font-bold text-cinema-gold'>{movieSession?.time}</p>
                  </div>
                  <div>
                    <p className='text-xs uppercase tracking-wider text-cinema-gray mb-1'>Amount</p>
                    <p className='font-bold text-cinema-green text-green-400'>₹{totalPrice}</p>
                  </div>
                </div>
              </div>

              {/* QR Code Indicator */}
              <div className='bg-cinema-white/5 p-4 rounded-xl text-center mb-6 border border-dashed border-cinema-gray/30'>
                <p className='font-mono text-cinema-gold mb-1'>QR TICKET GENERATED</p>
                <p className='text-xs text-cinema-gray'>Check your dashboard for details</p>
              </div>

              {/* Auto-close indicator */}
              <div className='mt-2 text-center'>
                <div className='w-full bg-cinema-gray/20 rounded-full h-1 mt-2 overflow-hidden'>
                  <div className='bg-cinema-gold h-1 rounded-full animate-progress' style={{width: '100%', animation: 'shrink 3s linear'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Progress Indicator */}
        {isBooking && (
          <div className='mb-6 p-6 bg-cinema-black/80 border border-cinema-blue/30 rounded-xl backdrop-blur-sm'>
            <div className='flex items-center gap-4'>
              <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cinema-blue'></div>
              <div className='flex-1'>
                <p className='font-semibold text-lg text-cinema-white mb-1'>Processing Your Booking</p>
                <p className='text-sm text-cinema-blue-light animate-pulse'>{bookingStep || 'Please wait...'}</p>
              </div>
            </div>
          </div>
        )}

        {isAnySeatSelected ? (
          <div className="my-8">
            <button
              className={`${
                isBooking 
                  ? 'bg-cinema-gray cursor-not-allowed opacity-50' 
                  : 'bg-gradient-to-r from-cinema-red to-red-700 hover:from-red-500 hover:to-cinema-red shadow-lg shadow-cinema-red/30 transform hover:scale-[1.02]'
              } text-white rounded-xl px-8 py-4 text-xl font-bold transition-all duration-300 w-full flex items-center justify-center`}
              onClick={handleButtonClick}
              disabled={isBooking}
            >
              {isBooking ? (
                <>
                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3'></div>
                  {bookingStep || 'Processing...'}
                </>
              ) : (
                `CONFIRM BOOKING - ₹${totalPrice}`
              )}
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className='text-cinema-gray animate-bounce'>
              Tap on available seats to select
            </p>
          </div>
        )}

        {successPopupVisible && completedOrder && (
          <Ticket 
            order={completedOrder} 
            onClose={() => {
              setSuccessPopupVisible(false);
              setCompletedOrder(null);
              navigate('/');
            }}
          />
        )}
      </div>
    </div>
  );
}

export default SeatPlan;
