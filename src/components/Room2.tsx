import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, CheckCircle, XCircle } from 'lucide-react';

interface Room2Props {
  username: string;
  voltage: number;
  onSuccess: (binary: string) => void;
  onFailure: () => void;
}

export function Room2({ username, voltage, onSuccess, onFailure }: Room2Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const dataBlocks = [
    { id: 'A', value: '10101100', ones: 4, ending: 0 },
    { id: 'B', value: '11010101', ones: 5, ending: 1 },
    { id: 'C', value: '11100010', ones: 4, ending: 0 },
    { id: 'D', value: '01011011', ones: 5, ending: 1 },
  ];

  const handleSubmit = () => {
    if (!selected) return;
    
    setIsChecking(true);
    setTimeout(() => {
      setShowFeedback(true);
      setTimeout(() => {
        if (selected === 'C') {
          onSuccess('11100010');
        } else {
          onFailure();
        }
      }, 2000);
    }, 1500);
  };

  const isCorrect = selected === 'C';

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900 p-8 relative overflow-hidden">
      {/* Data Stream Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-500/20 font-mono text-xs"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: -20 
            }}
            animate={{ 
              y: window.innerHeight + 20,
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            {Array.from({ length: 20 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
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
          className="bg-yellow-600 text-black px-6 py-4 mb-8 relative overflow-hidden"
          animate={{
            boxShadow: [
              '0 0 20px rgba(255,200,0,0.3)',
              '0 0 40px rgba(255,200,0,0.6)',
              '0 0 20px rgba(255,200,0,0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl">🟨 ROOM 2 — DATA PARITY LOCK</h1>
              <p className="text-black/80">Operator: {username} | Voltage: {voltage}V</p>
            </div>
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Database className="w-8 h-8" />
            </motion.div>
          </div>
        </motion.div>

        {/* Story Box */}
        <motion.div
          className="bg-gray-900 border border-yellow-600 p-6 mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-yellow-300 text-lg mb-4">
            Data flow restoration requires selecting the only self-consistent binary block.
          </p>
          <motion.button
            onClick={() => setShowHint(!showHint)}
            className="bg-gray-800 border border-yellow-600 px-4 py-2 text-yellow-300 hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showHint ? 'HIDE SYSTEM LOG' : 'VIEW SYSTEM LOG'}
          </motion.button>
          
          <AnimatePresence>
            {showHint && (
              <motion.div
                className="mt-4 bg-black border border-yellow-600 p-4 font-mono"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <motion.div
                  className="text-green-400 text-sm space-y-2"
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                >
                  <div>{'>'} SYSTEM LOG ENTRY #4729</div>
                  <div>{'>'} &quot;Every functional data block contains an even number of 1s.&quot;</div>
                  <div className="text-yellow-400 mt-3">{'>'} ADDITIONAL CONSTRAINT:</div>
                  <div className="text-yellow-400">{'>'} Voltage={voltage} (EVEN) requires EVEN ending digit</div>
                  <div className="text-yellow-400">{'>'} Block must have balanced bit structure</div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Data Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {dataBlocks.map((block, idx) => (
            <motion.button
              key={block.id}
              onClick={() => !isChecking && setSelected(block.id)}
              className={`relative p-8 border-4 transition-all ${
                selected === block.id
                  ? 'border-green-400 bg-green-900/30'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-500'
              } ${isChecking ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              whileHover={!isChecking ? { scale: 1.05 } : {}}
              disabled={isChecking}
            >
              {/* Block Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl text-yellow-400">DATA BLOCK {block.id}</h3>
                {selected === block.id && (
                  <motion.div
                    className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className="text-black">✓</span>
                  </motion.div>
                )}
              </div>

              {/* Binary Display */}
              <div className="bg-black p-4 rounded mb-4">
                <div className="flex justify-center gap-1 font-mono text-2xl">
                  {block.value.split('').map((bit, i) => (
                    <motion.span
                      key={i}
                      className={bit === '1' ? 'text-green-400' : 'text-gray-600'}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + idx * 0.2 + i * 0.05 }}
                      whileHover={{ scale: 1.3 }}
                    >
                      {bit}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 font-mono text-sm">
                <div className="bg-gray-900 p-3 rounded">
                  <div className="text-gray-400">ONES COUNT</div>
                  <motion.div 
                    className="text-xl text-green-400"
                    animate={selected === block.id ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    {block.ones}
                  </motion.div>
                </div>
                <div className="bg-gray-900 p-3 rounded">
                  <div className="text-gray-400">END DIGIT</div>
                  <motion.div 
                    className="text-xl text-blue-400"
                    animate={selected === block.id ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                  >
                    {block.ending}
                  </motion.div>
                </div>
              </div>

              {/* Data Flow Effect */}
              {selected === block.id && !isChecking && (
                <>
                  <motion.div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"
                    animate={{ x: ['200%', '-100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </>
              )}
            </motion.button>
          ))}
        </div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={!selected || isChecking}
          className="w-full bg-yellow-600 text-black py-6 text-xl relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
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
              VERIFYING DATA INTEGRITY...
            </motion.span>
          ) : (
            'RESTORE DATA FLOW'
          )}
        </motion.button>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              className={`mt-8 p-8 border-4 ${
                isCorrect ? 'border-green-500 bg-green-900/30' : 'border-red-500 bg-red-900/30'
              }`}
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="flex items-center gap-4 justify-center text-2xl">
                {isCorrect ? (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <CheckCircle className="w-12 h-12 text-green-400" />
                    </motion.div>
                    <div>
                      <div className="text-green-400">DATA FLOW RESTORED!</div>
                      <div className="text-green-300 text-lg mt-2 font-mono">Binary Output: 11100010</div>
                    </div>
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{ rotate: [0, -15, 15, -15, 15, 0] }}
                      transition={{ duration: 0.5, repeat: 2 }}
                    >
                      <XCircle className="w-12 h-12 text-red-400" />
                    </motion.div>
                    <div>
                      <div className="text-red-400">DATA CORRUPTION!</div>
                      <div className="text-red-300 text-lg mt-2">System Lockout Initiated...</div>
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
