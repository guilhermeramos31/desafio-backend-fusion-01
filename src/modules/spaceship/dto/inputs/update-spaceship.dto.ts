import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSpaceshipDto } from '@spaceship/dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateSpaceshipDto extends PartialType(CreateSpaceshipDto) {
  name: string;

  model: string;

  manufacturer: string;

  @IsNumber()
  @ApiProperty({
    example: 100,
  })
  passengerCapacity: number;
}
