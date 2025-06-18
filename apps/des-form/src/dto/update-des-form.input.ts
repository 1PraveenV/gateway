import { CreateDesFormInput } from './create-des-form.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDesFormInput extends PartialType(CreateDesFormInput) {
  @Field(() => Int)
  id: number;
}
