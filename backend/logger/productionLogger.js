const path = require('path');
const { format, createLogger, transports } = require('winston');
const { timestamp, combine, errors, json } = format;

const productionLogger = () => {
    return createLogger({
        level: 'warning',
        format: combine(timestamp(), errors({ stack: true }), json()),
        transports: [
            new transports.File({
                filename: path.join(__dirname, 'logs', 'combined.log'),
                level: 'info'
            }),
            new transports.File({
                filename: path.join(__dirname, 'logs', 'errors.log'),
                level: 'error'
            }),
        ],
    });
}

module.exports = productionLogger;