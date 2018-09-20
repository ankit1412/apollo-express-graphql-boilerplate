import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

const { Schema } = mongoose;
const { ObjectId } = Schema;

const plantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  organization: {
    type: ObjectId,
    required: true,
    ref: 'organizaion',
  },
}, {
  timestamps: true,
});

export default mongoose.model('plant', plantSchema);
