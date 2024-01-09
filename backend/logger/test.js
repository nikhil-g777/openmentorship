const logger = require('./index.js');

logger.info('Hello world');
logger.warn('Warning message');
logger.error('Error message');
logger.debug('Debugging info');
logger.error(new Error('Error object'));
