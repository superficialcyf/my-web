const mongoose = require('mongoose')
const schema = mongoose.Schema;

const Note = new schema({
    title:String,
    html:String,
    time:String
})
const Question = new schema({
    title:String,
    answer:String
})
const Reply = new schema({
    userid:{
        type:schema.Types.ObjectId,
        ref:'user'
    },
    touserid:{
        type:schema.Types.ObjectId,
        ref:'user'
    },
    desc:String,
    time:String,
    belong:String,
    floor:String
})
const User = new schema({
    userName:String,
    password:String
})
const Answer = new schema({
    belong:{
        type:schema.Types.ObjectId,
        ref:'question'
    },
    answer:String,
    userid:{
        type:schema.Types.ObjectId,
        ref:'user'
    },
    time:String
})

const Notes = mongoose.model('note',Note);
const Questions = mongoose.model('question',Question);
const Replys = mongoose.model('repl',Reply);
const Users = mongoose.model('user',User);
const Answers = mongoose.model('answer',Answer)

module.exports = {Notes,Questions,Replys,Users,Answers}