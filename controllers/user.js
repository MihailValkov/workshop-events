import { setCommon, message } from "../scripts/common.js";
import method from '../scripts/requester.js'

export default {
  register: {
    async get(context) {
      await setCommon(context);
      context.partial("../views/user/register.hbs");
    },
    post(context) {
        const {username,password,rePassword} = context.params;
        if(password !== rePassword) {
            throw new Error('Passwords must be equal');
        }
        setCommon(context).then(()=>{
            firebase.auth().createUserWithEmailAndPassword(username, password)
            .then(()=> {
              message("User registration successful.",'success','/login',context);
            })
            .catch((e)=>message(`${e.message}`,'error','',context));

        })

    },
  },
  login: {
    async get(context) {
      await setCommon(context);
      context.partial("../views/user/login.hbs");
    },
    post(context) {
        const {username,password} = context.params;
        setCommon(context).then(()=>{
            firebase.auth().signInWithEmailAndPassword(username, password)
            .then(()=> {
               sessionStorage.setItem('username',username);
                message("Login successful.",'success','/home',context);
            })
            .catch((e)=>message(`${e.message}`,'error','',context));
        })
    },
  },
  logout: {
   get(context) {
    firebase.auth().signOut().then(function() {
        sessionStorage.clear();
        message("Logout successful." ,'success','/home',context);
      }).catch((e)=>message(`${e.message}`,'error','',context));
    },
  },
  profile : {
    async get(context){
      await setCommon(context);
      const data = await method.get('events.json');
      const events = Object.values(data).filter(x=> x.organizer === sessionStorage.getItem('username'));
      context.EventCounter= events.length;
      context.events= events;
      context.partial('../views/user/profile.hbs');
      
    }
  }
};
