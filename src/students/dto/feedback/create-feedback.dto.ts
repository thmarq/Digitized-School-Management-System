import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDateString, IsMobilePhone, IsOptional } from "class-validator";

export class CreateFeedbackDto {

  @ApiProperty()
  @IsString()
  student: string;

  @ApiProperty()
  user: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  feedback: string;
}


