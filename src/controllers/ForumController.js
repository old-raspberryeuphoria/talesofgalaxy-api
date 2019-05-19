import hierarchizeForums from '../helpers/forums/hierarchizeForums';
import { Forum } from '../models';
import { ROLE_ADMIN, ROLE_GAME_MASTER } from '../helpers/constants/roles';

const parentForumInclude = {
  model: Forum,
  as: 'parentForum',
};

const subForumsInclude = {
  model: Forum,
  as: 'subForums',
};

export const index = async ctx => {
  const forums = await Forum.findAll({
    where: {
      isArchived: false,
    },
    raw: true,
  });

  ctx.body = { forums: hierarchizeForums(forums) };
  ctx.status = 200;
};

export const show = async ctx => {
  const {
    params: { id },
  } = ctx;

  const forum = await Forum.findByPk(id, {
    include: [parentForumInclude, subForumsInclude],
  });

  if (!forum) {
    ctx.throw(404, 'Unable to find forum');
  }

  ctx.body = { forum };
  ctx.status = 200;
};

export const create = async ctx => {
  const {
    request: { body },
  } = ctx;

  const forum = await Forum.create(body);

  if (forum) {
    ctx.body = { forum };
    ctx.status = 200;
  }
};

export const update = async ctx => {
  const {
    params: { id },
    request: { body },
  } = ctx;

  const forum = await Forum.findByPk(id);

  if (!forum) {
    ctx.throw(404, 'Unable to find forum');
  }

  if (body.parentId === forum.id) {
    ctx.throw(401, "You can't set the parentId of a forum to its own id.");
  }

  const updatedForum = await forum.update(body);

  if (updatedForum) {
    ctx.body = { updatedForum };
    ctx.status = 200;
  }
};

export const del = async ctx => {
  const {
    params: { id },
  } = ctx;

  const forum = await Forum.findByPk(id, {
    include: subForumsInclude,
  });

  if (!forum) {
    ctx.throw(404, 'Unable to find forum');
  }

  const archivedForum = await forum.update({ isArchived: true });

  forum.subForums.forEach(async subForum => {
    const forum = await Forum.findByPk(subForum.id);
    await forum.update({ parentId: null });
  });

  if (archivedForum) {
    ctx.body = { archivedForum };
    ctx.status = 200;
  }
};
