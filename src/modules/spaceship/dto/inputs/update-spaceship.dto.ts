import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSpaceshipDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'ASdaw',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'N33-as',
  })
  model: string;
}
