import KoaRouter from 'koa-router';

import { create, del, index, update, show } from '../controllers/CharacterController';

const characterRoutes = new KoaRouter({
  prefix: '/characters',
});

characterRoutes.get('/', index);
characterRoutes.post('/', create);
characterRoutes.put('/:id/:safeName', update);
characterRoutes.get('/:id/:safeName', show);
characterRoutes.delete('/:id/:safeName', del);

export default characterRoutes;
