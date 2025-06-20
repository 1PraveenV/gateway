import { Test, TestingModule } from '@nestjs/testing';
import { AuditService } from './audit.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Audit } from './entities/audit.entity';
import { RedisService } from '../../../libs/redis/src/redis.service';

describe('AuditService', () => {
  let service: AuditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditService,
        {
          provide: getRepositoryToken(Audit),
          useValue: { find: jest.fn() },
        },
        {
          provide: RedisService,
          useValue: { get: jest.fn(), set: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<AuditService>(AuditService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
