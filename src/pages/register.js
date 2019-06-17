import React,{Component} from 'react'
import {Modal,Form, message} from 'antd'
import FormComponent from '../component/form'
import {connect} from 'react-redux'
import {Get,Post} from '../component/commonFetchJs'
import {SetCookie,GetCookie} from '../component/cookie'

class Register extends Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleCancel = e=>{
      this.props.change({
        registerVisible:false,
        isLogin:false
      })
    }//通过父子传值取消注册框
    handleSubmit = (values)=>{
      const name = values.name;
      const password = values.password;
      if(name==='作者'){
        message.error('干哈，想造反呐！重来！')
      }else{
        Get(
          'register',
         values,
           (data)=>{
             if(data[0].code==='1'){
               message.error(data[0].msg);
             }else{
               message.success(data[0].msg);
               this.props.change({
                  registerVisible:false,
                  isLogin:true
              })
              this.props.dispatch({
                type:'login',
                userName:data[0].data[0].userName,
                userid:data[0].data[0]._id
              })
              SetCookie('userName',data[0].data[0].userName);
              SetCookie('userid',data[0].data[0]._id);
             }
           },
           (data)=>{
             console.log(data)
           }
        )
      }
    }//登录，通过dispatch改变redux中的登录状态

    render(){
        const LoginForm = Form.create({name:'login_form'})(FormComponent)
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 5 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 19 },
            },
          };
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
          };
          const formFileds = [
              {
                label:"userName",//标签提示
                filedName:"name",//字段名
                ruleType:"",//校验规则
                ruleTypeTips:"",//校验规则提示
                isRequired:true,//是否必填
                requireTips:"please input your userName!",//必填提示
                prefixType:"user",//输入框图标
                placeholder:"userName",//输入框提示
                inputType:'text'//输入框类型
              },
              {
                label:"password",
                filedName:"password",
                ruleType:"",
                ruleTypeTips:"",
                isRequired:true,
                requireTips:"please input your password!",
                prefixType:"lock",
                placeholder:"password",
                inputType:'password'
              },
        ]
        return (
            <div id="login">
                <Modal
                    title="注册"
                    visible={this.props.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <LoginForm submit={this.handleSubmit} layout={formItemLayout} className = "loginForm" itemArry={formFileds} submitText="注册"></LoginForm>
                </Modal>
            </div>
        )
    }
}

export default connect((state)=>{
  return {
    state:state
  }
})(Register)