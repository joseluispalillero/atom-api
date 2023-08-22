import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ATOM API Documentation',
            version: '1.0.0',
            description: 'API documentation for ATOM tasks',
        },
        components: {
            schemas: {
                Task: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        desc: { type: 'string' },
                        status: { type: 'string', enum: ['PENDIENTE', 'COMPLETO'] },
                    },
                    example: {
                        title: "Titulo",
                        desc: "desc de tarea",
                        status: "COMPLETO"
                    }
                },
                ValidationErrorResponse: {
                    type: 'object',
                    properties: {
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    msg: { type: 'string' },
                                },
                            },
                        },
                    },
                    example: {
                        errors: [
                            {
                                msg: "El campo [title] es requerido y debe ser una cadena de texto."
                            },
                            {
                                msg: "El campo [desc] es requerido y debe ser una cadena de texto."
                            },
                            {
                                msg: 'El campo [status] es requerido y solo puede ser "PENDIENTE" o "COMPLETO".',
                            },
                        ],
                    },
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'object',
                            properties: {
                                code: { type: 'string' },
                                status: { type: 'number' },
                                cause: { type: 'string' },
                                message: { type: 'string' },
                            },
                        },
                    },
                    example: {
                        error: {
                            code: "TASK_NOT_FOUND",
                            status: 400,
                            cause: "Tarea no encontrada",
                            message: "Tarea no encontrada"
                        }
                    }
                },
                // You can add other schemas here
            },
        },
    },
    apis: ['src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;