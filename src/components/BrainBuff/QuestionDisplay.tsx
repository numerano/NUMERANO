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
        hint?: string;
    };
    onSelect: (optionId: string) => void;
    selectedOption: string | null;
    isCorrect: boolean | null;
    showResult: boolean;
    timeUp: boolean;
    hintRevealed: boolean;
    onHintClick: () => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
    data,
    onSelect,
    selectedOption,
    isCorrect,
    showResult,
    timeUp,
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

    const getOptionStyle = (optId: string): string => {
        if (!showResult) {
            return 'border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 text-white cursor-pointer';
        }

        // After result is shown
        if (selectedOption === optId) {
            return isCorrect
                ? 'border-green-500 bg-green-500/20 text-green-300 ring-2 ring-green-500/50'
                : 'border-red-500 bg-red-500/20 text-red-300 ring-2 ring-red-500/50';
        }

        // Highlight the correct answer if user was wrong or time ran out
        if (optId === data.correctAnswer && (!isCorrect || timeUp)) {
            return 'border-green-500 bg-green-500/20 text-green-300 ring-2 ring-green-500/50';
        }

        return 'border-slate-600/30 text-slate-500 cursor-default opacity-50';
    };

    const getBadgeStyle = (optId: string): string => {
        if (!showResult) {
            return 'bg-cyan-500/20 text-cyan-400';
        }

        if (selectedOption === optId) {
            return isCorrect
                ? 'bg-green-500/30 text-green-300'
                : 'bg-red-500/30 text-red-300';
        }

        if (optId === data.correctAnswer && (!isCorrect || timeUp)) {
            return 'bg-green-500/30 text-green-300';
        }

        return 'bg-slate-700/50 text-slate-500';
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-2xl shadow-2xl shadow-cyan-500/10 max-w-2xl mx-auto border border-cyan-500/20"
        >
            <div className="flex justify-between items-center mb-4">
                <span className="bg-cyan-500/20 text-cyan-400 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                    {data.category}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${data.difficulty === 'Hard' ? 'bg-red-500/20 text-red-400' :
                    data.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                    }`}>
                    {data.difficulty}
                </span>
            </div>

            <motion.h2 variants={item} className="text-2xl font-bold text-white mb-2">
                {data.title}
            </motion.h2>

            <motion.p variants={item} className="text-lg text-cyan-200/70 mb-8 leading-relaxed whitespace-pre-line">
                {data.question}
            </motion.p>

            {/* Hint Section */}
            {!showResult && data.hint && (
                <motion.div variants={item} className="mb-6">
                    {!hintRevealed ? (
                        <button
                            onClick={onHintClick}
                            className="text-sm text-cyan-400 hover:text-cyan-300 underline font-medium flex items-center transition-colors"
                        >
                            <span className="mr-1">💡</span> Need a hint?
                        </button>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 text-sm text-cyan-200/70 flex items-start"
                        >
                            <span className="mr-2">💡</span>
                            <span>{data.hint}</span>
                        </motion.div>
                    )}
                </motion.div>
            )}

            <div className="space-y-3">
                {data.options.map((opt) => (
                    <motion.button
                        key={opt.id}
                        variants={item}
                        whileHover={!showResult ? { scale: 1.02 } : {}}
                        whileTap={!showResult ? { scale: 0.98 } : {}}
                        onClick={() => !showResult && onSelect(opt.id)}
                        disabled={showResult}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 flex items-center ${getOptionStyle(opt.id)}`}
                    >
                        <span className={`w-8 h-8 flex items-center justify-center rounded-full mr-4 font-bold text-sm ${getBadgeStyle(opt.id)}`}>
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
