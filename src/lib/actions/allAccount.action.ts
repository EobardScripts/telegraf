import { UserArgs } from "src/users/args/user.args";
import { Markup } from "telegraf";
import { MyContext } from "../context/context";
import { ActionsName } from "../enums/enum";

export const actionAccount = async (ctx: MyContext) => {
    if ('callback_query' in ctx.update) {
        if ('data' in ctx.update.callback_query) {
            const token_and_name = ctx.update.callback_query.data.replace(ActionsName.func, "");
            let argsForFind = new UserArgs();
            argsForFind.token_and_name = token_and_name;
            const user = (await ctx.services.findBy(argsForFind))[0];
            
            if(!user) return;

            const inlineKeyboard = Markup.inlineKeyboard([{text: 'Удалить', callback_data: ActionsName.funcForOne+token_and_name+";delete"}, {text: 'Перезапустить', callback_data: ActionsName.funcForOne+token_and_name+";restart"}]);
            ctx.replyWithHTML(`<b>${token_and_name.split(';')[1]}</b>`, inlineKeyboard);
        }
    }
}