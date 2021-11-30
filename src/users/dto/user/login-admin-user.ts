import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEnum, IsArray } from "class-validator";


export class LogInAdminDto {

  @ApiProperty({ default: "superAdmin" })
  @IsString()
  userName: string;

  @ApiProperty({ default: "superadmin" })
  @IsString()
  password: string;

  
}
