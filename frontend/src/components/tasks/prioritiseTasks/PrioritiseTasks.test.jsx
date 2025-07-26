import { fireEvent, render, screen } from '@testing-library/react';
import { callPrioritiseTasksById } from '../../../apiCalls/tasksCalls';
import PrioritiseTasks from './PrioritiseTasks';

jest.mock('../../../apiCalls/tasksCalls');
jest.mock('../../../context/ModalContext');

describe('PrioritiseTasks', () => {
    it('uses callPrioritiseTasksById', () => {
        render(
            <PrioritiseTasks
                taskId='101'
                prevTask={{ id: '100' }}
                prevPrevTask={{ id: '99' }}
                nextTask={{ id: '102' }}
                nextNextTask={{ id: '103' }}
                fetchTasks={jest.fn()}
            />
        );
        fireEvent.click(screen.getByTestId('priority-up'));
        expect(callPrioritiseTasksById).toHaveBeenCalledWith(
            '101', '+', '100', '99'
        );
    })
})