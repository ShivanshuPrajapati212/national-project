
/**
 * @jest-environment node
 */
import User from '@/models/User'
import mongoose from 'mongoose'

describe('User Model', () => {
    it('should be invalid if required fields are missing', () => {
        const user = new User({});
        const err = user.validateSync();
        expect(err.errors.name).toBeDefined();
        expect(err.errors.email).toBeDefined();
    });

    it('should use default role "new"', () => {
        const user = new User({
            name: 'Test User',
            email: 'test@example.com'
        });
        expect(user.role).toBe('new');
    });

    it('should accept valid roles', () => {
        const roles = ['student', 'teacher', 'parent'];
        roles.forEach(role => {
            const user = new User({
                name: 'Test',
                email: 'test@test.com',
                role
            });
            expect(user.validateSync()).toBeUndefined();
        });
    });

    it('should fail on invalid role', () => {
        const user = new User({
            name: 'Test',
            email: 'test@test.com',
            role: 'astronaut'
        });
        const err = user.validateSync();
        expect(err.errors.role).toBeDefined();
    });
});
