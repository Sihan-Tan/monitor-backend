"use strict";

var _moduleAlias = require("module-alias");

var _koa = _interopRequireDefault(require("koa"));

var _config = _interopRequireDefault(require("@config"));

var _awilix = require("awilix");

var _awilixKoa = require("awilix-koa");

var _ErrorHandler = _interopRequireDefault(require("@middleware/ErrorHandler"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _log4js = require("log4js");

var _cors = _interopRequireDefault(require("@koa/cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _moduleAlias.addAliases)({
  '@root': __dirname,
  '@config': `${__dirname}/config`,
  '@logs': `${__dirname}/logs`,
  '@middleware': `${__dirname}/middleware`,
  '@routes': `${__dirname}/routes`,
  '@models': `${__dirname}/models`,
  '@shared': `${__dirname}/shared`
});
const {
  port
} = _config.default;
(0, _log4js.configure)({
  appenders: {
    cheese: {
      type: 'file',
      filename: `${__dirname}/logs/app.log`
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error'
    }
  }
});
const logger = (0, _log4js.getLogger)('cheese');
const app = new _koa.default();
app.use((0, _cors.default)());
app.use((0, _koaBodyparser.default)({
  enableTypes: ['json', 'text', 'form']
}));
const container = (0, _awilix.createContainer)();
container.loadModules([`${__dirname}/models/*.ts`], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: _awilix.Lifetime.SCOPED
  }
});
app.use((0, _awilixKoa.scopePerRequest)(container));

_ErrorHandler.default.error(app, logger);

app.use((0, _awilixKoa.loadControllers)(`${__dirname}/routes/*.ts`));
app.listen(port, () => {
  console.log(`server start at localhost:${port}`);
});