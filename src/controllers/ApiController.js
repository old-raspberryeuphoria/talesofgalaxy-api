import { appName, buildVersion, version } from 'config';

export const index = async ctx => {
  ctx.body = {
    appName: appName,
    environment: process.env.NODE_ENV || 'development',
    version: version,
    build: buildVersion,
  };

  ctx.status = 200;
};
