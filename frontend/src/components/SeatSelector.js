import React, { useEffect, useState } from 'react';

// Seat categories matching the SeatPlan component
const seatCategories = {
  premium: { price: 300, color: 'bg-yellow-500 border-yellow-600', name: 'Premium', rows: [0, 1] },
  gold: { price: 250, color: 'bg-orange-500 border-orange-600', name: 'Gold', rows: [2, 3, 4] },
  silver: { price: 150, color: 'bg-gray-500 border-gray-600', name: 'Silver', rows: [5, 6, 7] }
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
    if (row < 3) return 'premium';  // Rows 0-2 are premium
    if (row < 6) return 'gold';     // Rows 3-5 are gold  
    return 'silver';                // Rows 6-7 are silver
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
      onSelectedSeatsChange(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat),
      );
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
      
      // Add row label
      rowSeats.push(
        <div key={`label-${row}`} className="flex items-center justify-center text-white font-bold text-lg w-8 h-12">
          {rowLabels[row]}
        </div>
      );
      
      // Add seats for this row
      for (let seatInRow = 0; seatInRow < seatsPerRow; seatInRow++) {
        const seatIndex = row * seatsPerRow + seatInRow;
        const isSelected = selectedSeats.includes(seatIndex);
        const isOccupied = movie.occupied.includes(seatIndex);
        const isRecommended = selectedSeats.length === 0 && recommendedSeat === seatIndex;
        
        // Realistic cinema seat styling with premium theater appearance
        let seatClasses = `cinema-seat w-12 h-16 cursor-pointer mx-1 my-2 transition-all duration-300 transform relative flex items-center justify-center text-sm font-bold shadow-lg hover:shadow-xl border-2 `;
        
        // Add realistic seat shape with armrests and curved design
        seatClasses += 'rounded-t-2xl rounded-b-lg before:content-[""] before:absolute before:-left-1 before:top-2 before:w-2 before:h-8 before:bg-current before:rounded-l-full before:opacity-40 ';
        seatClasses += 'after:content-[""] after:absolute after:-right-1 after:top-2 after:w-2 after:h-8 after:bg-current after:rounded-r-full after:opacity-40 ';
        
        if (isOccupied) {
          // OCCUPIED - Realistic dark red theater seat with worn look
          seatClasses += 'bg-gradient-to-b from-red-800 to-red-900 border-red-950 text-red-300 cursor-not-allowed opacity-70 shadow-inner';
        } else if (isSelected) {
          // SELECTED - Premium blue leather look with luxury feel
          seatClasses += 'bg-gradient-to-b from-blue-500 to-blue-700 border-blue-800 text-white scale-110 ring-4 ring-blue-300 shadow-blue-500/50';
          seatClasses += ' animate-pulse shadow-2xl';
        } else if (isRecommended) {
          // RECOMMENDED - Bright premium green with elegant glow
          seatClasses += 'bg-gradient-to-b from-green-400 to-green-600 border-green-700 text-white animate-pulse ring-4 ring-green-300 shadow-green-500/50';
          seatClasses += ' shadow-2xl';
        } else {
          // AVAILABLE seats with realistic theater category styling
          if (row >= 0 && row <= 2) {
            // Premium (A-C) - Luxurious golden leather seats
            seatClasses += 'bg-gradient-to-b from-yellow-400 via-amber-500 to-amber-600 border-amber-700 text-amber-900 hover:from-yellow-300 hover:via-amber-400 hover:to-amber-500 hover:scale-105 hover:ring-2 hover:ring-amber-300';
            seatClasses += ' shadow-amber-400/30';
          } else if (row >= 3 && row <= 5) {
            // Gold (D-F) - Rich orange premium seats
            seatClasses += 'bg-gradient-to-b from-orange-500 via-orange-600 to-orange-700 border-orange-800 text-white hover:from-orange-400 hover:via-orange-500 hover:to-orange-600 hover:scale-105 hover:ring-2 hover:ring-orange-300';
            seatClasses += ' shadow-orange-500/30';
          } else {
            // Silver (G-H) - Classic gray theater seats
            seatClasses += 'bg-gradient-to-b from-slate-400 via-slate-500 to-slate-600 border-slate-700 text-slate-100 hover:from-slate-300 hover:via-slate-400 hover:to-slate-500 hover:scale-105 hover:ring-2 hover:ring-slate-300';
            seatClasses += ' shadow-slate-500/30';
          }
        }
        
        rowSeats.push(
          <div
            key={seatIndex}
            className={seatClasses}
            onClick={isOccupied ? null : () => handleSelectedState(seatIndex)}
            title={`Seat ${rowLabels[row]}${seatInRow + 1} - ${getSeatCategory(row)} (₹${seatCategories[getSeatCategory(row)].price}) ${isOccupied ? '- OCCUPIED' : isSelected ? '- SELECTED' : isRecommended ? '- RECOMMENDED' : '- AVAILABLE'}`}
          >
            {isOccupied ? '✕' : isSelected ? '★' : isRecommended ? '♦' : seatInRow + 1}
          </div>
        );
      }
      
      rows.push(
        <div key={row} className="flex items-center justify-center gap-2 mb-2">
          {rowSeats}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className='Cinema bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-700'>
       {sessionTime && <p className='info mb-6 text-center text-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 py-3 px-6 rounded-xl shadow-lg'>🎬 Session Time: {sessionTime}</p>}
      
      {/* Wide Cinema Movie Screen */}
      <div className='screen-container mb-16 flex flex-col items-center perspective-1000'>
        {/* Cinema Screen Frame with Professional Mounting */}
        <div className='relative mb-8 transform-gpu'>
          {/* Professional Theater Frame */}
          <div className='absolute -inset-6 bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl border-4 border-gray-800'
               style={{boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 2px 10px rgba(255,255,255,0.1)'}}></div>
          {/* Wide Cinema Movie Screen */}
          <div className='screen relative w-full max-w-6xl rounded-lg shadow-2xl overflow-hidden border-8 border-gray-800' 
               style={{
                 height: '100px',
                 background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 20%, #f1f3f4 80%, #e9ecef 100%)',
                 transform: 'perspective(1000px) rotateX(-18deg) scale(1.1)',
                 transformStyle: 'preserve-3d',
                 aspectRatio: '2.35/1' // Wide cinema screen aspect ratio
               }}>
            
            {/* Screen Frame */}
            <div className='absolute -inset-3 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 rounded-2xl border-4 border-gray-700'></div>
            
            {/* Movie Screen Surface */}
            <div className='absolute inset-1 bg-gradient-to-b from-gray-100 via-white to-gray-200 rounded-lg overflow-hidden border-2 border-gray-300'
                 style={{
                   background: 'radial-gradient(ellipse at center, #ffffff 0%, #f8f9fa 50%, #f1f3f4 100%)'
                 }}>
              
              {/* Screen Texture - Subtle fabric pattern */}
              <div className='absolute inset-0 opacity-15' 
                   style={{
                     backgroundImage: `
                       repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(0,0,0,0.05) 1px, rgba(0,0,0,0.05) 2px),
                       repeating-linear-gradient(-45deg, transparent, transparent 1px, rgba(0,0,0,0.05) 1px, rgba(0,0,0,0.05) 2px)
                     `,
                     backgroundSize: '4px 4px'
                   }}></div>
              
              {/* Movie Content Preview Area */}
              <div className='absolute inset-4 bg-gradient-to-b from-gray-50 to-gray-100 rounded-md overflow-hidden border border-gray-200'>
                {/* Simulated Movie Preview */}
                <div className='absolute inset-0 flex items-center justify-center'>
                </div>
                
                {/* Movie Screen Shine Effect */}
                <div className='absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-30'></div>
                
                {/* Subtle Screen Shimmer */}
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20' 
                     style={{animation: 'screenShimmer 8s infinite linear'}}></div>
              </div>
              
              {/* Screen Reflection */}
              <div className='absolute inset-0 bg-gradient-to-br from-white via-transparent to-gray-100 opacity-40 rounded-lg'></div>
            </div>

            {/* Projector Light Effect */}
            <div className='absolute -top-12 left-1/2 transform -translate-x-1/2 w-full h-12 bg-gradient-to-b from-yellow-200 to-transparent opacity-20 rounded-t-full blur-sm'></div>
          </div>
          
          {/* Cinema Screen Mounting System */}
          <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2'>
            {/* Main Support Structure */}
            <div className='w-8 h-6 bg-gradient-to-b from-gray-600 to-gray-800 rounded-b-full shadow-lg relative'>
              <div className='absolute inset-1 bg-gradient-to-b from-gray-500 to-gray-700 rounded-b-full'></div>
            </div>
            {/* Side Brackets */}
            <div className='absolute -left-16 top-0 w-6 h-4 bg-gradient-to-b from-gray-600 to-gray-800 rounded-b-full shadow-md'></div>
            <div className='absolute -right-16 top-0 w-6 h-4 bg-gradient-to-b from-gray-600 to-gray-800 rounded-b-full shadow-md'></div>
          </div>
          
          {/* Realistic Screen Shadow with Depth */}
          <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-6 bg-gradient-to-r from-transparent via-black to-transparent opacity-30 rounded-full blur-xl'></div>
          <div className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4/5 h-3 bg-gradient-to-r from-transparent via-gray-900 to-transparent opacity-50 rounded-full blur-md'></div>
        </div>
      </div>

      {/* Cinema Seating Grid */}
      <div className='seating-area bg-gray-800 p-6 rounded-2xl shadow-inner border border-gray-700'>
        <div className="seats-grid">
          {renderSeatGrid()}
        </div>
        
        {/* Aisle indicator */}
        <div className="text-center mt-4 text-gray-400 text-sm">
          ← Aisle | Center Aisle | Aisle →
        </div>
      </div>
    </div>
  );
}

export default SeatSelector;