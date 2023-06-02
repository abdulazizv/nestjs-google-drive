import { Request, Response, NextFunction } from 'express';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, url } = req;
    
    console.log(`${method} ${url} - ${duration}ms`);
  });
  
  next();
};

export default loggerMiddleware;
