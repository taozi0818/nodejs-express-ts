import * as express from 'express';
import Middleware from './middleware';
import Router from './api/router/index';

const app: express.Application = express();

app.set('env', 'development');
app.set('port', 3001);
app.use(Middleware);
app.use(Router);

export default app;
