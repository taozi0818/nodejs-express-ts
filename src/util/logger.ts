import { getLogger } from 'log4js';

const createLogger = (logTitle) => {
  const logger = getLogger(logTitle);
  logger.level = 'debug';

  return logger;
};

export default createLogger;
