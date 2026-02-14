import React from 'react';

const Support = () => {
  return (
    <div className="min-h-screen bg-cinema-black text-white pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">Hello! How can we help?</h1>
          <div className="relative max-w-xl mx-auto">
             <input 
                type="text" 
                placeholder="Search for help..." 
                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 pl-12 focus:outline-none focus:border-cinema-gold transition-colors"
             />
             <span className="absolute left-4 top-4 text-gray-500">🔍</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-cinema-dark p-8 rounded-2xl border border-white/5 text-center hover:border-white/20 transition-colors">
                <div className="text-4xl mb-4">🎫</div>
                <h3 className="text-xl font-bold mb-2">Bookings</h3>
                <p className="text-sm text-gray-400">View upcoming bookings, cancel tickets, and refund status.</p>
            </div>
             <div className="bg-cinema-dark p-8 rounded-2xl border border-white/5 text-center hover:border-white/20 transition-colors">
                <div className="text-4xl mb-4">💳</div>
                <h3 className="text-xl font-bold mb-2">Payments</h3>
                <p className="text-sm text-gray-400">Payment failures, refund rules, and offers.</p>
            </div>
             <div className="bg-cinema-dark p-8 rounded-2xl border border-white/5 text-center hover:border-white/20 transition-colors">
                <div className="text-4xl mb-4">👤</div>
                <h3 className="text-xl font-bold mb-2">Account</h3>
                <p className="text-sm text-gray-400">Profile settings, password reset, and membership.</p>
            </div>
        </div>

        <div className="bg-cinema-dark/50 p-8 rounded-2xl border border-white/5">
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Name" className="bg-cinema-black border border-white/10 rounded-lg px-4 py-3 focus:border-cinema-gold outline-none" />
                    <input type="email" placeholder="Email" className="bg-cinema-black border border-white/10 rounded-lg px-4 py-3 focus:border-cinema-gold outline-none" />
                </div>
                <textarea placeholder="Message" rows="4" className="w-full bg-cinema-black border border-white/10 rounded-lg px-4 py-3 focus:border-cinema-gold outline-none"></textarea>
                <button className="bg-cinema-red text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-colors">Send Message</button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
