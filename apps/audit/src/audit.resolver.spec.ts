import { Test, TestingModule } from '@nestjs/testing';
import { AuditResolver } from './audit.resolver';
import { AuditService } from './audit.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Audit } from './entities/audit.entity';
import { RedisService } from '../../../libs/redis/src/redis.service';

describe('AuditResolver', () => {
  let resolver: AuditResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditResolver,
        AuditService,
        {
          provide: getRepositoryToken(Audit),
          useValue: { find: jest.fn() },
        },
        {
          provide: RedisService,
          useValue: { get: jest.fn(), set: jest.fn(), del: jest.fn() },
        },
      ],
    }).compile();

    resolver = module.get<AuditResolver>(AuditResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
