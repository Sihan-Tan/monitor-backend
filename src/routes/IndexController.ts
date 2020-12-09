import { GET, POST, route } from 'awilix-koa';

@route('/')
class IndexController {
  @route('/')
  @GET()
  actionList(ctx: any) {
    // const data = await this.indexService.getInfo();
    ctx.body = '服务器连接成功';
  }

  @route('/')
  @POST()
  postList(ctx: any) {
    // const data = await this.indexService.getInfo();
    ctx.body = '服务器连接成功';
  }
}

export default IndexController;
