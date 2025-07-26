import { fireEvent, render, screen } from '@testing-library/react';
import { mockRenderMainModal } from '../../../../context/ModalContext';
import AddTask from './AddTask';
import CreateTask from '../../../tasks/createAndEditTasks/CreateTask';

jest.mock('../../../../context/ModalContext');
jest.mock('../../../../context/AuthContext');

describe('AddTask', () => {
    it('renders the CreateTask component and props on click', () => {
        const mockClassName = jest.fn();
        const mockTasks = jest.fn();
        const mockFetchTasks = jest.fn();

        render(
            <AddTask
                className={mockClassName}
                tasks={mockTasks}
                fetchTasks={mockFetchTasks} />
        );

        fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));

        expect(mockRenderMainModal).toHaveBeenCalledWith(
            <CreateTask
                tasks={mockTasks}
                fetchTasks={mockFetchTasks}
            />
        );

    })
})
