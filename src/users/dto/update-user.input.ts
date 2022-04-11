import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID!)
  id: number;

  @Field()
  telegram_id: string;

  @Field()
  token_and_name: string;
}