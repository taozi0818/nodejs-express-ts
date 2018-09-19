import { Request, Response, NextFunction } from './BaseController';
import Test from '../models/Test';
import TestService from '../services/TestService';
import { validator, ValidatorResult } from '../../util/validator';

export class TestController {

  public static async test(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const paramErr: ValidatorResult = validator(req.query, { name: 'required' });

      if (paramErr.hasError) {
        return next(paramErr);
      }

      const result: Test[] = await TestService.findAll();
      return res.success(result);
    } catch (e) {
      return next(e);
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const name = req.body.name;
      const desc = req.body.desc;
      const test: Test = new Test();

      test.init(name, desc);
      const result: Test = await TestService.create(test);
      return res.success(result);
    } catch (e) {
      return next(e);
    }
  }
}
