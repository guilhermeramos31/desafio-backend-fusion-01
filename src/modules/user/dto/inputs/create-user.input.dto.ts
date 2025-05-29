import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserInputDto {
  @ApiProperty({
    example: 'john',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'SecurePass123!',
    description: 'User password (min 12 chars)',
  })
  @IsString()
  @MaxLength(24, { message: 'Password must be at least 24 characters' })
  @IsStrongPassword(
    {
      minLength: 12,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password too weak. Must include: 1 uppercase, 1 lowercase, 1 number, 1 special character',
    },
  )
  password: string;
}
