import express, { Request, Response, NextFunction } from 'express';
/**
 * pacote para capturar os erros,
 * devido o uso de async
 **/
import 'express-async-errors';

import routes from './routes';
import './database';
import uploadConfig from './config/upload';
import AppError from './error/AppError';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server started port 3333!');
});
