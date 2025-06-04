import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpaceshipDto {
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'ship',
  })
  manufacturer: string;

  @IsNumber()
  @ApiProperty({
    example: 100,
  })
  passengerCapacity: number;
}
