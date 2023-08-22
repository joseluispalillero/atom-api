import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { TaskService } from '../services/TaskService';

@injectable()
export class TaskController {
    constructor(private taskService: TaskService) { }

    async getTaskById(req: Request, res: Response) {
        const { taskId } = req.params;
        const task = await this.taskService.getTaskById(taskId);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    }

    async getTasks(req: Request, res: Response) {
        const tasks = await this.taskService.getTasks();
        if (tasks) {
            res.json(tasks);
        } else {
            res.status(404).json({ message: 'Tasks not found' });
        }

    }

    async saveTask(req: Request, res: Response) {
        const { body } = req;
        await this.taskService.saveTask(body);
        res.status(200).json({ message: 'Task saved' });
    }

    async updateTask(req: Request, res: Response) {
        const { body, params: { taskId } } = req;
        const task = await this.taskService.updateTask(taskId, body);
        res.json({ ...task });
    }

    async deleteTask(req: Request, res: Response) {
        const { params: { taskId } } = req;
        await this.taskService.deleteTask(taskId);
        res.status(200).json({ message: 'Task deleted' });
    }

}