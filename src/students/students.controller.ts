import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, UnauthorizedException, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/student/create-student.dto';
import { UpdateStudentDto } from './dto/student/update-student.dto';
import { CreateFeedbackDto } from './dto/feedback/create-feedback.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport';
import { TokenUser } from '../common/decorators/token-user.decorator';
import { ParentFeedbackDto } from './dto/feedback/parent-feedback.dto';

@UseGuards(AuthGuard('jwt'))// added guard to all apis
@ApiBearerAuth()
@ApiTags('Student Commands/Queries')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }

  @Post('/staff/add-feedback')
  async createStudentFeedback(
    @Body() CreateFeedbackDto: CreateFeedbackDto,
    @TokenUser() user: any
  ) {
    if (user.accountType !== "STAFF") {
      throw new UnauthorizedException('Only staff can give feeback to students')
    }
    let data = Object.assign({}, CreateFeedbackDto, { user: user._id })
    let resp = await this.studentsService.createStudentFeedback(data)
      .catch((e) => {
        throw new Error(e.message)
      });
    return {
      status: 'Success',
      data: resp
    }
  }

  @Post('add-parentFeedback')
  async addParentFeedBack(
    @Body() ParentFeedbackDto: ParentFeedbackDto,
    // @Param('id') id: string,
    @TokenUser() user: any) {
    let resp = await this.studentsService.updateStudentFeedback(ParentFeedbackDto.feedbackId, ParentFeedbackDto)
      .catch(e => {
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
  @Post('/add-student')
  async createStudent(@Body() createStudentDto: CreateStudentDto,) {
    console.log(createStudentDto);

    let resp = await this.studentsService.createStudent(createStudentDto)
      .catch(e => {
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

  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'parentName', required: false, type: String })
  @ApiQuery({ name: 'dayWiseReport', required: false, type: Boolean })
  @Get()
  async findAllStudents(@Query() query: any) {
    let resp = await this.studentsService.findAllStudents(query).catch(e => {
      switch (e.message) {
        default:
          throw new HttpException({ status: 'error', message: e.message }, 500);
      }
    });
    return {
      data: resp,
      message: 'Student Lists '
    };
  }

  @Get('/student-feedbacks')
  async findAllStudentFeedbacks() {
    let resp = await this.studentsService.findAllStudentFeedbacks().catch(e => {
      switch (e.message) {
        default:
          throw new HttpException({ status: 'error', message: e.message }, 500);
      }
    });
    return {
      data: resp,
      message: 'Student Feedback Lists '
    };
  }



  @Patch(':id')
  async updateStudent(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return await this.studentsService.updateStudent(+id, updateStudentDto);
  }

  @Delete(':id')
  async removeStudent(@Param('id') id: string) {
    let resp = await this.studentsService.removeStudent(id).catch(e => {
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


