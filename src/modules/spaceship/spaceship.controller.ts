import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SpaceshipService } from './spaceship.service';
import { PaginationInterceptor } from '@shared/interceptors';
import { StarSystemPagination } from '@star-system/dto';
import { CreateSpaceshipDto, UpdateSpaceshipDto } from '@spaceship/dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

@ApiTags('Spaceships')
@UseGuards(JwtAuthGuard)
@Controller('spaceships')
@ApiBearerAuth('Authorization')
export class SpaceshipController {
  constructor(private readonly spaceshipService: SpaceshipService) {}

  @Post()
  create(@Body() createSpaceshipDto: CreateSpaceshipDto) {
    return this.spaceshipService.create(createSpaceshipDto);
  }

  @Get()
  @UseInterceptors(PaginationInterceptor)
  findAll(@Query() query: StarSystemPagination) {
    return this.spaceshipService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spaceshipService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpaceshipDto: UpdateSpaceshipDto,
  ) {
    return this.spaceshipService.update(id, updateSpaceshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spaceshipService.remove(id);
  }
}
