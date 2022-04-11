import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class UserArgs{
    @Field(() => String)
    token_and_name: string;
}