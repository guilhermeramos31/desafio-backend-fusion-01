import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStarSystemDto } from '@modules/star-system/dto/inputs/create-star-system.dto';
import { UpdateStarSystemDto } from '@modules/star-system/dto/inputs/update-star-system.dto';
import { PrismaService } from '@prisma/prisma.service';
import { StarSystemPagination } from '@star-system/dto/inputs/pagination-star-system.dto';

@Injectable()
export class StarSystemService {
  constructor(private readonly prisma: PrismaService) {}

  async searchByName(name: string) {
    return this.prisma.starSystems.findFirst({
      where: {
        name,
      },
    });
  }

  async create({ name, description }: CreateStarSystemDto) {
    const exist = await this.searchByName(name);
    if (exist) {
      throw new ConflictException('Esse sistema já existe');
    }

    const starSystem = await this.prisma.starSystems.create({
      data: {
        name,
        description,
      },
    });

    return {
      message: `Sistema criado com sucesso`,
      starSystem,
    };
  }

  async findAll({ page, limit, orderBy }: StarSystemPagination) {
    page = Number(page);
    limit = Number(limit);
    const starSystemList = await this.prisma.starSystems.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { name: orderBy },
    });
    const totalItems = await this.prisma.starSystems.count();
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: starSystemList,
      pagination: {
        totalItems,
        currentPage: page,
        itemsPerPage: limit,
        totalPages,
        orderBy,
      },
    };
  }

  async findOne(id: string) {
    const starSystem = await this.prisma.starSystems.findFirst({
      where: {
        id,
      },
    });
    if (!starSystem) {
      throw new NotFoundException('Sistema não encontrado');
    }

    return {
      message: 'Sistema solar encontrado com sucesso',
      starSystem,
    };
  }

  async update(id: string, { name, description }: UpdateStarSystemDto) {
    let { starSystem } = await this.findOne(id);
    const exist = await this.searchByName(name);
    if (exist && starSystem.id !== exist.id) {
      throw new ConflictException('Esse sistema já existe');
    }

    starSystem = await this.prisma.starSystems.update({
      where: { id },
      data: {
        name,
        description,
      },
    });
    return {
      message: `Sistema solar atualizado com sucesso`,
      starSystem,
    };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.starSystems.delete({
      where: {
        id,
      },
    });
    return {
      message: `Sistema deletado com sucesso`,
    };
  }
}
