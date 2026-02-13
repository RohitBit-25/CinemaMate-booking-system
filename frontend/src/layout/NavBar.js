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
      <div className='navbar flex flex-col lg:flex-row container mx-auto py-4 px-6 bg-cinema-black/90 backdrop-blur-md shadow-2xl relative z-50 border-b border-cinema-gold/10 sticky top-0 transition-all duration-300'>
        <div className='flex justify-between items-center w-full lg:w-auto mb-4 lg:mb-0'>
          <a
            className='text-3xl md:text-4xl font-display font-bold tracking-tight'
            href='/'
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cinema-gold via-yellow-200 to-cinema-gold drop-shadow-sm">Cinema</span>
            <span className="text-cinema-red">Mate</span>
          </a>
          
          {/* Mobile Menu Toggle could act here if implemented */}
        </div>

        <div className='flex-grow lg:flex lg:justify-end items-center gap-4'>
          <div className="w-full lg:w-auto transform transition-all focus-within:scale-105">
            <Search onSearch={onSearch} />
          </div>
        </div>

        <div className='flex flex-col lg:flex-row justify-center items-center lg:ml-6 mt-4 lg:mt-0'>
          <div className='flex items-center space-x-3'>
            {/* QR Scanner - Available to all users */}
            <button
              className='group flex items-center space-x-2 bg-cinema-dark/50 hover:bg-cinema-dark text-cinema-gray hover:text-cinema-gold border border-cinema-gray/20 hover:border-cinema-gold/30 rounded-full px-4 py-2 transition-all duration-300'
              onClick={() => setShowQRScanner(true)}
              title="Scan Ticket QR Code"
            >
              <span className="group-hover:scale-110 transition-transform duration-300">📱</span>
              <span className="font-medium text-sm">Scan QR</span>
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden md:block text-right">
                  <p className="text-xs text-cinema-gray">Logged in as</p>
                  <p className="text-sm font-bold text-cinema-gold">{user.userName}</p>
                </div>
                <button
                  className='bg-gradient-to-r from-cinema-red to-red-700 text-white shadow-lg shadow-cinema-red/20 hover:shadow-cinema-red/40 rounded-full px-5 py-2 text-sm font-bold tracking-wide transition-all duration-300 transform hover:-translate-y-0.5'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  className='text-cinema-gray hover:text-cinema-white font-medium px-4 py-2 text-sm transition-colors duration-200'
                  onClick={() => setShowLoginForm(true)}
                >
                  Login
                </button>
                <button
                  className='bg-gradient-to-r from-cinema-gold to-orange-500 text-cinema-black hover:text-black shadow-lg shadow-cinema-gold/20 hover:shadow-cinema-gold/40 rounded-full px-6 py-2 text-sm font-bold tracking-wide transition-all duration-300 transform hover:-translate-y-0.5'
                  onClick={() => setShowRegistrationForm(true)}
                >
                  Sign Up
                </button>
              </div>
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
