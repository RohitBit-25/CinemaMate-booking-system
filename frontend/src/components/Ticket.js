import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

function Ticket({ order, onClose }) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // Generate QR code data URL
  useEffect(() => {
    if (!order) return;
    
    const generateQRCode = async () => {
      try {
        // Create a unique ticket data object for QR code
        const ticketData = {
          bookingId: `CM${order.customerId}`,
          movieTitle: order.movieTitle || order.movie?.title,
          customerName: order.userName || 'Guest',
          seats: order.seat || [],
          movieId: order.movieId,
          orderDate: order.orderDate,
          totalAmount: order.moviePrice || order.movie?.price,
          cinemaName: 'CinemaMate',
          verification: 'VALID_TICKET'
        };

        // Generate QR code as data URL
        const qrDataUrl = await QRCode.toDataURL(JSON.stringify(ticketData), {
          width: 200,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        
        setQrCodeUrl(qrDataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, [order]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getLanguageDisplay = (lang) => {
    const languageMap = {
      'en': 'English',
      'hi': 'Hindi',
      'ta': 'Tamil',
      'te': 'Telugu',
      'bn': 'Bengali',
      'ml': 'Malayalam',
      'kn': 'Kannada',
      'gu': 'Gujarati',
      'mr': 'Marathi',
      'pa': 'Punjabi'
    };
    return languageMap[lang] || lang.charAt(0).toUpperCase() + lang.slice(1);
  };

  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transform transition-all animate-bounce-in">
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-cinema-red to-red-800 text-white px-6 py-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl font-bold transition-colors z-10"
          >
            ×
          </button>
          <div className="text-4xl mb-2 drop-shadow-md relative z-10">🎬</div>
          <h2 className="text-3xl font-display font-bold mb-1 tracking-wide drop-shadow-sm relative z-10">
            <span className="text-cinema-gold">Cinema</span>Mate
          </h2>
          <p className="text-white/90 text-sm font-medium tracking-wider uppercase relative z-10">Admit One</p>
        </div>

        {/* Ticket Body */}
        <div className="px-6 py-6 space-y-4">
          {/* Movie Info */}
          <div className="text-center border-b pb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {order.movieTitle || order.movie?.title || 'Movie Title'}
            </h3>
            <div className="flex justify-center space-x-4 text-sm text-gray-600">
              <span>{order.movieGenres || order.movie?.genres || 'Genre'}</span>
              <span>•</span>
              <span>{order.movieRuntime || order.movie?.runtime || 0} min</span>
              <span>•</span>
              <span>{getLanguageDisplay(order.movieLanguage || order.movie?.language || 'en')}</span>
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-900 font-medium">Date & Time:</span>
              <div className="text-right">
                <div className="font-bold text-gray-900">{formatDate(order.orderDate)}</div>
                <div className="text-sm text-gray-700">{formatTime(order.orderDate)}</div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-900 font-medium">Seats:</span>
              <span className="font-bold text-red-600">
                {order.seat.map(s => s + 1).join(', ')}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-900 font-medium">Customer:</span>
              <span className="font-bold text-gray-900">{order.userName || 'Guest'}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-900 font-medium">Booking ID:</span>
              <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded text-gray-900 font-bold">
                CM{order.customerId}
              </span>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="border-t pt-4">
            {order.basePrice && (
              <div className="space-y-1 text-sm mb-3">
                <div className="flex justify-between">
                  <span>Tickets ({order.seat.length})</span>
                  <span>₹{order.basePrice}</span>
                </div>
                {order.convenienceFee && (
                  <div className="flex justify-between">
                    <span>Convenience Fee</span>
                    <span>₹{order.convenienceFee}</span>
                  </div>
                )}
                {order.handlingCharges && (
                  <div className="flex justify-between">
                    <span>Handling Charges</span>
                    <span>₹{order.handlingCharges}</span>
                  </div>
                )}
                {order.taxes && (
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{order.taxes}</span>
                  </div>
                )}
              </div>
            )}
            <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
              <span>Total Paid:</span>
              <span className="text-red-600">₹{order.moviePrice || order.movie?.price || 0}</span>
            </div>
          </div>

          {/* QR Code */}
          <div className="text-center pt-4">
            <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden border-2 border-gray-200 mb-3">
              {qrCodeUrl ? (
                <img 
                  src={qrCodeUrl} 
                  alt="Ticket QR Code" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-gray-100 w-full h-full flex items-center justify-center">
                  <div className="text-gray-400 text-xs">Generating QR...</div>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mb-2">Show this QR code at the cinema</p>
            <p className="text-xs text-green-600 font-semibold">✓ Valid Ticket</p>
            
            {/* Download QR Code Button */}
            {qrCodeUrl && (
              <div className="mt-3">
                <a
                  href={qrCodeUrl}
                  download={`CinemaMate-Ticket-${order.customerId}.png`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-full transition-colors duration-200"
                >
                  💾 Save QR Code
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Decorative Perforated Edge */}
        <div className="relative">
          <div className="absolute inset-x-0 top-0 flex justify-center">
            <div className="bg-white w-8 h-8 rounded-full border-8 border-gray-100"></div>
          </div>
          <svg className="w-full h-4 text-gray-100" viewBox="0 0 400 20">
            <path d="M0,10 Q10,0 20,10 T40,10 T60,10 T80,10 T100,10 T120,10 T140,10 T160,10 T180,10 T200,10 T220,10 T240,10 T260,10 T280,10 T300,10 T320,10 T340,10 T360,10 T380,10 T400,10" 
                  fill="currentColor"/>
          </svg>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center">
          <p className="text-xs text-gray-500">
            Thank you for booking with CinemaMate!
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Please arrive 15 minutes before show time
          </p>
        </div>
      </div>
    </div>
  );
}

export default Ticket;