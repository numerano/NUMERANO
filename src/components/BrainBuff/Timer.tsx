// @ts-ignore
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TimerProps {
    duration: number; // in seconds
    onTimeUp: () => void;
    isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, isActive }) => {
    const progressRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const timeLeftRef = useRef(duration);

    useEffect(() => {
        if (!isActive) return;

        const timerInterval = setInterval(() => {
            if (timeLeftRef.current <= 0) {
                clearInterval(timerInterval);
                onTimeUp();
                return;
            }
            timeLeftRef.current -= 1;
            if (textRef.current) {
                textRef.current.innerText = timeLeftRef.current.toString();
            }
        }, 1000);

        if (progressRef.current) {
            gsap.to(progressRef.current, {
                width: '0%',
                duration: duration,
                ease: 'linear',
                backgroundColor: '#ef4444', // transition to red
                onComplete: () => {
                    // Animation complete
                }
            });
        }

        return () => {
            clearInterval(timerInterval);
            gsap.killTweensOf(progressRef.current);
        };
    }, [isActive, duration, onTimeUp]);

    return (
        <div className="w-full max-w-md mx-auto mb-8">
            <div className="flex justify-between items-center mb-2 text-numerano-navy font-bold">
                <span>Time Remaining</span>
                <span ref={textRef} className="text-xl">{duration}</span>s
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                    ref={progressRef}
                    className="h-full bg-numerano-accent w-full"
                />
            </div>
        </div>
    );
};

export default Timer;
