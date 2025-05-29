import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import jwt from '@config/jwt';
import { PrismaModule } from '@shared/prisma/prisma.module';
import { JwtStrategy } from '@auth/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [AuthService, JwtStrategy],
  imports: [
    UserModule,
    PrismaModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwt.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
