const login = (name,id)=>{
    return{
        type:'login',
        userName:name,
        userid:id
    }
}
const unlogin = (name,id)=>{
    return {
        type:'unlogin',
        userName:name,
        userid:id
    }
}

export {login,unlogin}