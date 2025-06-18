import React from 'react';

const ResultScreen = ({ prediction, confidence, onPlayAgain }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cricket-400 to-cricket-600 rounded-full flex items-center justify-center animate-bounce-slow">
            <span className="text-3xl">🎯</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">My Guess is...</h2>
        </div>
        
        <div className="bg-gradient-to-br from-cricket-50 to-cricket-100 rounded-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-cricket-800 mb-2">{JSON.stringify(prediction) || 'unknown'}</h1>
          <div className="text-cricket-600 mb-4">
              <p className="font-medium">Confidence: {confidence}%</p> 
          </div>
          
          <div className="w-full bg-cricket-200 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-cricket-500 to-cricket-600 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={onPlayAgain}
            className="btn-primary w-full"
          >
            Play Again 🎮
          </button>
          
          <div className="text-sm text-gray-500">
            <p>Was I right? Let me know how I did!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;