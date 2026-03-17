import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import QuestionDisplay from '../QuestionDisplay';

const mockData = {
    title: 'Test Question',
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
    hint: 'Think about basic addition.',
};

const defaultProps = {
    data: mockData,
    onSelect: vi.fn(),
    selectedOption: null,
    isCorrect: null,
    showResult: false,
    timeUp: false,
    hintRevealed: false,
    onHintClick: vi.fn(),
};

describe('QuestionDisplay', () => {
    it('renders the question title', () => {
        render(<QuestionDisplay {...defaultProps} />);
        expect(screen.getByText('Test Question')).toBeInTheDocument();
    });

    it('renders the category badge', () => {
        render(<QuestionDisplay {...defaultProps} />);
        expect(screen.getByText('Algebra')).toBeInTheDocument();
    });

    it('renders the difficulty badge', () => {
        render(<QuestionDisplay {...defaultProps} />);
        expect(screen.getByText('Medium')).toBeInTheDocument();
    });

    it('renders the question text', () => {
        render(<QuestionDisplay {...defaultProps} />);
        expect(screen.getByText('What is 2+2?')).toBeInTheDocument();
    });

    it('renders all 4 options', () => {
        render(<QuestionDisplay {...defaultProps} />);
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('6')).toBeInTheDocument();
    });

    it('renders option badges A, B, C, D', () => {
        render(<QuestionDisplay {...defaultProps} />);
        expect(screen.getByText('A')).toBeInTheDocument();
        expect(screen.getByText('B')).toBeInTheDocument();
        expect(screen.getByText('C')).toBeInTheDocument();
        expect(screen.getByText('D')).toBeInTheDocument();
    });

    it('calls onSelect when an option is clicked', () => {
        const onSelect = vi.fn();
        render(<QuestionDisplay {...defaultProps} onSelect={onSelect} />);
        fireEvent.click(screen.getByText('4'));
        expect(onSelect).toHaveBeenCalledWith('B');
    });

    it('does not call onSelect when showResult is true', () => {
        const onSelect = vi.fn();
        render(<QuestionDisplay {...defaultProps} onSelect={onSelect} showResult={true} />);
        fireEvent.click(screen.getByText('4'));
        expect(onSelect).not.toHaveBeenCalled();
    });

    it('renders "Need a hint?" button when hint is available and not revealed', () => {
        render(<QuestionDisplay {...defaultProps} />);
        expect(screen.getByText(/Need a hint/)).toBeInTheDocument();
    });

    it('calls onHintClick when hint button is clicked', () => {
        const onHintClick = vi.fn();
        render(<QuestionDisplay {...defaultProps} onHintClick={onHintClick} />);
        fireEvent.click(screen.getByText(/Need a hint/));
        expect(onHintClick).toHaveBeenCalledTimes(1);
    });

    it('shows hint text when hintRevealed is true', () => {
        render(<QuestionDisplay {...defaultProps} hintRevealed={true} />);
        expect(screen.getByText('Think about basic addition.')).toBeInTheDocument();
    });

    it('hides hint section when showResult is true', () => {
        render(<QuestionDisplay {...defaultProps} showResult={true} />);
        expect(screen.queryByText(/Need a hint/)).not.toBeInTheDocument();
    });

    it('does not render hint button when no hint exists', () => {
        const noHintData = { ...mockData, hint: undefined };
        render(<QuestionDisplay {...defaultProps} data={noHintData} />);
        expect(screen.queryByText(/Need a hint/)).not.toBeInTheDocument();
    });
});
