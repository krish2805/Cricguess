import React from 'react';

const ClueScreen = ({ clue, onYes, onNo }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 animate-slide-in text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-cricket-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">🧠</span>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Is the player known for:
        </h2>

        <p className="text-lg font-medium text-cricket-800 mb-6">
          {clue}
        </p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={onYes}
            className="px-6 py-3 bg-green-100 text-green-800 font-semibold rounded-xl hover:bg-green-200 transition duration-300"
          >
            Yes ✅
          </button>
          <button
            onClick={onNo}
            className="px-6 py-3 bg-red-100 text-red-800 font-semibold rounded-xl hover:bg-red-200 transition duration-300"
          >
            No ❌
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClueScreen;
