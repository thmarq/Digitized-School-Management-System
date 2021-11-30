export interface IStudentFeedback {
  student: string;
  user: string;
  feedback: any;
  generalComments: any;
  date: Date;
}

export interface IStudentFeedbackDoc extends IStudentFeedback, Document { }