import { Schema } from 'mongoose';

export const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    parentName: {
      type: String,
      required: true
    },
    dob: {
      type: Date
    },
    address: {
      type: String,
      required: true
    },
    alternativeAddress: {
      type: String,
    },
    mobile: {
      type: String,
      required: true
    },
    alternativeMobile: {
      type: String
    },
    // parentId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Users',
    // },

  }, {
  collection: 'students',
  timestamps: true
})
