import React from 'react';
import { GameBoard } from './components/GameBoard';
import { GameControls } from './components/GameControls';
import { useSnakeGame } from './hooks/useSnakeGame';

function App() {
  const { snake, food, gridSize, score, isGameOver, changeDirection, resetGame } = useSnakeGame();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8 text-white">Snake Game</h1>
        
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="mb-4 flex justify-between items-center">
            <span className="text-xl font-semibold text-white">Score: {score}</span>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Reset Game
            </button>
          </div>

          <div className="relative">
            {isGameOver && (
              <div className="absolute inset-0 bg-black/75 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-4">Game Over!</h2>
                  <p className="text-xl text-gray-300 mb-4">Final Score: {score}</p>
                  <button
                    onClick={resetGame}
                    className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}
            
            <GameBoard
              snake={snake}
              food={food}
              gridSize={gridSize}
            />
          </div>

          <GameControls onDirectionChange={changeDirection} />
        </div>
      </div>
    </div>
  );
}

export default App;