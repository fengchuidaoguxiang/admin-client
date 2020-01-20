import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// import memoryUtils from '../../utils/memoryUtils';
// import storageUtils from '../../utils/storageUtils';
// import {reqLogin} from '../../api';
import logo from '../../asserts/images/logo.png';
import './login.less';
import {login} from '../../redux/actions';

const Item = Form.Item; 

class Login extends Component {

    handleSubmit = e => {
        // 阻止事件的默认行为：阻止表单的提交
        e.preventDefault();

        // 取出输入的相关的数据
        // const form = this.props.form;
        // const values = form.getFieldsValue();
        // const username = form.getFieldValue('username');
        // const password = form.getFieldValue('password');
        // console.log(values, username, password);

        //对表单所有字段进行统一验证
        this.props.form.validateFields( async (err, {username, password}) => {
            //检验通过
            if (!err) {
                // try{}catch(error){}
                // alert(`发登陆的ajax请求，username=${username},password=${password}`);
                // const result = await reqLogin(username, password);
                // // 登录成功
                // if( result.status === 0 ){
                //     //将user信息保存到local
                //     const user = result.data;
                //     //此处JSON.stringify(user)作用：将user对象转换成json格式字符串
                //     //localStorage.setItem('user_key', JSON.stringify(user));
                //     //保存在local文件中
                //     storageUtils.saveUser(user);
                //     //保存在内存中
                //     memoryUtils.user = user;

                //     // 跳转到管理界面
                //     this.props.history.replace('/home');
                //     message.success('登录成功');
                // 调用分发异步action的函数 => 发登陆的异步请求，有了结果后更新状态
                // }else{// 登录失败
                //     message.error(result.msg);
                // }    
                this.props.login(username, password);
            }else{
                // alert('验证失败！');
            }
          });
      }

      async test(){

      }

      /**
       * 对密码进行自定义验证
       */
      validatePwd = (rule, value, callback) => {
          /*
             密码的的合法性要求
             1). 必须输入
             2). 必须大于等于4位
             3). 必须小于等于12位
             4). 必须是英文、数字或下划线组成
          */
         //去除空格
         value = value.trim();
         if(!value){
            callback('密码必须输入');
         }else if( value.length <4 ){
            callback('密码必须大于等于4位');
         }else if( value.length >12 ){
            callback('密码必须小于等于12位');
         }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是英文、数字或下划线组成');
         }else{
            //验证通过
            callback();
         }
                    
      }

    render() {

        // 读取保存的user，如果存在，直接跳转到管理界面
        // const user = JSON.parse(localStorage.getItem('user_key') || '{}');
        // const user = storageUtils.getUser();
        // const user = memoryUtils.user;
        const user = this.props.user;
        if(user && user._id){
            return <Redirect to="/home"/> // 自动跳转到指定的路由路径
        }

        const errorMsg = this.props.user.errorMsg;

        const { getFieldDecorator } = this.props.form;

        return (
            <div className="login">
               <div className="login-header">
                   <img src={logo} alt="logo"/>
                   <h1>后台管理系统</h1>
               </div>
               <div className="login-content">
                    {/* <div>{errorMsg}</div> */}
                    <div className={user.errorMsg ? 'error-msg show' : 'error-msg'}>{user.errorMsg}</div>
                   <h1>用户登录</h1>
                   <Form onSubmit={this.handleSubmit} className="login-form">
                    <Item>
                      {
                          /*
                            用户名的的合法性要求
                            1). 必须输入
                            2). 必须大于等于4位
                            3). 必须小于等于12位
                            4). 必须是英文、数字或下划线组成
                          */
                        getFieldDecorator('username', { // 配置对象：属性名是一些特定的名称
                            initialValue: '', // 初始值
                            rules: [//声明式验证：使用插件已定义好的规则进行验证 
                                { required: true, whitespace: true, message: '用户名是必填的' },
                                {min: 4, message: '用户名不能小于4位'},
                                {max: 12, message: '用户名不能大于12位'},
                                {pattern: /^[a-zA-Z0-9_]+$/, message: '必须是英文、数字或下划线组成'}

                            ]
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                            />
                        ) 
                      }
                    </Item>
                    <Item>                     
                       {
                         getFieldDecorator('password', { 
                            initialValue: '', // 初始值
                            rules: [
                                {validator: this.validatePwd}
                            ]
                         })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                            />
                        ) 
                      }
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登 录
                        </Button>
                   </Item>
                    </Form>
               </div>
            </div>
        )
    }
}

/*
组件：组件类，本质就是一个构造函数。
定义组件的方式：class组件、function组件。
组件对象：组件类的实例，也就是构造函数的实例。标签就是组件对象，不需要自己去new，例如<MyCom></MyCom>。

理解Form组件：包含<Form>标签的组件，叫作“Form组件”
利用Form.create()包装Form组件生成一个新的组件
新组件会向form组件传递一个强大的属性：(属性名：form；属性值：对象)

高阶函数：
    定义：接收的参数是函数或者返回值是函数
    常见的高阶函数：数组遍历相关的方法、定时器、 Promise、高阶组件
    作用：实现一个更加强大、动态的功能

高阶组件为什么是高阶函数？
答：组件本质是一个函数。

高阶组件：
    本质是一个函数
    函数接收一个组件，返回一个新组件
    Form.create()返回的就是一个高阶组件
*/
const WrapperForm = Form.create()(Login);
export default connect(
    state => ({user: state.user}),
    {login}
)(WrapperForm) // <Form(Login)/>


/*
用户名/密码的的合法性要求
  1). 必须输入
  2). 必须大于等于4位
  3). 必须小于等于12位
  4). 必须是英文、数字或下划线组成
 */

 /*
  组件：组件类，本质就是一个构造函数。
  组件对象：组件类的实例，也就是构造函数的实例。
  */

  /*
   async和await
   1.作用？

   2.哪里写await?

   3.哪里写async?
   */