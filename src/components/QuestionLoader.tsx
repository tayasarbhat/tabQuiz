import React from 'react';

interface QuestionLoaderProps {
  currentQuestion: number;
}

const QuestionLoader: React.FC<QuestionLoaderProps> = ({ currentQuestion }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-900/90 to-purple-900/90 backdrop-blur-lg transition-all duration-500">
      <div className="text-center">
        <div className="relative w-48 h-48 mx-auto mb-8">
          {/* Spinning outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 animate-[spin_3s_linear_infinite]" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-[spin_2s_linear_infinite]" />
          
          {/* Inner pulsing circle */}
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 animate-pulse flex items-center justify-center">
            <span className="text-4xl font-bold text-white">{currentQuestion}</span>
          </div>
          
          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
            <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 rounded-full bg-indigo-400 blur-[2px]" />
          </div>
          <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
            <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 rounded-full bg-purple-400 blur-[2px]" />
          </div>
        </div>
        
        {/* Loading text with gradient */}
        <div className="relative">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Loading Question {currentQuestion}
          </div>
          
          {/* Animated progress bar */}
          <div className="mt-4 w-64 h-2 mx-auto bg-gray-700/30 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-[loading_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionLoader;