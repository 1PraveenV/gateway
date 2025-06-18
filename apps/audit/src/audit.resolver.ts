import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuditService } from './audit.service';
import { Audit } from './entities/audit.entity';
import { CreateAuditInput } from './dto/create-audit.input';
import { UpdateAuditInput } from './dto/update-audit.input';

@Resolver(() => Audit)
export class AuditResolver {
  constructor(private readonly auditService: AuditService) {}

  @Mutation(() => Audit)
  createAudit(@Args('createAuditInput') createAuditInput: CreateAuditInput) {
    return this.auditService.create(createAuditInput);
  }

  @Query(() => [Audit], { name: 'audit' })
  findAll() {
    return this.auditService.findAll();
  }

  @Query(() => Audit, { name: 'audit' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.auditService.findOne(id);
  }

  @Mutation(() => Audit)
  updateAudit(@Args('updateAuditInput') updateAuditInput: UpdateAuditInput) {
    return this.auditService.update(updateAuditInput.id, updateAuditInput);
  }

  @Mutation(() => Audit)
  removeAudit(@Args('id', { type: () => Int }) id: number) {
    return this.auditService.remove(id);
  }
}
