import React,{Component} from 'react'
import '../css/common.css'
import {Divider,message} from 'antd'
import {Link,BrowserRouter as Router, Route} from 'react-router-dom'
import {Get,Post} from '../component/commonFetchJs'
import {connect} from 'react-redux'

class Note extends Component{
    constructor(props){
        super(props)
        this.state = {
            noteList:[]
        }
    }

    componentDidMount(){
        Get(
            'getNote',
            {},
            (data)=>{
                this.setState({
                    noteList: data[0].data
                })
            },
            (data)=>{
                console.log(data)
            }
        )
    }

    render(){
        return (
            <div id="lifes">
                <Route>
                    {this.props.state.userName==='作者'?
                        <p style={{textAlign:'right',margin:'10px'}}>
                            <Link to="/edit">写点啥呗</Link>
                        </p>:''
                    }
                    {this.state.noteList.map((item,index,arr)=>
                        <article key={item._id}>
                            <Divider orientation="left" className="divider" dashed={true}>{item.time}</Divider>
                            <p><Link to={'/detail/'+item._id}>{item.title}</Link></p>
                        </article>
                    )}
                </Route>
            </div>
        )
    }
}

export default connect((state)=>{
    return {
        state:state
    }
})(Note)