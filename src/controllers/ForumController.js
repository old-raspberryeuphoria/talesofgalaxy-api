import { Forum } from '../models';

export const index = async ctx => {
  const forums = await Forum.findAll({
    where: {
      isArchived: false,
    },
    raw: true,
  });

  const map = {};
  forums.forEach(forum => (map[forum.id] = forum));

  for (let i = forums.length - 1; i >= 0; i--) {
    const forum = forums[i];
    const parentForum = forum.parentId && map[forum.parentId];

    if (parentForum) {
      if (parentForum.hasOwnProperty('subForums')) {
        parentForum.subForums.push(forum);
      } else {
        parentForum.subForums = [forum];
      }

      forums.splice(i, 1);
    }
  }

  ctx.body = { forums };
  ctx.status = 200;
};

export const show = async ctx => {
  const {
    params: { id },
  } = ctx;

  const forum = await Forum.findByPk(id);

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

  const forum = await Forum.findByPk(id);
  const archivedForum = await forum.update({ isArchived: true });

  if (archivedForum) {
    ctx.body = { archivedForum };
    ctx.status = 200;
  }
};
