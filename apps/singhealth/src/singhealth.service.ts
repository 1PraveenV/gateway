import { Injectable } from '@nestjs/common';
import { CreateSinghealthInput } from './dto/create-singhealth.input';
import { UpdateSinghealthInput } from './dto/update-singhealth.input';

@Injectable()
export class SinghealthService {
  create(createSinghealthInput: CreateSinghealthInput) {
    return 'This action adds a new singhealth';
  }

  findAll() {
    return `This action returns all singhealth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} singhealth`;
  }

  update(id: number, updateSinghealthInput: UpdateSinghealthInput) {
    return `This action updates a #${id} singhealth`;
  }

  remove(id: number) {
    return `This action removes a #${id} singhealth`;
  }
}
