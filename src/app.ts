import { addAliases } from 'module-alias';
/* eslint-disable */
addAliases({
  '@root': __dirname,
  '@config': `${__dirname}/config`,
  '@logs': `${__dirname}/logs`,
  '@middleware': `${__dirname}/middleware`,
  '@routes': `${__dirname}/routes`,
  '@models': `${__dirname}/models`,
  '@shared': `${__dirname}/shared`,
});
import Koa from 'koa';
import config from '@config';
import { createContainer, Lifetime } from 'awilix';
import { scopePerRequest, loadControllers } from 'awilix-koa';
import ErrorHandler from '@middleware/ErrorHandler';
import bodyParser from 'koa-bodyparser';
import { configure, getLogger } from 'log4js';
import cors from '@koa/cors';
/* eslint-enable */

const { port } = config;

configure({
  appenders: {
    cheese: { type: 'file', filename: `${__dirname}/logs/app.log` },
  },
  categories: { default: { appenders: ['cheese'], level: 'error' } },
});
const logger = getLogger('cheese');

const app = new Koa();
app.use(cors());
app.use(bodyParser({ enableTypes: ['json', 'text', 'form'] }));
const container = createContainer();
container.loadModules([`${__dirname}/models/*.ts`], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});
app.use(scopePerRequest(container));
ErrorHandler.error(app, logger);
app.use(loadControllers(`${__dirname}/routes/*.ts`));

app.listen(port, () => {
  console.log(`server start at localhost:${port}`);
});
