import React, {Component} from 'react';
//import PropTypes from 'prop-types';
//import {increment, decrement} from './redux/actions';
import {connect} from '../lib/react-redux';

import Counter from '../components/Counter';
import {increment, decrement, incrementAsync} from '../redux/actions';

/**
 * 容器组件：通过connect包装UI组件产生的组件
 * connect(): 高阶函数
 * connect()返回的函数是一个高阶组件：接收一个UI组件，生成一个容器组件
 * 容器组件的责任：向UI组件传入特定的属性
 */

 /**
  * 用来将redux管理的state数据映射成UI组件的一般属性的函数
  */
//  function mapStateToProps(state){
//     return {
//         count: state
//     }
//  }

  /**
  * 用来将包含dispatch代码的函数映射成UI组件的函数属性的函数
  */
//  function mapDispatchToProps(dispatch){
//     return {
//         increment: (number) => dispatch(increment(number)),
//         decrement: (number) => dispatch(decrement(number)),
//     }
//  }

// 指定向Counter传入哪些一般属性（属性值的来源就是store中的state）
const mapStateToProps = (state) => ({count: state.count});
// 指定向Counter传入哪些函数属性
// 如果是函数，会自动调用得到对象，将对象中的方法作为函数属性传入UI组件
// const mapDispatchToProps = (dispatch) => ({
//     increment: (number) => dispatch(increment(number)),
//     decrement: (number) => dispatch(decrement(number)),
// })
//如果是对象，将对象中的方法包装成一个新函数，并传入UI
const mapDispatchToProps = {increment, decrement}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)

// export default connect(
//     state => ({count: state.count}),
//     {increment, decrement, incrementAsync},
// )(Counter)

// export default connect(
//     // mapStateToProps, // 指定一般属性
//     // mapDispatchToProps // 指定函数属性
//     state => ({count: state}),
//  )(Counter)

// export default class App extends Component{

//     static propTypes = {
//         //store: PropTypes.object.isRequired
//         count: PropTypes.number.isRequired,
//         increment: PropTypes.func.isRequired,
//         decrement: PropTypes.func.isRequired,
//     }

//     // state = {
//     //     count: 0
//     // }

//     constructor( props ){
//         super(props);

//         this.numberRef = React.createRef();
//     }

//     increment = () => {
//         const number = this.numberRef.current.value * 1;
//         // this.setState( state => ({ count: state.count + number }));
//         // this.props.store.dispatch(increment(number));
//         this.props.increment(number);
//     }

//     decrement = () => {
//         const number = this.numberRef.current.value * 1;
//         // this.setState( state => ({ count: state.count - number }));
//         // this.props.store.dispatch(decrement(number));
//         this.props.decrement(number); 
//     }

//     incrementIfOdd = () => {
//         const number = this.numberRef.current.value * 1;
//         // if(this.state.count % 2 === 1){
//         //     this.setState( state => ({ count: state.count + number }));
//         // }
//         // if(this.props.store.getState() % 2 === 1){
//         //     this.props.store.dispatch(increment(number));   
//         // }
//         if(this.props.count % 2 === 1){
//             this.props.increment(number);   
//         }
//     }

//     incrementAsync = () => {
//         const number = this.numberRef.current.value * 1;
//         // setTimeout( () => {
//         //     this.setState( state => ({ count: state.count + number }));
//         // }, 1000 );
//         setTimeout( () => {
//             // this.props.store.dispatch(increment(number)); 
//             this.props.increment(number);
//         }, 1000 );
//     }

//     render(){
//         //const count = this.state.count;
//         //const count = this.props.store.getState();
//         const count = this.props.count;

//         return (
//             <div>
//                 <p>click {count} times</p>

//                 <div>
//                     <select ref={this.numberRef}>
//                         <option value="1">1</option>
//                         <option value="2">2</option>
//                         <option value="3">3</option>
//                     </select> &nbsp;&nbsp;
//                     <button onClick={this.increment}>+</button> &nbsp;&nbsp;
//                     <button onClick={this.decrement}>-</button> &nbsp;&nbsp;
//                     <button onClick={this.incrementIfOdd}>increment if odd</button> &nbsp;&nbsp;
//                     <button onClick={this.incrementAsync}>increment async</button> &nbsp;&nbsp;
//                 </div>
//             </div>
//         )
//     }
// }