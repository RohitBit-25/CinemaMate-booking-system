import React, { useEffect, useState } from 'react';

// Seat categories with cleaner, modern colors
const seatCategories = {
  premium: { price: 300, color: 'bg-cinema-gold', ring: 'ring-cinema-gold', name: 'Premium', rows: [0, 1] },
  gold: { price: 250, color: 'bg-amber-500', ring: 'ring-amber-500', name: 'Gold', rows: [2, 3, 4] },
  silver: { price: 150, color: 'bg-cinema-gray', ring: 'ring-cinema-gray', name: 'Silver', rows: [5, 6, 7] }
};

function SeatSelector({
  movie,
  selectedSeats,
  recommendedSeat,
  onSelectedSeatsChange,
  onRecommendedSeatChange,
}) {
  const [sessionTime, setSessionTime] = useState(null);

  // Function to get seat category based on row number
  const getSeatCategory = (row) => {
    if (row < 2) return 'premium';
    if (row < 5) return 'gold';
    return 'silver';
  };

  useEffect(() => {
    const storedMovieSession = JSON.parse(localStorage.getItem('movieSession'));
    if (storedMovieSession && storedMovieSession.time) {
      setSessionTime(storedMovieSession.time);
    }
  }, []);

  function handleSelectedState(seat) {
    const isSelected = selectedSeats.includes(seat);
    if (isSelected) {
      onSelectedSeatsChange(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
    } else {
      onSelectedSeatsChange([...selectedSeats, seat]);
    }
    onRecommendedSeatChange(null);
  }

  // Cinema row configuration
  const rowLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 8;
  
  const renderSeatGrid = () => {
    const rows = [];
    for (let row = 0; row < 8; row++) {
      const rowSeats = [];
      
      // Row Label
      rowSeats.push(
        <div key={`label-${row}`} className="flex items-center justify-center text-cinema-gray font-medium text-sm w-8">
          {rowLabels[row]}
        </div>
      );
      
      // Seats
      for (let seatInRow = 0; seatInRow < seatsPerRow; seatInRow++) {
        const seatIndex = row * seatsPerRow + seatInRow;
        const isSelected = selectedSeats.includes(seatIndex);
        const isOccupied = movie.occupied.includes(seatIndex);
        const isRecommended = selectedSeats.length === 0 && recommendedSeat === seatIndex;
        const category = getSeatCategory(row);
        const categoryConfig = seatCategories[category];
        
        // Base classes for a cleaner look
        let seatClasses = `
          w-10 h-10 m-1.5 rounded-t-lg rounded-b-md 
          flex items-center justify-center text-xs font-bold transition-all duration-300 
          cursor-pointer relative transform hover:scale-105
        `;
        
        if (isOccupied) {
          // Occupied: subtle dark styling, but visible
          seatClasses += ' bg-cinema-dark text-cinema-gray/50 cursor-not-allowed border border-cinema-gray/20';
        } else if (isSelected) {
          // Selected: vibrant primary color
          seatClasses += ' bg-cinema-red text-white shadow-lg shadow-cinema-red/40 scale-110 border-cinema-red';
        } else if (isRecommended) {
          // Recommended: subtle highlight
          seatClasses += ' bg-white text-cinema-black border-2 border-cinema-gold shadow-[0_0_15px_rgba(255,193,7,0.4)] animate-pulse font-bold';
        } else {
          // Available: categorized coloring, outlining for better visual hierarchy
          // KEY CHANGE: Removed text-transparent, added hover effects
          seatClasses += ` bg-cinema-dark/50 hover:bg-opacity-100 border-2 ${categoryConfig.ring.replace('ring', 'border')} text-gray-400 hover:text-white hover:bg-${categoryConfig.color.replace('bg-', '')}`;
        }
        
        rowSeats.push(
          <div
            key={seatIndex}
            className={seatClasses}
            onClick={isOccupied ? null : () => handleSelectedState(seatIndex)}
            title={`Row ${rowLabels[row]} Seat ${seatInRow + 1} - ${categoryConfig.name} (₹${categoryConfig.price})`}
          >
            {/* Simple seat design */}
            {isOccupied && <span className="text-lg">×</span>}
            {isSelected && <span className="text-white">✓</span>}
            {!isOccupied && !isSelected && <span className="group-hover:block">{seatInRow + 1}</span>}
          </div>
        );
      }
      
      rows.push(
        <div key={row} className="flex items-center justify-center mb-1">
          {rowSeats}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className='flex flex-col items-center w-full max-w-4xl mx-auto'>
       {sessionTime && (
         <div className="mb-10 flex items-center gap-2 px-4 py-2 bg-cinema-dark/50 rounded-full border border-cinema-gray/20">
           <span className="w-2 h-2 rounded-full bg-cinema-red animate-pulse"></span>
           <p className='text-sm text-cinema-gray font-medium'>
             Showtime: <span className="text-cinema-white">{sessionTime}</span>
           </p>
         </div>
       )}
      
      {/* Modern Curved Screen */}
      <div className="relative mb-16 w-3/4">
        {/* Screen Glow */}
        <div className="absolute -inset-1 bg-gradient-to-b from-cinema-blue/20 to-transparent blur-xl rounded-[50%] opacity-50"></div>
        
        {/* Actual Screen Element */}
        <div className="h-2 w-full bg-gradient-to-r from-transparent via-cinema-gray/50 to-transparent rounded-[50%] shadow-[0_10px_40px_-5px_rgba(255,255,255,0.2)]"></div>
        
        <p className="text-center text-xs tracking-[0.2em] text-cinema-gray/60 mt-4 uppercase">Screen</p>
      </div>

      {/* Seating Grid */}
      <div className='relative z-10'>
        {renderSeatGrid()}
      </div>

      <div className="mt-8 flex gap-8 text-xs text-cinema-gray font-medium">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-cinema-dark border border-cinema-gray/20"></div>
          <span>Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-cinema-red border border-cinema-red"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-cinema-gold"></div>
          <span>Premium</span>
        </div>
      </div>
    </div>
  );
}

export default SeatSelector;