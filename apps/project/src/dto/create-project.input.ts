// import { InputType, Int, Field } from '@nestjs/graphql';

// @InputType()
// export class CreateProjectInput {
//   @Field(() => Int, { description: 'Example field (placeholder)' })
//   exampleField: number;
// }

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}