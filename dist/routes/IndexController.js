"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awilixKoa = require("awilix-koa");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let IndexController = (_dec = (0, _awilixKoa.route)('/'), _dec2 = (0, _awilixKoa.route)('/'), _dec3 = (0, _awilixKoa.GET)(), _dec4 = (0, _awilixKoa.route)('/'), _dec5 = (0, _awilixKoa.POST)(), _dec(_class = (_class2 = class IndexController {
  actionList(ctx) {
    // const data = await this.indexService.getInfo();
    ctx.body = {
      code: 0,
      data: {},
      msg: '服务器连接成功'
    };
  }

  postList(ctx) {
    // const data = await this.indexService.getInfo();
    ctx.body = {
      code: 0,
      data: {},
      msg: '服务器连接成功'
    };
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "actionList", [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "actionList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "postList", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "postList"), _class2.prototype)), _class2)) || _class);
var _default = IndexController;
exports.default = _default;