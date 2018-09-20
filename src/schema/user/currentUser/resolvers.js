// import { AuthenticationError } from 'apollo-server-express';
import User from '../../../models/user';

export default {
  Query: {
    currentUser: async (_, args, { currentUser }) => {
      const user = await User
        .findOne({ username: currentUser.username })
        .populate('organization')
        .populate('role');

      return user;
    },
  },
};
