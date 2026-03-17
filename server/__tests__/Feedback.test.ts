import mongoose from 'mongoose';
import Feedback from '../models/Feedback';

// We don't connect to a real DB — we test the schema validation logic
describe('Feedback Model', () => {
    describe('Schema Validation', () => {
        it('should require description field', async () => {
            const feedback = new Feedback({ name: 'Test', email: 'a@b.com' });
            const err = feedback.validateSync();
            expect(err).toBeDefined();
            expect(err!.errors.description).toBeDefined();
        });

        it('should accept a valid feedback with only description', () => {
            const feedback = new Feedback({ description: 'Great event!' });
            const err = feedback.validateSync();
            expect(err).toBeUndefined();
        });

        it('should accept a valid feedback with all fields', () => {
            const feedback = new Feedback({
                name: 'John',
                email: 'john@example.com',
                description: 'Loved it!',
            });
            const err = feedback.validateSync();
            expect(err).toBeUndefined();
        });

        it('should allow name to be optional', () => {
            const feedback = new Feedback({ description: 'No name' });
            const err = feedback.validateSync();
            expect(err).toBeUndefined();
            expect(feedback.name).toBeUndefined();
        });

        it('should allow email to be optional', () => {
            const feedback = new Feedback({ description: 'No email' });
            const err = feedback.validateSync();
            expect(err).toBeUndefined();
            expect(feedback.email).toBeUndefined();
        });

        it('should reject invalid email format', async () => {
            const feedback = new Feedback({
                description: 'Test',
                email: 'not-an-email',
            });
            const err = feedback.validateSync();
            expect(err).toBeDefined();
            expect(err!.errors.email).toBeDefined();
        });

        it('should reject empty string description', () => {
            const feedback = new Feedback({ description: '' });
            const err = feedback.validateSync();
            // Mongoose treats empty string as falsy for required
            expect(err).toBeDefined();
        });

        it('should set createdAt by default', () => {
            const feedback = new Feedback({ description: 'Test' });
            expect(feedback.createdAt).toBeDefined();
            expect(feedback.createdAt).toBeInstanceOf(Date);
        });
    });
});
