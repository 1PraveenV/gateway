import { Test, TestingModule } from '@nestjs/testing';
import { SinghealthService } from './singhealth.service';

describe('SinghealthService', () => {
  let service: SinghealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SinghealthService],
    }).compile();

    service = module.get<SinghealthService>(SinghealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
