import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { ILoginAuthDTO } from '@auth/dto';
import { UserService } from '@user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInputDto } from '@user/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateToken(
    payload: Express.User,
    options?: { expiresIn?: string },
  ) {
    return await this.jwtService.signAsync(payload, {
      expiresIn: options?.expiresIn || '1h',
    });
  }

  async login({ email, password }: ILoginAuthDTO) {
    const messageError = 'Credenciais inválidas';
    const { message, user } = await this.userService.findByEmail({ email });
    if (!user) {
      throw new UnauthorizedException(messageError);
    }

    const passwordVerify = await bcrypt.compare(password, user.password);
    if (!passwordVerify) {
      throw new UnauthorizedException(messageError);
    }

    const safeUser = user as Partial<typeof user>;
    delete safeUser.password;
    delete safeUser.lastPassword;

    const token = await this.generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      message: 'Logado com sucesso',
      user: safeUser,
      token,
    };
  }

  async register(createUserDto: CreateUserInputDto) {
    return await this.userService.create(createUserDto);
  }
}
