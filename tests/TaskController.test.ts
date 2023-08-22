import 'reflect-metadata';
import { Request, Response } from 'express';
import { TaskController } from '../src/controllers/TaskController';
import { TaskService } from '../src/services/TaskService';
import { Task } from '../src/models/Task';

jest.mock('../src/services/TaskService'); // Automatically mocks the TaskService class

describe('TaskController', () => {
    let taskController: TaskController;
    let mockTaskService: jest.Mocked<TaskService>;

    beforeEach(() => {
        // Create a mocked TaskService instance
        mockTaskService = new TaskService() as jest.Mocked<TaskService>;

        // Provide the mocked TaskService to the controller
        taskController = new TaskController(mockTaskService);
    });

    describe('getTaskById', () => {
        it('should return the task when found', async () => {
            const mockTask = { id: 'task123', title: 'Test Task' } as Task;
            mockTaskService.getTaskById.mockResolvedValue(mockTask);

            const mockRequest: Request<{ taskId: string }> = {
                params: { taskId: 'task123' },
            } as any; // Cast as any to override type checking for this mock object

            const mockResponse = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as unknown as Response;

            await taskController.getTaskById(mockRequest, mockResponse);

            expect(mockTaskService.getTaskById).toHaveBeenCalledWith('task123');
            expect(mockResponse.json).toHaveBeenCalledWith(mockTask);
        });

        it('should respond with 404 when task not found', async () => {
            mockTaskService.getTaskById.mockResolvedValue(undefined);

            const mockRequest: Request<{ taskId: string }> = {
                params: { taskId: 'nonExistentTask' },
            } as any; // Cast as any to override type checking for this mock object

            const mockResponse = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as unknown as Response;

            await taskController.getTaskById(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Task not found' });
        });
    });

    describe('getTasks', () => {
        it('should return tasks when found', async () => {
            const mockTasks = [
                { id: 'task123', title: 'Task 1' },
                { id: 'task456', title: 'Task 2' },
            ] as any;
            mockTaskService.getTasks.mockResolvedValue(mockTasks);

            const mockRequest: Request = {} as any; // Cast as any to override type checking for this mock object
            const mockResponse = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as unknown as Response;

            await taskController.getTasks(mockRequest, mockResponse);

            expect(mockTaskService.getTasks).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith(mockTasks);
        });

    });

    describe('saveTask', () => {
        it('should save a task successfully', async () => {
            const mockRequest: Request = {
                body: { title: 'New Task' },
            } as any;

            const mockResponse = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as unknown as Response;

            await taskController.saveTask(mockRequest, mockResponse);

            expect(mockTaskService.saveTask).toHaveBeenCalledWith({ title: 'New Task' });
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Task saved' });
        });
    });

    describe('updateTask', () => {
        it('should update a task successfully', async () => {
            const mockTask = { id: 'task123', title: 'Updated Task' } as any;
            mockTaskService.updateTask.mockResolvedValue(mockTask);

            const mockRequest: Request = {
                params: { taskId: 'task123' },
                body: { title: 'Updated Task' },
            } as any;

            const mockResponse = {
                json: jest.fn(),
            } as unknown as Response;

            await taskController.updateTask(mockRequest, mockResponse);

            expect(mockTaskService.updateTask).toHaveBeenCalledWith('task123', { title: 'Updated Task' });
            expect(mockResponse.json).toHaveBeenCalledWith(mockTask);
        });
    });


    describe('deleteTask', () => {
        it('should delete a task successfully', async () => {
            const mockRequest: Request = {
                params: { taskId: 'task123' },
            } as any;

            const mockResponse = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as unknown as Response;

            await taskController.deleteTask(mockRequest, mockResponse);

            expect(mockTaskService.deleteTask).toHaveBeenCalledWith('task123');
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Task deleted' });
        });
    });
});