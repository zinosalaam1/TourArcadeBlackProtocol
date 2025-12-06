import { motion } from 'motion/react';
import { Trophy, Zap, CheckCircle } from 'lucide-react';
import { GameState } from '../App';

interface FinalWinProps {
  gameState: GameState;
  onRestart: () => void;
}

export function FinalWin({ gameState, onRestart }: FinalWinProps) {
  const allValues = [
    { label: 'VOLTAGE', value: gameState.voltage, color: 'text-red-400' },
    { label: 'BINARY', value: gameState.binary, color: 'text-yellow-400' },
    { label: 'PRESSURE', value: gameState.pressure, color: 'text-green-400' },
    { label: 'OVERRIDE CODE', value: gameState.overrideCode, color: 'text-blue-400' },
    { label: 'FINAL COMMAND', value: gameState.finalCommand, color: 'text-purple-400' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-blue-900 p-8 relative overflow-hidden">
      {/* Victory Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              opacity: 0,
            }}
            animate={{
              y: -50,
              opacity: [0, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            {['⚡', '🔥', '✨', '💎', '🌟'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      {/* Expanding Circle Effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-64 h-64 border-4 border-green-500 rounded-full" />
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Victory Banner */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Trophy className="w-32 h-32 text-yellow-400 mx-auto" />
          </motion.div>

          <motion.h1
            className="text-6xl mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ backgroundSize: '200% auto' }}
          >
            🎉 ESCAPE COMPLETE! 🎉
          </motion.h1>

          <motion.p
            className="text-3xl text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Operator {gameState.username} — Mission Success
          </motion.p>

          <motion.div
            className="mt-6 text-xl text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            All AI systems restored. City saved from total blackout.
          </motion.div>
        </motion.div>

        {/* Stats Panel */}
        <motion.div
          className="bg-gray-900 border-4 border-green-500 p-8 mb-8 relative overflow-hidden"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, type: 'spring', stiffness: 150 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative z-10">
            <h2 className="text-3xl text-center text-green-400 mb-8 flex items-center justify-center gap-3">
              <CheckCircle className="w-8 h-8" />
              VERIFICATION COMPLETE
              <CheckCircle className="w-8 h-8" />
            </h2>

            <div className="space-y-6">
              {allValues.map((item, idx) => (
                <motion.div
                  key={item.label}
                  className="bg-black border-2 border-gray-700 p-6 rounded-lg"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.3 + idx * 0.15 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center"
                        animate={{
                          scale: [1, 1.2, 1],
                          boxShadow: [
                            '0 0 10px rgba(34,197,94,0.3)',
                            '0 0 20px rgba(34,197,94,0.6)',
                            '0 0 10px rgba(34,197,94,0.3)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                      >
                        <Zap className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <div className="text-gray-400 text-sm mb-1">{item.label}</div>
                        <motion.div
                          className={`text-3xl font-mono ${item.color}`}
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                        >
                          {item.value}
                        </motion.div>
                      </div>
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.5 + idx * 0.15, type: 'spring', stiffness: 300 }}
                    >
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Final Sequence Display */}
        <motion.div
          className="bg-gradient-to-r from-gray-900 to-gray-800 border-4 border-blue-500 p-8 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
        >
          <h3 className="text-2xl text-center text-blue-400 mb-6">COMPLETE ESCAPE SEQUENCE</h3>
          <motion.div
            className="bg-black p-6 rounded-lg font-mono text-center"
            animate={{
              boxShadow: [
                '0 0 20px rgba(59,130,246,0.3)',
                '0 0 40px rgba(59,130,246,0.6)',
                '0 0 20px rgba(59,130,246,0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex flex-wrap justify-center items-center gap-4 text-2xl">
              <motion.span
                className="text-red-400"
                whileHover={{ scale: 1.2 }}
              >
                {gameState.voltage}
              </motion.span>
              <span className="text-gray-600">–</span>
              <motion.span
                className="text-yellow-400"
                whileHover={{ scale: 1.2 }}
              >
                {gameState.binary}
              </motion.span>
              <span className="text-gray-600">–</span>
              <motion.span
                className="text-green-400"
                whileHover={{ scale: 1.2 }}
              >
                {gameState.pressure}
              </motion.span>
              <span className="text-gray-600">–</span>
              <motion.span
                className="text-blue-400"
                whileHover={{ scale: 1.2 }}
              >
                {gameState.overrideCode}
              </motion.span>
              <span className="text-gray-600">–</span>
              <motion.span
                className="text-purple-400"
                whileHover={{ scale: 1.2 }}
              >
                {gameState.finalCommand}
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        {/* Achievement Badge */}
        <motion.div
          className="bg-gradient-to-br from-yellow-600 to-orange-600 p-8 mb-8 text-center relative overflow-hidden"
          initial={{ scale: 0, rotate: 360 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 3, type: 'spring', stiffness: 100 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="relative z-10">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-3xl text-black mb-2">MASTER PROBLEM SOLVER</h3>
            <p className="text-black/80 text-lg">
              Successfully completed all 5 chain logic puzzles without failure
            </p>
            <div className="mt-4 text-black/60">
              Difficulty: BRUTAL ✓ | Genre: Systems Failure ✓
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            onClick={onRestart}
            className="bg-green-600 text-white py-6 text-xl relative overflow-hidden hover:bg-green-700 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10">🔄 RESTART PROTOCOL</span>
          </motion.button>

          <motion.button
            onClick={() => window.print()}
            className="bg-blue-600 text-white py-6 text-xl hover:bg-blue-700 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🖨️ PRINT CERTIFICATE
          </motion.button>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-12 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
        >
          <p>Congratulations on escaping The Blackout Protocol!</p>
          <p className="mt-2">Only the sharpest minds can solve chain logic under pressure.</p>
        </motion.div>
      </div>
    </div>
  );
}
