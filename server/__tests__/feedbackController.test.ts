import { Request, Response } from 'express';
import { createFeedback } from '../controllers/feedbackController';
import Feedback from '../models/Feedback';

// Mock the Feedback model
jest.mock('../models/Feedback');

const mockResponse = (): Response => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    return res;
};

const mockRequest = (body: any): Request => {
    return { body } as Request;
};

describe('feedbackController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createFeedback', () => {
        it('should return 400 if description is missing', async () => {
            const req = mockRequest({ name: 'Test' });
            const res = mockResponse();

            await createFeedback(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Description is required.' });
        });

        it('should return 400 if description is empty string', async () => {
            const req = mockRequest({ description: '' });
            const res = mockResponse();

            await createFeedback(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Description is required.' });
        });

        it('should return 400 if description is whitespace only', async () => {
            const req = mockRequest({ description: '   ' });
            const res = mockResponse();

            await createFeedback(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Description is required.' });
        });

        it('should save feedback and return 201 on valid input', async () => {
            const savedData = {
                _id: 'abc123',
                name: 'Test User',
                email: 'test@example.com',
                description: 'Great event!',
                createdAt: new Date(),
            };

            // Mock the Feedback constructor and save method
            const mockSave = jest.fn().mockResolvedValue(savedData);
            (Feedback as any).mockImplementation(() => ({
                save: mockSave,
            }));

            const req = mockRequest({
                name: 'Test User',
                email: 'test@example.com',
                description: 'Great event!',
            });
            const res = mockResponse();

            await createFeedback(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(savedData);
        });

        it('should save feedback with only description', async () => {
            const savedData = {
                _id: 'abc123',
                description: 'Just a comment',
                createdAt: new Date(),
            };

            const mockSave = jest.fn().mockResolvedValue(savedData);
            (Feedback as any).mockImplementation(() => ({
                save: mockSave,
            }));

            const req = mockRequest({ description: 'Just a comment' });
            const res = mockResponse();

            await createFeedback(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(savedData);
        });

        it('should return 400 if save throws an error', async () => {
            const mockSave = jest.fn().mockRejectedValue(new Error('DB connection failed'));
            (Feedback as any).mockImplementation(() => ({
                save: mockSave,
            }));

            const req = mockRequest({ description: 'Valid description' });
            const res = mockResponse();

            await createFeedback(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'DB connection failed' });
        });
    });
});
