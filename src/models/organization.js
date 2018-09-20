import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

const { Schema } = mongoose;

const organizationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('organization', organizationSchema);
