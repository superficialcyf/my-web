import React,{Component} from 'react'
import {Get,Post} from '../component/commonFetchJs'
import {message,Skeleton} from 'antd'

export default class Detail extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading:true,
            htmlContent:''
        }
    }

    componentDidMount(){
        Get(
            'getNote',
            {_id:this.props.match.params.id},
            (data)=>{
               this.setState({
                   htmlContent:data[0].data[0].html,
                   loading:false
               })
            },
            (data)=>{
                message.error(data[0].msg)
            }
        )
    }

    render(){
        return (
            <div id="details" style={{height:'100%',overflow:'auto'}}>
            <Skeleton active loading={this.state.loading}>
                 <div dangerouslySetInnerHTML = {{__html:this.state.htmlContent}} ></div>
            </Skeleton>
            </div>
        )
    }
}