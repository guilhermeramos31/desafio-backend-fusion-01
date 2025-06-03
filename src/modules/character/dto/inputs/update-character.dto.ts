import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCharacterDto } from '@character/dto';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
