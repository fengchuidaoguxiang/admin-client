import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import {connect} from 'react-redux';
 
import menuList from '../../config/menuConfig';
//引入index.less文件目的：为了打包这个less文件，不引入无法打包。
import './index.less';
import logo from '../../asserts/images/logo.png';
// import memoryUtils from '../../utils/memoryUtils';
import { setHeadTitle } from '../../redux/actions';

const { SubMenu } = Menu;

/**
 左侧导航组件
 */
class LeftNav extends Component {

    /**
     * 判断当前登录用户对item是否有权限
     */
    hasAuth = (item) =>{
        const {key,isPublic} = item;
        // console.log("memoryUtils.user:",memoryUtils.user);
        // console.log("memoryUtils.user.role:",memoryUtils.user.role);
        //TODO 此处从mongodb获取不到menus,需要定位
        //const menus = memoryUtils.user.role.menus;

        // const menus = this.props.user.role.menus;
        const menus = [
            "/role", 
            "/charts/bar", 
            "/home", 
            "/category"
        ];
        // const username = memoryUtils.user.username;
        const username = this.props.user.username;

        // 1.如果当前用户是admin，返回true
        // 2.如果当前item是公开的，返回true
        // 3.当前用户有此item的权限：确认key有没有在menus中
        if(username === 'admin' || isPublic || menus.indexOf(key)!==-1){
            return true;
        } else if(item.children){ // 4.如果当前用户有此item的某个子item的权限
            return !!item.children.find(child => menus.indexOf(child.key)!==-1 );
        }
        return false;
    }

    /*
    根据指定menu数据数组生成<Menu.Item>和<SubMenu>的数组
    技巧：reduce + 函数递归
    */
    getMenuNodes2 = (menuList) => {
        // const array1 = [1,2,3,4];
        // array1.reduce();
        // let total = 0;
        // const total = array1.reduce((preTotal, item)=> { //此函数是遍历的回调函数：统计，必须返回当次统计的结果

        //     return preTotal + (item%2===1 ? item : 0);
        // }, 0);

        //请求的路径
        const path = this.props.location.pathname;

        return menuList.reduce((pre, item) => {

            // 如果当前用户有item对应的权限，才需要显示对应的菜单项
            if(this.hasAuth(item)){
                // 可能向pre添加<Menu.Item>
                if(!item.children){
                    // 判断item是否是当前对应的item    
                    if(item.key===path || path.indexOf(item.key)===0){
                        // 更新redux中的headTitle状态
                        this.props.setHeadTitle(item.title)
                    }

                    pre.push(
                        <Menu.Item key={item.key}>
                            <NavLink to={item.key} onClick={ () => this.props.setHeadTitle(item.title) }>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </NavLink>
                        </Menu.Item>  
                    );
                }
                // 可能向pre添加<SubMenu>
                else {

                /*
                    判断当前item的key是否是我需要的openKey
                    查找item中的所有children中cItem的key，看是否存在一个与请求的path匹配
                    */
                const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0);
                if(cItem){
                    this.openKey = item.key;
                }

                pre.push(
                        <SubMenu 
                            key={item.key}
                            title={
                                <span>
                                    <Icon type={item.icon} />
                                    <span>{item.title}</span>
                                </span>
                            }
                        >
                            {
                                this.getMenuNodes2(item.children)
                            }
                    </SubMenu>
                ) 
                }
            }
        
            return pre;
        }, []);
    }

    /*
    根据指定menu数据数组生成<Menu.Item>和<SubMenu>的数组
    技巧：map + 函数递归
    */
    getMenuNodes = (menuList) => {
        return menuList.map( item => {
            if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <NavLink to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </NavLink>
                    </Menu.Item>
                );
            }
            return ( // 有下一级的菜单项
                <SubMenu 
                    key={item.key}
                    title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                    }
                >
                    {
                        this.getMenuNodes(item.children)
                    }
                </SubMenu>)
        } );
    }

    /*
     第一次render()之后执行一次
     执行异步任务：比如 发ajax请求、启动定时器
     */
    componentDidMount(){
        this.a1 = 12;
    }

    /*
     第一次render()之前执行一次
     为第一次render()做一些同步的准备工作
     */
    componentWillMount(){
        this.menuNodes = this.getMenuNodes2(menuList);
    }

    render() {
        console.log('left-nav render()');
        const menuNodes = this.getMenuNodes2(menuList);

        // 得到当前请求的路由路径
        let selectKey = this.props.location.pathname;
        console.log('selectKey', selectKey); 
        if(selectKey.indexOf('/product')===0){ // 当前请求的是商品或其子路由界面
            selectKey = '/product';
        }
        console.log('openKey', this.openKey);
        return (
            <div className="left-nav">
                <NavLink className="left-nav-link" to="/home">
                    <img src={logo} alt="logo"/>
                    <h1>硅谷后台</h1>
                </NavLink>

                {/* 
                    defaultSelectKeys: 指定默认值后，通过编码更新为其它值，没有更新的效果，总是根据第一次指定的key进行显示 
                    selectedKeys：总是根据最新指定的key进行显示 
                */}
                <Menu
                    selectedKeys={[selectKey]}
                    defaultOpenKeys ={[this.openKey]}
                    mode="inline"
                    theme="dark"
                >
                    { this.menuNodes }

                    {/* <Menu.Item key="/home">
                        <NavLink to="/home">
                            <Icon type="home" />
                            <span>首页</span>
                        </NavLink>
                    </Menu.Item>
                    <SubMenu
                        key="products"
                        title={
                        <span>
                            <Icon type="mail" />
                            <span>商品</span>
                        </span>
                        }
                    >
                         <Menu.Item key="/category">
                            <NavLink to="/category">
                                <Icon type="folder-open" />
                                <span>品类管理</span>
                            </NavLink>
                         </Menu.Item>
                         <Menu.Item key="/product">
                            <NavLink to="/product">
                                <Icon type="filter" />
                                <span>商品管理</span>
                            </NavLink>
                         </Menu.Item>
                    </SubMenu> */}

                </Menu>
            </div>
        )
    }
}

/* 
  向外暴露 使用高阶组件withRouter()来包装非路由组件
  新组件向LeftNav传递3个特别属性：history/location/match
  结果：LeftNav可以操作路由相关语法了
*/
export default connect(
    state => ({ user: state.user }),
    {setHeadTitle}
)(withRouter(LeftNav));

/*
  2个问题：
   (1)默认选中对应的menuItem
   (2)有可能需要默认打开某个SubMenu: 访问的是某个二级菜单项对应的路径(path)
 */