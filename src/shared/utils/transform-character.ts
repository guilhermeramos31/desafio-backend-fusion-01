import { Character } from '@character/entities/character.entity';
import { transformPrismaPlanet } from '@shared/utils/transform-planet';

export function transformPrismaCharacter(character: Character) {
  return {
    ...character,
    homePlanet: transformPrismaPlanet(character.homePlanet),
  };
}
