import KoaRouter from 'koa-router';

import { create, del, index, update, show } from '../controllers/UserController';

const userRoutes = new KoaRouter({
  prefix: '/users',
});

userRoutes.get('/', index);
userRoutes.post('/', create);
userRoutes.put('/:id', update);
userRoutes.get('/:safeName', show);
userRoutes.delete('/:id', del);

export default userRoutes;
