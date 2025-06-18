import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionCard from './components/QuestionCard';
import LoadingScreen from './components/LoadingScreen';
import ResultScreen from './components/ResultScreen';
import ProgressBar from './components/ProgressBar';
import ClueScreen from './components/cluescreen';
import { baseQuestions, roleBasedQuestions } from './data/questions';
import { fetchPlayerClues } from './utils/cricketPredictor';
import { matchClueToPlayer } from './utils/cricketPredictor';


function App() {
  const [gameState, setGameState] = useState('welcome');
  const [questions, setQuestions] = useState(baseQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [clues, setClues] = useState([]);
  const [players, setPlayers] = useState([]);
  const [currentClueIndex, setCurrentClueIndex] = useState(0);
  const [confirmedClues, setConfirmedClues] = useState([]);


  const handleStart = () => {
    setGameState('playing');
    setQuestions(baseQuestions);
    setCurrentQuestion(0);
    setAnswers([]);
    setPrediction(null);
    setClues([]);
    setCurrentClueIndex(0);
  };

  const handleAnswer = async (answer) => {
    
    const currentQ = questions[currentQuestion];
    const newAnswers = [...answers, { key: currentQ.key, value: answer }];
    setAnswers(newAnswers);


    // Add role-specific questions if the current one is role
    if (currentQ.key === 'role') {
      const roleQuestions = roleBasedQuestions[answer] || [];
      setQuestions((prev) => [...prev, ...roleQuestions]);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameState('loading');
      try {
        const response = await fetchPlayerClues(newAnswers); // { players, clues }
        console.log("Clue API response:", response); // 🔍  

        if (!response.clues || response.clues.length === 0) {
        setPrediction({ name: '❌ No Match found for your guess', confidence: '0' });
        setGameState('result');
        return;
      }

      setClues(response.clues);
      setPlayers(response.players);
      setGameState('clues');

    } catch (error) {
      console.error('Prediction failed:', error);
      setPrediction({ name: '❌ Prediction failed', confidence: 'Unknown' });
      setGameState('result');
    }
  }
};

  const handleClueResponse = async (isYes) => {
  const clue = clues[currentClueIndex];

  if (isYes) {
    try {
      // Only send the single current clue
      const result = await matchClueToPlayer([clue], players);

      setPrediction({ name: result, confidence: ` 99.99` });
    } catch (err) {
      console.error('Clue match failed:', err);
      setPrediction({ name: '❌ Unknown', confidence: 'Uncertain' });
    }
    setGameState('result');
  } else {
    if (currentClueIndex + 1 < clues.length) {
      setCurrentClueIndex(currentClueIndex + 1);
    } else {
      setPrediction({ name: '❌ Could not identify', confidence: 'Low' });
      setGameState('result');
    }
  }
};


  const handlePlayAgain = () => {
    setGameState('welcome');
  };

  const renderScreen = () => {
    switch (gameState) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStart} />;

      case 'playing':
        return (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-lg w-full">
              <ProgressBar
                currentStep={currentQuestion + 1}
                totalSteps={questions.length}
              />
              <QuestionCard
                question={questions[currentQuestion].question}
                options={questions[currentQuestion].options}
                onAnswer={handleAnswer}
                currentStep={currentQuestion + 1}
              />
            </div>
          </div>
        );

      case 'loading':
        return <LoadingScreen />;

      case 'clues':
        return (
         <ClueScreen
            clue={clues[currentClueIndex]}
            onYes={() => handleClueResponse(true)}
            onNo={() => handleClueResponse(false)}
/>

        );

      case 'result':
        return (
          <ResultScreen
            prediction={prediction.name}
            confidence={prediction.confidence}
            onPlayAgain={handlePlayAgain}
          />
        );

      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return <div className="font-sans">{renderScreen()}</div>;
}

export default App;
