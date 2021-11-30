import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEnum, IsArray } from "class-validator";


export class LogInStaffDto {

  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ default: "STAFF" })
  accountType: string


}
