import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  role: {
    type: String,
    default: 'USER'
  },
  accountType: {
    type: String,
    enum: ['PARENT', 'STAFF'],
    required: true
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }]
}, {
  collection: 'users',
  timestamps: true
})
