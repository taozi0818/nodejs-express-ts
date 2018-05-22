import * as express from 'express';
import { isError } from 'lodash';

export interface Response extends express.Response {
  success?: any;
}

export default (req: express.Request, res: Response, next: express.NextFunction) => {
  res.success = (data) => {
    res.status(200);
    res.json({
      code: 200,
      data,
      success: true
    });
  };

  res.fail = (msg) => {
    if (isError(msg)) {
      res.status(400);
      res.json({
        success: false,
        code: 400,
        data: null,
        msg: msg ? msg : null,
      });
    } else {

    }
  };
  next();
};
