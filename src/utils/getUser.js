import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

const getUser = async (token) => {
  if (token) {
    try {
      const user = await jwt.verify(token.replace('Bearer ', ''), process.env.SECRET);
      return user;
    } catch (err) {
      throw new AuthenticationError('Your session has expired. Please signin again.');
    }
  }
  return null;
};

export default getUser;
