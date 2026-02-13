import React, { useState, useRef } from 'react';

function QRScanner({ onScanResult, onClose }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Handle file upload for QR code scanning
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsScanning(true);
      setError('');
      
      // Create a canvas to process the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // For demo purposes, we'll simulate QR code reading
        // In a real implementation, you'd use a QR code reading library
        setTimeout(() => {
          setIsScanning(false);
          // Simulate successful scan
          simulateQRScan();
        }, 2000);
      };
      
      img.src = URL.createObjectURL(file);
    }
  };

  // Simulate QR code scanning and verify with backend
  const simulateQRScan = async () => {
    try {
      // Create a mock ticket data that would be in a QR code
      const mockTicketData = {
        bookingId: `IHS${Math.floor(Math.random() * 1000000)}`,
        movieTitle: 'Sample Movie',
        customerName: 'John Doe',
        seats: [1, 2],
        movieId: 12345,
        orderDate: new Date().toISOString(),
        totalAmount: 500,
        cinemaName: 'IndiaHallShow',
        verification: 'VALID_TICKET'
      };

      // Verify ticket with backend
      const response = await fetch(`${BASE_URL}/verify-ticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockTicketData),
      });

      if (response.ok) {
        const verificationResult = await response.json();
        if (verificationResult.valid) {
          setScanResult(mockTicketData);
          onScanResult(mockTicketData);
        } else {
          setError('Ticket verification failed: ' + verificationResult.message);
        }
      } else {
        setError('Unable to verify ticket. Please try again.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setError('Network error. Unable to verify ticket.');
    }
  };

  // Manual QR data input for testing
  const handleManualInput = async () => {
    setIsScanning(true);
    setError('');

    const mockData = {
      bookingId: `IHS${Math.floor(Math.random() * 1000000)}`,
      movieTitle: 'Test Movie',
      customerName: 'Test User',
      seats: [5, 6],
      movieId: 54321,
      orderDate: new Date().toISOString(),
      totalAmount: 750,
      cinemaName: 'IndiaHallShow',
      verification: 'VALID_TICKET'
    };
    
    try {
      // Verify with backend
      const response = await fetch(`${BASE_URL}/verify-ticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockData),
      });

      if (response.ok) {
        const verificationResult = await response.json();
        if (verificationResult.valid) {
          setScanResult(mockData);
          onScanResult(mockData);
        } else {
          setError('Ticket verification failed: ' + verificationResult.message);
        }
      } else {
        setError('Unable to verify ticket. Please try again.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setError('Network error. Unable to verify ticket.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold"
          >
            ×
          </button>
          <h2 className="text-xl font-bold">🎫 Scan Ticket QR Code</h2>
          <p className="text-blue-100 text-sm mt-1">Verify ticket authenticity</p>
        </div>

        <div className="p-6">
          {!scanResult ? (
            <div className="space-y-4">
              {/* Upload Section */}
              <div className="text-center">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors">
                  <div className="text-4xl mb-3">📱</div>
                  <h3 className="text-lg font-semibold mb-2">Upload QR Code Image</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Select a QR code image from your device
                  </p>
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isScanning}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400"
                  >
                    {isScanning ? 'Scanning...' : 'Choose Image'}
                  </button>
                </div>
              </div>

              {/* Demo Section */}
              <div className="text-center border-t pt-4">
                <p className="text-gray-500 text-sm mb-3">For demonstration:</p>
                <button
                  onClick={handleManualInput}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Simulate Valid Ticket Scan
                </button>
              </div>

              {/* Loading State */}
              {isScanning && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-gray-600">Processing QR code...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>
          ) : (
            /* Enhanced Scan Result */
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-6xl mb-3 animate-bounce">🎉</div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Ticket Verified Successfully!</h3>
                <p className="text-green-700 font-medium">✅ Entry Approved for IndiaHallShow Cinema</p>
                <div className="mt-2 flex justify-center">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    VALID TICKET
                  </div>
                </div>
              </div>

              {/* Enhanced Ticket Details */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 space-y-3 border border-green-200">
                <div className="text-center mb-3">
                  <h4 className="font-bold text-lg text-gray-800">{scanResult.movieTitle}</h4>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600 font-medium">🎫 Booking ID:</span>
                    <span className="font-mono text-sm bg-blue-100 px-2 py-1 rounded text-blue-800">
                      {scanResult.bookingId}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600 font-medium">👤 Customer:</span>
                    <span className="font-semibold text-gray-800">{scanResult.customerName}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600 font-medium">💺 Seats:</span>
                    <span className="font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      {scanResult.seats.map(s => s + 1).join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600 font-medium">💰 Amount:</span>
                    <span className="font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                      ₹{scanResult.totalAmount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600 font-medium">📅 Show Time:</span>
                    <span className="font-semibold text-gray-700 text-sm">
                      {new Date(scanResult.orderDate).toLocaleString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Success Animation */}
              <div className="text-center py-2">
                <div className="inline-flex items-center space-x-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Verification Complete • Entry Permitted</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    // Auto-close and show success in NavBar
                    onScanResult(scanResult);
                    onClose();
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  🎉 Entry Approved
                </button>
                <button
                  onClick={() => {
                    setScanResult(null);
                    setError('');
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Scan Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QRScanner;