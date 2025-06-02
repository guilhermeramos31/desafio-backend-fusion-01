import { Module } from '@nestjs/common';

import { AuthService } from '@auth/auth.service';
import { UserModule } from '@user/user.module';
import { PrismaModule } from '@shared/prisma/prisma.module';
import { AuthModule } from '@auth/auth.module';
import { StarSystemModule } from '@star-system/star-system.module';
import { PlanetModule } from './modules/planet/planet.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, StarSystemModule, PlanetModule],
  providers: [AuthService],
})
export class AppModule {}
