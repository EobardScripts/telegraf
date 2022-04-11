import { MyContext } from "src/lib/context/context";
import { ActionsName } from "src/lib/enums/enum";
import { UserArgs } from "src/users/args/user.args";
import { allAccountAction } from "../allAccount.hears";

export const actionForOneAccount = async (ctx: MyContext) => {
    if ('callback_query' in ctx.update) {
        if ('data' in ctx.update.callback_query) {
            console.log(ctx.update.callback_query);
            const callback_data = ctx.update.callback_query.data.replace(ActionsName.funcForOne, "");
            const list = callback_data.split(';');
            const token = list[0], action = list[1];

            switch(action){
                case 'delete':
                    let args: UserArgs = new UserArgs();
                    args.token = token;
                    args.telegram_id = ctx.from.id.toString();
                    const user = (await ctx.services.findBy(args))[0];
                    if(!user) return;
                    await ctx.services.remove(user.id);
                    allAccountAction(ctx);
                    break;
                case 'restart':
                    console.log('restart');
                    break;
            }
        }
    }
};