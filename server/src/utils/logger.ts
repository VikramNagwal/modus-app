import winston from 'winston';

const logger = winston.createLogger({
    level: 'info', // Log levels: error, warn, info, http, verbose, debug, silly
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), // Log to the console
        new winston.transports.File({ filename: 'logs/app.log' }) // Log to a file
    ],
});

export { logger };
