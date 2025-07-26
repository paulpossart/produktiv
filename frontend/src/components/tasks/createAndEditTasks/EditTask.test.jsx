import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { callEditTaskById } from '../../../apiCalls/tasksCalls';
import EditTask from './EditTask';

jest.mock('../../../apiCalls/tasksCalls');
jest.mock('../../../context/ModalContext');

describe('EditTask', () => {
    const mockTasks = jest.fn();
    const mockFetchTasks = jest.fn();

    it('uses callEditTaskById on click', async () => {
        render(
            <EditTask
                taskId='101'
                originalTitle='title'
                originalDescription='desc'
                fetchTasks={jest.fn()}
            />)

        fireEvent.change(screen.getByLabelText(/new title/i),
            { target: { value: 'new title' } });
        fireEvent.change(screen.getByLabelText(/new description/i),
            { target: { value: 'new desc' } });

        fireEvent.click(screen.getByRole('button', { name: 'Add' }));

        await waitFor(() => {
            expect(callEditTaskById).toHaveBeenCalledWith('101', 'new title', 'new desc');
        })
    })
})

