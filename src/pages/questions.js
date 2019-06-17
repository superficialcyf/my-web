import React,{Component} from 'react'
import BraftEditor from 'braft-editor'
import {Link,BrowserRouter as Router, Route} from 'react-router-dom'
import {Button,List,Skeleton,Modal,Input,message,Spin} from 'antd'
import {Get,Post} from '../component/commonFetchJs'
import 'braft-editor/dist/index.css'

export default class Questions extends Component{
    constructor(props){
        super(props)
        this.state = {
            questionList:[],
            visible:false,
            loading:true,
            editorState:null,
            editorHtml:'',
            title:'',
        }
        this.handleCancleModal = this.handleCancleModal.bind(this)
        this.handleOnModal = this.handleOnModal.bind(this)
        this.handleEditorChange = this.handleEditorChange.bind(this)
        this.handleEditorSave = this.handleEditorSave.bind(this)
        this.handleChangeInput = this.handleChangeInput.bind(this)
    }

    componentDidMount(){
        this.getQuestionList()
    }
    handleOnModal(){//打开弹窗
        this.setState({
            visible:true
        })
    }
    handleCancleModal(){//关闭弹窗
        this.setState({
            visible:false,
            editorState:'',
            title:''
        })
    }
    handleEditorChange(editor){//获取editor实例
        this.setState({
            editorState:editor
        })
    }
    handleEditorSave = async=>{//保存题目
        this.setState({
            loading:true
        })
        const htmlContent = this.state.editorState.toHTML();
        const title = this.state.title
        let data = {
            title:title,
            answer:htmlContent
        }
        if(title===''||typeof title==='undefined'){
            message.error('请填写标题！')
            this.setState({
                loading:false
            })
        }else{
            Post(
                'addQuestion',
                data,
                (data)=>{
                    message.success(data[0].msg);
                    this.setState({
                        loading:false,
                        visible:false
                    })
                    this.getQuestionList()
                },
                (data)=>{
                    console.log(data)
                }
            )
        }
    }
    handleChangeInput = e=>{//获取input值
        this.setState({
            title:e.target.value
        })
    }
    getQuestionList(){
        Get(
            'getQuestion',
            {},
            (data)=>{
                this.setState({
                    loading:false,
                    questionList:data[0].data
                })
            },
            (data)=>{
                console.log(data)
            }
        )
    }

    render(){
        const dot = <span> </span>
        return (
            <div id="questions" style={{height:'100%'}}>
                <p style={{marginBottom:'10px',textAlign:'right'}}>
                    <Button icon="plus" onClick={this.handleOnModal}>新增</Button>
                </p>
                <Route>
                    <div style={{height:'calc(100% - 42px)',overflow:'auto'}}>
                       <Skeleton
                        loading={this.state.loading}
                        active
                       >
                        <List
                                header={<font color="#f399c6" style={{fontSize:'18px',fontWeight:'600'}}>题集</font>}
                                footer={null}
                                bordered
                                dataSource={this.state.questionList}
                                renderItem={item=>(<List.Item><Link to={"/questionDetail/"+item._id}>{item.title}</Link></List.Item>)}
                                size="small"
                            />
                       </Skeleton>
                    </div>
                </Route>
                <Modal
                    title="新增"
                    visible={this.state.visible}
                    onCancel ={this.handleCancleModal}
                    footer={null}
                    width={800}
                    style={{top:20}}
                   >
                       <Spin spinning={this.state.loading}>
                        <Input type="text" addonBefore="title" placeholder="please input you Title" onChange={this.handleChangeInput} value={this.state.title}></Input>
                            <BraftEditor
                                value={this.state.editorState}
                                onChange={this.handleEditorChange}
                                onSave={this.handleEditorSave}
                            />
                       </Spin>
                   </Modal>
            </div>
        )
    }
}