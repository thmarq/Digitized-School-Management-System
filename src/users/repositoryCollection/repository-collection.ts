import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUserAdminDoc } from "../entities/admin/admin.interface";
import { IUserDoc } from "../entities/users/user.interface";

export class RepositoryCollection {
  constructor(
    @InjectModel('UsersAdmin') public readonly adminModel: Model<IUserAdminDoc>,
    @InjectModel('Users') public readonly userModel: Model<IUserDoc>,

  ) { }

}


