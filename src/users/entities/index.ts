import { AdminSchema } from "./admin/admin.entity";
import { UserSchema } from "./users/user.entity";

export const UserEntities = [
  {
    name: 'UsersAdmin',
    schema: AdminSchema
  },
  {
    name: 'Users',
    schema: UserSchema
  }
]