import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateStudentDto extends PartialType(CreateStudentDto) {

  @ApiProperty({ required: true })
  id: string
}
