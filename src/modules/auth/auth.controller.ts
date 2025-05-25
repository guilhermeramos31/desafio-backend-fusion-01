import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDTO } from '@auth/dto';
import { CreateUserInputDto } from '@user/dto';
import { ApiLoginAuth, ApiRegisterAuth } from '@shared/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiLoginAuth()
  @Post('login')
  async login(@Body() loginDTO: LoginAuthDTO) {
    return await this.authService.login(loginDTO);
  }

  @ApiRegisterAuth()
  @Post('register')
  async register(@Body() createUserDto: CreateUserInputDto) {
    return await this.authService.register(createUserDto);
  }
}
