import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { IUserAdminDoc } from "src/users/entities/admin/admin.interface";
import { RepositoryCollection } from "src/users/repositoryCollection/repository-collection";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly repos: RepositoryCollection
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('bearer'),
      secretOrKey: 'topSecretKey'
    })
  }

  async validate(payload: any): Promise<IUserAdminDoc> {
    console.log("Inside Validate ", payload);

    const { userName } = payload;
    if (payload.accountType) {
      let resp: any = await this.repos.userModel.findOne({ userName: payload.userName, password: payload.password })
      console.log("Inside ___", resp)
      return resp;
    }
    else {
      let user = await this.repos.adminModel.findOne({ userName });
      // console.log("user", user);

      if (!user) {
        throw new UnauthorizedException()
      }
      return user;
    }
  }

}