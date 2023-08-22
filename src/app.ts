// app.ts
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import taskRoute from './routes/TaskRoute';
import cors from 'cors';
import { errorHandler } from './core/middleware/ErrorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

const app = express();

// Middleware
app.use(express.json());

// Enable CORS
app.use(
    cors({
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }),
);

// routes
app.use('/tasks', taskRoute);

// error handling
app.use(errorHandler);

// Serve the Swagger UI
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
