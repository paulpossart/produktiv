import { fireEvent, render, screen } from '@testing-library/react';
import { callDeleteTaskById } from '../../../apiCalls/tasksCalls';
import DeleteTask from './DeleteTask';

jest.mock('../../../context/ModalContext');
jest.mock('../../../apiCalls/tasksCalls');

describe('DeleteTask', () => {
    it('deletes the task', () => {
        render(<DeleteTask taskId='101' fetchTasks={jest.fn} />);
        fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
        expect(callDeleteTaskById).toHaveBeenCalledWith('101');
    })
})
