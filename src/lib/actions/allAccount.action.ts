import { UserArgs } from "src/users/args/user.args";
import { Markup } from "telegraf";
import { MyContext } from "../context/context";
import { ActionsName } from "../enums/enum";

export const actionAccount = async (ctx: MyContext) => {
    if ('callback_query' in ctx.update) {
        if ('data' in ctx.update.callback_query) {
            const token = ctx.update.callback_query.data.replace(ActionsName.func, "");
            let argsForFind = new UserArgs();
            argsForFind.token = token;
            argsForFind.telegram_id = ctx.from.id.toString();
            const user = (await ctx.services.findBy(argsForFind))[0];
            
            if(!user) return;

            const inlineKeyboard = Markup.inlineKeyboard([{text: 'Удалить', callback_data: ActionsName.funcForOne+token+";delete"}, {text: 'Перезапустить', callback_data: ActionsName.funcForOne+token+";restart"}]);
            ctx.replyWithHTML(`<b>${user.token_name}</b>`, inlineKeyboard);
        }
    }
}