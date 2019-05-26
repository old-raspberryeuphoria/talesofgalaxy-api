import url from 'url';

import isRoleAuthorized from '../../helpers/permissions/isRoleAuthorized';
import { ROLE_GUEST } from '../../helpers/constants/roles';

export default class AccessControlList {
  constructor(routes, request) {
    const { url, method } = request;

    this.request = { url, method };
    this.routes = routes;
    this.user = {
      role: ROLE_GUEST,
      id: null,
    };
  }

  allowAccess(user) {
    const { pathname } = url.parse(this.request.url);

    for (const route of this.routes) {
      const [routePath, routeMethods, allowedRoles] = route;
      const pattern = new RegExp(this.getRegexFromPattern(routePath), 'gi');
      const matchPattern = pattern.exec(pathname);

      if (matchPattern && routeMethods.includes(this.request.method)) {
        this.request.id = matchPattern[1];
        this.user = !user ? this.user : user;

        if (typeof allowedRoles === 'string' && allowedRoles === '*') {
          return true;
        } else if (allowedRoles.includes('self') && this.request.id === this.user.id) {
          return true;
        } else {
          for (const roleRequired of allowedRoles) {
            if (isRoleAuthorized({ roleRequired, role: user.role })) {
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  getRegexFromPattern(pattern) {
    pattern += '/?';
    pattern = pattern.replace(/\//g, '\\/');
    pattern = pattern.replace(/:(.*)/g, '(.*)');
    pattern = pattern.replace(/:text/g, '(.*)');
    pattern = `^${pattern}$`;

    return pattern;
  }
}
