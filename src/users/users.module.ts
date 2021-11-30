import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntities } from './entities';
import { RepositoryCollection } from './repositoryCollection/repository-collection';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([...UserEntities]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: "topSecretKey",
      signOptions: {
        expiresIn: 3600,
      }
    })
  ],
  controllers: [UsersController],
  providers: [
    RepositoryCollection,
    UsersService,
    JwtStrategy,
    PassportModule
  ],
  exports: [
    RepositoryCollection
  ]
})
export class UsersModule {
  constructor(
    private readonly repos: RepositoryCollection
  ) { }
  async onModuleInit() {
    let admin = await this.repos.adminModel.findOne({ username: "superAdmin" })

    if (!admin) {
      let d = await this.repos.adminModel.create({
        username: "superAdmin",
        password: "superadmin",
        role: "ADMIN"
      })
      console.log("Admin Created ___", d)
    }
  }
}
