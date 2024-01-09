const { format, createLogger, transports } = require('winston');
const { timestamp, combine, printf, errors } = format;

const developmentLogger = () => {
    const logFormat = printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${stack || message}`;
    });

    return createLogger({
        level: 'info',
        format: combine(
            format.colorize(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            errors({ stack: true }),
            logFormat
        ),
        transports: [new transports.Console()],
    });
}

module.exports = developmentLogger;