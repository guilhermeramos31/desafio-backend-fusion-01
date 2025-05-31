import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStarSystemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Sistema Solar',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Nosso sistema',
  })
  description: string;
}
