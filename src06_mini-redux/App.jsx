import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {increment, decrement} from './redux/actions';


export default class App extends Component{

    static propTypes = {
        store: PropTypes.object.isRequired
    }

    // state = {
    //     count: 0
    // }

    constructor( props ){
        super(props);

        this.numberRef = React.createRef();
    }

    increment = () => {
        const number = this.numberRef.current.value * 1;
        // this.setState( state => ({ count: state.count + number }));
        this.props.store.dispatch(increment(number));
    }

    decrement = () => {
        const number = this.numberRef.current.value * 1;
        // this.setState( state => ({ count: state.count - number }));
        this.props.store.dispatch(decrement(number));

    }

    incrementIfOdd = () => {
        const number = this.numberRef.current.value * 1;
        // if(this.state.count % 2 === 1){
        //     this.setState( state => ({ count: state.count + number }));
        // }
        if(this.props.store.getState().count % 2 === 1){
            this.props.store.dispatch(increment(number));   
        }
    }

    incrementAsync = () => {
        const number = this.numberRef.current.value * 1;
        // setTimeout( () => {
        //     this.setState( state => ({ count: state.count + number }));
        // }, 1000 );
        setTimeout( () => {
            this.props.store.dispatch(increment(number));   
        }, 1000 );
    }

    render(){
        //const count = this.state.count;
        const count = this.props.store.getState().count;


        return (
            <div>
                <p>click {count} times</p>

                <div>
                    <select ref={this.numberRef}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select> &nbsp;&nbsp;
                    <button onClick={this.increment}>+</button> &nbsp;&nbsp;
                    <button onClick={this.decrement}>-</button> &nbsp;&nbsp;
                    <button onClick={this.incrementIfOdd}>increment if odd</button> &nbsp;&nbsp;
                    <button onClick={this.incrementAsync}>increment async</button> &nbsp;&nbsp;
                </div>
            </div>
        )
    }
}