function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getRandomOffset(hallNumber, seed) {
  const offsets = [
    [0, 15, 45],
    [0, 15, 45],
    [0, 15, 45],
    [0, 15, 45],
    [0, 15, 45],
    [0, 15, 45],
  ];

  if (offsets[hallNumber]) {
    const options = offsets[hallNumber];
    return options[Math.floor(seededRandom(seed) * options.length)];
  } else {
    return 0;
  }
}

function MovieSessions(movie, hallNumber) {
  // Enhanced language handling for OMDb API
  const getLanguageCode = () => {
    if (movie.original_language) return movie.original_language.toUpperCase();
    if (movie.Language) {
      // Extract first language from OMDb Language field (e.g., "English, Hindi" -> "EN")
      const firstLang = movie.Language.split(',')[0].trim();
      const langMap = {
        'English': 'EN',
        'Hindi': 'HI',
        'Tamil': 'TA',
        'Telugu': 'TE',
        'Bengali': 'BN',
        'Malayalam': 'ML',
        'Kannada': 'KN',
        'Gujarati': 'GU',
        'Marathi': 'MR',
        'Punjabi': 'PA'
      };
      return langMap[firstLang] || firstLang.substring(0, 2).toUpperCase();
    }
    return 'EN';
  };
  
  const language = '🔊 ' + getLanguageCode();
  const currentTime = new Date(); 
  const sessionStartTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 9, 0, 0); 
  const sessionEndTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1, 0, 0, 0); 
  const sessionDuration = 195;
  const movieSessions = [];

  const seed = hallNumber * 100;

  while (sessionStartTime <= sessionEndTime) {
    const offsetMinutes = getRandomOffset(hallNumber, seed);
    const sessionTime = new Date(sessionStartTime);
    sessionTime.setMinutes(sessionTime.getMinutes() + offsetMinutes);

    if (sessionTime <= sessionEndTime) {
      movieSessions.push({
        time: sessionTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        language,
      });
    }

    sessionStartTime.setMinutes(sessionStartTime.getMinutes() + sessionDuration);
  }

  return movieSessions;
}

export default MovieSessions;
