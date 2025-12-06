import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Key, CheckCircle, XCircle } from 'lucide-react';

interface Room4Props {
  username: string;
  pressure: number;
  binary: string;
  roomsSolved: number;
  onSuccess: (code: string) => void;
  onFailure: () => void;
}

export function Room4({ username, pressure, binary, roomsSolved, onSuccess, onFailure }: Room4Props) {
  const [code, setCode] = useState(['', '', '']);
  const [isChecking, setIsChecking] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [calculatedCode, setCalculatedCode] = useState<string>('');

  useEffect(() => {
    // Calculate the correct code
    const onesCount = binary.split('').filter(b => b === '1').length;
    const lastDigitPressure = pressure % 10;
    const correctCode = `${roomsSolved}${lastDigitPressure}${onesCount}`;
    setCalculatedCode(correctCode);
  }, [pressure, binary, roomsSolved]);

  const handleSubmit = () => {
    const enteredCode = code.join('');
    if (enteredCode.length !== 3) return;
    
    setIsChecking(true);
    setTimeout(() => {
      setShowFeedback(true);
      setTimeout(() => {
        if (enteredCode === calculatedCode) {
          onSuccess(enteredCode);
        } else {
          onFailure();
        }
      }, 2000);
    }, 1500);
  };

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value) || value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-focus next input
    if (value && index < 2) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const isCorrect = code.join('') === calculatedCode;
  const onesCount = binary.split('').filter(b => b === '1').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-purple-900 p-8 relative overflow-hidden">
      {/* Matrix Rain Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 font-mono text-blue-400 text-xs"
            style={{ left: `${i * 7}%` }}
            initial={{ y: -100 }}
            animate={{ y: '100vh' }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear'
            }}
          >
            {Array.from({ length: 20 }, () => Math.random().toString(36)[2]).join('')}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="bg-blue-600 text-white px-6 py-4 mb-8 relative overflow-hidden"
          animate={{
            boxShadow: [
              '0 0 20px rgba(59,130,246,0.3)',
              '0 0 40px rgba(59,130,246,0.6)',
              '0 0 20px rgba(59,130,246,0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl">🟦 ROOM 4 — OVERRIDE AUTHORIZATION</h1>
              <p className="text-white/80">Operator: {username}</p>
            </div>
            <motion.div
              animate={{ 
                rotate: [0, 20, -20, 20, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Key className="w-8 h-8" />
            </motion.div>
          </div>
        </motion.div>

        {/* Story Box */}
        <motion.div
          className="bg-gray-900 border border-blue-600 p-6 mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-blue-300 text-lg mb-4">
            Generate a 3-digit override code to unlock the AI core access.
          </p>
          <motion.button
            onClick={() => setShowHint(!showHint)}
            className="bg-gray-800 border border-blue-600 px-4 py-2 text-blue-300 hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showHint ? 'HIDE CODE GENERATION RULES' : 'VIEW CODE GENERATION RULES'}
          </motion.button>
          
          <AnimatePresence>
            {showHint && (
              <motion.div
                className="mt-4 bg-black border border-blue-600 p-6 font-mono space-y-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <motion.div
                  className="text-cyan-400"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="text-yellow-400 mb-2">RULE SET:</div>
                  <div>First digit = number of ROOMS already solved</div>
                  <div>Second digit = last digit of pressure value</div>
                  <div>Third digit = number of 1s in the binary code</div>
                </motion.div>
                
                <motion.div
                  className="bg-blue-900/30 p-4 rounded space-y-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Code Input */}
        <motion.div
          className="bg-gray-900 border-4 border-blue-600 p-12 mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
        >
          <h2 className="text-2xl text-center text-blue-400 mb-8">ENTER 3-DIGIT OVERRIDE CODE</h2>
          
          <div className="flex justify-center gap-6 mb-8">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
              >
                <motion.input
                  id={`digit-${index}`}
                  type="text"
                  value={code[index]}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  maxLength={1}
                  disabled={isChecking}
                  className="w-24 h-32 bg-black border-4 border-blue-500 text-center text-6xl font-mono text-blue-400 focus:outline-none focus:border-blue-300 disabled:opacity-50"
                  whileFocus={{ scale: 1.1 }}
                  animate={code[index] ? {
                    borderColor: ['#3b82f6', '#06b6d4', '#3b82f6'],
                    boxShadow: [
                      '0 0 20px rgba(59,130,246,0.3)',
                      '0 0 40px rgba(59,130,246,0.6)',
                      '0 0 20px rgba(59,130,246,0.3)',
                    ]
                  } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                
                {/* Digit Label */}
                <motion.div
                  className="absolute -bottom-8 left-0 right-0 text-center text-gray-500 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  DIGIT {index + 1}
                </motion.div>

                {/* Filled indicator */}
                {code[index] && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className="text-white text-xs">✓</span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Indicator Lights */}
          <div className="flex justify-center gap-4 mt-12">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className={`w-4 h-4 rounded-full ${
                  code[index] ? 'bg-green-500' : 'bg-gray-700'
                }`}
                animate={code[index] ? {
                  boxShadow: [
                    '0 0 10px rgba(34,197,94,0.5)',
                    '0 0 20px rgba(34,197,94,0.8)',
                    '0 0 10px rgba(34,197,94,0.5)',
                  ]
                } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={code.join('').length !== 3 || isChecking}
          className="w-full bg-blue-600 text-white py-6 text-xl relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={code.join('').length === 3 && !isChecking ? { scale: 1.02 } : {}}
          whileTap={code.join('').length === 3 && !isChecking ? { scale: 0.98 } : {}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
              ],
              x: ['-100%', '200%']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="relative z-10">
            {isChecking ? (
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                VERIFYING AUTHORIZATION CODE...
              </motion.span>
            ) : (
              'SUBMIT OVERRIDE CODE'
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
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="flex items-center gap-4 justify-center text-2xl">
                {isCorrect ? (
                  <>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.4, 1],
                        rotate: [0, 360, 720]
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <CheckCircle className="w-12 h-12 text-green-400" />
                    </motion.div>
                    <div>
                      <div className="text-green-400">AI CORE ACCESS GRANTED!</div>
                      <div className="text-green-300 text-lg mt-2 font-mono">Override Code: {code.join('')}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{ 
                        rotate: [0, -30, 30, -30, 30, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 0.5, repeat: 2 }}
                    >
                      <XCircle className="w-12 h-12 text-red-400" />
                    </motion.div>
                    <div>
                      <div className="text-red-400">AUTHORIZATION DENIED!</div>
                      <div className="text-red-300 text-lg mt-2">Security Breach - System Lockout...</div>
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
