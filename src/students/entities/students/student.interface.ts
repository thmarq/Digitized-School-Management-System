export interface IStudent {
  name: string;
  parentName: string;
  dob: string;
  address: any;
  alternativeAddress: any;
  mobile: string;
  alternativeMobile: string;
}

export interface IStudentDoc extends IStudent, Document { }