import { Climate, Terrain } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanetInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Terra',
  })
  name: string;

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

  @IsOptional()
  @ApiProperty({
    example: '0',
  })
  population?: bigint = 0n;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'daoisjheduiqwey1723141sdasd',
  })
  starSystemId: string;
}
