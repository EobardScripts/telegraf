import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class UserArgs{
    @Field(() => String, {defaultValue: null})
    token: string;

    @Field(() => String, {defaultValue: null})
    telegram_id: string;
}