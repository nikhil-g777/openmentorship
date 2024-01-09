const path = require('path');
const { format, createLogger, transports } = require('winston');
const { timestamp, combine, printf, errors } = format;

const testLogger = () => {
    const logFormat = printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${stack || message}`;
    });

    return createLogger({
        level: 'error',
        format: combine(
            format.colorize(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            errors({ stack: true }),
            logFormat
        ),
        transports: [
            new transports.File({
                filename: path.join(__dirname, 'testLogs', 'combined.log'),
                level: 'info'
            }),
            new transports.File({
                filename: path.join(__dirname, 'testLogs', 'errors.log'),
                level: 'error'
            }),
            new transports.Console(),
        ],
    });
}

module.exports = testLogger;