import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleChange = (event) => {
    const searchText = event.target.value;
    updateSearch(searchText);
  };

  const updateSearch = (text) => {
    setSearch(text);
    onSearch(text);
  };

  const clearSearch = () => {
    updateSearch('');
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        updateSearch(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert("Browser doesn't support speech recognition. Try Chrome or Edge!");
    }
  };

  return (
    <div className='mx-5 relative w-full lg:w-auto'>
      <div className="relative group">
        <input
          type='text'
          placeholder={isListening ? 'Listening...' : 'Search movies...'}
          className={`
            pl-10 pr-20 py-2 rounded-full h-10 w-full md:w-72 
            bg-cinema-dark/50 border border-cinema-gray/30 text-cinema-white placeholder-cinema-gray/70
            focus:outline-none focus:border-cinema-gold/50 focus:ring-1 focus:ring-cinema-gold/30 
            transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md
            ${isListening ? 'animate-pulse border-cinema-red/70 ring-2 ring-cinema-red/30' : ''}
          `}
          value={search}
          onChange={handleChange}
        />
        
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <span className="text-cinema-gray group-hover:text-cinema-gold transition-colors">🔍</span>
        </div>

        {/* Actions (Clear & Voice) */}
        <div className="absolute inset-y-0 right-2 flex items-center gap-1">
          {search && (
            <button
              onClick={clearSearch}
              className="p-1 rounded-full text-cinema-gray hover:text-cinema-red hover:bg-cinema-white/10 transition-all"
              title="Clear search"
            >
              ✕
            </button>
          )}
          
          <button
            onClick={startListening}
            className={`
              p-1.5 rounded-full transition-all duration-300
              ${isListening 
                ? 'bg-cinema-red text-white scale-110 shadow-lg shadow-cinema-red/40 animate-pulse' 
                : 'text-cinema-gold hover:bg-cinema-gold/10 hover:scale-110'
              }
            `}
            title="Search by voice"
          >
            {isListening ? '🎙️' : '🎤'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
