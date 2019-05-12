import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import uuid from 'uuid';
import { pick } from 'lodash';

import { User } from '../models';
// import { callWorker } from '../helpers/workerHelpers';

const getSignInUser = async userInstance => {
  const user = userInstance.toJSON();

  const tokenFields = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  user.token = jwt.sign(tokenFields, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

  return user;
};

export const signIn = async ctx => {
  if (ctx.currentUser.role !== 'guest') {
    const userInstance = await User.findByPk(ctx.currentUser.id);

    if (userInstance && !userInstance.isArchived) {
      await userInstance.update({
        last_sign_in_at: new Date(),
        current_sign_in_ip: ctx.request.ip,
        sign_in_count: userInstance.sign_in_count + 1,
      });

      ctx.body = await getSignInUser(userInstance);
      ctx.status = 200;
    } else {
      ctx.throw(404, "This user doesn't exist or this user is archived", {
        code: 'USR_DAT_06_01',
      });
    }
  } else {
    const { password, name } = ctx.request.body;
    const userInstance = await User.findOne({
      where: {
        name,
        isArchived: false,
      },
    });

    if (userInstance) {
      const isValidPassword = await bcrypt.compare(password, userInstance.password);

      if (isValidPassword) {
        await userInstance.update({
          last_sign_in_at: new Date(),
          current_sign_in_ip: ctx.request.ip,
          sign_in_count: userInstance.sign_in_count + 1,
        });

        ctx.body = await getSignInUser(userInstance);
        ctx.status = 200;
      } else {
        ctx.throw(400, 'Invalid credentials', { code: 'USR_AUT_01_00' });
      }
    } else {
      ctx.throw(400, 'Invalid credentials', { code: 'USR_AUT_01_00' });
    }
  }
};

export const connectAs = async ctx => {
  const {
    request: {
      body: { id },
    },
  } = ctx;

  const userInstance = await User.findByPk(id);

  if (userInstance) {
    ctx.body = await getSignInUser(userInstance);
    ctx.status = 200;
  } else {
    ctx.throw(404, 'This user does not exist', { code: 'USR_DAT_06_00' });
  }
};

export const checkResetPasswordToken = async ctx => {
  const { token } = ctx.request.body;

  if (!token) {
    ctx.throw(401, 'Unauthorized', { code: 'USR_AUT_03_00' });
  }

  const user = await User.findOne({
    where: {
      reset_password_token: token,
      isArchived: false,
    },
  });

  if (user) {
    const passwordExpiredTime =
      new Date(user.reset_password_sent_at).getTime() + config.passwordExpiredTime;
    const today = new Date().getTime();

    if (passwordExpiredTime > today) {
      ctx.body = {
        role: user.role,
      };
    } else {
      ctx.throw(401, 'Token expired', { code: 'USR_AUT_02_00' });
    }
  }
};

export const resetPassword = async ctx => {
  const { type } = ctx.request.body;

  switch (type) {
    case 'send':
      await sendResetMail(ctx);
      break;
    case 'reset':
      await updatePassword(ctx);
      break;
    default:
      ctx.throw(400, 'Bad request', { code: 'USR_DAT_08_00' });
      break;
  }
};

const updatePassword = async ctx => {
  const { token, password } = ctx.request.body;

  if (!token) {
    ctx.throw(401, 'Unauthorized', { code: 'USR_AUT_03_00' });
  }

  const user = await User.findOne({
    where: {
      reset_password_token: token,
      isArchived: false,
    },
  });

  if (user) {
    const passwordExpiredTime =
      new Date(user.reset_password_sent_at).getTime() + config.passwordExpiredTime;
    const today = new Date().getTime();

    if (passwordExpiredTime > today) {
      await User.update(
        {
          password,
          reset_password_token: null,
          reset_password_sent_at: null,
        },
        {
          where: {
            id: user.id,
          },
          individualHooks: true,
        },
      );
      ctx.status = 204;
    } else {
      ctx.throw(401, 'Token expired', { code: 'USR_AUT_02_00' });
    }
  }
};

const sendResetMail = async ctx => {
  let { email } = ctx.request.body;

  if (!email) {
    ctx.throw(400, 'Bad request', { code: 'USR_DAT_08_01' });
  }

  email = email.toLowerCase();

  const user = await User.findOne({
    where: {
      email,
      isArchived: false,
    },
  });

  if (user) {
    const [, [updatedUser]] = await User.update(
      {
        reset_password_token: uuid(),
        reset_password_sent_at: new Date(),
      },
      {
        where: {
          email,
          isArchived: false,
        },
        returning: true,
      },
    );

    // callWorker('sendResetPasswordToken', { user_id: updatedUser.id });
    ctx.status = 204;
  } else {
    ctx.throw(404, 'This user does not exist', { code: 'USR_DAT_06_00' });
  }
};

export const changePassword = async ctx => {
  const {
    request: { body },
    user: { id },
  } = ctx;

  const userInput = pick(body, ['id', 'password', 'new_password', 'verif_new_password']);

  const user = await User.findByPk(userInput.id, {
    attributes: ['id', 'password'],
  });

  if (user) {
    if (userInput.id === id) {
      const valid_password = await bcrypt.compare(userInput.password, user.password);

      if (valid_password && userInput.new_password === userInput.verif_new_password) {
        const updatedUser = await user.update({ password: userInput.new_password });

        ctx.body = updatedUser;
        ctx.status = 200;
      } else {
        ctx.throw(400, 'Invalid password credentials', { code: 'USR_DAT_08_02' });
      }
    } else {
      ctx.throw(403, 'You do not have permission to access this resource', {
        code: 'USR_DAT_09_00',
      });
    }
  }
};
