import KoaRouter from 'koa-router';

import { create, del, index, update, show } from '../controllers/FactionController';

const factionRoutes = new KoaRouter({
  prefix: '/factions',
});

factionRoutes.get('/', index);
factionRoutes.post('/', create);
factionRoutes.put('/:id', update);
factionRoutes.get('/:id', show);
factionRoutes.delete('/:id', del);

export default factionRoutes;
