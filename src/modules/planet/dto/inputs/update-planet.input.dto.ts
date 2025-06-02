import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePlanetInputDto } from '@planet/dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Climate, Terrain } from '@prisma/client';

export class UpdatePlanetInputDto extends PartialType(CreatePlanetInputDto) {
  @IsNotEmpty()
  @IsEnum(Climate)
  @ApiProperty({
    example: Climate.TEMPERATE,
  })
  climate: Climate;

  @IsNotEmpty()
  @IsEnum(Terrain)
  @ApiProperty({
    example: Terrain.GRASSLANDS,
  })
  terrain: Terrain;
}
