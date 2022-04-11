import { InputType, Int, Field } from '@nestjs/graphql';
import { UPDATE } from 'nestjs-joi';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  telegram_id: string;

  @Field(() => String)
  token_and_name: string;
}
