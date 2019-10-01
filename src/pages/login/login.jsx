import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

import logo from './images/logo.png';
import './login.less';

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
        this.props.form.validateFields((err, {username, password}) => {
            if (!err) {
                alert(`发登陆的ajax请求，username=${username},password=${password}`);
            }else{
                // alert('验证失败！');
            }
          });
      };

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

        const { getFieldDecorator } = this.props.form;

        return (
            <div className="login">
               <div className="login-header">
                   <img src={logo} alt="logo"/>
                   <h1>后台管理系统</h1>
               </div>
               <div className="login-content">
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

export default WrapperForm // <Form(Login)/>


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
