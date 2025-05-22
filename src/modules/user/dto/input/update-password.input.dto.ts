import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateUserInputDto } from '@user/dto';

export class UpdatePasswordInputDto extends PartialType(CreateUserInputDto) {
  @IsString()
  @ApiProperty({
    example: 'SecurePass123',
  })
  password: string;
}
