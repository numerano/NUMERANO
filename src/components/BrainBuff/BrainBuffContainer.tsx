// @ts-ignore
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentBrainBuff } from '../../services/brainBuffService';
import Timer from './Timer';
import QuestionDisplay from './QuestionDisplay';
import { Loader2, AlertCircle } from 'lucide-react';

const BrainBuffContainer = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [questionData, setQuestionData] = useState<any>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [timerActive, setTimerActive] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [timeUp, setTimeUp] = useState(false);

    const [hintRevealed, setHintRevealed] = useState(false);

    useEffect(() => {
        fetchQuestion();
    }, []);

    const fetchQuestion = async () => {
        try {
            setLoading(true);
            const data = await getCurrentBrainBuff();
            setQuestionData(data);
            setHintRevealed(false); // Reset hint state

            // Check local storage for existing state (optional enhancement for refresh persistence)
            const savedState = localStorage.getItem(`brainbuff_${data.weekId}`);
            if (savedState) {
                const parsed = JSON.parse(savedState);
                if (parsed.completed) {
                    setSelectedOption(parsed.selected);
                    setIsCorrect(parsed.isCorrect);
                    setShowResult(true);
                    setTimerActive(false);
                } else {
                    setTimerActive(true);
                }
            } else {
                setTimerActive(true);
            }
        } catch (err) {
            setError('Failed to load this week\'s BrainBuff. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleOptionSelect = (optionId: string) => {
        if (showResult || timeUp) return;

        setTimerActive(false);
        setSelectedOption(optionId);
        const correct = optionId === questionData.correctAnswer;
        setIsCorrect(correct);
        setShowResult(true);

        // Save state
        if (questionData) {
            localStorage.setItem(`brainbuff_${questionData.weekId}`, JSON.stringify({
                completed: true,
                selected: optionId,
                isCorrect: correct
            }));
        }
    };

    const handleTimeUp = () => {
        if (showResult) return;
        setTimeUp(true);
        setTimerActive(false);
        setShowResult(true);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                <p className="text-gray-500 animate-pulse">Summoning the Oracle...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
                <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Oops!</h3>
                <p className="text-gray-600">{error}</p>
                <button
                    onClick={fetchQuestion}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4"
                >
                    BrainBuff of the Week
                </motion.h1>
                <motion.p
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-600 text-lg"
                >
                    Every Monday, a new challenge awaits. Can you crack it?
                </motion.p>
            </div>

            {!showResult && !timeUp && (
                <Timer
                    duration={questionData.timeLimit || 60}
                    isActive={timerActive}
                    onTimeUp={handleTimeUp}
                />
            )}

            <QuestionDisplay
                data={questionData}
                onSelect={handleOptionSelect}
                selectedOption={selectedOption}
                isCorrect={isCorrect}
                showResult={showResult}
                hintRevealed={hintRevealed}
                onHintClick={() => setHintRevealed(true)}
            />

            <AnimatePresence>
                {showResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className={`mt-8 p-6 rounded-xl border-l-4 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                            }`}
                    >
                        <h3 className={`text-xl font-bold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'
                            }`}>
                            {isCorrect ? '🎉 Brilliant!' : '😅 Not quite...'}
                        </h3>
                        <p className="text-gray-700 mb-4">
                            {isCorrect
                                ? questionData.explanation
                                : `The correct answer was ${questionData.correctAnswer}. ${questionData.explanation}`
                            }
                        </p>
                        {!isCorrect && (
                            <div className="text-sm text-gray-500 italic">
                                Hint for next time: {questionData.hint}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BrainBuffContainer;
