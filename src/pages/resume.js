import React,{Component} from 'react'
import '../css/resume.css'
import {Descriptions,Divider,List} from 'antd'

const DescriptionsItem = Descriptions.Item;
export default class Resume extends Component{
    constructor(props){
        super(props)
    
    }

    render(){
        const data = [
            '熟悉vue，react框架',
            '熟悉layui，antd等UI库',
            '了解node、微信小程序',
            '喜欢学习、百折不挠、能独立解决问题'
        ]
        return (
            <div id="resume">
               <section>
                    <article>
                        <p className="tips">
                            <span className="tips-left"></span>
                            <span className="tips-message">联系方式</span>
                        </p>
                        <Descriptions
                            size="small"
                            bordered
                        >
                            <DescriptionsItem label="WeiChat">cyf937504878</DescriptionsItem>
                            <DescriptionsItem label="Phone">17373607828</DescriptionsItem>
                            <DescriptionsItem label="QQ">937504878</DescriptionsItem>
                            <DescriptionsItem label="Email">m17373607828@163.com</DescriptionsItem>
                        </Descriptions>
                    </article>
                    <article>
                        <p className="tips">
                            <span className="tips-left"></span>
                            <span className="tips-message">基本信息</span>
                        </p>
                        <Descriptions
                            size="small"
                            bordered
                        >
                            <DescriptionsItem label="Name">cyf</DescriptionsItem>
                            <DescriptionsItem label="Sex">男</DescriptionsItem>
                            <DescriptionsItem label="Birthday">1996.10.01</DescriptionsItem>
                            <DescriptionsItem label="Educational">北方民族大学<Divider type="vertical" />计算机<Divider type="vertical" />本科</DescriptionsItem>
                            <DescriptionsItem label="Job">前端开发<Divider type="vertical" />2年</DescriptionsItem>
                            <DescriptionsItem label="GitHub"><a href="https://github.com/superficialcyf" target="_blank">https://github.com/superficialcyf</a></DescriptionsItem>
                        </Descriptions>
                    </article>
                    <article>
                        <p className="tips">
                            <span className="tips-left"></span>
                            <span className="tips-message">技术掌握</span>
                        </p>
                        <List
                            size="small"
                            bordered
                            dataSource = {data}
                            renderItem = {item=><List.Item>{item}</List.Item>}
                        />
                    </article>
                    <article></article>
               </section>
            </div>
        )
    }
}