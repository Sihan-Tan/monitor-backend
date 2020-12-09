import { GET, POST, route } from 'awilix-koa';
import Router from 'koa-router';
import FindLogger from '@middleware/FindLogger';

@route('/test')
class IndexController {
  private testModel;

  constructor({ testModel }: { testModel: any }) {
    this.testModel = testModel;
  }

  @route('/')
  @GET()
  getError(ctx: Router.IRouterContext) {
    const { header, query: { info } } = ctx.request;
    let parseInfo;
    try {
      parseInfo = JSON.parse(info);
    } catch {
      parseInfo = info;
    }
    this.writeLog(header, parseInfo, header['user-agent']);
  }

  @route('/')
  @POST()
  actionList(ctx: Router.IRouterContext) {
    // const data = await this.indexService.getInfo();
    const { header, body } = ctx.request;
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
    this.writeLog(header, parseBody, header['user-agent']);
  }

  // 收集输入，写入日志
  writeLog(header: any, useInfo: any, userAgent: string) {
    const { host, origin, referer } = header;
    const {
      type, data, apiKey, msg, title, curUrl, time = new Date().getTime(), note = '',
    } = useInfo;
    const logger = FindLogger.init(apiKey, type);
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
      data,
    };
    const extraData = {
      note,
      time,
      msg,
    };
    if (type === 'error') {
      logger.error({ ...extraData, ...originData });
    } else {
      logger.info(originData);
    }
  }
}

export default IndexController;
