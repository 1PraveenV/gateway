import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSinghealthInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
