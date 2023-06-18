import { NextFunction, RequestHandler, Request, Response } from 'express';

const cerateAsync =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
export default cerateAsync;
