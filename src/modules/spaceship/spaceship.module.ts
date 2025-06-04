import { Module } from '@nestjs/common';
import { SpaceshipService } from './spaceship.service';
import { SpaceshipController } from './spaceship.controller';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  controllers: [SpaceshipController],
  providers: [SpaceshipService],
  imports: [PrismaModule],
})
export class SpaceshipModule {}
