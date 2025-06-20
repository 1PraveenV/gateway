import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DesFormService } from './des-form.service';
import { DesForm } from './entities/des-form.entity';
import { CreateDesFormInput } from './dto/create-des-form.input';
import { UpdateDesFormInput } from './dto/update-des-form.input';

@Resolver(() => DesForm)
export class DesFormResolver {
  constructor(private readonly desFormService: DesFormService) {}

  @Mutation(() => DesForm)
  createDesForm(@Args('createDesFormInput') createDesFormInput: CreateDesFormInput) {
    return this.desFormService.create(createDesFormInput);
  }

  @Query(() => [DesForm], { name: 'desForms' })
  findAll() {
    return this.desFormService.findAll();
  }

  @Query(() => DesForm, { name: 'desForm' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.desFormService.findOne(id);
  }

  @Mutation(() => DesForm)
  updateDesForm(@Args('updateDesFormInput') updateDesFormInput: UpdateDesFormInput) {
    return this.desFormService.update(updateDesFormInput.id, updateDesFormInput);
  }

  @Mutation(() => DesForm)
  removeDesForm(@Args('id', { type: () => Int }) id: number) {
    return this.desFormService.remove(id);
  }
}
