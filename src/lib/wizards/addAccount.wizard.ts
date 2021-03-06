import { User } from "src/users/entities/user.entity";
import { Scenes } from "telegraf";
import { MyContext } from "../context/context";
import { WizardsName } from "../enums/enum";

async function addAccountInBase(ctx: MyContext): Promise<number> {
    const telegram_id = ctx.from.id.toString();

    let user = new User();
    user.telegram_id = telegram_id;
    user.token = ctx.wizard.state['token'];
    user.token_name = ctx.wizard.state['token_name'];

    try {
        await ctx.services.create(user);
        return 0;
    } catch (e) {
        console.error(`Ошибка: ${e}`);
        return e?.errno;
    }
}

export const addAccount = new Scenes.WizardScene<MyContext>(WizardsName.addAccount,
    async (ctx) => {
        ctx.reply('Укажите токен аккаунта: ');
        return ctx.wizard.next();
    },
    async (ctx) => {
        if ('text' in ctx.message) {
            ctx.wizard.state['token'] = ctx.message.text;
            ctx.reply('Укажите название аккаунта: ');
            return ctx.wizard.next();
        }
    },
    async (ctx) => {
        if ('text' in ctx.message) {
            ctx.wizard.state['token_name'] = ctx.message.text;
            const rx = /^[а-яё\s-]+$/i;
            if(rx.test(ctx.wizard.state['token_name'])){
                ctx.reply('Некорректное название аккаунта, используйте английский алфавит.');
                return;
            }
            const addAcc = await addAccountInBase(ctx);
            if(addAcc === 1062 || addAcc !== 0) {
                await ctx.reply(`Такой аккаунт уже существуют.`);
                ctx.scene.reenter();
            }else{
                ctx.replyWithHTML(`Аккаунт добавлен.\r\n\r\nНазвание аккаунта: <b>${ctx.wizard.state['token_name']}</b>\r\nТокен: <b>${ctx.wizard.state['token']}</b>`);
                ctx.scene.leave();
            }
        }
    }
);