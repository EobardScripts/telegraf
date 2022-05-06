import { Injectable } from '@nestjs/common';
import { CONTEXT, NextFn } from '@nestjs/graphql';
import { Context, Markup, Scenes, session, Telegraf } from 'telegraf';
import { ReplyKeyboardMarkup } from 'telegraf/typings/core/types/typegram';
import { actionForOneAccount } from './lib/actions/actionsForAccount/actionsForAccount';
import { addAccountAction } from './lib/actions/addAccount.hears';
import { actionAccount } from './lib/actions/allAccount.action';
import { allAccountAction } from './lib/actions/allAccount.hears';
import { MyContext } from './lib/context/context';
import { WizardsName, ButtonsName, ActionsName } from './lib/enums/enum';
import { addAccount } from './lib/wizards/addAccount.wizard';
import { UsersService } from './users/users.service';

const start = (ctx: Context) => {
    const button = Markup.keyboard([ButtonsName.allAccount, ButtonsName.addAccount]);
    ctx.replyWithHTML(`Добро пожаловать, <b>${ctx.from.first_name}</b>!`, button);
};

@Injectable()
export class AppService {
    constructor(private readonly usersService: UsersService) { }

    private setUsage(bot: Telegraf<MyContext>) {
        const stage = new Scenes.Stage([addAccount]);

        bot.use((ctx: MyContext, next: NextFn) => {
            ctx.services = this.usersService;
            return next();
        });
        bot.use(session());
        bot.use(stage.middleware())
    }

    runBot() {
        const bot: Telegraf<MyContext> = new Telegraf<MyContext>(process.env.BOT_TOKEN);

        this.setUsage(bot);

        bot.start(start);

        //Hears
        bot.hears(ButtonsName.allAccount, allAccountAction);
        bot.hears(ButtonsName.addAccount, addAccountAction);

        //Actions
        bot.action(/actionAccount/, actionAccount);
        bot.action(/actionForOneAccount/, actionForOneAccount);

        bot.launch();
        // Enable graceful stop
        process.once('SIGINT', () => bot.stop('SIGINT'))
        process.once('SIGTERM', () => bot.stop('SIGTERM'))
    }
}
