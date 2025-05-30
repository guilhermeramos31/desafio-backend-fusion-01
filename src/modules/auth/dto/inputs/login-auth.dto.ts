import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export interface ILoginAuthDTO {
  email: string;
  password: string;
}

export class LoginAuthDTO implements ILoginAuthDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john@example.com',
  })
  email: string;

  @ApiProperty({
    example: 'SecurePass123!',
    description: 'User password (min 12 chars)',
  })
  @IsString()
  @MinLength(12, { message: 'Password must be at least 12 characters' })
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
