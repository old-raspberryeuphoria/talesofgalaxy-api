import config from 'config';
import passport from 'koa-passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import accessControlList from './AccessControlList';

const options = {
  jwtFromRequest: ExtractJwt.versionOneCompatibility({
    authScheme: 'Bearer',
  }),
  secretOrKey: config.jwt.secret,
  ignoreExpiration: false,
};

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      done(null, jwtPayload);
    } catch (err) {
      done(err, false);
    }
  }),
);

export const AuthHandler = (ctx, next) => {
  const acl = new accessControlList(config.acl, ctx.request);
  const { authorization } = ctx.request.header;

  ctx.currentUser = {
    role: 'guest',
  };

  if (!authorization) {
    return (async () => {
      if (acl.allowAccess(false)) {
        await next();
      } else {
        ctx.throw(401, 'You do not have permission to access this resource', {
          code: 'USR_AUT_03_00',
        });
      }
    })(ctx, next);
  } else {
    return passport.authenticate('jwt', { session: false }, async (err, jwtPayload, info) => {
      if (jwtPayload === false) {
        ctx.throw(401, 'Invalid token', { code: 'USR_AUT_04_00' });
      } else if (acl.allowAccess(jwtPayload)) {
        ctx.currentUser = jwtPayload;
        await next();
      } else {
        const message = info || 'You do not have permission to access this resource';
        ctx.throw(401, message, { code: 'USR_AUT_03_00' });
      }
    })(ctx, next);
  }
};

export default passport;
