import winston from 'winston';
const winstonTimestampColorize = require('winston-timestamp-colorize');

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp(),
        winston.format.colorize(),
        winstonTimestampColorize({ color: 'red' }),
        winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)),
    level: 'debug',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ]
});

export default logger;
