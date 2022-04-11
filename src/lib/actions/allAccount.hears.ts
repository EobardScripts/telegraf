import { Markup } from "telegraf";
import { MyContext } from "../context/context";
import { ActionsName } from "../enums/enum";


export const allAccountAction = async (ctx: MyContext) => {
    console.log("allAccountActions");
    const accounts = await ctx.services.findAll();
    console.log(accounts);

    let list = [];

    accounts.forEach(account => {
        const token = (account.token_and_name.split(';'))[0];
        const display_name = (account.token_and_name.split(';'))[1];
        list.push({
            text: display_name,
            callback_data: ActionsName.func + account.token_and_name
        });
    });

    console.log(list);

    const inlineKeyboard = Markup.inlineKeyboard(list);
    ctx.reply('Список аккаунтов: ', inlineKeyboard);
};