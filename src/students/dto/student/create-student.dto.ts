import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsDateString, IsMobilePhone, IsEmpty, IsOptional } from "class-validator";

export class CreateStudentDto {

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  parentName: string;

  @ApiProperty()
  @IsDateString()
  dob: string;

  @ApiProperty()
  address: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsEmpty()
  alternativeAddress?: string;

  @ApiProperty()
  @IsMobilePhone()
  mobile: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsEmpty()
  alternativeMobile?: string;
}


