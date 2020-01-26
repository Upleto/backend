import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import json from 'koa-json';

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = { msg: 'hello world' };

  await next();
});

app.use(json());
app.use(logger());

app.use(router.routes()).use(router.allowedMethods());
console.log(1, app);

export default app;
