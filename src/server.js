import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import config from 'config';
import cors from 'kcors';
import etag from 'koa-etag';
import helmet from 'koa-helmet';
import Koa from 'koa';

import allowOrigins from './middlewares/allowOrigins';
import errorHandler from './middlewares/errorHandler';
import passport, { AuthHandler } from './middlewares/Auth/passport';
// import querySearch from './middlewares/querySearch';
// import rateLimit from './middlewares/rateLimit';

import router from './router';

const app = new Koa()
  .use(cors({ exposeHeaders: ['Content-Disposition'] }))
  .use(compress())
  .use(etag())
  .use(helmet())
  // .use(rateLimit())
  .use(errorHandler)
  .use(bodyParser({ formLimit: config.request.sizeLimit }))
  .use(allowOrigins)
  .use(passport.initialize())
  .use(AuthHandler)
  // .use(querySearch)
  .use(router.middleware());

export default app;
