import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@prisma/prisma.service';
import {
  CharacterPagination,
  CharacterPaginationOutput,
  CreateCharacterDto,
  UpdateCharacterDto,
} from '@character/dto';
import { PlanetService } from '@planet/planet.service';
import { DeleteOutput, Output } from '@shared/dtos';
import { Character } from '@character/entities/character.entity';
import { transformPrismaCharacter } from '@shared/utils/transform-character';

@Injectable()
export class CharacterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly planetService: PlanetService,
  ) {}

  async create({
    name,
    specie,
    affiliation,
    homePlanetId,
  }: CreateCharacterDto): Promise<Output<Character>> {
    await this.planetService.findOne(homePlanetId);

    const character = await this.prisma.character.create({
      data: {
        name,
        specie,
        affiliation,
        homePlanetId,
      },
      include: {
        homePlanet: {
          include: {
            StarSystems: true,
          },
        },
      },
      omit: {
        homePlanetId: true,
      },
    });

    character.homePlanet.population =
      await this.planetService.addPopulation(homePlanetId);

    return {
      message: 'Personagem criado com sucesso',
      data: transformPrismaCharacter(character),
    };
  }

  async findAll({
    page = 1,
    limit = 10,
    orderBy = 'asc',
  }: CharacterPagination): Promise<CharacterPaginationOutput> {
    page = Number(page);
    limit = Number(limit);

    const characterList = await this.prisma.character.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { name: orderBy },
      include: {
        homePlanet: {
          include: {
            StarSystems: true,
          },
        },
      },
      omit: {
        homePlanetId: true,
      },
    });

    const totalItems = await this.prisma.character.count();
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: characterList.map(transformPrismaCharacter),
      meta: {
        totalItems,
        currentPage: page,
        itemsPerPage: limit,
        totalPages,
        orderBy,
      },
    };
  }

  async findOne(id: string): Promise<Output<Character>> {
    const character = await this.prisma.character.findFirst({
      where: {
        id,
      },
      include: {
        homePlanet: {
          include: {
            StarSystems: true,
          },
        },
      },
      omit: {
        homePlanetId: true,
      },
    });
    if (!character) {
      throw new NotFoundException('Personagem não existe');
    }

    return {
      message: 'Personagem encontrado',
      data: transformPrismaCharacter(character),
    };
  }

  async update(
    id: string,
    { name }: UpdateCharacterDto,
  ): Promise<Output<Character>> {
    await this.findOne(id);
    const character = await this.prisma.character.update({
      where: {
        id,
      },
      data: {
        name,
      },
      include: {
        homePlanet: {
          include: {
            StarSystems: true,
          },
        },
      },
      omit: {
        homePlanetId: true,
      },
    });
    return {
      message: 'Personagem atualizado com sucesso',
      data: transformPrismaCharacter(character),
    };
  }

  async remove(id: string): Promise<DeleteOutput> {
    const { data } = await this.findOne(id);

    await this.planetService.removePopulation(data.homePlanet.id);
    await this.prisma.character.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Personagem deletado ',
    };
  }
}
