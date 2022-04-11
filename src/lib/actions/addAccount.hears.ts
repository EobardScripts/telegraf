import { MyContext } from "../context/context";
import { WizardsName } from "../enums/enum";

export const addAccountAction = (ctx: MyContext) => {
    console.log('addAccountActions');
    ctx.scene.enter(WizardsName.addAccount);
};