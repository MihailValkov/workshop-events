import { setCommon } from "../scripts/common.js";
import method from "../scripts/requester.js";

export async function getHome(context){
    await setCommon(context);
    const data = await method.get('events.json');
    context.events =Object.entries(data).map(([id,val])=>{
        return {id, ...val}
    });
    await context.partial('../views/home.hbs');
}
