import { Module } from '@nestjs/common';

import { AuthService } from '@auth/auth.service';
import { UserModule } from '@user/user.module';
import { PrismaModule } from '@shared/prisma/prisma.module';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule],
  providers: [AuthService],
})
export class AppModule {}
