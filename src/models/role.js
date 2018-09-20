import mongoose from 'mongoose';
import Permission from './permission';

mongoose.set('useCreateIndex', true);

const { Schema } = mongoose;
const { ObjectId } = Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  permissions: [{
    type: Permission,
    required: true,
  }],
  organization: {
    type: ObjectId,
    required: true,
    ref: 'organizaion',
  },
}, {
  timestamps: true,
});

export default mongoose.model('role', roleSchema);
