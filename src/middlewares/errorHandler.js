import { Readable } from 'stream';

async function errorHandler(ctx, next) {
  let message;
  let code;

  try {
    await next();
  } catch (error) {
    ctx.status = error.name.startsWith('Sequelize') ? 400 : error.status || 500;

    if (['SequelizeValidationError', 'SequelizeUniqueConstraintError'].includes(error.name)) {
      if (typeof error.errors[0].message === 'object') {
        if ('msg' in error.errors[0].message) {
          ({ msg: message, code } = error.errors[0].message);
        } else {
          ({ message, code } = error.errors[0].message);
        }
      } else if (typeof error.errors[0].message === 'string') {
        ({ message } = error.errors[0]);
      }
    } else {
      ({ message, code } = typeof error.message === 'object' ? error.message : error);
    }

    if (!(process.env.NODE_ENV === 'test' && error.name.includes('Sequelize'))) {
      ctx.app.emit('error', error, ctx);
    }
  } finally {
    ctx.status = ctx.status || 404;
    if (ctx.status === 404 && !message) {
      message = 'Not Found';
    }

    if (!(ctx.body instanceof Readable || ctx.body instanceof Buffer)) {
      if (ctx.status < 300) {
        ctx.body = { data: ctx.body };

        if ('total' in ctx) {
          ctx.body.total = ctx.total;
        }
      } else {
        ctx.body = {
          error: { status: ctx.status, message, code },
        };
      }
    }
  }
}

export default errorHandler;
