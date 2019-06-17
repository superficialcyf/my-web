import React,{Component} from 'react'
import BraftEditor from 'braft-editor'
import {Collapse, Icon, Col,Skeleton,Comment,Avatar,Button,Modal,Input,message} from 'antd'
import { Get, Post } from '../component/commonFetchJs'
import 'braft-editor/dist/index.css'
import { connect } from 'react-redux';

const Panel = Collapse.Panel;
 class QuestionDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading:true,
            questionDetail:{},
            answerList:[],
            modalVisible:false,
            title:'',
            editorState:''
        }
        this.answerQuestion = this.answerQuestion.bind(this)
        this.modalCancle = this.modalCancle.bind(this)
        this.handleEditorChange = this.handleEditorChange.bind(this)
        this.handleEditorSave = this.handleEditorSave.bind(this)
    }

    componentDidMount(){
       const id = this.props.match.params.id;
       Get(
        'getQuestion',
        {_id:id},
        (data)=>{
            this.setState({
                questionDetail:data[0].data[0],
                title:data[0].data[0].title
            })
        },
        (data)=>{
            console.log(data)
        }
    )
    }
    answerQuestion(){
        if(!this.props.state.userid){
            message.error('请先登录再答题！')
            return
        }
        this.setState({
            modalVisible:true
        })
    }
    modalCancle(){
        this.setState({
            modalVisible:false
        })
    }
    handleEditorChange(editorState){
        this.setState({
            editorState:editorState,
           
        })
    }
    handleEditorSave = (async)=>{
        const respon = {
            belong:this.props.match.params.id,
            answer:this.state.editorState.toHTML(),
            userid:this.props.state.userid,
            time:this.getNowDate()
        }
        if(this.state.editorState.toText()===''||this.state.editorState.toText().trim()===''){
            message.error('您还没有做任何解答！')
            return 
        }
        Post(
            'addAnswer',
            respon,
            (data)=>{
                message.success(data[0].msg)
                this.setState({
                    modalVisible:false,
                    loading:false,
                    answerList:data[0].data
                })
            },
            (data)=>{
                console.log(data)
            }
        )
    }
    randStyle(){//随机用户头像
        var arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',]
        var num = Math.floor(Math.random()*arr.length);  
        var color = '#'+Math.floor(Math.random()*16777215).toString(16);
        console.log(num)
        return <Avatar style={{backgroundColor:color,fontSize:'18px'}}>{arr[num]}</Avatar>
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

    render(){
        const PanelStyle = {
            background: '#f7f7f7',
            borderRadius: 4,
            marginBottom: 24,
            border: 0,
            overflow: 'hidden',
        }

        return (
            <div id="questionDetail" style={{height:'100%',overflow:'auto'}}>
               <Collapse
                 bordered={false}
                 defaultActiveKey={['1']}
                 expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
               >
                    <Panel style={PanelStyle} header={this.state.questionDetail.title} key="1"> 
                        <div dangerouslySetInnerHTML = {{__html:this.state.questionDetail.answer}} ></div>
                    </Panel>
               </Collapse>
               <div style={{textAlign:'right'}}>
                   <Button onClick={this.answerQuestion} >解题</Button>
               </div>
               <section>
                   <Skeleton
                    active
                     loading={this.state.loading} 
                   >    
                        {this.state.answerList.map((item,index,arr)=>
                             <Comment
                             avatar={this.randStyle()}
                             author={item.userid.userName}
                             content={
                                 <div dangerouslySetInnerHTML = {{__html:item.answer}} ></div>
                             }
                             datetime={item.time}
                             key={item._id}
                             />
                        )}
                   </Skeleton>
               </section>
               <Modal
                    visible={this.state.modalVisible}
                    title="解答"
                    footer={null}
                    onCancel={this.modalCancle}
                    width={800}
                    style={{top:20}}
               >
                   <Input type="text" addonBefore="title" readOnly={true} value={this.state.title}></Input>
                            <BraftEditor
                                value={this.state.editorState}
                                onChange={this.handleEditorChange}
                                onSave={this.handleEditorSave}
                            />
               </Modal>
            </div>
        )
    }
}

export default connect((state)=>{
    return {
        state:state
    }
})(QuestionDetail)