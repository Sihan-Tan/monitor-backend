"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ErrorHandler {
  static error(app, logger) {
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (e) {
        logger.error(e);
        ctx.body = '500请求啦~恢复中.';
      }
    });
    app.use(async (ctx, next) => {
      await next();

      if (ctx.status !== 404) {
        return;
      }

      ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>';
    });
  }

}

var _default = ErrorHandler;
exports.default = _default;