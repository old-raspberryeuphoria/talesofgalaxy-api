import KoaRouter from 'koa-router';

import { create, del, index, update, show } from '../controllers/FactionController';

const factionRoutes = new KoaRouter({
  prefix: '/factions',
});

factionRoutes.get('/', index);
factionRoutes.post('/', create);
factionRoutes.put('/:id/:safeName', update);
factionRoutes.get('/:id/:safeName', show);
factionRoutes.delete('/:id/:safeName', del);

export default factionRoutes;
