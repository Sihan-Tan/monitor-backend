"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class TestModel {
  getInfo() {
    return new Promise(resolve => {
      resolve('我以我血荐轩辕');
    });
  }

  getData() {
    return new Promise(resolve => {
      resolve({
        item: '我是后台数据',
        result: [1, 'next']
      });
    });
  }

}

var _default = TestModel;
exports.default = _default;