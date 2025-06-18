import { Test, TestingModule } from '@nestjs/testing';
import { DesFormResolver } from './des-form.resolver';
import { DesFormService } from './des-form.service';

describe('DesFormResolver', () => {
  let resolver: DesFormResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesFormResolver, DesFormService],
    }).compile();

    resolver = module.get<DesFormResolver>(DesFormResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
