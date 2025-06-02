import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlanetInputDto } from '@modules/planet/dto/inputs/create-planet.input.dto';
import { UpdatePlanetInputDto } from '@modules/planet/dto/inputs/update-planet.input.dto';
import { PrismaService } from '@prisma/prisma.service';
import { StarSystemService } from '@star-system/star-system.service';
import { PlanetPagination } from '@planet/dto/inputs/pagination-planet.input.dto';

@Injectable()
export class PlanetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly starSystemService: StarSystemService,
  ) {}

  async searchByName(name: string) {
    return this.prisma.planet.findFirst({
      where: {
        name,
      },
      include: {
        StarSystems: true,
      },
      omit: {
        starSystemId: true,
      },
    });
  }

  async findOne(id: string) {
    const planet = await this.prisma.planet.findFirst({
      where: {
        id,
      },
      include: {
        StarSystems: true,
      },
      omit: {
        starSystemId: true,
      },
    });
    if (!planet) {
      throw new NotFoundException('Planeta não encontrado');
    }

    return {
      message: 'Planeta encontrado',
      planet: {
        ...planet,
        population: planet.population.toString(),
      },
    };
  }

  async create({
    name,
    terrain,
    climate,
    population = 0n,
    starSystemId,
  }: CreatePlanetInputDto) {
    let planet = await this.searchByName(name);
    if (planet) {
      throw new ConflictException('Planeta já existe');
    }

    await this.starSystemService.findOne(starSystemId);

    planet = await this.prisma.planet.create({
      data: {
        name,
        terrain,
        climate,
        population,
        starSystemId,
      },
      include: {
        StarSystems: true,
      },
      omit: {
        starSystemId: true,
      },
    });

    return {
      message: 'Planeta criado com sucesso',
      planet: { ...planet, population: population.toString() },
    };
  }

  async findAll({ page = 1, limit = 10, orderBy = 'asc' }: PlanetPagination) {
    const planetList = await this.prisma.planet.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { name: orderBy },
      include: {
        StarSystems: true,
      },
      omit: {
        starSystemId: true,
      },
    });

    const planetListSerialized = planetList.map((item) => ({
      ...item,
      population: item.population.toString(),
    }));

    const totalItems = await this.prisma.planet.count();
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: planetListSerialized,
      pagination: {
        totalItems,
        currentPage: page,
        itemsPerPage: limit,
        totalPages,
        orderBy,
      },
    };
  }

  async update(id: string, { climate, terrain }: UpdatePlanetInputDto) {
    await this.findOne(id);

    const planet = await this.prisma.planet.update({
      where: {
        id,
      },
      data: { climate, terrain },
      include: {
        StarSystems: true,
      },
      omit: {
        starSystemId: true,
      },
    });

    return {
      message: 'Planeta atualizado com sucesso',
      planet: {
        ...planet,
        population: planet.population.toString(),
      },
    };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.planet.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Planeta deletado com sucesso',
    };
  }
}
