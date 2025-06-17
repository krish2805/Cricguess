import React from 'react';

const QuestionCard = ({ question, options, onAnswer, currentStep }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 animate-slide-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-cricket-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">❓</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {question}
          </h2>
        </div>

        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(option)}
              className="w-full p-4 text-left bg-gray-50 hover:bg-cricket-50 rounded-xl border-2 border-transparent hover:border-cricket-200 transition-all duration-300 transform hover:scale-102 hover:shadow-md group"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-cricket-100 group-hover:bg-cricket-200 rounded-full flex items-center justify-center mr-4 transition-colors duration-300">
                  <span className="text-sm font-semibold text-cricket-700">
                    {String.fromCharCode(65 + index)}
                  </span>
                </div>
                <span className="font-medium text-gray-700 group-hover:text-cricket-800">
                  {option}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
