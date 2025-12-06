import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, CheckCircle, XCircle, Skull } from 'lucide-react';

interface Room5Props {
  username: string;
  overrideCode: string;
  onSuccess: (command: string) => void;
  onFailure: () => void;
}

export function Room5({ username, overrideCode, onSuccess, onFailure }: Room5Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const commands = [
    { 
      id: 'A', 
      name: 'RESTORE', 
      description: 'Returns system to previous state',
      consequence: 'Returns prior corrupted state',
      dangerous: true
    },
    { 
      id: 'B', 
      name: 'REBOOT', 
      description: 'Restarts all core systems',
      consequence: 'Loops failure sequence',
      dangerous: true
    },
    { 
      id: 'C', 
      name: 'FLUSH', 
      description: 'Clears all system memory',
      consequence: 'Deletes all backup data',
      dangerous: true
    },
    { 
      id: 'D', 
      name: 'OVERRIDE', 
      description: 'Replaces current logic protocols',
      consequence: 'Replaces failure logic with safe state',
      dangerous: false
    },
  ];

  const handleSubmit = () => {
    if (!selected) return;
    
    setIsChecking(true);
    setTimeout(() => {
      setShowFeedback(true);
      setTimeout(() => {
        if (selected === 'D') {
          onSuccess('OVERRIDE');
        } else {
          onFailure();
        }
      }, 2500);
    }, 2000);
  };

  const isCorrect = selected === 'D';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-red-900 p-8 relative overflow-hidden">
      {/* Glitch Effect Background */}
      <motion.div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #ff0000 2px, #ff0000 4px)',
        }}
        animate={{
          opacity: [0.05, 0.15, 0.05],
          x: [0, 5, -5, 0],
        }}
        transition={{ duration: 0.3, repeat: Infinity }}
      />

      {/* Warning Symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            ⚠️
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.div
        className="max-w-5xl mx-auto relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="bg-gradient-to-r from-purple-600 to-red-600 text-white px-6 py-4 mb-8 relative overflow-hidden"
          animate={{
            boxShadow: [
              '0 0 30px rgba(168,85,247,0.4), 0 0 30px rgba(239,68,68,0.4)',
              '0 0 60px rgba(168,85,247,0.7), 0 0 60px rgba(239,68,68,0.7)',
              '0 0 30px rgba(168,85,247,0.4), 0 0 30px rgba(239,68,68,0.4)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl">🟪 ROOM 5 — THE FINAL BLACKOUT FAILSAFE</h1>
              <p className="text-white/80">Operator: {username} | Code: {overrideCode}</p>
            </div>
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Terminal className="w-8 h-8" />
            </motion.div>
          </div>
        </motion.div>

        {/* Critical Warning */}
        <motion.div
          className="bg-red-900 border-4 border-red-500 p-6 mb-8 relative overflow-hidden"
          animate={{
            borderColor: ['#ef4444', '#dc2626', '#ef4444'],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <motion.div
            className="absolute inset-0 bg-red-500"
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <div className="relative z-10 flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <Skull className="w-12 h-12 text-red-300" />
            </motion.div>
            <div className="flex-1">
              <h2 className="text-2xl text-red-200 mb-2">⚠️ CRITICAL DECISION POINT ⚠️</h2>
              <p className="text-red-300">
                Final shutdown command required. Three options will cause catastrophic failure. 
                Only ONE command will safely restore the system.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Story Box */}
        <motion.div
          className="bg-gray-900 border border-purple-600 p-6 mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-purple-300 text-lg mb-4">
            Select the logically safe command to complete the protocol.
          </p>
          <motion.button
            onClick={() => setShowHint(!showHint)}
            className="bg-gray-800 border border-purple-600 px-4 py-2 text-purple-300 hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showHint ? 'HIDE LOGIC ANALYSIS' : 'VIEW LOGIC ANALYSIS'}
          </motion.button>
          
          <AnimatePresence>
            {showHint && (
              <motion.div
                className="mt-4 bg-black border border-purple-600 p-6 font-mono space-y-3"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="text-yellow-400">COMMAND ANALYSIS:</div>
                <div className="text-red-400">• RESTORE = Returns corrupted state ❌</div>
                <div className="text-red-400">• REBOOT = Loops failure sequence ❌</div>
                <div className="text-red-400">• FLUSH = Destroys all backups ❌</div>
                <div className="text-green-400">• OVERRIDE = Replaces failure logic ✓</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Commands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {commands.map((cmd, idx) => (
            <motion.button
              key={cmd.id}
              onClick={() => !isChecking && setSelected(cmd.id)}
              className={`relative p-8 border-4 transition-all ${
                selected === cmd.id
                  ? cmd.dangerous 
                    ? 'border-red-500 bg-red-900/30' 
                    : 'border-green-500 bg-green-900/30'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-500'
              } ${isChecking ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.6 + idx * 0.15,
                type: 'spring',
                stiffness: 150
              }}
              whileHover={!isChecking ? { scale: 1.05 } : {}}
              disabled={isChecking}
            >
              {/* Danger Indicator */}
              {cmd.dangerous && (
                <motion.div
                  className="absolute -top-3 -right-3 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 10, 0]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Skull className="w-6 h-6 text-white" />
                </motion.div>
              )}

              {/* Command Display */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{cmd.dangerous ? '💀' : '✅'}</span>
                  <h3 className="text-2xl text-purple-400">SYSTEM.{cmd.name}({overrideCode})</h3>
                </div>
                <p className="text-gray-400 mb-3">{cmd.description}</p>
                <motion.div
                  className={`p-3 rounded ${
                    cmd.dangerous 
                      ? 'bg-red-900/40 border border-red-600' 
                      : 'bg-green-900/40 border border-green-600'
                  }`}
                  animate={selected === cmd.id ? {
                    opacity: [0.7, 1, 0.7]
                  } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <div className="text-sm text-gray-300">CONSEQUENCE:</div>
                  <div className={`text-sm ${cmd.dangerous ? 'text-red-300' : 'text-green-300'}`}>
                    {cmd.consequence}
                  </div>
                </motion.div>
              </div>

              {/* Selection Effect */}
              {selected === cmd.id && (
                <>
                  <motion.div
                    className={`absolute inset-0 ${
                      cmd.dangerous ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    animate={{ opacity: [0, 0.1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className="text-black text-xl">✓</span>
                  </motion.div>
                </>
              )}

              {/* Letter Badge */}
              <div className="absolute top-4 left-4 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl">
                {cmd.id}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={!selected || isChecking}
          className="w-full bg-gradient-to-r from-purple-600 to-red-600 text-white py-6 text-xl relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={selected && !isChecking ? { scale: 1.02 } : {}}
          whileTap={selected && !isChecking ? { scale: 0.98 } : {}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="relative z-10">
            {isChecking ? (
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                EXECUTING FINAL COMMAND...
              </motion.span>
            ) : (
              'EXECUTE BLACKOUT PROTOCOL'
            )}
          </span>
        </motion.button>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              className={`mt-8 p-8 border-4 ${
                isCorrect ? 'border-green-500 bg-green-900/30' : 'border-red-500 bg-red-900/30'
              }`}
              initial={{ scale: 0, y: 100, rotate: -180 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 150 }}
            >
              <div className="flex items-center gap-4 justify-center text-2xl">
                {isCorrect ? (
                  <>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.5, 1],
                        rotate: [0, 360, 720, 1080]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <CheckCircle className="w-16 h-16 text-green-400" />
                    </motion.div>
                    <div>
                      <div className="text-green-400 text-3xl">PROTOCOL COMPLETE!</div>
                      <div className="text-green-300 text-lg mt-2">AI Systems Restored Successfully</div>
                      <div className="text-green-200 text-sm mt-1 font-mono">Command: SYSTEM.OVERRIDE({overrideCode})</div>
                    </div>
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{ 
                        rotate: [0, -45, 45, -45, 45, 0],
                        scale: [1, 1.3, 1]
                      }}
                      transition={{ duration: 0.5, repeat: 3 }}
                    >
                      <XCircle className="w-16 h-16 text-red-400" />
                    </motion.div>
                    <div>
                      <div className="text-red-400 text-3xl">CATASTROPHIC FAILURE!</div>
                      <div className="text-red-300 text-lg mt-2">Total System Collapse</div>
                      <div className="text-red-200 text-sm mt-1">Permanent Lockout Engaged...</div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
