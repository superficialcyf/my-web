function SetCookie(key,value){
    const date = new Date();
    date.setTime(date.getTime() + (1*60*60*1000));
    const expires = 'expires=' + date.toGMTString();
    document.cookie = key +'=' +value+ ';'+expires
}

function GetCookie (key){
    const name = key + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export {SetCookie,GetCookie}