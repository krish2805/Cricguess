import React from 'react';

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-cricket-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">🏏</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">CricGuess</h1>
          <p className="text-gray-600">Think of a cricket player and I'll try to guess who it is!</p>
        </div>
        
        <div className="mb-8">
          <div className="bg-cricket-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-cricket-800 mb-3">How to Play:</h3>
            <ul className="text-sm text-cricket-700 space-y-2 text-left">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-cricket-400 rounded-full mr-3"></span>
                Think of any cricket player
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-cricket-400 rounded-full mr-3"></span>
                Answer questions about them
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-cricket-400 rounded-full mr-3"></span>
                Watch me guess your player!
              </li>
            </ul>
          </div>
        </div>
        
        <button 
          onClick={onStart}
          className="btn-primary w-full text-lg"
        >
          Let's Play! 🚀
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;