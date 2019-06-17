import {State} from './state'
import {login,unlogin} from './action'

const Reducer = (state=State,action)=>{
    switch(action.type){
        case 'login':return Object.assign({},state,{
            userName:action.userName,
            userid:action.userid
        });break;
        case 'unlogin':return Object.assign({},state,{
            userName:action.userName,
            userid:action.userid
        });break;
        default:return state;break;
    }
}
export {Reducer}