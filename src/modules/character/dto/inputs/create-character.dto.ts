import { Affiliation, Specie } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEnum(Specie)
  @ApiProperty({
    enum: Specie,
    example: Specie.YODA_SPECIES,
  })
  specie: Specie;

  @IsNotEmpty()
  @IsEnum(Affiliation)
  @ApiProperty({
    enum: Affiliation,
    example: Affiliation.MANDALORIANS,
  })
  affiliation: Affiliation;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  homePlanetId: string;
}
