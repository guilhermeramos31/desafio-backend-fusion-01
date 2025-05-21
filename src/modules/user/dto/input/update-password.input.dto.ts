import { PartialType } from '@nestjs/mapped-types';
import { CreateUserInputDto } from './create-user.input.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordInputDto extends PartialType(CreateUserInputDto) {
  @ApiProperty()
  @IsString()
  password: string;
}
