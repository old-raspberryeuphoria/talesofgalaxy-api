import isRoleAuthorized from '../permissions/isRoleAuthorized';

const filterUnauthorizedForums = (forum, userRole) =>
  isRoleAuthorized({ targetRole: forum.permissions.read, currentRole: userRole });

export default (forums, userRole) => {
  const hierarchizedForums = [...forums]
    .filter(forum => filterUnauthorizedForums(forum, userRole))
    .map(forum => ({ ...forum.toJSON(), subForums: [] }));
  const map = hierarchizedForums.reduce((acc, forum) => ({ ...acc, [forum.id]: forum }), {});

  for (let i = hierarchizedForums.length - 1; i >= 0; i--) {
    const forum = hierarchizedForums[i];
    const parentForum = forum.parentId && map[forum.parentId];

    if (parentForum) {
      parentForum.subForums.push(forum);
      hierarchizedForums.splice(i, 1);
    }
  }

  return hierarchizedForums;
};
