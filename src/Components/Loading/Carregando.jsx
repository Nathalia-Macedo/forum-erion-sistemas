import React from 'react';

const Loading = () => {
  const words = ['ERION', 'SISTEMAS'];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0A0E45] z-50">
      <div className="text-white text-4xl md:text-6xl font-semibold font-['Poppins'] flex space-x-4">
        {words.map((word, wordIndex) => (
          <div key={wordIndex}>
            {word.split('').map((letter, letterIndex) => (
              <span 
                key={letterIndex} 
                className="inline-block animate-pulse"
                style={{ animationDelay: `${(wordIndex * word.length + letterIndex) * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 animate-gradient-x"></div>
    </div>
  );
};

export default Loading;

