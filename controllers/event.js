import { setCommon, message } from "../scripts/common.js"
import method from "../scripts/requester.js";

export default {
    create : {
        async get(context){
            await setCommon(context);
            await context.partial('../views/events/create.hbs');
        },
        post(context){
            setCommon(context).then(()=> {
                const data = {
                    ...context.params,
                    organizer: sessionStorage.getItem('username'),
                    peopleInterestIn : 0
                }
                method.post('events.json',data)
                .then(()=>{message("Event created successfully." ,'success','/home',context);})
                
            })
        }
    },
    details :{
        async get(context){
            await setCommon(context);
            const data = await method.get(`events/${context.params.id}.json`);
            Object.keys(data).forEach(x=>{
                context[x]= data[x];
            });
            context.id=context.params.id;
            context.isCreator = context.organizer === sessionStorage.getItem('username');
            await context.partial('../views/events/details.hbs')
            
        }
    },
    edit : {
       async get(context){
        await setCommon(context);
        const data= await method.get(`events/${context.params.id}.json`);
        Object.keys(data).forEach(x=> context[x]= data[x]);
        context.id= context.params.id;
        await context.partial('../views/events/edit.hbs')
        
        },
        post(context){
            const data = {...context.params};
            method.put(`events/${context.params.id}.json`,data)
            .then(()=>{message("Event edited successfully."  ,'success',`details/${context.params.id}`,context);})
            .catch((e)=>message(`${e.message}`,'error','',context));
        }
    },
    close : {
       async get(context){
        await method.remove(`events/${context.params.id}.json`);
        message("Event closed successfully." ,'success','/home',context);
        
        }
    },
    join : {
        async get(context){
            const data = await method.get(`events/${context.params.id}.json`);
            data.peopleInterestIn++;
            await method.patch(`events/${context.params.id}.json`,{peopleInterestIn :data.peopleInterestIn});
            message("You join the event successfully." ,'success',`details/${context.params.id}`,context);
            
        }
    }
    
}