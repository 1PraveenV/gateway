import { Injectable } from '@nestjs/common';
import { CreateDesFormInput } from './dto/create-des-form.input';
import { UpdateDesFormInput } from './dto/update-des-form.input';

@Injectable()
export class DesFormService {
  create(createDesFormInput: CreateDesFormInput) {
    return 'This action adds a new desForm';
  }

  findAll() {
    return `This action returns all desForm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} desForm`;
  }

  update(id: number, updateDesFormInput: UpdateDesFormInput) {
    return `This action updates a #${id} desForm`;
  }

  remove(id: number) {
    return `This action removes a #${id} desForm`;
  }
}
