import { Test, TestingModule } from '@nestjs/testing';
import { StarSystemService } from '@star-system/star-system.service';

describe('StarSystemService', () => {
  let service: StarSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarSystemService],
    }).compile();

    service = module.get<StarSystemService>(StarSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
