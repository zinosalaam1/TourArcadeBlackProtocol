import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, CheckCircle, XCircle } from 'lucide-react';

interface Room1Props {
  username: string;
  onSuccess: (voltage: number) => void;
  onFailure: () => void;
}

export function Room1({ username, onSuccess, onFailure }: Room1Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const generators = [
    { id: 'A', voltage: 110, frequency: 50 },
    { id: 'B', voltage: 220, frequency: 50 },
    { id: 'C', voltage: 220, frequency: 60 },
    { id: 'D', voltage: 110, frequency: 60 },
  ];

  const handleSubmit = () => {
    if (!selected) return;
    
    setIsChecking(true);
    setTimeout(() => {
      setShowFeedback(true);
      setTimeout(() => {
        if (selected === 'B') {
          onSuccess(220);
        } else {
          onFailure();
        }
      }, 2000);
    }, 1500);
  };

  const isCorrect = selected === 'B';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900 p-8 relative overflow-hidden">
      {/* Lightning Effects */}
      <AnimatePresence>
        {isChecking && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 w-1 bg-yellow-300"
                initial={{ height: 0, left: `${20 + i * 20}%` }}
                animate={{ 
                  height: ['0%', '100%', '0%'],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 0.3, 
                  delay: i * 0.1,
                  repeat: 2
                }}
                style={{
                  boxShadow: '0 0 20px rgba(255,255,0,0.8)',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="bg-red-600 text-black px-6 py-4 mb-8 relative overflow-hidden"
          animate={{
            boxShadow: [
              '0 0 20px rgba(255,0,0,0.3)',
              '0 0 40px rgba(255,0,0,0.6)',
              '0 0 20px rgba(255,0,0,0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl">🟥 ROOM 1 — POWER GRID SYNC</h1>
              <p className="text-black/80">Operator: {username}</p>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Zap className="w-8 h-8" />
            </motion.div>
          </div>
        </motion.div>

        {/* Story Box */}
        <motion.div
          className="bg-gray-900 border border-red-600 p-6 mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-red-300 text-lg mb-4">
            Four generators detected. Only one is correctly synchronized with the national grid.
          </p>
          <motion.div
            className="bg-yellow-900/30 border border-yellow-600 p-4 text-yellow-300"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="font-mono">CLUE: &quot;The system was designed to match the national grid standard.&quot;</span>
          </motion.div>
        </motion.div>

        {/* Generators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {generators.map((gen, idx) => (
            <motion.button
              key={gen.id}
              onClick={() => !isChecking && setSelected(gen.id)}
              className={`relative p-8 border-4 transition-all ${
                selected === gen.id
                  ? 'border-yellow-400 bg-yellow-900/30'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-500'
              } ${isChecking ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              whileHover={!isChecking ? { scale: 1.05 } : {}}
              disabled={isChecking}
            >
              {/* Generator Visual */}
              <div className="flex items-center gap-6 mb-4">
                <motion.div
                  className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden"
                  animate={selected === gen.id ? {
                    boxShadow: [
                      '0 0 20px rgba(255,215,0,0.3)',
                      '0 0 40px rgba(255,215,0,0.6)',
                      '0 0 20px rgba(255,215,0,0.3)',
                    ],
                  } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <span className="text-3xl z-10">⚡</span>
                  {selected === gen.id && (
                    <motion.div
                      className="absolute inset-0 bg-yellow-400"
                      animate={{ opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>
                
                <div className="text-left flex-1">
                  <h3 className="text-2xl text-yellow-400 mb-2">GENERATOR {gen.id}</h3>
                  <div className="font-mono text-gray-300">
                    <div className="text-xl">{gen.voltage}V @ {gen.frequency}Hz</div>
                  </div>
                </div>
              </div>

              {/* Selection Indicator */}
              {selected === gen.id && (
                <motion.div
                  className="absolute top-4 right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="text-black">✓</span>
                </motion.div>
              )}

              {/* Energy Flow Effect */}
              {selected === gen.id && !isChecking && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={!selected || isChecking}
          className="w-full bg-red-600 text-white py-6 text-xl relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={selected && !isChecking ? { scale: 1.02 } : {}}
          whileTap={selected && !isChecking ? { scale: 0.98 } : {}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {isChecking ? (
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              SYNCHRONIZING POWER GRID...
            </motion.span>
          ) : (
            'SYNC GENERATOR TO GRID'
          )}
        </motion.button>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              className={`mt-8 p-8 border-4 ${
                isCorrect ? 'border-green-500 bg-green-900/30' : 'border-red-500 bg-red-900/30'
              }`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="flex items-center gap-4 justify-center text-2xl">
                {isCorrect ? (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <CheckCircle className="w-12 h-12 text-green-400" />
                    </motion.div>
                    <div>
                      <div className="text-green-400">SYNCHRONIZATION SUCCESSFUL!</div>
                      <div className="text-green-300 text-lg mt-2">Voltage Value Unlocked: 220V</div>
                    </div>
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                      transition={{ duration: 0.5, repeat: 2 }}
                    >
                      <XCircle className="w-12 h-12 text-red-400" />
                    </motion.div>
                    <div>
                      <div className="text-red-400">CRITICAL FAILURE!</div>
                      <div className="text-red-300 text-lg mt-2">Initiating Permanent Lockout...</div>
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
