import { useState, useEffect, useCallback } from 'react';
import { Direction, Position, GameState } from '../types/game';

const GRID_SIZE = 20;
const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 }
];

const getRandomPosition = (): Position => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE)
});

export function useSnakeGame() {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: getRandomPosition(),
    direction: 'UP',
    isGameOver: false,
    score: 0
  });

  const moveSnake = useCallback(() => {
    if (gameState.isGameOver) return;

    setGameState(prev => {
      const head = { ...prev.snake[0] };
      
      switch (prev.direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check collision with walls
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        return { ...prev, isGameOver: true };
      }

      // Check collision with self
      if (prev.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        return { ...prev, isGameOver: true };
      }

      const newSnake = [head, ...prev.snake];
      
      // Check if food is eaten
      if (head.x === prev.food.x && head.y === prev.food.y) {
        return {
          ...prev,
          snake: newSnake,
          food: getRandomPosition(),
          score: prev.score + 10
        };
      }

      newSnake.pop();
      return { ...prev, snake: newSnake };
    });
  }, [gameState.isGameOver]);

  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState(prev => {
      // Prevent 180-degree turns
      const invalidMove =
        (newDirection === 'UP' && prev.direction === 'DOWN') ||
        (newDirection === 'DOWN' && prev.direction === 'UP') ||
        (newDirection === 'LEFT' && prev.direction === 'RIGHT') ||
        (newDirection === 'RIGHT' && prev.direction === 'LEFT');

      if (invalidMove) return prev;

      return { ...prev, direction: newDirection };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      snake: INITIAL_SNAKE,
      food: getRandomPosition(),
      direction: 'UP',
      isGameOver: false,
      score: 0
    });
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          changeDirection('UP');
          break;
        case 'ArrowDown':
          changeDirection('DOWN');
          break;
        case 'ArrowLeft':
          changeDirection('LEFT');
          break;
        case 'ArrowRight':
          changeDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [changeDirection]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 150);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  return {
    ...gameState,
    gridSize: GRID_SIZE,
    changeDirection,
    resetGame
  };
}