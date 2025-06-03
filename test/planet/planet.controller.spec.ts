import { Test, TestingModule } from '@nestjs/testing';
import { PlanetController } from '@modules/planet/planet.controller';
import { PlanetService } from '@modules/planet/planet.service';

describe('PlanetController', () => {
  let controller: PlanetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetController],
      providers: [PlanetService],
    }).compile();

    controller = module.get<PlanetController>(PlanetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
