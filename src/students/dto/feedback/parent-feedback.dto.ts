import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDateString, IsMobilePhone, IsOptional } from "class-validator";

export class ParentFeedbackDto {

  @ApiProperty()
  @IsString()
  studentId: string;

  // @ApiProperty()
  // user: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  generalComments: string;
}

