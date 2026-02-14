import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="bg-cinema-black relative pt-16 pb-8 border-t border-white/5">
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cinema-gold/20 to-transparent"></div>
      
      <footer className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-gray-300">
          {/* Brand Section */}
          <div className="space-y-4">
             <div className='flex items-center space-x-2'>
                <div className="text-2xl animate-bounce">🎬</div>
                <h3 className='text-2xl font-display font-bold tracking-tight text-white'>
                  Cinema<span className="text-cinema-red">Mate</span>
                </h3>
             </div>
            <p className="text-sm font-light leading-relaxed text-gray-400">
              Immerse yourself in the ultimate cinematic experience. From Bollywood blockbusters to Hollywood premieres, we bring the magic to you.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm border-l-2 border-cinema-gold pl-3">Explore</h4>
            <ul className="space-y-3 text-sm flex flex-col">
              <Link to="/" className="hover:text-cinema-gold transition-colors cursor-pointer w-fit">Now Showing</Link>
              <Link to="/coming-soon" className="hover:text-cinema-gold transition-colors cursor-pointer w-fit">Coming Soon</Link>
              <Link to="/offers" className="hover:text-cinema-gold transition-colors cursor-pointer w-fit">Offers & Deals</Link>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm border-l-2 border-cinema-red pl-3">Support</h4>
            <ul className="space-y-3 text-sm flex flex-col">
              <Link to="/support" className="hover:text-cinema-red transition-colors cursor-pointer w-fit">Help Center</Link>
              <Link to="/support" className="hover:text-cinema-red transition-colors cursor-pointer w-fit">Contact Us</Link>
              <Link to="/support" className="hover:text-cinema-red transition-colors cursor-pointer w-fit">Privacy Policy</Link>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm border-l-2 border-purple-500 pl-3">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cinema-gold hover:text-black transition-all duration-300 transform hover:-translate-y-1">📱</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cinema-red hover:text-white transition-all duration-300 transform hover:-translate-y-1">📷</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1">🐦</a>
            </div>
            <p className="mt-6 text-xs text-gray-500">
                Subscribe to our newsletter for exclusive updates.
            </p>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm font-light">
            &copy; {new Date().getFullYear()} <span className="text-white font-semibold">CinemaMate</span>. All rights reserved. <span className="mx-2">|</span> Made with ❤️ for movie lovers.
          </p>
        </div>
      </footer>
    </div>
  );
}
