import React,{Component} from 'react'
import {Get,Post} from '../component/commonFetchJs'
import '../css/message.css'
import {Comment, Form, Button, List, Input,message,Modal,Skeleton,Avatar} from 'antd'
import {connect} from 'react-redux'
import { toUnicode } from 'punycode';


const {TextArea} = Input
class Message extends Component{
    constructor(props){
        super(props)
        this.state={
            submitting:false,
            value:'',
            list:[],
            modalVisible:false,
            belong:'',
            touserid:'',
            replyValue:'',
            skeletonloading:true
        }
        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReply = this.handleReply.bind(this)
        this.ReplyOnChange = this.ReplyOnChange.bind(this)
        this.handleRplySubmit = this.handleRplySubmit.bind(this)
        this.handleModalCancle = this.handleModalCancle.bind(this)
    }

    componentDidMount(){//初始获取数留言据
        Get(
            'getMessage',
            {},
            (data)=>{
                const list = this.changeToList(data);
                console.log(list)
                this.setState({
                    list:this.createList(list),
                    
                })
                setTimeout(()=>{
                    this.setState({
                        skeletonloading:false
                    })
                },1000)
            },
            (data)=>{
                console.log(data)
            }
        )
    }

    handleSubmit(){//提交留言
        if(!this.props.state.userid){
            message.error('请先登录再留言！')
            return
        }
        if(!this.state.value){
            message.error('我这儿不允许交白卷！')
            return 
        }
        const respon = {
            userid:this.props.state.userid, 
            touserid:"5d00fd5ccea956163c45956e", 
            desc:this.state.value,
            time:this.getNowDate(), 
            belong:this.roa(), 
            floor:"0"
        }
        Post(
            'saveMessage',
            respon,
            (data)=>{
                message.success(data[0].msg)
                const list = this.changeToList(data[0].data);
                this.setState({
                    submitting:false,
                    value:'',
                    list:this.createList(list)
                })
            },
            (data)=>{
                console.log(data)
            }
        )
    }
    onChange =e=>{//留言框变化回调
        this.setState({
            value:e.target.value
        })
    }
    handleReply(belong,touserid){//回复
        console.log(touserid)
        if(!this.props.state.userid){
            message.error('请先登录再回复！')
            return 
        }
        if(this.props.state.userid===touserid){
            message.error('禁止自娱自乐！')
            return
        }
        this.setState({
            modalVisible:true,
            belong:belong,
            touserid:touserid
        })
    }
    ReplyOnChange(e){//回复框变化回调
        this.setState({
            replyValue:e.target.value
        })
    }
    handleRplySubmit(){//提交回复
        const respon = {
            userid:this.props.state.userid, 
            touserid:this.state.touserid, 
            desc:this.state.replyValue,
            time:this.getNowDate(), 
            belong:this.state.belong, 
            floor:'1'
        }
        Post(
            'saveMessage',
            respon,
            (data)=>{
                message.success(data[0].msg)
                const list = this.changeToList(data[0].data);
                this.setState({
                    modalVisible:false,
                    submitting:false,
                    replyValue:'',
                    belong:'',
                    touserid:'',
                    list:this.createList(list)
                })
            },
            (data)=>{
                console.log(data)
            }
        )
    }
    handleModalCancle(){//回复modal取消
        this.setState({
            modalVisible:false,
            submitting:false,
            replyValue:'',
            belong:'',
            touserid:''
        })
    }
    createList(Item){//生成留言
        var List = [];
        if(Item.length===0){
            return 
        }else{
            if(Item.length===1){
                let belong = Item[0].belong;
                let touserid = Item[0].userid._id;
                List.push(
                    <Comment
                        avatar={this.randStyle()}
                        actions={[<span onClick={()=>{this.handleReply(`${belong}`,`${touserid}`)}}>回复</span>]}
                        author={Item[0].touserid.type=='admin'?`${Item[0].userid.userName}`:`${Item[0].userid.userName} @ ${Item[0].touserid.userName}`}
                        content={
                            <p>{`${Item[0].desc}`}</p>
                        }
                        datetime={Item[0].time}
                        key={Item[0]._id}
                    >{Item[0].children?this.createList(Item[0].children):[]}</Comment>
                )
            }else if(Item.length>1){
                for(var k=0;k<Item.length;k++){
                    let belong = Item[k].belong;
                    let touserid = Item[k].userid._id;
                    List.push(
                        <Comment
                        avatar={this.randStyle()}
                        actions={[<span onClick={()=>{this.handleReply(`${belong}`,`${touserid}`)}}>回复</span>]}
                        author={Item[k].touserid.type=='admin'?`${Item[k].userid.userName}`:`${Item[k].userid.userName} @ ${Item[k].touserid.userName}`}
                        content={
                            <p>{`${Item[k].desc}`}</p>
                        }
                        datetime={Item[k].time}
                        key={Item[k]._id}
                        >{Item[k].children?this.createList(Item[k].children):[]}</Comment>
                    )
                }
            }else{
                return
            }
        }
        return List;
    }
    getNowDate(){//获取当前留言时间
        const date = new Date();
        let year = date.getFullYear();
        let mounth = date.getMonth()+1;
        let day = date.getDate();
        if(mounth<=9){
            mounth = '0'+mounth;
        }
        if(day<=9){
            day = '0'+day;
        }
        return year+'.'+mounth+'.'+day;
    }
    roa() {//随机生成留言码
        var arr = [0,1,2,3,4,5,6,7,8,9]
        var temp=new Array();   
    　  var count=arr.length;    
        for (var i=0;i<count;i++)
        { 
            var num=Math.floor(Math.random()*arr.length); 
            temp.push(arr[num]);    
            arr.splice(num,1);    
        }
        return temp.join('');
    }
    randStyle(){//随机用户头像
        var arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',]
        var num = Math.floor(Math.random()*arr.length);  
        var color = '#'+Math.floor(Math.random()*16777215).toString(16);
        console.log(num)
        return <Avatar style={{backgroundColor:color,fontSize:'18px'}}>{arr[num]}</Avatar>
    }
    changeToList(defaultList){//改变获取数据至标准格式
        var list = [...defaultList];
        var top = list.filter((item,index,arr)=>{
            return item.floor==='0'
        })
        for(var i=0;i<top.length;i++){
            var topItem = top[i];
            top[i]['children'] = [];
            for(var k=0;k<defaultList.length;k++){
                if(defaultList[k].belong===topItem.belong && defaultList[k].floor!=='0'){
                    topItem.children.push(defaultList[k])
                }
            }
        }
        return top
    }

