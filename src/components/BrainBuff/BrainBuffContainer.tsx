import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentBrainBuff, BrainBuffData } from '../../services/brainBuffService';
import Timer from './Timer';
import QuestionDisplay from './QuestionDisplay';
import { Loader2, AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';

type CompletionReason = 'answered' | 'timeUp';

interface SavedState {
    completed: boolean;
    reason: CompletionReason;
    selected: string | null;
    isCorrect: boolean | null;
}

const BrainBuffContainer = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [questionData, setQuestionData] = useState<BrainBuffData | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [timerActive, setTimerActive] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [timeUp, setTimeUp] = useState(false);
    const [hintRevealed, setHintRevealed] = useState(false);

    useEffect(() => {
        fetchQuestion();
    }, []);

    const saveState = useCallback((weekId: string, state: SavedState) => {
        localStorage.setItem(`brainbuff_${weekId}`, JSON.stringify(state));
    }, []);

    const fetchQuestion = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getCurrentBrainBuff();
            setQuestionData(data);
            setHintRevealed(false);

            // Check local storage for existing state
            const savedState = localStorage.getItem(`brainbuff_${data.weekId}`);
            if (savedState) {
                try {
                    const parsed: SavedState = JSON.parse(savedState);
                    if (parsed.completed) {
                        setSelectedOption(parsed.selected);
                        setIsCorrect(parsed.isCorrect);
                        setTimeUp(parsed.reason === 'timeUp');
                        setShowResult(true);
                        setTimerActive(false);
                    } else {
                        setTimerActive(true);
                    }
                } catch {
                    // Corrupted localStorage, start fresh
                    localStorage.removeItem(`brainbuff_${data.weekId}`);
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

    const handleOptionSelect = useCallback((optionId: string) => {
        if (showResult || timeUp || !questionData) return;

        setTimerActive(false);
        setSelectedOption(optionId);
        const correct = optionId === questionData.correctAnswer;
        setIsCorrect(correct);
        setShowResult(true);

        saveState(questionData.weekId, {
            completed: true,
            reason: 'answered',
            selected: optionId,
            isCorrect: correct
        });
    }, [showResult, timeUp, questionData, saveState]);

    const handleTimeUp = useCallback(() => {
        if (showResult) return;
        setTimeUp(true);
        setTimerActive(false);
        setShowResult(true);
        setIsCorrect(false);

        if (questionData) {
            saveState(questionData.weekId, {
                completed: true,
                reason: 'timeUp',
                selected: null,
                isCorrect: false
            });
        }
    }, [showResult, questionData, saveState]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
                <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
                <p className="text-cyan-200/60 animate-pulse">Summoning the Oracle...</p>
            </div>
        );
    }

    if (error || !questionData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
                <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Oops!</h3>
                <p className="text-cyan-200/60">{error || 'Something went wrong.'}</p>
                <button
                    onClick={fetchQuestion}
                    className="mt-6 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition"
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
                    className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4"
                >
                    BrainBuff of the Week
                </motion.h1>
                <motion.p
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-cyan-200/60 text-lg"
                >
                    Every Monday, a new challenge awaits. Can you crack it?
                </motion.p>
            </div>

            {!showResult && (
                <Timer
                    duration={questionData.timeLimit || 300}
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
                timeUp={timeUp}
                hintRevealed={hintRevealed}
                onHintClick={() => setHintRevealed(true)}
            />

            <AnimatePresence>
                {showResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className={`mt-8 p-6 rounded-xl border border-white/10 backdrop-blur-sm ${timeUp
                            ? 'bg-yellow-500/10'
                            : isCorrect
                                ? 'bg-green-500/10'
                                : 'bg-red-500/10'
                            }`}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            {timeUp ? (
                                <Clock className="w-6 h-6 text-yellow-400" />
                            ) : isCorrect ? (
                                <CheckCircle className="w-6 h-6 text-green-400" />
                            ) : (
                                <XCircle className="w-6 h-6 text-red-400" />
                            )}
                            <h3 className={`text-xl font-bold ${timeUp
                                ? 'text-yellow-400'
                                : isCorrect
                                    ? 'text-green-400'
                                    : 'text-red-400'
                                }`}>
                                {timeUp
                                    ? '⏰ Time\'s Up!'
                                    : isCorrect
                                        ? '🎉 Brilliant!'
                                        : '😅 Not quite...'}
                            </h3>
                        </div>

                        <p className="text-cyan-200/70 mb-4">
                            {timeUp
                                ? `The correct answer was ${questionData.correctAnswer}. ${questionData.explanation}`
                                : isCorrect
                                    ? questionData.explanation
                                    : `The correct answer was ${questionData.correctAnswer}. ${questionData.explanation}`
                            }
                        </p>

                        {/* Show hint only on wrong answer or time-up */}
                        {!isCorrect && questionData.hint && (
                            <div className="text-sm text-cyan-200/50 italic border-t border-white/10 pt-3 mt-3">
                                💡 Hint for next time: {questionData.hint}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BrainBuffContainer;
