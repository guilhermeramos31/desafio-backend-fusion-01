import { Affiliation, Specie } from '@prisma/client';
import { Planet } from '@planet/entity/planet.entity';

export interface Character {
  id: string;
  name: string;
  specie: Specie;
  affiliation: Affiliation;
  homePlanet: Planet;
}
