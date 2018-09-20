import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import User from '../models/user';

const directiveResolvers = {
  isAuthenticated: async (next, source, args, { currentUser }) => {
    if (currentUser) {
      return next();
    }

    throw new AuthenticationError('Please signin to continue');
  },
  hasRole: async (next, source, { role }, { currentUser }) => {
    const expectedRole = role;

    const user = await User
      .findOne({ username: currentUser.username })
      .populate('role', 'name');

    if (user) {
      if (expectedRole !== user.role.name) {
        throw new ForbiddenError('You are not authorized. Please contact administrator.');
      }
      return next();
    }

    throw new AuthenticationError('Please signin to continue');
  },
};

export default directiveResolvers;
