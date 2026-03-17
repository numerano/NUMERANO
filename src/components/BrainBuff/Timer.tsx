import { useState, useEffect, useRef, useCallback } from 'react';

interface TimerProps {
    duration: number; // in seconds
    onTimeUp: () => void;
    isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, isActive }) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const onTimeUpRef = useRef(onTimeUp);
    const progressRef = useRef<HTMLDivElement>(null);

    // Keep ref in sync without triggering re-renders
    useEffect(() => {
        onTimeUpRef.current = onTimeUp;
    }, [onTimeUp]);

    // Reset timeLeft when duration changes or timer becomes active
    useEffect(() => {
        if (isActive) {
            setTimeLeft(duration);
        }
    }, [isActive, duration]);

    // Main countdown interval
    useEffect(() => {
        if (!isActive) return;

        const timerInterval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerInterval);
                    onTimeUpRef.current();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timerInterval);
        };
    }, [isActive]);

    // Progress bar animation
    useEffect(() => {
        if (!isActive || !progressRef.current) return;

        const bar = progressRef.current;
        // Reset to full width first
        bar.style.transition = 'none';
        bar.style.width = '100%';
        bar.style.backgroundColor = '#2d4eff'; // numerano-accent

        // Force reflow
        void bar.offsetWidth;

        // Animate to 0
        bar.style.transition = `width ${duration}s linear, background-color ${duration}s linear`;
        bar.style.width = '0%';
        bar.style.backgroundColor = '#ef4444'; // red

        return () => {
            bar.style.transition = 'none';
        };
    }, [isActive, duration]);

    const formatTime = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }, []);

    const urgencyClass = timeLeft <= 30
        ? 'text-red-400 animate-pulse'
        : timeLeft <= 60
            ? 'text-orange-400'
            : 'text-cyan-400';

    return (
        <div className="w-full max-w-2xl mx-auto mb-8">
            <div className="flex justify-between items-center mb-2 font-bold">
                <span className="text-cyan-200/70">⏱ Time Remaining</span>
                <span className={`text-xl font-mono ${urgencyClass}`}>
                    {formatTime(timeLeft)}
                </span>
            </div>
            <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                    ref={progressRef}
                    className="h-full rounded-full"
                    style={{ width: '100%', backgroundColor: '#2d4eff' }}
                />
            </div>
        </div>
    );
};

export default Timer;
