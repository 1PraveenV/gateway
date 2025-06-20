import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SinghealthService } from './singhealth.service';
import { Singhealth } from './entities/singhealth.entity';
import { CreateSinghealthInput } from './dto/create-singhealth.input';
import { UpdateSinghealthInput } from './dto/update-singhealth.input';

@Resolver(() => Singhealth)
export class SinghealthResolver {
  constructor(private readonly singhealthService: SinghealthService) {}

  @Mutation(() => Singhealth)
  createSinghealth(@Args('createSinghealthInput') createSinghealthInput: CreateSinghealthInput) {
    return this.singhealthService.create(createSinghealthInput);
  }

  @Query(() => [Singhealth], { name: 'singhealths' })
  findAll() {
    return this.singhealthService.findAll();
  }

  @Query(() => Singhealth, { name: 'singhealth' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.singhealthService.findOne(id);
  }

  @Mutation(() => Singhealth)
  updateSinghealth(@Args('updateSinghealthInput') updateSinghealthInput: UpdateSinghealthInput) {
    return this.singhealthService.update(updateSinghealthInput.id, updateSinghealthInput);
  }

  @Mutation(() => Singhealth)
  removeSinghealth(@Args('id', { type: () => Int }) id: number) {
    return this.singhealthService.remove(id);
  }
}
