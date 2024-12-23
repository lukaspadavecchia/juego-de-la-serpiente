import React from 'react';
import { Position } from '../types/game';

interface GameBoardProps {
  snake: Position[];
  food: Position;
  gridSize: number;
}

export function GameBoard({ snake, food, gridSize }: GameBoardProps) {
  const cells = Array(gridSize).fill(null).map((_, row) => (
    Array(gridSize).fill(null).map((_, col) => {
      const isSnake = snake.some(pos => pos.x === col && pos.y === row);
      const isFood = food.x === col && food.y === row;
      const isHead = snake[0].x === col && snake[0].y === row;

      return (
        <div
          key={`${row}-${col}`}
          className={`
            w-6 h-6 border border-gray-800/10
            ${isHead ? 'bg-emerald-500 rounded-lg' : ''}
            ${isSnake && !isHead ? 'bg-emerald-400' : ''}
            ${isFood ? 'bg-red-500 rounded-full' : ''}
          `}
        />
      );
    })
  ));

  return (
    <div className="grid gap-0" style={{ 
      gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` 
    }}>
      {cells}
    </div>
  );
}