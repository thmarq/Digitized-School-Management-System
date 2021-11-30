import { Schema } from 'mongoose';

export const StudentFeedbackSchema = new Schema(
  {
    student: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: '',
      required: true
    },
    feedback: {
      type: String
    },
    generalComments: {
      type: String,
    },
    date: {
      type: Date
    }
  }, {
  collection: 'student_feedbacks',
  timestamps: true
})
