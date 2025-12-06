import { useState } from 'react';
import { UsernameEntry } from './components/UsernameEntry';
import { Room1 } from './components/Room1';
import { Room2 } from './components/Room2';
import { Room3 } from './components/Room3';
import { Room4 } from './components/Room4';
import { Room5 } from './components/Room5';
import { FinalWin } from './components/FinalWin';

export type GameState = {
  username: string;
  currentRoom: number;
  voltage: number | null;
  binary: string | null;
  pressure: number | null;
  overrideCode: string | null;
  finalCommand: string | null;
  locked: boolean;
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    username: '',
    currentRoom: 0,
    voltage: null,
    binary: null,
    pressure: null,
    overrideCode: null,
    finalCommand: null,
    locked: false,
  });

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  };

  const lockGame = () => {
    setGameState(prev => ({ ...prev, locked: true }));
  };

  if (gameState.locked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">🔒</div>
          <h1 className="text-red-500 text-4xl mb-4">PERMANENT LOCKOUT</h1>
          <p className="text-red-400 text-xl mb-8">System Compromised. Game Over.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Restart Protocol
          </button>
        </div>
      </div>
    );
  }

  if (gameState.currentRoom === 0) {
    return <UsernameEntry onStart={(username) => updateGameState({ username, currentRoom: 1 })} />;
  }

  if (gameState.currentRoom === 6) {
    return <FinalWin gameState={gameState} onRestart={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {gameState.currentRoom === 1 && (
        <Room1
          username={gameState.username}
          onSuccess={(voltage) => updateGameState({ voltage, currentRoom: 2 })}
          onFailure={lockGame}
        />
      )}
      {gameState.currentRoom === 2 && (
        <Room2
          username={gameState.username}
          voltage={gameState.voltage!}
          onSuccess={(binary) => updateGameState({ binary, currentRoom: 3 })}
          onFailure={lockGame}
        />
      )}
      {gameState.currentRoom === 3 && (
        <Room3
          username={gameState.username}
          binary={gameState.binary!}
          onSuccess={(pressure) => updateGameState({ pressure, currentRoom: 4 })}
          onFailure={lockGame}
        />
      )}
      {gameState.currentRoom === 4 && (
        <Room4
          username={gameState.username}
          pressure={gameState.pressure!}
          binary={gameState.binary!}
          roomsSolved={3}
          onSuccess={(overrideCode) => updateGameState({ overrideCode, currentRoom: 5 })}
          onFailure={lockGame}
        />
      )}
      {gameState.currentRoom === 5 && (
        <Room5
          username={gameState.username}
          overrideCode={gameState.overrideCode!}
          onSuccess={(finalCommand) => updateGameState({ finalCommand, currentRoom: 6 })}
          onFailure={lockGame}
        />
      )}
    </div>
  );
}
