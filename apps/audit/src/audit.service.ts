import { Injectable } from '@nestjs/common';
import { CreateAuditInput } from './dto/create-audit.input';
import { UpdateAuditInput } from './dto/update-audit.input';

@Injectable()
export class AuditService {
  create(createAuditInput: CreateAuditInput) {
    return 'This action adds a new audit';
  }

  findAll() {
    return `This action returns all audit`;
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
