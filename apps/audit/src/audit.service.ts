import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuditInput } from './dto/create-audit.input';
import { UpdateAuditInput } from './dto/update-audit.input';
import { Audit } from './entities/audit.entity';
import { RedisService } from '../../../libs/redis/src/redis.service';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(Audit)
    private readonly auditRepository: Repository<Audit>,
    private readonly redisService: RedisService,
  ) {}

  async create(createAuditInput: CreateAuditInput): Promise<Audit> {
    const audit = this.auditRepository.create(createAuditInput as unknown as Audit);
    const saved: Audit = await this.auditRepository.save(audit);
    await this.redisService.del('all_audits');
    return saved;
  }

  async findAll(): Promise<Audit[]> {
    const cacheKey = 'all_audits';
    const cached = await this.redisService.get<Audit[]>(cacheKey);
    if (cached) {
      return cached;
    }
    const audits = await this.auditRepository.find();
    await this.redisService.set(cacheKey, audits, 60);
    return audits;
  }

  findOne(id: number) {
    return `This action returns a #${id} audit`;
  }

  update(id: number, updateAuditInput: UpdateAuditInput) {
    return `This action updates a #${id} audit`;
  }

  remove(id: number) {
    return `This action removes a #${id} audit`;
  }
}
