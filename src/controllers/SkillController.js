import { Attribute, Skill } from '../models';

const attributeInclude = {
  model: Attribute,
  as: 'attribute',
};

export const index = async ctx => {
  const skills = await Skill.findAll({
    where: {
      isArchived: false,
    },
    include: attributeInclude,
  });

  ctx.body = { skills };
  ctx.status = 200;
};

export const show = async ctx => {
  const {
    params: { id },
  } = ctx;

  const skill = await Skill.findByPk(id, {
    include: attributeInclude,
  });

  if (!skill) {
    ctx.throw(404, 'Unable to find skill');
  }

  ctx.body = { skill };
  ctx.status = 200;
};

export const create = async ctx => {
  const {
    request: { body },
  } = ctx;

  const skill = await Skill.create(body);

  if (skill) {
    ctx.body = { skill };
    ctx.status = 200;
  }
};

export const update = async ctx => {
  const {
    params: { id },
    request: { body },
  } = ctx;

  const skill = await Skill.findByPk(id);
  const updatedSkill = await skill.update(body);

  if (updatedSkill) {
    ctx.body = { updatedSkill };
    ctx.status = 200;
  }
};

export const del = async ctx => {
  const {
    params: { id },
  } = ctx;

  const skill = await Skill.findByPk(id);
  const archivedSkill = await skill.update({ isArchived: true });

  if (archivedSkill) {
    ctx.body = { archivedSkill };
    ctx.status = 200;
  }
};
