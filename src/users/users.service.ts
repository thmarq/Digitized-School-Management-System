import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user/create-user.dto';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { RepositoryCollection } from './repositoryCollection/repository-collection';
import { LogInStaffDto } from './dto/user/login-staff.dto';
import { JwtService } from '@nestjs/jwt';
import { LogInParentDto } from './dto/user/login-parent.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly repos: RepositoryCollection,
    private jwtService: JwtService // jwt module provide a jwt service

  ) { }
  async create(createUserDto: CreateUserDto) {
    return await this.repos.userModel.create(createUserDto);
  }

  async adminLogin(LogInAdminDto: any) {
    const payload = LogInAdminDto
    const accessToken = await this.jwtService.sign(payload)
    console.log("access token is ____", accessToken);

    return { accessToken };
  }

  async staffLogin(LogInStaffDto: LogInStaffDto) {
    // console.log("username");

    let staff = await this.repos.userModel.findOne({ accountType: "STAFF", userName: LogInStaffDto.userName })
    if (!staff) throw new Error('User doesnt exist')
    const payload = LogInStaffDto
    const accessToken = await this.jwtService.sign(payload)
    console.log("access token is ____", accessToken);

    return { accessToken };
  }

  async userLogin(LogInParentDto: LogInParentDto) {
    // console.log("username");

    let staff = await this.repos.userModel.findOne({ accountType: "PARENT", userName: LogInParentDto.userName })
    if (!staff) throw new Error('User doesnt exist')
    const payload = LogInParentDto
    const accessToken = await this.jwtService.sign(payload)
    console.log("access token is ____", accessToken);

    return { accessToken };
  }

  async findAll(condition?) {
    return await this.repos.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    let d = await this.repos.userModel.remove({ _id: id });
    return 'deleted_success';
  }
}
