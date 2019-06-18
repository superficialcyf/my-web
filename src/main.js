import React,{Component} from 'react'
import './css/main.css'
import {Link,BrowserRouter as Router, Route,Redirect} from 'react-router-dom'
import {Row,Col,Layout} from 'antd'
import {SetCookie,GetCookie} from './component/cookie'
import {connect} from 'react-redux'

import Resume from './pages/resume'
import Note from './pages/note'
import Questions from './pages/questions'
import Login from './pages/login'
import Register from './pages/register'
import Edit from './pages/edit'
import Detail from './pages/detail'
import Message from './pages/message'
import QuestionDetail from './pages/questionDetail'

const {Header, Content} = Layout;
class Main extends Component{
    constructor(props){
        super(props)
        this.state = {
            loginVisible:false,
            registerVisible:false,
            navList:[
                {name:'简历',path:'/resume'},
                {name:'小记',path:'/note'},
                {name:'题集',path:'/question'},
                {name:'留言',path:'/message'}
            ],
            avtiveIndex:0,
            isLogin:false
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleChangeLogin = this.handleChangeLogin.bind(this)
        this.handleChangeRegister = this.handleChangeRegister.bind(this)
        this.handleCancle = this.handleCancle.bind(this)
        this.eventClickNav = this.eventClickNav.bind(this)
    }

    componentDidMount(){
        const userid = GetCookie('userid');
        const userName = GetCookie('userName');
        if(userid){
            this.setState({
                isLogin:true
              })
              this.props.dispatch({
                type:'login',
                userName:userName,
                userid:userid
              })
        }
        const route = window.location.pathname;
        switch(route){
            case '/':this.setState({avtiveIndex:0});break;
            case '/resume':this.setState({avtiveIndex:0});break;
            case '/note':this.setState({avtiveIndex:1});break;
            case '/question':this.setState({avtiveIndex:2});break;
            case '/message':this.setState({avtiveIndex:3});break;
        }
    }

    eventClickNav = (num)=>{
        this.setState({
            avtiveIndex:num
        })
    }
    handleLogin(){
        this.setState({
            loginVisible:true
        })
    }//登录框弹出
    handleRegister(){
        this.setState({
            registerVisible:true
        })
    }//注册框弹出
    handleChangeLogin(value){
        this.setState({
            loginVisible:value.loginVisible,
            isLogin:value.isLogin
        })
    }//父子传值取消登录框
    handleChangeRegister(value){
        this.setState({
            registerVisible:value.registerVisible,
            isLogin:value.isLogin
        })
    }//父子传值取消注册框
    handleCancle(){
        this.setState({
            isLogin:false
        })
        this.props.dispatch({
            type:'unlogin',
            userName:'',
            userid:''
          })
        SetCookie('userid','')
        SetCookie('userName','')
    }//退出登录，通过dispatch改变redux中的登录状态

    render(){
        return (
            <div id="main">
                <Layout>
                    <Header>
                        <Row>
                            <Col span={6} offset={18} style={{textAlign:'right'}}>
                                {this.state.isLogin?
                                    <div>
                                        <span>欢迎: {this.props.state.userName}</span>
                                        <span className="header-cz" onClick={this.handleCancle} >退出</span>
                                    </div>:
                                    <div>
                                        <span className="header-cz" onClick={this.handleLogin}>登录</span>
                                        <span className="header-cz" onClick={this.handleRegister} >注册</span>  
                                    </div>
                                }
                            </Col>
                        </Row>
                    </Header>
                    <Content>
                        <Router>
                            <p className="link-item">
                                {this.state.navList.map((item,index,arr)=>
                                        <span className={`${this.state.avtiveIndex===index?"actived":""} ${"header-cz"}`} key={index}>
                                            <Link to={item.path} onClick={()=>this.eventClickNav(index)}>{item.name}</Link>
                                        </span>
                                )}
                            </p>
                            <section className="route-change">
                                {/* <Redirect path="/" to={{pathname: '/resume'}} /> */}
                                <Route path="/" component={Resume} exact></Route>
                                <Route path="/resume" component={Resume}/>
                                <Route path="/note" component={Note}/>
                                <Route path="/question" component={Questions}/>
                                <Route path="/edit" component={Edit}></Route>
                                <Route path="/detail/:id" component={Detail}></Route>
                                <Route path="/message" component={Message}></Route>
                                <Route path="/questionDetail/:id" component={QuestionDetail}></Route>
                            </section>
                        </Router>
                    </Content>
                </Layout>
                <Login visible={this.state.loginVisible} change={this.handleChangeLogin}></Login>
                <Register visible={this.state.registerVisible} change={this.handleChangeRegister}></Register>
            </div>
        )
    }
}

export default connect((state)=>{
    return {
        state:state
    }
})(Main)