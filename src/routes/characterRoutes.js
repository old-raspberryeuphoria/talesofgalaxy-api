import KoaRouter from 'koa-router';

import { create, del, index, update, show } from '../controllers/CharacterController';

const characterRoutes = new KoaRouter({
  prefix: '/characters',
});

characterRoutes.get('/', index);
characterRoutes.post('/', create);
characterRoutes.put('/:id', update);
characterRoutes.get('/:id', show);
characterRoutes.delete('/:id', del);

export default characterRoutes;
