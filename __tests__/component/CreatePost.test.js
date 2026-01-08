
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import CreatePost from '@/components/CreatePost'

// Mock the server action
jest.mock('@/app/actions/post', () => ({
    createPost: jest.fn(),
}));

describe('CreatePost Component', () => {
    it('renders text area and buttons', () => {
        render(<CreatePost />);
        expect(screen.getByPlaceholderText("What's on your mind?")).toBeInTheDocument();
        expect(screen.getByText("Post")).toBeInTheDocument();
    });

    it('allows typing content', () => {
        render(<CreatePost />);
        const textarea = screen.getByPlaceholderText("What's on your mind?");
        fireEvent.change(textarea, { target: { value: 'Hello World' } });
        expect(textarea.value).toBe('Hello World');
    });

    it('toggles tags', () => {
        render(<CreatePost />);
        const tag = screen.getByText("#Sports");
        fireEvent.click(tag);
        expect(tag).toHaveClass('badge-primary');
        fireEvent.click(tag);
        expect(tag).toHaveClass('badge-ghost');
    });
});
