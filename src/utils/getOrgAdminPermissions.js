const getOrgAdminPermissions = () => {
  const permissions = [
    {
      kind: 'organization',
      action: {
        read: true,
        update: true,
      },
    },
    {
      kind: 'role',
      action: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
    },
    {
      kind: 'user',
      action: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
    },
  ];
  return permissions;
};

export default getOrgAdminPermissions;
