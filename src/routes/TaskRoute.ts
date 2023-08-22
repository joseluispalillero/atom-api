import express, { Request, Response } from 'express';
import { TaskController } from '../controllers/TaskController';
import { container } from 'tsyringe';
import asyncMiddleware from '../wrap';
import { validateTask } from '../core/middleware/ValidateTask';

const taskController = container.resolve(TaskController);
const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     responses:
 *       200:
 *         description: Listado de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/', asyncMiddleware(async (req: Request, res: Response) => taskController.getTasks(req, res)));

/**
 * @swagger
 * /tasks/{taskId}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:taskId', asyncMiddleware(async (req, res) => taskController.getTaskById(req, res)));

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tarea creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', validateTask, asyncMiddleware(async (req, res) => taskController.saveTask(req, res)));

/**
 * @swagger
 * /tasks/{taskId}:
 *   put:
 *     summary: Actualizar una tarea existente
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: ID de la tarea a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:taskId', validateTask, asyncMiddleware(async (req, res) => taskController.updateTask(req, res)));

/**
 * @swagger
 * /tasks/{taskId}:
 *   delete:
 *     summary: Eliminar una tarea por ID
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: ID de la tarea a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:taskId', asyncMiddleware(async (req, res) => taskController.deleteTask(req, res)));

export default router;