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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationInterceptor } from '@shared/interceptors';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import {
  ApiCreatePlanet,
  ApiFindAllPlanet,
  ApiFindPlanet,
  ApiUpdatePlanet,
  ApiDeletePlanet,
} from '@shared/decorators';
import {
  CreatePlanetInputDto,
  PlanetPagination,
  UpdatePlanetInputDto,
} from '@planet/dto';

@ApiTags('Planets')
@Controller('planets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('Authorization')
export class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  @Post()
  @ApiCreatePlanet()
  create(@Body() createPlanetDto: CreatePlanetInputDto) {
    return this.planetService.create(createPlanetDto);
  }

  @Get('')
  @ApiFindAllPlanet()
  @UseInterceptors(PaginationInterceptor)
  findAll(@Query() query: PlanetPagination) {
    return this.planetService.findAll(query);
  }

  @Get(':id')
  @ApiFindPlanet()
  findOne(@Param('id') id: string) {
    return this.planetService.findOne(id);
  }

  @Patch(':id')
  @ApiUpdatePlanet()
  update(
    @Param('id') id: string,
    @Body() updatePlanetDto: UpdatePlanetInputDto,
  ) {
    return this.planetService.update(id, updatePlanetDto);
  }

  @Delete(':id')
  @ApiDeletePlanet()
  remove(@Param('id') id: string) {
    return this.planetService.remove(id);
  }
}
