import React,{Component} from 'react'
import {Form,Button,Input,Icon} from 'antd'

const FormItem = Form.Item

export default class FormComponent extends Component{
    constructor(props){
        super(props)
        this.handSubmit = this.handSubmit.bind(this)
    }

    handSubmit = e=>{
        e.preventDefault();
        this.props.form.validateFields((error,values)=>{
            if(!error){
                this.props.submit(values);
            }
        })
    }

    render(){
        const {getFieldDecorator } = this.props.form
        const formLayout = this.props.layout
        const itemArry = this.props.itemArry
        return(
            <div className="Form">
                <Form onSubmit={this.handSubmit} className={this.props.className} {...formLayout}>
                    {itemArry.map((item,index,arr)=>
                        <FormItem
                            label={item.label}
                            key={index}
                        >
                        {
                            getFieldDecorator (item.filedName,{
                                rules:[
                                    {type: item.ruleType,message: item.ruleTypeTips},
                                    {required:item.isRequired,message:item.requireTips}
                                ]
                            })
                            (<Input
                                prefix={<Icon type={item.prefixType}></Icon>}
                                placeholder={item.placeholder}
                                type={item.inputType}
                            />)
                        }
                        </FormItem>
                    )}
                    <Form.Item>
                        <Button type='Default' htmlType="submit">{this.props.submitText}</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}