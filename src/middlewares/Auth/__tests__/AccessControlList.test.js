import config from 'config';

import AccessControlList from '../AccessControlList';

import { User } from '../../../models';

describe('AccessControlerList class', () => {
    let user = null;

    beforeAll(async () => {
        user = (await User.findByPk('a6d91193-7d09-4f74-bcbf-08b913d479eb')).toJSON();
    });

    afterAll(async () => {
        user = null;
    });

    it('constructor', () => {
        const fakeRequest = {
            url: '/v1/candidates/a6d91193-7d09-4f74-bcbf-08b913d479eb',
            method: 'POST',
        };
        const acl = new AccessControlList(config.acl, fakeRequest);

        expect(acl.rules).toBe(config.acl);
    });

    describe('allowAccess on public route', () => {
        const fakeRequest = {
            url: '/v1',
            method: 'GET',
        };
        const acl = new AccessControlList(config.acl, fakeRequest);

        it('should always return true', () => {
            expect(acl.allowAccess(false)).toBeTruthy();
            expect(acl.allowAccess(user)).toBeTruthy();
        });
    });

    describe('allowAccess on private route', () => {
        const fakeRequest = {
            url: '/v1/candidates',
            method: 'DELETE',
        };

        it('should return false for candidate and guest', () => {
            const acl = new AccessControlList(config.acl, fakeRequest);

            expect(acl.allowAccess(false)).toBeFalsy();
            expect(acl.allowAccess(user)).toBeFalsy();
        });

        it('should return true if admin', () => {
            const acl1 = new AccessControlList(config.acl, fakeRequest);

            user.role = 'admin';
            expect(acl1.allowAccess(user)).toBeTruthy();
            user.role = 'candidate';
        });
    });

    describe('allowAccess on restricted route', () => {
        const fakeRequest = {
            url: '/v1/candidates/a6d91193-7d09-4f74-bcbf-08b913d479eb',
            method: 'PUT',
        };

        it('should return true for candidate with the same ID or admin', () => {
            const acl = new AccessControlList(config.acl, fakeRequest);

            expect(acl.allowAccess(user)).toBeTruthy();
            user.role = 'admin';
            user.id = '122ba0a4-68f1-5e86-be38-6b34e7fcf3af';
            expect(acl.allowAccess(user)).toBeTruthy();
            user.role = 'candidate';
            user.id = 'a6d91193-7d09-4f74-bcbf-08b913d479eb';
        });

        it('should return false for a guest', () => {
            const acl1 = new AccessControlList(config.acl, fakeRequest);

            expect(acl1.allowAccess(false)).toBeFalsy();
        });

        it('sould return false for a candidates with a different id', () => {
            const acl2 = new AccessControlList(config.acl, fakeRequest);

            user.id = '122ba0a4-68f1-5e86-be38-6b34e7fcf3af';
            expect(acl2.allowAccess(user)).toBeFalsy();
        });
    });
});
