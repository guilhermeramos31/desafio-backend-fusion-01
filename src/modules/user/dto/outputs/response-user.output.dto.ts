import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsIdentityCard,
  IsNotEmpty,
  IsString,
} from 'class-validator';

class CreateUserOutput {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'asdnaoishd12378461hnaujdh',
  })
  @IsIdentityCard()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john',
  })
  name: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: '2025-05-22T17:06:37.019Z',
  })
  createdAt: Date;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: '2025-05-22T17:06:37.019Z',
  })
  updatedAt: Date;
}

const date = new Date();
const example = {
  id: 'asdnaoishd12378461hnaujdh',
  email: 'john@example.com',
  name: 'john',
  createdAt: date,
  updatedAt: date,
};

export class ResponseUserOutputDto {
  @ApiProperty({
    example: 'Usuário criado com sucesso!',
  })
  message: string;

  @ApiProperty({
    example,
  })
  user: CreateUserOutput;
}
