import { ApiProperty } from '@nestjs/swagger';

class CreateUserOutput {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
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
    example: 'Senha atualizada com sucesso!',
  })
  message: string;

  @ApiProperty({
    example,
  })
  user: CreateUserOutput;
}
