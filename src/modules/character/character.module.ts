import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { PrismaModule } from '@prisma/prisma.module';
import { PlanetModule } from '@planet/planet.module';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService],
  imports: [PrismaModule, PlanetModule],
})
export class CharacterModule {}
