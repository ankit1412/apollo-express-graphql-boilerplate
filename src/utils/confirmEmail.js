import jwt from 'jsonwebtoken';
import User from '../models/user';

const confirmEmail = async (req, res) => {
  try {
    const user = await jwt.verify(req.params.token, process.env.SECRET);
    const userDetails = await User.findOne({
      _id: user.id,
    });

    if (userDetails && userDetails.accountStatus === 'PENDING') {
      await User.findOneAndUpdate({
        _id: user.id,
      },
      {
        $set: {
          accountStatus: 'VERIFIED',
        },
      });
      res.redirect(`${process.env.FRONTEND_HOST}/complete-registration`);
      console.log('Email confirmed.');
    } else {
      res.redirect(`${process.env.FRONTEND_HOST}/account-already-verified`);
      console.log('Email already confirmed.');
    }
  } catch (e) {
    res.send('error');
  }
};

export default confirmEmail;
