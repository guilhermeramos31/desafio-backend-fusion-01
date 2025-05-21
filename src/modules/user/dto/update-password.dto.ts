import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsString()
  password: string;
}
