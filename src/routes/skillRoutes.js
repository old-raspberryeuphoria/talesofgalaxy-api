import KoaRouter from 'koa-router';

import { create, del, index, update, show } from '../controllers/SkillController';

const skillRoutes = new KoaRouter({
  prefix: '/skills',
});

skillRoutes.get('/', index);
skillRoutes.post('/', create);
skillRoutes.put('/:id', update);
skillRoutes.get('/:id', show);
skillRoutes.delete('/:id', del);

export default skillRoutes;
