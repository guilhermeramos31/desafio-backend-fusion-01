import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../shared/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import password from '../../config/password';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserDto) {
    const { name, email } = user;

    const userExist = await this.findByEmail(email);
    if (userExist) {
      throw new ConflictException('Usuário já existe!');
    }

    const passwordHashed = bcrypt.hashSync(user.password, password.salt);
    const newUser = await this.prisma.user.create({
      data: { name, email, password: passwordHashed },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return { message: 'Usuário criado com sucesso!', user: newUser };
  }

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  private async findById(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  private async userExists(id: string) {
    const userExist = await this.findById(id);
    if (!userExist) {
      throw new NotFoundException('Usuário não existe!');
    }
    return userExist;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await this.userExists(id);

    const userUpdated = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return { message: 'Usuário atualizado com sucesso!', user: userUpdated };
  }

  private async passwordAlreadyUsed(newPassword: string, passwords: string[]) {
    for (const oldPassword of passwords) {
      const isSame = await bcrypt.compare(newPassword, oldPassword);
      if (isSame) {
        throw new ConflictException('Essa senha já foi usada anteriormente.');
      }
    }
  }

  async updatePassword(id: string, body: UpdatePasswordDto) {
    const user = await this.userExists(id);

    await this.passwordAlreadyUsed(body.password, user.lastPassword);

    const passwordHashed = bcrypt.hashSync(body.password, password.salt);
    const userUpdated = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: passwordHashed,
        lastPassword: {
          set: [user.password, ...user.lastPassword.slice(0, 4)],
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return { message: 'Senha atualizada com sucesso!', user: userUpdated };
  }

  async remove(id: string) {
    await this.userExists(id);

    await this.prisma.user.delete({ where: { id } });

    return { message: 'Usuário deletado com sucesso!' };
  }
}
