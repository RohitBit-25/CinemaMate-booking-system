function SeatShowcase() {
  return (
    <div className="mb-8 bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-xl border border-gray-200">
      {/* Seat Categories */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
          <span className="text-3xl">🎬</span>
          Seat Categories & Pricing
          <span className="text-3xl">💺</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="flex flex-col items-center bg-gradient-to-br from-amber-100 to-amber-200 p-6 rounded-xl border-2 border-amber-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-14 rounded-2xl bg-amber-500 border-4 border-amber-700 flex items-center justify-center text-amber-900 text-lg font-black shadow-2xl mb-3">
              <span>P</span>
            </div>
            <h4 className="text-lg font-bold text-yellow-800 mb-1">Premium</h4>
            <p className="text-2xl font-bold text-yellow-700">₹300</p>
            <p className="text-sm text-yellow-600 mt-1">Rows A-C • Best View</p>
          </div>
          <div className="flex flex-col items-center bg-gradient-to-br from-orange-100 to-orange-200 p-6 rounded-xl border-2 border-orange-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-14 rounded-2xl bg-orange-600 border-4 border-orange-800 flex items-center justify-center text-white text-lg font-black shadow-2xl mb-3">
              <span>G</span>
            </div>
            <h4 className="text-lg font-bold text-orange-800 mb-1">Gold</h4>
            <p className="text-2xl font-bold text-orange-700">₹250</p>
            <p className="text-sm text-orange-600 mt-1">Rows D-F • Great View</p>
          </div>
          <div className="flex flex-col items-center bg-gradient-to-br from-slate-100 to-slate-200 p-6 rounded-xl border-2 border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-14 rounded-2xl bg-slate-400 border-4 border-slate-600 flex items-center justify-center text-slate-900 text-lg font-black shadow-2xl mb-3">
              <span>S</span>
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-1">Silver</h4>
            <p className="text-2xl font-bold text-gray-700">₹150</p>
            <p className="text-sm text-gray-600 mt-1">Rows G-H • Good View</p>
          </div>
        </div>
      </div>

      {/* Seat Status Legend */}
      <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-200">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
          <span className="text-2xl">�</span>
          Seat Status Guide
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-14 rounded-2xl bg-amber-500 border-4 border-amber-700 flex items-center justify-center text-amber-900 text-lg font-black shadow-2xl mb-2 hover:scale-110 transition-transform">
              1
            </div>
            <span className="text-sm font-bold text-amber-800">Available</span>
            <span className="text-xs text-amber-600 mt-1">Click to select</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-14 rounded-2xl bg-blue-600 border-4 border-blue-800 flex items-center justify-center text-white text-lg font-black shadow-2xl mb-2 ring-4 ring-blue-300 animate-pulse scale-110">
              ★
            </div>
            <span className="text-sm font-bold text-blue-800">Selected</span>
            <span className="text-xs text-blue-600 mt-1">Your choice</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gradient-to-br from-lime-50 to-lime-100 rounded-xl border border-lime-200 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-14 rounded-2xl bg-lime-500 border-4 border-lime-700 flex items-center justify-center text-white text-lg font-black shadow-2xl mb-2 animate-bounce ring-4 ring-lime-300">
              ♦
            </div>
            <span className="text-sm font-bold text-lime-800">Recommended</span>
            <span className="text-xs text-lime-600 mt-1">Best seats</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-14 rounded-2xl bg-red-700 border-4 border-red-900 flex items-center justify-center text-red-200 text-lg font-black shadow-2xl mb-2 opacity-60">
              ✕
            </div>
            <span className="text-sm font-bold text-red-800">Occupied</span>
            <span className="text-xs text-red-600 mt-1">Not available</span>
          </div>
        </div>
        
        {/* Instructions */}
        <div className="mt-6 p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl border border-indigo-200">
          <h4 className="text-lg font-bold text-indigo-800 mb-2 flex items-center gap-2">
            <span className="text-xl">💡</span>
            How to Book
          </h4>
          <ul className="text-sm text-indigo-700 space-y-1">
            <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Click on available seats to select them</li>
            <li className="flex items-center gap-2"><span className="text-blue-600">★</span> Selected seats will be highlighted in blue</li>
            <li className="flex items-center gap-2"><span className="text-purple-600">💎</span> Green recommended seats offer the best viewing experience</li>
            <li className="flex items-center gap-2"><span className="text-orange-600">🎬</span> Seat prices vary by row - Premium, Gold, and Silver</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SeatShowcase;
