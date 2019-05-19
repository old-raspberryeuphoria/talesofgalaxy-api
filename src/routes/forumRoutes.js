import KoaRouter from 'koa-router';

import { create, del, index, update, show } from '../controllers/ForumController';

const forumRoutes = new KoaRouter({
  prefix: '/forums',
});

forumRoutes.get('/', index);
forumRoutes.post('/', create);
forumRoutes.put('/:id', update);
forumRoutes.get('/:id', show);
forumRoutes.delete('/:id', del);

export default forumRoutes;
