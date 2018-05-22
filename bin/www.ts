import app from '../app';
import createLogger from '../util/logger';

const then = require('thenjs');
const logger = createLogger('Server');
const port: number = app.get('port');
const env: string = app.get('env');

(process as NodeJS.EventEmitter).on('UnhandledPromiseRejectionWarning', (err: Error) => {
  logger.error(err.message);
});

then(() => {
  app.listen(port);
  logger.info(`Server is listening on ${port} port, environment is ${env || 'development'}`);
}).fail((defer, err) => {
  logger.error(err.message);
});
