import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { Direction } from '../types/game';

interface GameControlsProps {
  onDirectionChange: (direction: Direction) => void;
}

export function GameControls({ onDirectionChange }: GameControlsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 w-48 mt-6">
      <div />
      <button
        onClick={() => onDirectionChange('UP')}
        className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <ArrowUp className="w-6 h-6 text-white" />
      </button>
      <div />
      <button
        onClick={() => onDirectionChange('LEFT')}
        className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>
      <div />
      <button
        onClick={() => onDirectionChange('RIGHT')}
        className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <ArrowRight className="w-6 h-6 text-white" />
      </button>
      <div />
      <button
        onClick={() => onDirectionChange('DOWN')}
        className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <ArrowDown className="w-6 h-6 text-white" />
      </button>
      <div />
    </div>
  );
}