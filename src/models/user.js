import mongoose from 'mongoose';
import Permission from './permission';

mongoose.set('useCreateIndex', true);

const { Schema } = mongoose;
const { ObjectId } = Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  domain: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  organization: {
    type: ObjectId,
    required: true,
    ref: 'organization',
  },
  plant: {
    type: ObjectId,
    ref: 'plant',
  },
  role: {
    type: ObjectId,
    ref: 'role',
  },
  specialPermissions: [{
    type: Permission,
  }],
  avatar: {
    type: String,
  },
  accountStatus: {
    type: String,
    enum: ['PENDING', 'VERIFIED', 'ACTIVE', 'LOCKED'],
    default: 'PENDING',
  },
}, {
  timestamps: true,
});

export default mongoose.model('user', userSchema);
