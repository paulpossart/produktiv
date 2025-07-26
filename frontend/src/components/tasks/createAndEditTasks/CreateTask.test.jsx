import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { callCreateTask } from '../../../apiCalls/tasksCalls';
import CreateTask from './CreateTask';

jest.mock('../../../apiCalls/tasksCalls');
jest.mock('../../../context/ModalContext');

describe('CreateTask', () => {
    const mockTasks = jest.fn();
    const mockFetchTasks = jest.fn();

    beforeEach(() => {
        render(<CreateTask tasks={mockTasks} fetchTasks={mockFetchTasks} />)
    })

    it('displays character count for title and description boxes', () => {
        const titleCount = screen.getByTestId('title-count');
        const descCount = screen.getByTestId('description-count');
        expect(titleCount).toHaveTextContent('');
        expect(descCount).toHaveTextContent('');

        fireEvent.change(screen.getByLabelText(/title/i),
            { target: { value: 'abc' } });
        fireEvent.change(screen.getByLabelText(/description/i),
            { target: { value: 'abc' } });

        expect(titleCount).toHaveTextContent('47 characters left');
        expect(descCount).toHaveTextContent('497 characters left');
    })

    it('uses callCreateTask on click', async () => {
        fireEvent.change(screen.getByLabelText(/title/i),
            { target: { value: 'title' } });
        fireEvent.change(screen.getByLabelText(/description/i),
            { target: { value: 'desc' } });

        fireEvent.click(screen.getByRole('button', { name: 'Add' }));

        await waitFor(() => {
            expect(callCreateTask).toHaveBeenCalledWith('title', 'desc', undefined);
        })
    })
})

