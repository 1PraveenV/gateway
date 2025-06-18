import { Test, TestingModule } from '@nestjs/testing';
import { DesFormService } from './des-form.service';

describe('DesFormService', () => {
  let service: DesFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesFormService],
    }).compile();

    service = module.get<DesFormService>(DesFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
