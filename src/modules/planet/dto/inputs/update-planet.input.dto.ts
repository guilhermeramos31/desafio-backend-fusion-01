import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Climate, Terrain } from '@prisma/client';

export class UpdatePlanetInputDto {
  @IsNotEmpty()
  @IsEnum(Climate)
  @ApiProperty({
    enum: Climate,
    example: Climate.TEMPERATE,
    description: 'Climate type of the planet',
  })
  climate: Climate;

  @IsNotEmpty()
  @IsEnum(Terrain)
  @ApiProperty({
    enum: Terrain,
    example: Terrain.GRASSLANDS,
    description: 'Terrain type of the planet',
  })
  terrain: Terrain;
}
