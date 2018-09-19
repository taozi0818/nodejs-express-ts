import * as log4js from 'log4js';

export default log4js.connectLogger(
  log4js.getLogger('Server'),
  {
    format: ':method ":url" :status :res[Content-Length] :response-time',
    level: 'INFO'
  }
);
