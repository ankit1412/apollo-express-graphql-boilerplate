import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

const { Schema } = mongoose;

const permissionSchema = new Schema({
  kind: {
    type: String,
    required: true,
  },
  action: {
    create: {
      type: Boolean,
    },
    read: {
      type: Boolean,
    },
    update: {
      type: Boolean,
    },
    delete: {
      type: Boolean,
    },
  },
}, {
  timestamps: true,
  _id: false,
});

export default permissionSchema;
