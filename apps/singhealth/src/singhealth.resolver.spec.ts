import { Test, TestingModule } from '@nestjs/testing';
import { SinghealthResolver } from './singhealth.resolver';
import { SinghealthService } from './singhealth.service';

describe('SinghealthResolver', () => {
  let resolver: SinghealthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SinghealthResolver, SinghealthService],
    }).compile();

    resolver = module.get<SinghealthResolver>(SinghealthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
