import url from 'url';

import { ROLE_GUEST } from '../../helpers/constants/roles';

export default class AccessControlList {
  constructor(rules, request) {
    const { url, method } = request;

    this.request = { url, method };
    this.rules = rules;
    this.user = {
      role: ROLE_GUEST,
      id: null,
    };
  }

  allowAccess(user) {
    this.user = !user ? this.user : user;

    for (const rule of this.rules) {
      if (this.user.role === rule.role) {
        return this.allowAccessForRessource(rule.allows);
      }
    }

    return false;
  }

  allowAccessForRessource(allows) {
    if (typeof allows === 'string' && allows === '*') {
      return true;
    }

    for (const allow of allows) {
      const pattern = new RegExp(this.getRegexFromPattern(allow[0]), 'gi');
      const { pathname } = url.parse(this.request.url);
      const matchPattern = pattern.exec(pathname);

      if (matchPattern !== null && allow[1].includes(this.request.method)) {
        this.request.id = matchPattern[1];

        return this.checkPermissionsForMethod(allow[2]);
      }
    }

    return false;
  }

  checkPermissionsForMethod(permission) {
    if (permission === '*') {
      return true;
    }

    return (
      (permission.includes('self') && this.request.id === this.user.id) ||
      permission.includes(this.user.role)
    );
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
