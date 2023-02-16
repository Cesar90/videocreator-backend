import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const runValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }
  next();
};

export { runValidation };
