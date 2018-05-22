import * as express from 'express';

interface Error {
  status?: number;
}

class NetError extends Error {
}

interface NetError {
  status?: number;
}

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let err: NetError = new NetError('Not Found');
  err.status = 404;
  next(err);
};
