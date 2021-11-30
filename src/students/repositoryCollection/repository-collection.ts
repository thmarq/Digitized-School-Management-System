import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IStudentFeedbackDoc } from "../entities/feedback/feedback.interface";
import { IStudentDoc } from "../entities/students/student.interface";

export class RepositoryCollection {
  constructor(
    @InjectModel('Student') public readonly studentModel: Model<IStudentDoc>,
    @InjectModel('StudentFeedback') public readonly studentFeedbackModel: Model<IStudentFeedbackDoc>,

  ) { }

}


