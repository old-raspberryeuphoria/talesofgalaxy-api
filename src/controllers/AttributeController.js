import { Attribute } from '../models';

export const index = async ctx => {
  const attributes = await Attribute.findAll({
    where: {
      isArchived: false,
    },
  });

  ctx.body = { attributes };
  ctx.status = 200;
};

export const show = async ctx => {
  const {
    params: { id },
  } = ctx;

  const attribute = await Attribute.findByPk(id);

  if (!attribute) {
    ctx.throw(404, 'Unable to find attribute');
  }

  ctx.body = { attribute };
  ctx.status = 200;
};

export const create = async ctx => {
  const {
    request: { body },
  } = ctx;

  const attribute = await Attribute.create(body);

  if (attribute) {
    ctx.body = { attribute };
    ctx.status = 200;
  }
};

export const update = async ctx => {
  const {
    params: { id },
    request: { body },
  } = ctx;

  const attribute = await Attribute.findByPk(id);
  const updatedAttribute = await attribute.update(body);

  if (updatedAttribute) {
    ctx.body = { updatedAttribute };
    ctx.status = 200;
  }
};

export const del = async ctx => {
  const {
    params: { id },
  } = ctx;

  const attribute = await Attribute.findByPk(id);
  const archivedAttribute = await attribute.update({ isArchived: true });

  if (archivedAttribute) {
    ctx.body = { archivedAttribute };
    ctx.status = 200;
  }
};
