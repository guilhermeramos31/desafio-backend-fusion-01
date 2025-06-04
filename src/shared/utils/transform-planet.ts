import { Planet } from '@planet/entity/planet.entity';

export function transformPrismaPlanet({
  id,
  name,
  climate,
  terrain,
  population,
  StarSystems,
}: Planet): Planet {
  return {
    id,
    name,
    climate,
    terrain,
    population: population.toString(),
    StarSystems: StarSystems ?? undefined,
  };
}
