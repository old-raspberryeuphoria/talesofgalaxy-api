import KoaRouter from 'koa-router';

import {
  changePassword,
  checkResetPasswordToken,
  connectAs,
  resetPassword,
  signIn,
} from '../controllers/AuthController';

const authRoutes = new KoaRouter({
  prefix: '/auth',
});

authRoutes.post('/sign-in', signIn);
authRoutes.post('/reset-password', resetPassword);
authRoutes.post('/check-token', checkResetPasswordToken);
authRoutes.put('/password', changePassword);
authRoutes.post('/connect-as', connectAs);

export default authRoutes;
