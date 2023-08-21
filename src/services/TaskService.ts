import { CustomError } from '../core/errors/CustomError';
import { Task } from '../models/Task';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { StatusCodes } from 'http-status-codes';

// Initialize Firebase Admin SDK
const serviceAccount = require('../../firebaseConfig.json');
initializeApp({
    credential: cert(serviceAccount)
});

const firestore = getFirestore();

export class TaskService {

    async getTaskById(id: string): Promise<Task | undefined> {
        try {
            const taskRef = firestore.collection('tasks').doc(id);
            const doc = await taskRef.get()
            if (!doc.exists) {
                console.log('No such document!');
                throw new CustomError('TASK_NOT_FOUND', 'Tarea no encontrada', StatusCodes.BAD_REQUEST);
            } else {
                console.log('Document data:', doc.data());
                return doc.data() as Task;
            }
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw new CustomError('TASK_ERROR_SERVER', error?.message || '', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getTasks(): Promise<Task[] | undefined> {
        try {
            const taskRef = firestore.collection('tasks');
            const doc = await taskRef.get()

            const tasks: Task[] = doc.docs.map(doc => {
                const data = doc.data();
                const { id } = doc;
                return { id, ...data } as Task;
            });

            return tasks;
        } catch (error: any) {
            throw new CustomError('TASK_ERROR_SERVER', error?.message || '', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async saveTask(insertData: Partial<Task>): Promise<void> {
        try {
            const taskRef = firestore.collection('tasks');
            await taskRef.doc().set(insertData)
        } catch (error: any) {
            throw new CustomError('TASK_ERROR_SERVER', error?.message || '', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async updateTask(id: string, updatedData: Partial<Task>): Promise<Task | undefined> {
        try {
            await this.getTaskById(id);
            const taskRef = firestore.collection('tasks').doc(id);
            await taskRef.update(updatedData);
            return updatedData as Task;
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw new CustomError('TASK_ERROR_SERVER', error?.message || '', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteTask(id: string): Promise<void> {
        try {
            await this.getTaskById(id);
            const taskRef = firestore.collection('tasks').doc(id);
            await taskRef.delete();
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw new CustomError('TASK_ERROR_SERVER', error?.message || '', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}