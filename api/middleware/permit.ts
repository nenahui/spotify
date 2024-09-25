import type { NextFunction, Request, Response } from 'express';
import type { RequestWithUser } from './auth';

export const permit = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as RequestWithUser).user;

    if (!user || user.role !== 'admin') {
      return res.status(403).send({ error: 'Forbidden' });
    }

    return next();
  };
};
