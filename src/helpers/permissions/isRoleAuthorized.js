import { ROLE_ADMIN, ROLE_GAME_MASTER, ROLE_USER, ROLE_GUEST } from '../constants/roles';

const rolesLevel = {
  [ROLE_GUEST]: 0,
  [ROLE_USER]: 1,
  [ROLE_GAME_MASTER]: 2,
  [ROLE_ADMIN]: 3,
};

export default ({ targetRole, currentRole }) => rolesLevel[currentRole] >= rolesLevel[targetRole];
