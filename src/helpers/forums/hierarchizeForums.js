export default forums => {
  const hierarchizedForums = [...forums];
  const map = {};

  hierarchizedForums.forEach(forum => (map[forum.id] = forum));

  for (let i = hierarchizedForums.length - 1; i >= 0; i--) {
    const forum = hierarchizedForums[i];
    const parentForum = forum.parentId && map[forum.parentId];

    if (parentForum) {
      if (parentForum.hasOwnProperty('subForums')) {
        parentForum.subForums.push(forum);
      } else {
        parentForum.subForums = [forum];
      }

      hierarchizedForums.splice(i, 1);
    }
  }

  return hierarchizedForums;
};
