import User from '../../../models/user';
import Organization from '../../../models/organization';
import Role from '../../../models/role';
import createConfirmationEmailLink from './createConfirmationEmailLink';
import sendEmail from '../../../utils/sendEmail';
import getOrgAdminPermissions from '../../../utils/getOrgAdminPermissions';

export default {
  Mutation: {
    register: async (_, {
      user: {
        email,
        phone,
        organization,
        ...data
      },
    }, { url }) => {
      const domain = email.replace(/.*@/, '');
      const userOrg = await User.findOne({ domain });

      if (userOrg) {
        return [
          {
            path: 'email',
            message: 'Organization already exists.',
          },
        ];
      }

      const invalid = await Organization.findOne({ name: organization });

      if (invalid) {
        return [
          {
            path: 'organization',
            message: 'Organization already exists.',
          },
        ];
      }

      const userEmail = await User.findOne({ email });

      if (userEmail) {
        return [
          {
            path: 'email',
            message: 'Email already exists.',
          },
        ];
      }

      const userPhone = await User.findOne({ phone });

      if (userPhone) {
        return [
          {
            path: 'phone',
            message: 'Phone already exists.',
          },
        ];
      }

      const newOrganization = await new Organization({
        name: organization,
      }).save();

      const permissions = getOrgAdminPermissions();
      console.log(permissions);

      const newRole = await new Role({
        name: 'OrgAdmin',
        permissions,
        organization: newOrganization.id,
      }).save();
      console.log(newRole);

      const user = await new User({
        email,
        domain,
        phone,
        organization: newOrganization.id,
        role: newRole.id,
        ...data,
      }).save();

      const expiresIn = '1hr';

      await sendEmail(email, await createConfirmationEmailLink(url, user, expiresIn), 'Confirm email');

      return null;
    },
  },
};
