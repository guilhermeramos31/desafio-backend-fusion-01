import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Spaceship } from '@spaceship/entities/spaceship.entity';
import { PrismaService } from '@prisma/prisma.service';
import { Output } from '@shared/dtos';
import { SpaceshipPaginationOutput } from '@spaceship/dto/outputs/pagination-spaceship.output.dto';
import {
  CreateSpaceshipDto,
  SpaceshipPagination,
  UpdateSpaceshipDto,
} from '@spaceship/dto';

@Injectable()
export class SpaceshipService {
  constructor(private readonly prisma: PrismaService) {}

  private async searchByName(name: string) {
    return this.prisma.spaceship.findFirst({
      where: {
        name,
      },
    });
  }

  async create({
    name,
    passengerCapacity,
    manufacturer,
    model,
  }: CreateSpaceshipDto): Promise<Output<Spaceship>> {
    const spaceshipExist = await this.searchByName(name);
    if (spaceshipExist) {
      throw new ConflictException('Nave espacial já existe');
    }

    const spaceship = await this.prisma.spaceship.create({
      data: {
        name,
        model,
        manufacturer,
        passengerCapacity,
      },
    });

    return {
      message: 'Nave espacial criada com sucesso',
      data: spaceship,
    };
  }

  async findAll({
    page = 1,
    limit = 10,
    orderBy = 'asc',
  }: SpaceshipPagination): Promise<SpaceshipPaginationOutput> {
    page = Number(page);
    limit = Number(limit);

    const spaceshipList = await this.prisma.spaceship.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { name: orderBy },
    });

    const totalItems = await this.prisma.spaceship.count();
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: spaceshipList,
      meta: {
        totalItems,
        currentPage: page,
        itemsPerPage: limit,
        totalPages,
        orderBy,
      },
    };
  }

  async findOne(id: string): Promise<Output<Spaceship>> {
    const spaceship = await this.prisma.spaceship.findFirst({
      where: {
        id,
      },
    });
    if (!spaceship) {
      throw new NotFoundException('Nave espacial não encontrado');
    }

    return {
      message: 'Nave espacial encontrada',
      data: spaceship,
    };
  }

  async update(
    id: string,
    { name, model }: UpdateSpaceshipDto,
  ): Promise<Output<Spaceship>> {
    const { data } = await this.findOne(id);
    const exist = await this.searchByName(name);
    if (exist && data.id !== exist.id) {
      throw new ConflictException('Esse nave já existe');
    }

    const spaceship = await this.prisma.spaceship.update({
      where: {
        id,
      },
      data: {
        name,
        model,
      },
    });

    return {
      message: 'Nave espacial atualizada com sucesso',
      data: spaceship,
    };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.spaceship.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Nave espacial deletada com sucesso',
    };
  }
}
