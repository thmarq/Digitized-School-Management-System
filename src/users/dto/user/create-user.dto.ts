import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEnum, IsArray } from "class-validator";

export enum AccountEnumType {
  PARENT = "PARENT",
  STAFF = "STAFF",
}
export class CreateUserDto {

  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ enum: ['PARENT', 'STAFF'] })
  // @IsEnum(AccountEnumType)
  accountType: AccountEnumType;

  // @ApiProperty()
  // role: string;

  @ApiPropertyOptional({ type: [String] })
  students?: string[];

}