    render(){
        return (
            <div id="message">
                <Comment
                  content={
                      <div>
                        <Form.Item style={{margin:'0'}}>
                            <TextArea rows={4} onChange={this.onChange} value={this.state.value}></TextArea>
                        </Form.Item>
                        <Form.Item style={{margin:'0'}}>
                            <Button htmlType='submit' loading={this.state.submitting} onClick={this.handleSubmit}>
                                留言
                            </Button>
                        </Form.Item>
                      </div>
                  }
                />
                <Skeleton
                    active
                    loading={this.state.skeletonloading}
                >
                    <div id="messageList">
                        {this.state.list}
                    </div>
                </Skeleton>
                <Modal
                    title="回复"
                    visible={this.state.modalVisible}
                    onCancel={this.handleModalCancle}
                    footer={null}
                >   
                    <Form.Item style={{margin:'0'}}>
                        <TextArea rows={4} onChange={this.ReplyOnChange} value={this.state.replyValue}></TextArea>
                    </Form.Item>
                    <Form.Item style={{margin:'0'}}>
                        <Button htmlType='submit' loading={this.state.submitting} onClick={this.handleRplySubmit}>
                            回复
                        </Button>
                    </Form.Item>
                </Modal>
            </div>
        )
    }
}

export default connect((state)=>{
    return {
        state:state
    }
})(Message)