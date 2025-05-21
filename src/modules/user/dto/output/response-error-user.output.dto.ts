import { ApiProperty } from '@nestjs/swagger';

export class ExampleBadRequestResponse {
  @ApiProperty({
    example: [
      'name should not be empty',
      'email should not be empty',
      'password should not be empty',
    ],
  })
  message: string[];

  @ApiProperty({
    example: 'Bad Request',
  })
  error: string;

  @ApiProperty({
    example: 400,
  })
  statusCode: number;
}

export class ExampleConflictResponse {
  @ApiProperty({
    example: 'Usuário já existe!',
  })
  message: string[];

  @ApiProperty({
    example: 'conflict',
  })
  error: string;

  @ApiProperty({
    example: 409,
  })
  statusCode: number;
}
