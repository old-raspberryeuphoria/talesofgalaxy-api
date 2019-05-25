import {
  Attribute,
  Character,
  CharacterAttribute,
  CharacterSkill,
  Faction,
  User,
  Skill,
} from '../models';
import isRoleAuthorized from '../helpers/permissions/isRoleAuthorized';
import { ROLE_GAME_MASTER } from '../helpers/constants/roles';

const userInclude = {
  model: User,
  as: 'user',
  attributes: { exclude: ['id', 'email', 'password'] },
};

const factionInclude = {
  model: Faction,
  as: 'faction',
};

const characterAttributesInclude = {
  model: CharacterAttribute,
  as: 'attributes',
  include: {
    model: Attribute,
    as: 'attribute',
  },
};

const characterSkillInclude = {
  model: CharacterSkill,
  as: 'skills',
  include: {
    model: Skill,
    as: 'skill',
  },
};

export const index = async ctx => {
  const characters = await Character.findAll({
    where: {
      isArchived: false,
    },
    include: factionInclude,
  });

  ctx.body = { characters };
  ctx.status = 200;
};

export const show = async ctx => {
  const {
    params: { id },
  } = ctx;

  const character = await Character.findByPk(id, {
    include: [factionInclude, userInclude, characterAttributesInclude, characterSkillInclude],
  });

  if (!character) {
    ctx.throw(404, 'Unable to find character');
  }

  const output = {
    ...character.toJSON(),
    attributes: character.attributes.map(({ value, attribute: { name } }) => ({
      value,
      name,
    })),
    skills: character.skills.map(({ isSpecialised, skill: { name } }) => ({
      isSpecialised,
      name,
    })),
  };

  ctx.body = { character: output };
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
    currentUser: { id: userId, role },
  } = ctx;

  const character = await Character.findByPk(id);

  if (
    userId !== character.userId &&
    !isRoleAuthorized({ targetRole: ROLE_GAME_MASTER, currentRole: role })
  ) {
    ctx.throw(403, 'You do not have permission to modify this resource');
  }

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
