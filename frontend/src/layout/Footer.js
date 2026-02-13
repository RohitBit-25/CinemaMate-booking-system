import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="mt-12 bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div>
              <h3 className="text-2xl font-bold text-red-500 mb-4">IndiaHallShow</h3>
              <p className="text-gray-400 text-sm">
                India's largest cinema booking platform. Book your tickets for the latest movies.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Movies</li>
                <li>Cinemas</li>
                <li>Offers</li>
                <li>Gift Cards</li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Help & FAQ</li>
                <li>Contact Us</li>
                <li>Feedback</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
            
            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <span className="text-2xl">📱</span>
                <span className="text-2xl">📧</span>
                <span className="text-2xl">🐦</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
            <p>&copy; {currentYear} IndiaHallShow. All rights reserved. | Made with ❤️ for Indian Cinema</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
