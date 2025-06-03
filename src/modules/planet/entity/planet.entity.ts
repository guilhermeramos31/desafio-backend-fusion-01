import { StarSystem } from '@star-system/entity/star-system.entity';
import { Climate, Terrain } from '@prisma/client';

export interface Planet {
  id: string;
  name: string;
  climate: Climate;
  terrain: Terrain;
  population: string | bigint;
  StarSystems?: StarSystem | null;
}
