import KoaRouter from 'koa-router';

import { index } from '../controllers/ApiController';

const apiRoutes = new KoaRouter();

apiRoutes.get('/', index);

export default apiRoutes;
