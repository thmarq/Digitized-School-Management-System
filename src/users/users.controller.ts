import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user/create-user.dto';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'
import { LogInAdminDto } from './dto/user/login-admin-user';
import { LogInStaffDto } from './dto/user/login-staff.dto';
import { LogInParentDto } from './dto/user/login-parent.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User Commands / Queries')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('login/admin')
  async logInAdmin(@Body() LogInAdminDto: LogInAdminDto) {
    let resp = await this.usersService.adminLogin(LogInAdminDto).catch(e => {
      switch (e.message) {
        default:
          throw new HttpException({ status: 'error', message: e.message }, 500);
      }
    });
    return {
      status: 'Success',
      data: resp
    }
  }

  @Post('login/staff')
  async logInStaff(@Body() LogInStaffDto: LogInStaffDto) {
    let resp = await this.usersService.staffLogin(LogInStaffDto).catch(e => {
      switch (e.message) {
        default:
          throw new HttpException({ status: 'error', message: e.message }, 500);
      }
    });
    return {
      status: 'Success',
      data: resp
    }
  }

  @Post('login/parent')
  async logInUser(@Body() LogInParentDto: LogInParentDto) {
    let resp = await this.usersService.staffLogin(LogInParentDto).catch(e => {
      switch (e.message) {
        default:
          throw new HttpException({ status: 'error', message: e.message }, 500);
      }
    });
    return {
      status: 'Success',
      data: resp
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('add')
  async createUser(@Body() createUserDto: CreateUserDto) {
    let resp = await this.usersService.create(createUserDto).catch((e) => {
      throw new Error(e.message)
    });
    return {
      status: "Success",
      data: resp
    }
  }

  @Get()
  async findAllUsers() {
    let resp = await this.usersService.findAll().catch(e => {
      switch (e.message) {
        default:
          throw new HttpException({ status: 'error', message: e.message }, 500);
      }
    });
    return {
      data: resp,
      message: 'List of Users '
    };

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    let resp = await this.usersService.remove(id).catch(e => {
      switch (e.message) {
        default:
          throw new HttpException({ status: 'error', message: e.message }, 500);
      }
    });
    return {
      data: resp,
      message: 'Success '
    };
  }
}
