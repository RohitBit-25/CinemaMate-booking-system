import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import QRScanner from '../components/QRScanner';
import Search from '../components/Search';
import { logout } from '../utils/Auth';

function NavBar({ user, onSearch, onLogin, onLogout }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div>
      <div className='navbar flex flex-col lg:flex-row container mx-auto py-4 bg-cinema-black/95 backdrop-blur-sm shadow-xl relative z-50 border-b border-cinema-dark/50'>
        <div className='mx-5 mb-2 lg:mb-0'>
          <a
            className='text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cinema-gold to-cinema-red hover:to-cinema-gold transition-all duration-300'
            href='/'
          >
            CinemaMate
          </a>
        </div>
        <div className='flex-grow lg:flex lg:justify-end items-center'>
          <Search onSearch={onSearch} />
        </div>
        <div className='flex flex-col lg:flex-row justify-center items-center mr-5'>
          <div className='lg:flex lg:justify-center min-[200px]:space-x-2 sm:space-x-2 lg:space-x-2'>
            {/* QR Scanner - Available to all users */}
            <button
              className='bg-cinema-dark text-cinema-gray hover:text-white hover:bg-cinema-red/20 rounded-lg px-3 py-2 text-sm font-semibold cursor-pointer h-9 border border-cinema-gray/20 transition-all duration-200 flex items-center space-x-2 group'
              onClick={() => setShowQRScanner(true)}
              title="Scan Ticket QR Code"
            >
              <span className="group-hover:scale-110 transition-transform">📱</span>
              <span>Scan QR</span>
            </button>

            {user ? (
              <button
                className='bg-cinema-red text-white hover:bg-red-700 rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer h-9 shadow-lg shadow-cinema-red/20 transition-all duration-200'
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  className='text-cinema-gray hover:text-white font-medium px-4 py-2 text-sm transition-colors duration-200'
                  onClick={() => setShowLoginForm(true)}
                >
                  Login
                </button>
                <button
                  className='bg-gradient-to-r from-cinema-red to-red-600 text-white hover:shadow-lg hover:shadow-cinema-red/30 rounded-lg px-5 py-2 text-sm font-semibold cursor-pointer h-9 transition-all duration-200'
                  onClick={() => setShowRegistrationForm(true)}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Login/Register Modals */}
      {(showLoginForm || showRegistrationForm) && (
        <div className='fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg popup'>
            {showLoginForm && (
              <LoginForm
                onClose={() => setShowLoginForm(false)}
                onLogin={onLogin}
              />
            )}
            {showRegistrationForm && (
              <RegistrationForm
                onClose={() => setShowRegistrationForm(false)}
              />
            )}
          </div>
        </div>
      )}

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <QRScanner
          onClose={() => {
            setShowQRScanner(false);
            setScanResult(null);
          }}
          onScanResult={(result) => {
            setScanResult(result);
            setShowQRScanner(false);
            // Auto-close success message after 8 seconds
            setTimeout(() => {
              setScanResult(null);
            }, 8000);
          }}
        />
      )}

      {/* Enhanced Success Message for Scanned Tickets */}
      {scanResult && !showQRScanner && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transform animate-bounce-in'>
            {/* Success Header */}
            <div className='bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-6 text-center'>
              <div className='text-6xl mb-3'>🎉</div>
              <h2 className='text-2xl font-bold mb-1'>Ticket Verified Successfully!</h2>
              <p className='text-green-100 text-sm'>Entry approved for IndiaHallShow Cinema</p>
            </div>

            {/* Ticket Details */}
            <div className='p-6 space-y-4'>
              <div className='text-center'>
                <h3 className='text-xl font-bold text-gray-800 mb-4'>
                  {scanResult.movieTitle}
                </h3>
              </div>

              <div className='bg-gray-50 rounded-lg p-4 space-y-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600 font-medium'>Customer:</span>
                  <span className='font-bold text-gray-800'>{scanResult.customerName}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600 font-medium'>Booking ID:</span>
                  <span className='font-mono text-sm bg-blue-100 px-2 py-1 rounded text-blue-800'>
                    {scanResult.bookingId}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600 font-medium'>Seats:</span>
                  <span className='font-bold text-blue-600'>
                    {scanResult.seats.map(s => s + 1).join(', ')}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600 font-medium'>Amount:</span>
                  <span className='font-bold text-green-600'>₹{scanResult.totalAmount}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600 font-medium'>Show Time:</span>
                  <span className='font-semibold text-gray-700'>
                    {new Date(scanResult.orderDate).toLocaleString('en-IN', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex space-x-3 pt-4'>
                <button
                  onClick={() => setScanResult(null)}
                  className='flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105'
                >
                  🎉 Proceed to Entry
                </button>
                <button
                  onClick={() => setScanResult(null)}
                  className='px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200'
                >
                  Close
                </button>
              </div>

              {/* Success Icon Animation */}
              <div className='text-center pt-2'>
                <div className='inline-flex items-center space-x-2 text-green-600'>
                  <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                  <span className='text-sm font-medium'>Valid Ticket • Entry Permitted</span>
                  <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
