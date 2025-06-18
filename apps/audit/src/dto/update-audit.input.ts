import { CreateAuditInput } from './create-audit.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuditInput extends PartialType(CreateAuditInput) {
  @Field(() => Int)
  id: number;
}
