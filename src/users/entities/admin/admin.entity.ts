import { Schema } from 'mongoose';

export const AdminSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  role: {
    type: String,
    default: 'ADMIN'
  }
}, {
  collection: 'admin',
  timestamps: true
})
