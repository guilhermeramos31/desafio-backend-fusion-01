import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseInterceptors,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto, UpdateCharacterDto } from '@character/dto';
import { CharacterPagination } from '@character/dto/inputs/pagination-character.input.dto';
import { PaginationInterceptor } from '@shared/interceptors';
import { ApiCreateCharacter } from '@shared/decorators/docs/character/create-character.decorator';
import { ApiFindAllCharacters } from '@shared/decorators/docs/character/find-all-character.decorator';
import { ApiFindCharacter } from '@shared/decorators/docs/character/find-character.decorator';
import { ApiUpdateCharacter } from '@shared/decorators/docs/character/update-character.decorator';
import { ApiDeleteCharacter } from '@shared/decorators/docs/character/delete-character.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

@ApiTags('Characters')
@Controller('characters')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('Authorization')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  @ApiCreateCharacter()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Get()
  @ApiFindAllCharacters()
  @UseInterceptors(PaginationInterceptor)
  findAll(@Query() query: CharacterPagination) {
    return this.characterService.findAll(query);
  }

  @Get(':id')
  @ApiFindCharacter()
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(id);
  }

  @Put(':id')
  @ApiUpdateCharacter()
  update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.characterService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  @ApiDeleteCharacter()
  remove(@Param('id') id: string) {
    return this.characterService.remove(id);
  }
}
