const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('../db/config/mongoose')
const {Notes,Questions,Replys,Users,Answers} = require('../db/schemas/Schema')

const db = mongoose();
const app = express()
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

const router = express.Router();
router.use((req,res,next)=>{
    console.log('this is a api used');
    next();
})
let topics = [];
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
      res.send(200);
    }
    else {
      next();
    }
  });
app.use('/checkLogin',(req,res)=>{//登录API
    const name = req.query.userName;
    const password = req.query.password;
   Users.find({'userName':name},(error,data)=>{
       if(error){
           next(error);
           res.json(data)
       }else{
           if(data.length<=0){
            res.json([{code:'1',msg:'用户未注册！'}])
           }else{
            if(data[0].password===password){
                res.json([{code:'0',msg:'登录成功！',data:data}])
            }else{
             res.json([{code:'1',msg:'用户名密码不匹配！'}])
            }
           }
       }
   })
})
app.use('/register',(req,res,next)=>{//用户注册API
    const name = req.query.name;
    Users.find({'userName':name},(error,data)=>{
        if(error){
            res.json(data)
        }else{
            if(data.length>0){
                res.json([{code:'1',msg:'可惜了,用户名已被注册！'}])
            }else{
                next();
            }
        }
    })
},(req,res,next)=>{
    const name = req.query.name;
    const password = req.query.password
    Users.insertMany({'userName':name,'password':password},(error,data)=>{
        if(error){
            res.json(data)
        }else{
            next()
        }
    })
},(req,res)=>{
    const name = req.query.name;
    Users.find({'userName':name},(error,data)=>{
        if(error){
            res.json(data)
        }else{
            res.json([{code:'0',msg:'注册成功！',data:data}])
        }
    })
})
app.use('/addNote',(req,res)=>{//添加小记
    Notes.insertMany(req.body,(error,data)=>{
        if(error){
            res.json(data)
        }else{
            res.json([{code:'0',msg:'添加成功！'}])
        }
    })
})
app.use('/getNote',(req,res)=>{//获取所有小记、小记详情
    Notes.find(req.query,(error,data)=>{
        if(error){
            res.json([{code:'1',msg:'查询失败！'}])
        }else{
            res.json([{code:'0',data:data,msg:'查询成功！'}])
        }
    })
})
app.use('/addQuestion',(req,res)=>{//添加题目
    Questions.insertMany(req.body,(error,data)=>{
        if(error){
            res.json(data)
        }else{
            res.json([{code:'0',msg:'添加成功！'}])
        }
    })
})
app.use('/getQuestion',(req,res)=>{//查询所有题目
    Questions.find(req.query,(error,data)=>{
        if(error){
            res.json(data)
        }else{
            res.json([{code:'0',data:data,msg:'查询成功！'}])
        }
    })
})
app.use('/getMessage',(req,res)=>{//查询所有留言
    Replys.find().populate('userid','_id userName').populate('touserid','_id userName type').exec(function(error,data){
        if(error){
            console.log(error)
        }else{
          res.json(data)
        }
    })
})
app.use('/saveMessage',(req,res,next)=>{//保存留言/回复
    Replys.insertMany(req.body,(error,data)=>{
        if(error){
            res.json(error)
        }else{
            next()
        }
    })
},(req,res)=>{
    Replys.find().populate('userid','_id userName').populate('touserid','_id userName type').exec(function(error,data){
        if(error){
            console.log(error)
        }else{
          res.json([{code:'0',data:data,msg:'留言成功！'}])
        }
    })
})
app.use('/addAnswer',(req,res,next)=>{//保存题目解答
    Answers.insertMany(req.body,(error,data)=>{
        if(error){
            res.json(data)
        }else{
            next()
        }
    })
},(req,res)=>{
    Answers.find({'belong':req.body.belong}).populate('belong').populate('userid').sort('time').exec((error,data)=>{
        if(error){
            res.json(data)
        }else{
            res.json([{code:'0',data:data,msg:'回答完成！'}])
        }
    })
})
app.use('/getAnswer',(req,res)=>{
    Answers.find(req.query,(error,data)=>{
        if(error){
            res.json(data)
        }else{
            if(data.length===0){
                res.json([{code:'0',msg:'还没有任何人解答！'}])
            }else{
                res.json([{code:'0',msg:'查询成功！',data:data}])
            }
        }
    })
})
app.listen(3003,()=>{
    console.log('node server is listening 3003!')
})