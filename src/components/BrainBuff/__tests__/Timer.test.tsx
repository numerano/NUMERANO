import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import Timer from '../Timer';

describe('Timer', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders initial time in mm:ss format', () => {
        render(<Timer duration={300} onTimeUp={vi.fn()} isActive={true} />);
        expect(screen.getByText('5:00')).toBeInTheDocument();
    });

    it('renders "Time Remaining" label', () => {
        render(<Timer duration={60} onTimeUp={vi.fn()} isActive={true} />);
        expect(screen.getByText(/Time Remaining/)).toBeInTheDocument();
    });

    it('counts down each second', () => {
        render(<Timer duration={300} onTimeUp={vi.fn()} isActive={true} />);
        expect(screen.getByText('5:00')).toBeInTheDocument();

        act(() => { vi.advanceTimersByTime(1000); });
        expect(screen.getByText('4:59')).toBeInTheDocument();

        act(() => { vi.advanceTimersByTime(1000); });
        expect(screen.getByText('4:58')).toBeInTheDocument();
    });

    it('calls onTimeUp when timer reaches 0', () => {
        const onTimeUp = vi.fn();
        render(<Timer duration={3} onTimeUp={onTimeUp} isActive={true} />);

        act(() => { vi.advanceTimersByTime(3000); });
        expect(onTimeUp).toHaveBeenCalledTimes(1);
    });

    it('does not count down when isActive is false', () => {
        render(<Timer duration={300} onTimeUp={vi.fn()} isActive={false} />);
        expect(screen.getByText('5:00')).toBeInTheDocument();

        act(() => { vi.advanceTimersByTime(5000); });
        expect(screen.getByText('5:00')).toBeInTheDocument();
    });

    it('formats time correctly for sub-60 seconds', () => {
        render(<Timer duration={45} onTimeUp={vi.fn()} isActive={true} />);
        expect(screen.getByText('0:45')).toBeInTheDocument();
    });

    it('formats time with padded seconds', () => {
        render(<Timer duration={65} onTimeUp={vi.fn()} isActive={true} />);
        expect(screen.getByText('1:05')).toBeInTheDocument();
    });
});
