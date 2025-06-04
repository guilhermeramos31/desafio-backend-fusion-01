import { PartialType } from '@nestjs/mapped-types';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserInputDto } from '@user/dto';

export class UpdateUserInputDto extends PartialType(CreateUserInputDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john',
  })
  name: string;
}
