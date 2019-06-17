import 'whatwg-fetch'

function Post(url,data,callback,errBack){
    return fetch('http://127.0.0.1:3003/'+url,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json',
            'accesstoken':sessionStorage.getItem('token'),
            'Accept':'application/json,text/plain,*/*'
        }
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
        callback(data);
    }).catch((err)=>{
        errBack(err)
    })
}

function Get(url,params,callback,errBack){
    if(params){
        let paramsArray = new Array;
        Object.keys(params).forEach(key=>{
            paramsArray.push(key+'='+params[key]);
        })
        if(url.search(/\?/)===-1){
            url += "?"+paramsArray.join('&');
        }else{
            url += '&'+paramsArray.join('&');
        }
    }
    return fetch('http://127.0.0.1:3003/'+url,{
        method:'Get',
        headers:{
            'Accept':'application/json,text/plain,*/*'
        }
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
        callback(data);
    }).catch((err)=>{
        errBack(err);
    })
}

export {Post,Get}