import { TaskService } from '../src/services/TaskService';
import { CustomError } from '../src/core/errors/CustomError';
import { StatusCodes } from 'http-status-codes';
import { Task } from '../src/models/Task';

let lastInsert = { id: '1' } as Task | undefined;

describe('TaskService', () => {
    const taskService = new TaskService();
    const mockTaskData = { title: 'task test', status: 'PENDIENTE', desc: 'desc' } as Task;
    const mockUpdateTaskData = { title: 'task test updated', status: 'COMPLETO', desc: 'desc updated' } as Task;

    describe('saveTask', () => {
        it('should save a task successfully', async () => {
            await taskService.saveTask(mockTaskData);
        });

        it('should throw CustomError with status code 500 when there is an internal server error', async () => {
            await expect(taskService.saveTask({} as Task)).rejects.toThrow(
                new CustomError('TASK_ERROR_SERVER', 'Error al guardar la tarea', StatusCodes.INTERNAL_SERVER_ERROR)
            );
        });
    });

    describe('getTasks', () => {
        it('should return all tasks', async () => {
            const result = await taskService.getTasks();
            lastInsert = result?.find(item => item.title === mockTaskData.title);
            expect(lastInsert?.title).toEqual(mockTaskData.title);
        });

        it('should throw CustomError with status code 400 when the task does not exist', async () => {
            await expect(taskService.getTaskById('nonExistentTask')).rejects.toThrow(
                new CustomError('TASK_NOT_FOUND', 'Tarea no encontrada', StatusCodes.BAD_REQUEST)
            );
        });
    });

    describe('getTaskById', () => {
        it('should return a task when the task exists', async () => {
            const result = await taskService.getTaskById(lastInsert?.id || '');
            expect(result).toEqual({ title: 'task test', status: 'PENDIENTE', desc: 'desc' });
        });

        it('should throw CustomError with status code 400 when the task does not exist', async () => {
            await expect(taskService.getTaskById('nonExistentTask')).rejects.toThrow(
                new CustomError('TASK_NOT_FOUND', 'Tarea no encontrada', StatusCodes.BAD_REQUEST)
            );
        });
    });

    describe('updateTask', () => {
        it('should update a task successfully', async () => {
            const result = await taskService.updateTask(lastInsert?.id || '', mockUpdateTaskData);
            expect(result).toEqual(mockUpdateTaskData);
        });

        it('should throw CustomError with status code 500 when there is an internal server error', async () => {
            await expect(taskService.updateTask('1', {} as Task)).rejects.toThrow(
                new CustomError('TASK_ERROR_SERVER', 'Tarea no encontrada', StatusCodes.INTERNAL_SERVER_ERROR)
            );
        });
    });

    describe('deleteTask', () => {
        it('should delete a task successfully', async () => {
            await taskService.deleteTask(lastInsert?.id || '');
        });

        it('should throw CustomError with status code 500 when there is an internal server error', async () => {
            await expect(taskService.deleteTask('1')).rejects.toThrow(
                new CustomError('TASK_ERROR_SERVER', 'Tarea no encontrada', StatusCodes.INTERNAL_SERVER_ERROR)
            );
        });
    });

});