function SeatShowcase() {
  return (
    <div className="mb-8 bg-cinema-dark p-6 rounded-2xl border border-cinema-gray/10">
      {/* Seat Categories */}
      <div className="mb-8 border-b border-cinema-gray/10 pb-8">
        <h3 className="text-xl font-display font-bold mb-6 text-center text-cinema-white flex items-center justify-center gap-2">
          Pricing & Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {/* Premium */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-cinema-black/40 border border-cinema-gold/20 hover:border-cinema-gold/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-cinema-gold/10 border border-cinema-gold text-cinema-gold flex items-center justify-center font-bold text-xl">
              P
            </div>
            <div>
              <h4 className="text-cinema-white font-bold">Premium</h4>
              <p className="text-cinema-gold text-lg font-bold">₹300</p>
              <p className="text-cinema-gray text-xs">Rows A-B</p>
            </div>
          </div>
          
          {/* Gold */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-cinema-black/40 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500 text-amber-500 flex items-center justify-center font-bold text-xl">
              G
            </div>
            <div>
              <h4 className="text-cinema-white font-bold">Gold</h4>
              <p className="text-amber-500 text-lg font-bold">₹250</p>
              <p className="text-cinema-gray text-xs">Rows C-E</p>
            </div>
          </div>

          {/* Silver */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-cinema-black/40 border border-cinema-gray/20 hover:border-cinema-gray/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-cinema-gray/10 border border-cinema-gray text-cinema-gray flex items-center justify-center font-bold text-xl">
              S
            </div>
            <div>
              <h4 className="text-cinema-white font-bold">Silver</h4>
              <p className="text-cinema-gray text-lg font-bold">₹150</p>
              <p className="text-cinema-gray text-xs">Rows F-H</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-cinema-black/20 p-4 rounded-xl border border-cinema-gray/10">
        <ul className="flex flex-wrap justify-center gap-6 text-sm text-cinema-gray">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cinema-white"></span>
            Click available seats to select
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cinema-red"></span>
            Selected seats turn red
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cinema-gold"></span>
             Premium seats offer best viewing
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SeatShowcase;
