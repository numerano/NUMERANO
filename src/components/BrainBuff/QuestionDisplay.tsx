// @ts-ignore
import React from 'react';
import { motion } from 'framer-motion';

interface Option {
    id: string;
    text: string;
}

interface QuestionDisplayProps {
    data: {
        title: string;
        category: string;
        difficulty: string;
        question: string;
        options: Option[];
        correctAnswer: string;
        explanation: string;
        hint?: string;
    };
    onSelect: (optionId: string) => void;
    selectedOption: string | null;
    isCorrect: boolean | null;
    showResult: boolean;
    hintRevealed: boolean;
    onHintClick: () => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
    data,
    onSelect,
    selectedOption,
    isCorrect,
    showResult,
    hintRevealed,
    onHintClick
}) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl mx-auto border border-gray-100"
        >
            <div className="flex justify-between items-center mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                    {data.category}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${data.difficulty === 'Hard' ? 'bg-red-100 text-red-800' :
                    data.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                    }`}>
                    {data.difficulty}
                </span>
            </div>

            <motion.h2 variants={item} className="text-2xl font-bold text-gray-900 mb-2">
                {data.title}
            </motion.h2>

            <motion.p variants={item} className="text-lg text-gray-700 mb-8 leading-relaxed">
                {data.question}
            </motion.p>

            {/* Hint Section */}
            {!showResult && data.hint && (
                <motion.div variants={item} className="mb-6">
                    {!hintRevealed ? (
                        <button
                            onClick={onHintClick}
                            className="text-sm text-blue-600 hover:text-blue-800 underline font-medium flex items-center transition-colors"
                        >
                            <span className="mr-1">💡</span> Need a hint?
                        </button>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800 flex items-start"
                        >
                            <span className="mr-2">💡</span>
                            <span>{data.hint}</span>
                        </motion.div>
                    )}
                </motion.div>
            )}

            <div className="space-y-4">
                {data.options.map((opt) => (
                    <motion.button
                        key={opt.id}
                        variants={item}
                        whileHover={!showResult ? { scale: 1.02 } : {}}
                        whileTap={!showResult ? { scale: 0.98 } : {}}
                        onClick={() => !showResult && onSelect(opt.id)}
                        disabled={showResult}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 flex items-center ${selectedOption === opt.id
                            ? (isCorrect
                                ? 'border-green-500 bg-green-50 text-green-900'
                                : 'border-red-500 bg-red-50 text-red-900')
                            : showResult && opt.id === data.correctAnswer // Show correct answer if wrong selected
                                ? 'border-green-500 bg-green-50 text-green-900 ring-2 ring-green-300' // Highlight correct answer
                                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                            }`}
                    >
                        <span className={`w-8 h-8 flex items-center justify-center rounded-full mr-4 font-bold ${selectedOption === opt.id
                            ? (isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800')
                            : 'bg-gray-100 text-gray-600'
                            }`}>
                            {opt.id}
                        </span>
                        <span className="font-medium text-lg">{opt.text}</span>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};

export default QuestionDisplay;
