import { Module } from '@nestjs/common';
import { StarSystemService } from './star-system.service';
import { StarSystemController } from './star-system.controller';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  controllers: [StarSystemController],
  providers: [StarSystemService],
  imports: [PrismaModule],
})
export class StarSystemModule {}
