import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import BrainBuffContainer from '../BrainBuffContainer';

// Mock the brainBuffService
vi.mock('../../../services/brainBuffService', () => ({
    getCurrentBrainBuff: vi.fn(),
}));

// Mock framer-motion with a Proxy to handle all motion.* elements
vi.mock('framer-motion', async () => {
    const actual = await vi.importActual('framer-motion');

    const domPropsToFilter = ['variants', 'initial', 'animate', 'exit', 'transition', 'whileHover', 'whileTap', 'whileFocus', 'whileInView'];

    const filterDOMProps = (props: Record<string, any>) => {
        const filtered: Record<string, any> = {};
        for (const [key, value] of Object.entries(props)) {
            if (!domPropsToFilter.includes(key)) {
                filtered[key] = value;
            }
        }
        return filtered;
    };

    // Create a Proxy that maps any motion.X to the X html element
    const motionProxy = new Proxy({}, {
        get: (_target, prop: string) => {
            return ({ children, ...props }: any) => {
                const Tag = prop as any;
                const cleanProps = filterDOMProps(props);
                // Remove non-DOM boolean props
                delete cleanProps.disabled;
                if (prop === 'button') {
                    return <button onClick={props.onClick} disabled={props.disabled} className={props.className}>{children}</button>;
                }
                return <Tag {...cleanProps}>{children}</Tag>;
            };
        }
    });

    return {
        ...actual,
        AnimatePresence: ({ children }: any) => <>{children}</>,
        motion: motionProxy,
    };
});

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
    Loader2: ({ className }: any) => <div className={className} data-testid="loader">Loading</div>,
    AlertCircle: () => <div data-testid="alert-circle" />,
    Clock: () => <div data-testid="clock-icon" />,
    CheckCircle: () => <div data-testid="check-icon" />,
    XCircle: () => <div data-testid="x-icon" />,
}));

import { getCurrentBrainBuff } from '../../../services/brainBuffService';

const mockBrainBuffData = {
    weekId: '2026-W11',
    title: 'Test Math Problem',
    category: 'Algebra',
    difficulty: 'Medium',
    question: 'What is 2+2?',
    options: [
        { id: 'A', text: '3' },
        { id: 'B', text: '4' },
        { id: 'C', text: '5' },
        { id: 'D', text: '6' },
    ],
    correctAnswer: 'B',
    explanation: 'Because 2+2=4.',
    hint: 'Think carefully.',
    timeLimit: 300,
    active: true,
};

describe('BrainBuffContainer', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('shows loading state initially', () => {
        (getCurrentBrainBuff as any).mockReturnValue(new Promise(() => { })); // never resolves
        render(<BrainBuffContainer />);
        expect(screen.getByText(/Summoning the Oracle/)).toBeInTheDocument();
    });

    it('shows error state when fetch fails', async () => {
        (getCurrentBrainBuff as any).mockRejectedValue(new Error('Network error'));
        render(<BrainBuffContainer />);
        await waitFor(() => {
            expect(screen.getByText(/Oops/)).toBeInTheDocument();
        });
    });

    it('renders the header after successful fetch', async () => {
        (getCurrentBrainBuff as any).mockResolvedValue(mockBrainBuffData);
        render(<BrainBuffContainer />);
        await waitFor(() => {
            expect(screen.getByText('BrainBuff of the Week')).toBeInTheDocument();
        });
    });

    it('restores completed state from localStorage', async () => {
        const savedState = JSON.stringify({
            completed: true,
            reason: 'answered',
            selected: 'B',
            isCorrect: true,
        });
        localStorage.setItem('brainbuff_2026-W11', savedState);

        (getCurrentBrainBuff as any).mockResolvedValue(mockBrainBuffData);
        render(<BrainBuffContainer />);

        await waitFor(() => {
            expect(screen.getByText(/Brilliant/)).toBeInTheDocument();
        });
    });

    it('restores time-up state from localStorage', async () => {
        const savedState = JSON.stringify({
            completed: true,
            reason: 'timeUp',
            selected: null,
            isCorrect: false,
        });
        localStorage.setItem('brainbuff_2026-W11', savedState);

        (getCurrentBrainBuff as any).mockResolvedValue(mockBrainBuffData);
        render(<BrainBuffContainer />);

        await waitFor(() => {
            expect(screen.getByText(/Time's Up/)).toBeInTheDocument();
        });
    });

    it('shows Try Again button on error', async () => {
        (getCurrentBrainBuff as any).mockRejectedValue(new Error('Network error'));
        render(<BrainBuffContainer />);
        await waitFor(() => {
            expect(screen.getByText('Try Again')).toBeInTheDocument();
        });
    });

    it('handles corrupted localStorage gracefully', async () => {
        localStorage.setItem('brainbuff_2026-W11', 'not-json');
        (getCurrentBrainBuff as any).mockResolvedValue(mockBrainBuffData);
        render(<BrainBuffContainer />);

        await waitFor(() => {
            expect(screen.getByText('BrainBuff of the Week')).toBeInTheDocument();
        });
        // Corrupted entry should be cleaned up
        expect(localStorage.getItem('brainbuff_2026-W11')).toBeNull();
    });
});
