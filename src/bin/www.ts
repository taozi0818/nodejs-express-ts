import app from '../app';
import createLogger from '../util/logger';
import { sequelize } from '../db/sequelize';

const then = require('thenjs');
const logger = createLogger('Server');
const port: number = app.get('port');
const env: string = app.get('env');

(process as NodeJS.EventEmitter).on('UnhandledPromiseRejectionWarning', (err: Error) => {
  logger.error(err.message);
});

then((defer) => {

  sequelize.authenticate()
    .then(() => {
      defer();
      return null;
    }).catch((err: Error) => {
    defer(err);
  });

}).then((defer) => {

  sequelize.sync()
    .then(() => {
      defer();
    }).catch((err: Error) => {
    defer(err);
  });

}).then((defer) => {

  app.listen(port);
  logger.info(`Server is listening on ${port} port, environment is ${env || 'development'}`);
}).fail((defer, err) => {
  logger.error(err.message);
});
