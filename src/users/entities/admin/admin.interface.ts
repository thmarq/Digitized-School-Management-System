export interface IUserAdmin {
  username: string;
  password: string;
  role: string;
}

export interface IUserAdminDoc extends IUserAdmin, Document { }