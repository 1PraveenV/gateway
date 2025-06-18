import { CreateSinghealthInput } from './create-singhealth.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSinghealthInput extends PartialType(CreateSinghealthInput) {
  @Field(() => Int)
  id: number;
}
