import * as express from 'express';
import Middleware from './middleware/index';
import Router from './api/router/index';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import notFound from './middleware/notFound';
import errorHandler from './middleware/error';

const env: string = process.env.NODE_ENV || 'development';
const config = require(path.resolve(__filename, `../../config/${env}.json`));
const app: express.Application = express();
const port: number = config.server.port;

app.set('env', env);
app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Docs
app.use(express.static(__dirname + '/public'));
app.use(Middleware);
app.use('/api', Router);
app.use(notFound);
app.use(errorHandler);

export default app;
