import * as express from 'express';
import createLogger from '../util/logger';

const logger = createLogger('Server');
const env: string = process.env.NODE_ENV || 'development';

export default (err, req: express.Request, res: express.Response, next: express.NextFunction) => {

  const status: number = err.status;

  if (status === 404) {
    res.status(404);
    res.json({ success: false, code: 404, err: 'Not Found', data: null });
  } else if (status === 400) {
    res.status(400);
    res.json({ success: false, code: 400, err: err.message || null, data: null });
  } else {
    logger.error(err.message);

    if (env !== 'production') { // For development environment
      /* tslint:disable no-console */
      console.error(err.stack);
      /* tslint:enable no-console */
    }

    res.status(500);
    res.json({ success: false, code: 500, err: err.message, data: null });
  }

  next();
};
