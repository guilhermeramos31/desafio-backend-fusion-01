import { Module } from '@nestjs/common';
import { PlanetService } from './planet.service';
import { PlanetController } from './planet.controller';
import { PrismaModule } from '@prisma/prisma.module';
import { StarSystemModule } from '@star-system/star-system.module';

@Module({
  controllers: [PlanetController],
  providers: [PlanetService],
  imports: [PrismaModule, StarSystemModule],
  exports: [PlanetService],
})
export class PlanetModule {}
