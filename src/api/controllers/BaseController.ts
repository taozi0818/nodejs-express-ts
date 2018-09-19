import * as express from 'express';

export { Response } from '../../middleware/extend';
export type Request = express.Request;
export type NextFunction = express.NextFunction;

export class Pagination {
  success: boolean;
  code: number;
  data: any;
  page: number;
  total: number;

  constructor(data: any, page: number, total: number) {
    this.success = true;
    this.code = 200;
    this.data = data;
    this.page = page;
    this.total = total;
  }
}
