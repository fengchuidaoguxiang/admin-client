import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';

// import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/lef-nav';
import Header from '../../components/header';

import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';

const { Footer, Sider, Content } = Layout;


class Admin extends Component {
    render() {

        // 读取保存的user，如果不存在，直接跳转到登陆界面
        // const user = JSON.parse(localStorage.getItem('user_key') || '{}');
        // const user = storageUtils.getUser();
        // const user = memoryUtils.user;
        const user = this.props.user;
        if(!user._id){
            // this.props.history.replace('/login'); //此句一般用于事件回调函数中进行路由跳转
            return <Redirect to="/login"/> // 自动跳转到指定的路由路径
        }

        return (
            // <div>
            //     hello, {user.username}
            // </div>

             <Layout style={{minHeight: '100%'}}>
             <Sider>
                 <LeftNav />
             </Sider>
             <Layout>
               <Header />
               <Content style={{background: 'white', margin: '20px' }}>
                    <Switch>
                        <Route path="/home" component={Home}/>
                        <Route path='/category' component={Category}/>
                        <Route path='/product' component={Product}/>
                        <Route path='/role' component={Role}/>
                        <Route path='/user' component={User}/>
                        <Route path='/charts/bar' component={Bar}/>
                        <Route path='/charts/line' component={Line}/>
                        <Route path='/charts/pie' component={Pie}/>
                        <Redirect to="/home"/>
                    </Switch>
                </Content>
               <Footer style={{textAlign: 'center', color: 'rgba(0, 0, 0, 0.5)'}}>
                   推荐使用谷歌浏览器，获得更佳体验
               </Footer>
             </Layout>
           </Layout>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {}
)(Admin)
