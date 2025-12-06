import { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Zap, AlertTriangle } from 'lucide-react';

interface UsernameEntryProps {
  onStart: (username: string) => void;
}

export function UsernameEntry({ onStart }: UsernameEntryProps) {
  const [username, setUsername] = useState('');
  const [isGlitching, setIsGlitching] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length >= 3) {
      setIsGlitching(true);
      setTimeout(() => onStart(username.trim()), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Grid */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(#ff0000 1px, transparent 1px), linear-gradient(90deg, #ff0000 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-red-500"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div
        className="relative z-10 max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Warning Banner */}
        <motion.div
          className="bg-red-600 text-white px-6 py-3 mb-6 flex items-center gap-3"
          animate={{
            boxShadow: [
              '0 0 20px rgba(255,0,0,0.5)',
              '0 0 40px rgba(255,0,0,0.8)',
              '0 0 20px rgba(255,0,0,0.5)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <AlertTriangle className="w-6 h-6" />
          </motion.div>
          <span>CRITICAL SYSTEM FAILURE DETECTED</span>
        </motion.div>

        {/* Main Terminal */}
        <motion.div
          className="bg-gray-900 border-2 border-red-600 p-8 relative"
          animate={isGlitching ? {
            x: [0, -5, 5, -5, 5, 0],
            opacity: [1, 0.5, 1, 0.5, 1],
          } : {}}
          transition={isGlitching ? { duration: 0.5, repeat: 3 } : {}}
        >
          {/* Scanline Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(transparent 50%, rgba(255,0,0,0.05) 50%)',
              backgroundSize: '100% 4px',
            }}
            animate={{ backgroundPositionY: ['0px', '4px'] }}
            transition={{ duration: 0.1, repeat: Infinity, ease: 'linear' }}
          />

          {/* Header */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Terminal className="w-8 h-8 text-red-500" />
            </motion.div>
            <div>
              <h1 className="text-3xl text-red-500">THE BLACKOUT PROTOCOL</h1>
              <p className="text-gray-400">Emergency System Recovery Interface</p>
            </div>
          </motion.div>

          {/* Status Messages */}
          <motion.div
            className="bg-black p-4 mb-6 font-mono text-sm space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[
              '🔴 MAIN AI CORE: OFFLINE',
              '🔴 EMERGENCY SYSTEMS: LOCKED',
              '🔴 POWER GRID: DESYNCHRONIZED',
              '🟡 MANUAL OVERRIDE: AVAILABLE',
              '⚠️  TIME TO TOTAL BLACKOUT: UNKNOWN',
            ].map((msg, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="text-gray-300"
              >
                {msg}
              </motion.div>
            ))}
          </motion.div>

          {/* Warning Box */}
          <motion.div
            className="bg-yellow-900/30 border border-yellow-600 p-4 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.3, type: 'spring', stiffness: 200 }}
          >
            <p className="text-yellow-300 text-center">
              <Zap className="inline w-4 h-4 mr-2" />
              ONE WRONG MOVE = PERMANENT LOCKOUT
              <Zap className="inline w-4 h-4 ml-2" />
            </p>
          </motion.div>

          {/* Username Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div>
              <label className="block text-gray-400 mb-2 font-mono">
                {'>'} ENTER OPERATOR ID:
              </label>
              <motion.input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black border-2 border-red-600 px-4 py-3 text-white font-mono focus:outline-none focus:border-red-400 transition-colors"
                placeholder="MINIMUM 3 CHARACTERS"
                minLength={3}
                required
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-red-600 text-white py-4 font-mono relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={username.trim().length < 3}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
              <span className="relative z-10">
                {isGlitching ? 'INITIALIZING PROTOCOL...' : 'INITIATE EMERGENCY OVERRIDE'}
              </span>
            </motion.button>
          </motion.form>

          {/* Footer Info */}
          <motion.div
            className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-500 text-sm font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            DIFFICULTY: BRUTAL | 5 LAYERS | CHAIN LOGIC REQUIRED
          </motion.div>
        </motion.div>

        {/* Bottom Glitch Effect */}
        <motion.div
          className="mt-4 text-center text-red-500 font-mono"
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          [SYSTEM DEGRADATION IN PROGRESS...]
        </motion.div>
      </motion.div>
    </div>
  );
}
