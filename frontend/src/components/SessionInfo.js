import React from 'react';
import { Link } from 'react-router-dom';

const SessionInfo = ({ movieSessions, movieId }) => {
  const handleSessionSelect = (session) => {
    localStorage.setItem('movieSession', JSON.stringify(session));
  };

  return (
    <div className='space-y-2'>
      <h4 className='text-xs font-semibold text-cinema-gray mb-2 uppercase tracking-wider'>Show Times</h4>
      <div className='grid grid-cols-1 gap-2'>
        {movieSessions.slice(0, 3).map((session, index) => (
          <Link 
            key={index}
            to={`/movie/${movieId}`} 
            onClick={() => handleSessionSelect(session)}
            className='block group'
          >
            <button className='bg-cinema-black/50 border border-cinema-gray/20 hover:border-cinema-red/50 hover:bg-cinema-red/10 w-full rounded-lg text-cinema-white text-xs font-medium py-2 px-3 transition-all duration-300 flex justify-between items-center transform group-hover:translate-x-1'>
              <span className="font-mono text-cinema-gold">🕐 {session.time}</span>
              <span className='bg-cinema-dark border border-cinema-gray/30 rounded px-2 py-0.5 text-[10px] text-cinema-gray group-hover:text-cinema-white transition-colors'>
                {session.language || 'EN'}
              </span>
            </button>
          </Link>
        ))}
      </div>
      {movieSessions.length > 3 && (
        <Link to={`/movie/${movieId}`}>
          <button className='w-full text-cinema-red hover:text-cinema-gold text-xs font-medium py-1 border border-transparent hover:border-cinema-red/30 rounded-lg hover:bg-cinema-red/5 transition-all duration-300 mt-1'>
            +{movieSessions.length - 3} more shows
          </button>
        </Link>
      )}
    </div>
  );
};

export default SessionInfo;
