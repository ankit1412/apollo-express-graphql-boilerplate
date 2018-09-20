import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../../models/user';

const createToken = (user, secret, expiresIn) => {
  const { username } = user;
  return jwt.sign({ username }, secret, { expiresIn });
};

export default {
  Mutation: {
    signin: async (_, { username, password }) => {
      const user = await User.findOne({
        $or: [
          {
            username,
          },
          {
            email: username,
          },
        ],
      });

      if (!user) {
        return {
          errors: [{
            path: 'username',
            message: 'Invalid username.',
          }],
        };
      }

      if (user.accountStatus === 'PENDING') {
        return {
          errors: [{
            path: 'email',
            message: 'Your account is not verified. Please verify your account.',
          }],
        };
      }

      if (user.accountStatus === 'VERIFIED') {
        return {
          errors: [{
            path: 'email',
            message: 'Your email is verified. Please complete registration.',
          }],
        };
      }

      if (user.accountStatus === 'LOCKED') {
        return {
          errors: [{
            path: 'username',
            message: 'Your account is locked. Please contact admin.',
          }],
        };
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return {
          errors: [{
            path: 'password',
            message: 'Invalid password.',
          }],
        };
      }

      const token = await createToken(user, process.env.SECRET, '10hr');
      return { token };
    },
  },
};
