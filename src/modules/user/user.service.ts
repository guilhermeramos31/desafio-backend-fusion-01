import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@shared/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {
  CreateUserInputDto,
  ResponseUserOutputDto,
  UpdatePasswordInputDto,
  UpdateUserInputDto,
} from '@user/dto';
import { FindUserInputDto } from '@user/dto/input/find-user.input.dto';
import passwordHash from '@config/passwordHash';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userDTO: CreateUserInputDto): Promise<ResponseUserOutputDto> {
    const { name, email } = userDTO;

    const userExist = await this.findByEmail({ email });
    if (userExist) {
      throw new ConflictException('Usuário já existe!');
    }

    const password = bcrypt.hashSync(userDTO.password, passwordHash.salt);
    const user = await this.prisma.user.create({
      data: { name, email, password },
      omit: {
        password: true,
        lastPassword: true,
      },
    });

    return {
      message: 'Usuário criado com sucesso!',
      user,
    };
  }

  async findByEmail({ email }: FindUserInputDto) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
      omit: {
        password: true,
        lastPassword: true,
      },
    });
  }

  private async findById(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('Usuário não existe!');
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserInputDto) {
    await this.findById(id);

    const userUpdated = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
      omit: {
        password: true,
        lastPassword: true,
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

  async updatePassword(id: string, body: UpdatePasswordInputDto) {
    const user = await this.findById(id);

    await this.passwordAlreadyUsed(body.password, user.lastPassword);

    const passwordHashed = bcrypt.hashSync(body.password, passwordHash.salt);
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
      omit: {
        password: true,
        lastPassword: true,
      },
    });

    return { message: 'Senha atualizada com sucesso!', user: userUpdated };
  }

  async remove(id: string) {
    await this.findById(id);

    await this.prisma.user.delete({ where: { id } });

    return { message: 'Usuário deletado com sucesso!' };
  }
}
