import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Singhealth {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
