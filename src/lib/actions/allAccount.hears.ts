import { UserArgs } from "src/users/args/user.args";
import { Markup } from "telegraf";
import { MyContext } from "../context/context";
import { ActionsName } from "../enums/enum";


export const allAccountAction = async (ctx: MyContext) => {
    console.log("allAccountActions");
    let args: UserArgs = new UserArgs();
    args.telegram_id = ctx.from.id.toString();
    const accounts = await ctx.services.findBy(args);
    console.log(accounts);
    if(accounts.length == 0) {
        ctx.reply('Список аккаунтов пуст');
        return;
    }

    let list = [];

    accounts.forEach(account => {
        const token = account.token;
        const token_name = account.token_name;
        list.push({
            text: token_name,
            callback_data: ActionsName.func + token
        });
    });

    console.log(list);

    const inlineKeyboard = Markup.inlineKeyboard(list);
    ctx.reply('Список аккаунтов: ', inlineKeyboard);
};