import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Thermometer, CheckCircle, XCircle } from 'lucide-react';

interface Room3Props {
  username: string;
  binary: string;
  onSuccess: (pressure: number) => void;
  onFailure: () => void;
}

export function Room3({ username, binary, onSuccess, onFailure }: Room3Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  const pipes = [
    { id: 'A', pressure: 124 },
    { id: 'B', pressure: 226 },
    { id: 'C', pressure: 312 },
    { id: 'D', pressure: 442 },
  ];

  useEffect(() => {
    // Convert binary to decimal
    const decimal = parseInt(binary, 2);
    setConvertedValue(decimal);
  }, [binary]);

  const handleSubmit = () => {
    if (selected === null) return;
    
    setIsChecking(true);
    setTimeout(() => {
      setShowFeedback(true);
      setTimeout(() => {
        if (selected === 226) {
          onSuccess(226);
        } else {
          onFailure();
        }
      }, 2000);
    }, 1500);
  };

  const isCorrect = selected === 442;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 p-8 relative overflow-hidden">
      {/* Steam/Particle Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 20,
              opacity: 0.6
            }}
            animate={{ 
              y: -20,
              opacity: 0,
              scale: [1, 1.5, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        className="max-w-5xl mx-auto relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="bg-green-600 text-black px-6 py-4 mb-8 relative overflow-hidden"
          animate={{
            boxShadow: [
              '0 0 20px rgba(0,255,100,0.3)',
              '0 0 40px rgba(0,255,100,0.6)',
              '0 0 20px rgba(0,255,100,0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl">🟩 ROOM 3 — COOLING SYSTEM FLOW</h1>
              <p className="text-black/80">Operator: {username} | Binary: {binary}</p>
            </div>
            <motion.div
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Thermometer className="w-8 h-8" />
            </motion.div>
          </div>
        </motion.div>

        {/* Conversion Box */}
        <motion.div
          className="bg-gray-900 border border-green-600 p-6 mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-green-300 text-lg mb-6">
            The cooling system must activate using the binary output as a pressure clue.
          </p>
          
          <div className="bg-black border border-green-600 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="text-center">
                <div className="text-gray-400 mb-2">BINARY INPUT</div>
                <motion.div 
                  className="text-3xl font-mono text-green-400"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {binary}
                </motion.div>
              </div>
              
              <motion.div 
                className="text-4xl text-center text-yellow-400"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.div>
              
              <div className="text-center">
                <div className="text-gray-400 mb-2">DECIMAL (PSI)</div>
                <AnimatePresence mode="wait">
                  {convertedValue !== null ? (
                    <motion.div
                      key="converted"
                      className="text-3xl font-mono text-cyan-400"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      {convertedValue}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="loading"
                      className="text-3xl text-gray-600"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ???
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {pipes.map((pipe, idx) => (
            <motion.button
              key={pipe.id}
              onClick={() => !isChecking && setSelected(pipe.pressure)}
              className={`relative p-8 border-4 transition-all ${
                selected === pipe.pressure
                  ? 'border-cyan-400 bg-cyan-900/30'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-500'
              } ${isChecking ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + idx * 0.1, type: 'spring' }}
              whileHover={!isChecking ? { scale: 1.05 } : {}}
              disabled={isChecking}
            >
              {/* Pipe Visual */}
              <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                  <motion.div
                    className="w-24 h-24 border-8 border-gray-600 rounded-full flex items-center justify-center relative overflow-hidden"
                    animate={selected === pipe.pressure ? {
                      borderColor: ['#0891b2', '#06b6d4', '#0891b2'],
                    } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <span className="text-4xl z-10">💧</span>
                    
                    {selected === pipe.pressure && (
                      <>
                        <motion.div
                          className="absolute inset-0 bg-cyan-400"
                          animate={{ 
                            opacity: [0.1, 0.3, 0.1],
                            scale: [0.8, 1.2, 0.8]
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)'
                          }}
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </>
                    )}
                  </motion.div>
                  
                  {/* Pressure Gauge */}
                  {selected === pipe.pressure && (
                    <motion.div
                      className="absolute -bottom-2 -right-2 w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center text-black"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                    >
                      <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      >
                        ⚡
                      </motion.span>
                    </motion.div>
                  )}
                </div>
                
                <div className="text-left flex-1">
                  <h3 className="text-2xl text-green-400 mb-2">PIPE {pipe.id}</h3>
                  <div className="font-mono">
                    <motion.div 
                      className="text-4xl text-cyan-300"
                      animate={selected === pipe.pressure ? { 
                        scale: [1, 1.1, 1],
                        color: ['#67e8f9', '#06b6d4', '#67e8f9']
                      } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {pipe.pressure} <span className="text-2xl">PSI</span>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Flow Animation */}
              {selected === pipe.pressure && !isChecking && (
                <div className="absolute inset-x-0 bottom-0 h-2 overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-full w-8 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      animate={{ x: [-50, '100vw'] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: 'linear'
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Selection Check */}
              {selected === pipe.pressure && (
                <motion.div
                  className="absolute top-4 right-4 w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="text-black text-xl">✓</span>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={selected === null || isChecking}
          className="w-full bg-green-600 text-black py-6 text-xl relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={selected !== null && !isChecking ? { scale: 1.02 } : {}}
          whileTap={selected !== null && !isChecking ? { scale: 0.98 } : {}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
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
                ACTIVATING COOLING SYSTEM...
              </motion.span>
            ) : (
              'ACTIVATE COOLING FLOW'
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
              initial={{ scale: 0, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="flex items-center gap-4 justify-center text-2xl">
                {isCorrect ? (
                  <>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [0, 360]
                      }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      <CheckCircle className="w-12 h-12 text-green-400" />
                    </motion.div>
                    <div>
                      <div className="text-green-400">COOLING SYSTEM ONLINE!</div>
                      <div className="text-green-300 text-lg mt-2 font-mono">Pressure Value: 226 PSI</div>
                    </div>
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{ rotate: [0, -20, 20, -20, 20, 0] }}
                      transition={{ duration: 0.5, repeat: 2 }}
                    >
                      <XCircle className="w-12 h-12 text-red-400" />
                    </motion.div>
                    <div>
                      <div className="text-red-400">THERMAL OVERLOAD!</div>
                      <div className="text-red-300 text-lg mt-2">System Failure - Lockout Engaged...</div>
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
