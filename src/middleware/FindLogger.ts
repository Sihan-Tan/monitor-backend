import { configure, getLogger } from 'log4js';
import { resolve } from 'path';

function getYearMonthDay(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

class FindLogger {
  static init(logName: string, type: string) {
    configure({
      appenders: {
        cheese: { type: 'file', filename: resolve(__dirname, '..', `logs/${logName}/${getYearMonthDay()}/${type}.log`) },
      },
      categories: { default: { appenders: ['cheese'], level: 'all' } },
    });
    const logger = getLogger('cheese');

    return logger;
  }
}

export default FindLogger;
