import { Faction } from '../models';

export const index = async ctx => {
  const factions = await Faction.findAll({
    where: {
      isArchived: false,
    },
  });

  ctx.body = { factions };
  ctx.status = 200;
};

export const show = async ctx => {
  const {
    params: { id },
  } = ctx;

  const faction = await Faction.findByPk(id);

  if (!faction) {
    ctx.throw(404, 'Unable to find faction');
  }

  ctx.body = { faction };
  ctx.status = 200;
};

export const create = async ctx => {
  const {
    request: { body },
  } = ctx;

  const faction = await Faction.create(body);

  if (faction) {
    ctx.body = { faction };
    ctx.status = 200;
  }
};

export const update = async ctx => {
  const {
    params: { id },
    request: { body },
  } = ctx;

  const faction = await Faction.findByPk(id);
  const updatedFaction = await faction.update(body);

  if (updatedFaction) {
    ctx.body = { updatedFaction };
    ctx.status = 200;
  }
};

export const del = async ctx => {
  const {
    params: { id },
  } = ctx;

  const faction = await Faction.findByPk(id);
  const archivedFaction = await faction.update({ isArchived: true });

  if (archivedFaction) {
    ctx.body = { archivedFaction };
    ctx.status = 200;
  }
};
