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
import { DeleteOutput, Output } from '@shared/dtos';
import { Planet } from '@planet/entity/planet.entity';
import { PlanetPaginationOutput } from '@planet/dto';
import { transformPrismaPlanet } from '@shared/utils/transform-planet';

@Injectable()
export class PlanetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly starSystemService: StarSystemService,
  ) {}

  private async searchByName(name: string) {
    return {
      data: await this.prisma.planet.findFirst({
        where: {
          name,
        },
        include: {
          StarSystems: true,
        },
        omit: {
          starSystemId: true,
        },
      }),
    };
  }

  async findOne(id: string): Promise<Output<Planet>> {
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
      data: {
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
  }: CreatePlanetInputDto): Promise<Output<Planet>> {
    const planet = await this.searchByName(name);
    if (planet.data) {
      throw new ConflictException('Planeta já existe');
    }

    await this.starSystemService.findOne(starSystemId);

    planet.data = await this.prisma.planet.create({
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
      data: {
        ...planet.data,
        population: planet.data.population.toString(),
        StarSystems: planet.data.StarSystems ?? undefined,
      },
    };
  }

  async findAll({
    page = 1,
    limit = 10,
    orderBy = 'asc',
  }: PlanetPagination): Promise<PlanetPaginationOutput> {
    page = Number(page);
    limit = Number(limit);

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

    const totalItems = await this.prisma.planet.count();
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: planetList.map(transformPrismaPlanet),
      meta: {
        totalItems,
        currentPage: page,
        itemsPerPage: limit,
        totalPages,
        orderBy,
      },
    };
  }

  async update(
    id: string,
    { climate, terrain }: UpdatePlanetInputDto,
  ): Promise<Output<Planet>> {
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
      data: {
        ...planet,
        population: planet.population.toString(),
      },
    };
  }

  async remove(id: string): Promise<DeleteOutput> {
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
