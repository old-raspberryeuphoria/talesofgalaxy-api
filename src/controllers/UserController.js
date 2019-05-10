import config from 'config';
import jwt from 'jsonwebtoken';
import { User } from '../models';

export const index = async ctx => {
  const users = await User.findAll({
    where: {
      isArchived: false,
    },
  });

  const output = [...users];

  ctx.body = output;
  ctx.status = 200;
};

export const show = async ctx => {
  const {
    params: { id },
  } = ctx;

  const user = await User.findByPk(id);

  if (!user) {
    ctx.throw(404, 'Unable to find user');
  }

  const output = { ...user.toJSON() };

  ctx.body = output;
  ctx.status = 200;
};

export const create = async ctx => {
  const {
    request: { body },
  } = ctx;

  const user = await User.create(body);

  if (user) {
    const output = { ...user.toJSON() };

    output.token = jwt.sign({ id: user.id, role: user.role }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    ctx.body = output;
    ctx.status = 200;
  }
};

export const update = async ctx => {
  const {
    params: { id },
    request: { body },
    currentUser,
  } = ctx;

  const user = await User.findByPk(id);

  for (const field in body) {
    if (
      User.rawAttributes[field].api &&
      !User.rawAttributes[field].api.editable.includes(currentUser.role)
    ) {
      ctx.throw(401, 'You do not have permission to update this field');
    }
  }

  const updatedUser = await user.update(body);

  if (updatedUser) {
    const output = { ...updatedUser.toJSON() };

    output.token = jwt.sign({ id: user.id, role: user.role }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    ctx.body = output;
    ctx.status = 200;
  }
};

export const del = async ctx => {
  const {
    params: { id },
  } = ctx;

  const user = await User.findByPk(id);
  const archivedUser = await user.update({ isArchived: true });

  if (archivedUser) {
    const output = { ...archivedUser.toJSON() };

    ctx.body = output;
    ctx.status = 200;
  }
};
