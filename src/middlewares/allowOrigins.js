import config from 'config';

const checkWhitelistHost = async (ctx, next) => {
  const requestOrigin = ctx.header.origin;

  if (!config.allowOrigins.includes(requestOrigin)) {
    ctx.throw(401, 'Missing or wrong origin', { code: 'USR_AUT_03_01' });
  }

  await next();
};

export default checkWhitelistHost;
