import React from 'react';

const Offers = () => {
  const offers = [
    {
      id: 1,
      title: "ICICI Bank Weekend Bonanza",
      description: "Get flat 20% off on movie tickets booked using ICICI Bank Credit Cards.",
      code: "ICICI20",
      color: "from-orange-600 to-red-600",
      icon: "💳"
    },
    {
      id: 2,
      title: "Student Special",
      description: "Show your student ID and get buy 1 get 1 free on weekday matinee shows.",
      code: "STUDENT50",
      color: "from-blue-600 to-cyan-600",
      icon: "🎓"
    },
    {
      id: 3,
      title: "Late Night Thrills",
      description: "Flat ₹100 off on shows after 10 PM. Applicable on all genres.",
      code: "NIGHT100",
      color: "from-purple-600 to-indigo-600",
      icon: "🌙"
    },
    {
      id: 4,
      title: "Popcorn Combo Deal",
      description: "Pre-book your snacks and save 15% on large popcorn combos.",
      code: "SNACK15",
      color: "from-yellow-500 to-orange-500",
      icon: "🍿"
    }
  ];

  return (
    <div className="min-h-screen bg-cinema-black text-white pt-24 pb-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cinema-gold to-yellow-200">Exclusive</span> Offers
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Grab the best deals on blockbuster movies, food, and beverages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer) => (
            <div key={offer.id} className="group relative overflow-hidden rounded-2xl bg-cinema-dark border border-white/10 hover:border-cinema-gold/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cinema-gold/10">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${offer.color} opacity-20 blur-3xl rounded-full transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700`}></div>
              
              <div className="p-8 relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${offer.color} flex items-center justify-center text-4xl shadow-lg`}>
                  {offer.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-cinema-gold transition-colors">{offer.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{offer.description}</p>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-white/5 border border-white/10 border-dashed px-4 py-2 rounded-lg font-mono text-cinema-gold tracking-widest font-bold">
                      {offer.code}
                    </div>
                    <button 
                        onClick={() => navigator.clipboard.writeText(offer.code)}
                        className="text-xs text-gray-500 hover:text-white transition-colors"
                        title="Copy Code"
                    >
                        📋 Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
