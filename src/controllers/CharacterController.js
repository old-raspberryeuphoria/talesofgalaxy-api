import { Character, Faction, User } from '../models';

const factionInclude = {
  model: Faction,
  as: 'faction',
};

const userInclude = {
  model: User,
  as: 'user',
  attributes: { exclude: ['password'] },
};

export const index = async ctx => {
  const characters = await Character.findAll({
    where: {
      isArchived: false,
    },
    include: [factionInclude],
  });

  ctx.body = { characters };
  ctx.status = 200;
};

export const show = async ctx => {
  const {
    params: { id },
  } = ctx;

  const character = await Character.findByPk(id, {
    include: [factionInclude, userInclude],
  });

  if (!character) {
    ctx.throw(404, 'Unable to find character');
  }

  ctx.body = { character };
  ctx.status = 200;
};

export const create = async ctx => {
  const {
    request: { body },
    currentUser,
  } = ctx;

  if (!body.userId) {
    body.userId = currentUser.id;
  }

  const character = await Character.create(body);

  if (character) {
    ctx.body = { character };
    ctx.status = 200;
  }
};

export const update = async ctx => {
  const {
    params: { id },
    request: { body },
  } = ctx;

  const character = await Character.findByPk(id);
  const updatedCharacter = await character.update(body);

  if (updatedCharacter) {
    ctx.body = { updatedCharacter };
    ctx.status = 200;
  }
};

export const del = async ctx => {
  const {
    params: { id },
  } = ctx;

  const character = await Character.findByPk(id);
  const archivedCharacter = await character.update({ isArchived: true });

  if (archivedCharacter) {
    ctx.body = { archivedCharacter };
    ctx.status = 200;
  }
};
