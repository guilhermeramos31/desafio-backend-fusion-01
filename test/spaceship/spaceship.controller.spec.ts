import { Test, TestingModule } from '@nestjs/testing';
import { SpaceshipController } from '@spaceship/spaceship.controller';
import { SpaceshipService } from '@spaceship/spaceship.service';

describe('SpaceshipController', () => {
  let controller: SpaceshipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpaceshipController],
      providers: [SpaceshipService],
    }).compile();

    controller = module.get<SpaceshipController>(SpaceshipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
