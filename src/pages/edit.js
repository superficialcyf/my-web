import React,{Component} from 'react'
import BraftEditor from 'braft-editor'
import {Modal,Form,message} from 'antd'
import FormComponent from '../component/form'
import {Get,Post} from '../component/commonFetchJs'
import 'braft-editor/dist/index.css'
import '../css/edit.css'

export default class Edit extends Component{
    constructor(props){
        super(props)
        this.state = {
            editorState:null,
            visible:false,
            editorHtml:''
        }
        this.handleEditorChange = this.handleEditorChange.bind(this)
        this.handleEditorSave = this.handleEditorSave.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleEditorChange = (editorState)=>{
       this.setState({editorState})
    }
    handleEditorSave = async ()=>{
        const htmlContent = this.state.editorState.toHTML()
        this.setState({
            visible:true,
            editorHtml:htmlContent
        })
    }
    handleSubmit(value){
       let requireValue = {
           title:value.title,
           html:this.state.editorHtml,
           time:this.getNowDate()
       }
        Post(
            'addNote',
            requireValue,
            (data)=>{
                message.success(data[0].msg);
                this.setState({
                    visible:false
                })
            },
            (data)=>{
                console.log(data)
            }
        )
    }
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    getNowDate(){
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
        const EditForm = Form.create({name:'edti_form'})(FormComponent)
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 3 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 21 },
            },
          };
        const formFileds = [
            {
                label:"标题",//标签提示
                filedName:"title",//字段名
                ruleType:"",//校验规则
                ruleTypeTips:"",//校验规则提示
                isRequired:true,//是否必填
                requireTips:"please input your title!",//必填提示
                prefixType:"heart",//输入框图标
                placeholder:"title",//输入框提示
                inputType:'text'//输入框类型
            }
        ]
        return (
            <div id="edit">
                <BraftEditor
                    onChange={this.handleEditorChange}
                    onSave={this.handleEditorSave}
                />
                <div className="btn-group">
                    依照你的习惯Ctrl+S。
                </div>
                <Modal
                     title="保存"
                     visible={this.state.visible}
                     onCancel={this.handleCancel}
                     footer={null}
                >
                    <EditForm submit={this.handleSubmit} layout={formItemLayout} className = "EditForm" itemArry={formFileds} submitText="提交"></EditForm>
                </Modal>
            </div>
        )
    }
}