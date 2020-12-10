"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awilixKoa = require("awilix-koa");

var _FindLogger = _interopRequireDefault(require("@middleware/FindLogger"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let IndexController = (_dec = (0, _awilixKoa.route)('/test'), _dec2 = (0, _awilixKoa.route)('/'), _dec3 = (0, _awilixKoa.GET)(), _dec4 = (0, _awilixKoa.route)('/'), _dec5 = (0, _awilixKoa.POST)(), _dec(_class = (_class2 = class IndexController {
  constructor({
    testModel
  }) {
    this.testModel = testModel;
  }

  async getError(ctx) {
    const {
      header,
      query: {
        info
      }
    } = ctx.request;
    let parseInfo;

    try {
      parseInfo = JSON.parse(info);
    } catch {
      parseInfo = info;
    }

    await this.writeLog(header, parseInfo, header['user-agent']);
    ctx.body = {
      code: 0,
      data: true,
      msg: '收到'
    };
  }

  async actionList(ctx) {
    // const data = await this.indexService.getInfo();
    const {
      header,
      body
    } = ctx.request;
    let parseBody;

    if (typeof body !== 'object') {
      try {
        parseBody = JSON.parse(body);
      } catch {
        parseBody = body;
      }
    } else {
      parseBody = body;
    }

    await this.writeLog(header, parseBody, header['user-agent']);
    ctx.body = {
      code: 0,
      data: true,
      msg: '收到'
    };
  } // 收集输入，写入日志


  writeLog(header, useInfo, userAgent) {
    const {
      host,
      origin,
      referer
    } = header;
    const {
      type,
      data,
      apiKey,
      msg,
      title,
      curUrl,
      time = new Date().getTime(),
      note = ''
    } = useInfo;

    const logger = _FindLogger.default.init(apiKey, type);

    if (data.entries) {
      data.entries = JSON.stringify(data.entries);
    }

    const originData = {
      host,
      title,
      curUrl,
      userAgent,
      origin,
      referer,
      data
    };
    const extraData = {
      note,
      time,
      msg
    };

    if (type === 'error') {
      logger.error({ ...extraData,
        ...originData
      });
    } else {
      logger.info(originData);
    }
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "getError", [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "getError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "actionList", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "actionList"), _class2.prototype)), _class2)) || _class);
var _default = IndexController;
exports.default = _default;