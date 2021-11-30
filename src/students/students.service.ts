import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/student/create-student.dto';
import { UpdateStudentDto } from './dto/student/update-student.dto';
import { RepositoryCollection } from './repositoryCollection/repository-collection';
import { CreateFeedbackDto } from './dto/feedback/create-feedback.dto';
import { stripQuery } from 'src/common/strip-squery';

@Injectable()
export class StudentsService {
  constructor(
    private readonly repos: RepositoryCollection
  ) { }

  async createStudent(createStudentDto: any) {
    return await this.repos.studentModel.create(createStudentDto);
  }

  async createStudentFeedback(CreateFeedbackDto: CreateFeedbackDto) {
    return await this.repos.studentFeedbackModel.create(CreateFeedbackDto);
  }

  async updateStudentFeedback(id: string, updateStudentDto: any) {
    let resp = await this.repos.studentFeedbackModel.findByIdAndUpdate(id, updateStudentDto, { new: true })

    return resp ;
  }


  async findAllStudents(query) {

    var start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    var end = new Date();
    end.setUTCHours(23, 59, 59, 999);

    console.log(query);
    let condition;
    let sQuery = stripQuery(query);

    if (query.dayWiseReport) {
      condition = Object.assign({}, sQuery, {
        createdAt: {
          $gte: start,
          $lt: end
        }
      })
    }
    else {
      condition = sQuery
    }
    // console.log("Condition is  ___", condition);

    return await this.repos.studentModel.find(condition)
      .limit(parseInt(query.limit ? query.limit : 0)).skip(parseInt(query.skip ? query.skip : 0)).sort(query.sort);
  }

  async findAllStudentFeedbacks() {
    return await this.repos.studentFeedbackModel.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  async updateStudent(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  async removeStudent(id: string) {
    let d = await this.repos.studentModel.remove({ _id: id });
    return 'deleted_success'
  }
}
