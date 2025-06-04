import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { StarSystemService } from '@star-system/star-system.service';
import {
  CreateStarSystemDto,
  StarSystemPagination,
  UpdateStarSystemDto,
} from '@star-system/dto';
import { ApiCreateStarSystem } from '@shared/decorators';
import { ApiFindStarSystem } from '@shared/decorators/docs/star-system/find-star-system.decorator';
import { ApiUpdateStarSystem } from '@shared/decorators/docs/star-system/update-star-system.decorator';
import { ApiDeleteStarSystem } from '@shared/decorators/docs/star-system/delete-star-system.decorator';
import { ApiFindAllStarSystem } from '@shared/decorators/docs/star-system/find-all-star-system.decorator';
import { PaginationInterceptor } from '@shared/interceptors/pagination.interceptor';

@UseGuards(JwtAuthGuard)
@ApiTags('Star Systems')
@Controller('star-systems')
@ApiBearerAuth('Authorization')
export class StarSystemController {
  constructor(private readonly starSystemService: StarSystemService) {}

  @Post()
  @ApiCreateStarSystem()
  create(@Body() createStarSystemDto: CreateStarSystemDto) {
    return this.starSystemService.create(createStarSystemDto);
  }

  @Get('')
  @ApiFindAllStarSystem()
  @UseInterceptors(PaginationInterceptor)
  findAll(@Query() query: StarSystemPagination) {
    return this.starSystemService.findAll(query);
  }

  @Get(':id')
  @ApiFindStarSystem()
  findOne(@Param('id') id: string) {
    return this.starSystemService.findOne(id);
  }

  @Put(':id')
  @ApiUpdateStarSystem()
  update(
    @Param('id') id: string,
    @Body() updateStarSystemDto: UpdateStarSystemDto,
  ) {
    return this.starSystemService.update(id, updateStarSystemDto);
  }

  @Delete(':id')
  @ApiDeleteStarSystem()
  remove(@Param('id') id: string) {
    return this.starSystemService.remove(id);
  }
}
