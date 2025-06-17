import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-cricket-100 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-3xl">🤔</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Thinking...</h2>
          <p className="text-gray-600">Analyzing your answers to make my guess</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-cricket-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
          
          <div className="bg-cricket-50 rounded-xl p-4">
            <p className="text-sm text-cricket-700">
              Processing cricket database...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;