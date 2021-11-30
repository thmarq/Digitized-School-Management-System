import { StudentFeedbackSchema } from "./feedback/feedback.entity";
import { StudentSchema } from "./students/student.entity";

export const StudentEntities = [
  {
    name: 'Student',
    schema: StudentSchema
  },
  {
    name: 'StudentFeedback',
    schema: StudentFeedbackSchema
  }
]
