import { Test, TestingModule } from '@nestjs/testing';
import { StarSystemController } from '@star-system/star-system.controller';
import { StarSystemService } from '@star-system/star-system.service';

describe('StarSystemController', () => {
  let controller: StarSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarSystemController],
      providers: [StarSystemService],
    }).compile();

    controller = module.get<StarSystemController>(StarSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
