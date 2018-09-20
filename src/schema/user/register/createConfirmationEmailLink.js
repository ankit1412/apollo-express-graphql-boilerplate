import jwt from 'jsonwebtoken';

const createConfirmationEmailLink = async (url, user, expiresIn) => {
  const { id, firstName, lastName } = user;
  const token = jwt.sign({ id, firstName, lastName }, process.env.SECRET, { expiresIn });
  return `${url}/confirmation/${token}`;
};

export default createConfirmationEmailLink;
