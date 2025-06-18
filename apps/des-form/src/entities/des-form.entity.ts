import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DesForm {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
