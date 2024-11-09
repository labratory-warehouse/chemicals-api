import Express, { Application } from 'express';
import { router } from './routes.js';

const app: Application = Express();
export const startServer = () => {
  const host = '127.0.0.1';
  const port = 8080;
  app.use(Express.json());
  app.use(router);
  app.listen(port, () => {
    console.log('Listening on', host + ':' + port);
  });
};
