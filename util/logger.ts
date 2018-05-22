import * as logger from 'log4js';

export default (logTitle) => {
  return logger.getLogger(logTitle);
}
