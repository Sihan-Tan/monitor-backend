"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _log4js = require("log4js");

var _path = require("path");

function getYearMonthDay() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

class FindLogger {
  static init(logName, type) {
    (0, _log4js.configure)({
      appenders: {
        cheese: {
          type: 'file',
          filename: (0, _path.resolve)(__dirname, '..', `logs/${logName}/${getYearMonthDay()}/${type}.log`)
        }
      },
      categories: {
        default: {
          appenders: ['cheese'],
          level: 'all'
        }
      }
    });
    const logger = (0, _log4js.getLogger)('cheese');
    return logger;
  }

}

var _default = FindLogger;
exports.default = _default;