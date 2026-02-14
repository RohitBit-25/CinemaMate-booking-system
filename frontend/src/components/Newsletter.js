import React, { useState } from 'react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');
        
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    return (
        <div className="relative py-20 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-cinema-dark/50 backdrop-blur-sm"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cinema-gold/10 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cinema-red/10 rounded-full blur-[100px] animate-pulse delay-700"></div>

            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="max-w-2xl mx-auto bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
                    <span className="text-5xl mb-4 block animate-bounce">🎟️</span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                        Get <span className="text-cinema-gold">Early Bird</span> Access
                    </h2>
                    <p className="text-gray-400 mb-8 text-lg">
                        Subscribe to our newsletter for exclusive movie premieres, VIP offers, and behind-the-scenes content.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cinema-gold/50 focus:ring-1 focus:ring-cinema-gold/50 transition-all"
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className={`
                                px-8 py-4 rounded-xl font-bold text-white transition-all duration-300
                                ${status === 'success' 
                                    ? 'bg-green-600 cursor-default' 
                                    : 'bg-gradient-to-r from-cinema-red to-red-700 hover:shadow-lg hover:shadow-cinema-red/30 hover:-translate-y-1'
                                }
                            `}
                        >
                            {status === 'loading' ? 'Sending...' : status === 'success' ? 'Subscribed! ✅' : 'Subscribe Now'}
                        </button>
                    </form>
                    
                    <p className="mt-4 text-xs text-center text-gray-500">
                        No spam, just movie magic. Unsubscribe anytime.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
