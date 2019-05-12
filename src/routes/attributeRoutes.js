import KoaRouter from 'koa-router';

import { create, del, index, update, show } from '../controllers/AttributeController';

const attributeRoutes = new KoaRouter({
  prefix: '/attributes',
});

attributeRoutes.get('/', index);
attributeRoutes.post('/', create);
attributeRoutes.put('/:id', update);
attributeRoutes.get('/:id', show);
attributeRoutes.delete('/:id', del);

export default attributeRoutes;
