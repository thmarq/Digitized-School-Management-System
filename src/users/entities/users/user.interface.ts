export interface IUser {
  username: string;
  password: string;
  accountType: string;
  students: Array<any>;
  // role: string;
}

export interface IUserDoc extends IUser, Document { }