import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserInputDto {
  @ApiProperty({
    example: 'john@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
