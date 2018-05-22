import * as express from 'express';

export default (err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.error = (err) => {
    if () {

    }
  };
  next();
}