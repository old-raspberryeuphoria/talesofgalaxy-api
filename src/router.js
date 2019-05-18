import KoaRouter from 'koa-router';

import apiRoutes from './routes/apiRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import factionRoutes from './routes/factionRoutes';
import characterRoutes from './routes/characterRoutes';
import attributeRoutes from './routes/attributeRoutes';
import skillRoutes from './routes/skillRoutes';
import forumRoutes from './routes/forumRoutes';

const router = new KoaRouter();

router.use(apiRoutes.middleware());
router.use(authRoutes.middleware());
router.use(userRoutes.middleware());
router.use(factionRoutes.middleware());
router.use(characterRoutes.middleware());
router.use(attributeRoutes.middleware());
router.use(skillRoutes.middleware());
router.use(forumRoutes.middleware());

export default router;
