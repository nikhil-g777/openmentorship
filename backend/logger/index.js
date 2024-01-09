// imports
const productionLogger = require('./productionLogger.js');
const testLogger = require('./testLogger.js');
const developmentLogger = require('./developmentLogger.js');

// logger
let logger = null;

// set logger based on environment
if (process.env.NODE_ENV === 'production') {
    logger = productionLogger();
} else if (process.env.NODE_ENV === 'test') {
    logger = testLogger();
} else {
    logger = developmentLogger();
}

module.exports = logger;