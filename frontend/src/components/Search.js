import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleChange = (event) => {
    const searchText = event.target.value;
    setSearch(searchText);
    onSearch(searchText); 
  };

  const clearSearch = () => {
    setSearch('');
    onSearch('');
  };

  return (
    <div className='mx-5 relative'>
      <div className="relative">
        <input
          type='text'
          placeholder='Search movies...'
          className='border-2 border-red-500 pl-10 pr-10 py-2 rounded-lg h-10 w-full md:w-64 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200 transition-all duration-200' 
          value={search}
          onChange={handleChange}
        />
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <span className="text-gray-400">🔍</span>
        </div>
        {search && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-red-600 transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
