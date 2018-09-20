import bcrypt from 'bcrypt';
import User from '../../../models/user';

function getRandomColor() {
  const letters = '9ABCDEF'.split('');
  let color = '';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

const baseUrl = 'https://ui-avatars.com/api/';

export default {
  Mutation: {
    completeRegistration: async (_, {
      id,
      firstName,
      lastName,
      username,
      password,
    }) => {
      const registrationCompleted = await User.findOne({ _id: id, accountStatus: 'ACTIVE' });

      if (registrationCompleted) {
        return [
          {
            path: 'username',
            message: 'Registration already complete. Please signin to continue.',
          },
        ];
      }

      const invalidUsername = await User.findOne({ username });

      if (invalidUsername) {
        return [
          {
            path: 'username',
            message: 'Username taken.',
          },
        ];
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const color = getRandomColor();
      const avatar = `${baseUrl}?name=${firstName}+${lastName}&background=${color}&rounded=${true}`;

      const user = await User.findOneAndUpdate({
        _id: id,
      },
      {
        username,
        password: hashedPassword,
        accountStatus: 'ACTIVE',
        avatar,
      });

      if (!user) {
        return [
          {
            path: 'email',
            message: 'User does not exist.',
          },
        ];
      }

      console.log('User registeration complete');

      return null;
    },
  },
};
