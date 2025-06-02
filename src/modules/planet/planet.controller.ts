import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { PlanetService } from './planet.service';
import { CreatePlanetInputDto } from '@modules/planet/dto/inputs/create-planet.input.dto';
import { UpdatePlanetInputDto } from '@modules/planet/dto/inputs/update-planet.input.dto';
import { PlanetPagination } from '@planet/dto/inputs/pagination-planet.input.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationInterceptor } from '@shared/interceptors';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

@ApiTags('Planets')
@Controller('planets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('Authorization')
export class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  @Post()
  create(@Body() createPlanetDto: CreatePlanetInputDto) {
    return this.planetService.create(createPlanetDto);
  }

  @Get('')
  @UseInterceptors(PaginationInterceptor)
  findAll(@Query() query: PlanetPagination) {
    return this.planetService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planetService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlanetDto: UpdatePlanetInputDto,
  ) {
    return this.planetService.update(id, updatePlanetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planetService.remove(id);
  }
}
