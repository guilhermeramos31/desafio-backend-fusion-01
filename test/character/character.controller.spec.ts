import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from '@character/character.controller';
import { CharacterService } from '@character/character.service';

describe('CharacterController', () => {
  let controller: CharacterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterController],
      providers: [CharacterService],
    }).compile();

    controller = module.get<CharacterController>(CharacterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
