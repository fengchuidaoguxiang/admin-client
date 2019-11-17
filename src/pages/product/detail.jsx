import React, { Component } from 'react';
import {
    Card,
    Icon,
    List
} from 'antd';
import LinkButton from '../../components/link-button';


const Item = List.Item;

/**
 * Product的详情子路由组件
 */
export default class ProductDetail extends Component{

    render(){
        const title = (
            <span> 
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type="arrow-left"/>
                </LinkButton>
                <span>商品详情</span>
            </span>
        );
        return (
            <Card title={title} className="detail">
                <List>
                    <Item>
                        <span className="detail-left">商品名称:</span>
                        <span>aaaa</span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品描述:</span>
                        <span>bbbbb</span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品价格:</span>
                        <span>11</span>
                    </Item>
                    <Item>
                        <span className="detail-left">所属分类:</span>
                        <span>ccc</span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品图片:</span>
                        <span>
                            <img className="detail-img" src="http://localhost:5000/upload/image-1563347343433.jpg" alt=""/>
                            <img className="detail-img" src="http://localhost:5000/upload/image-1563347343433.jpg" alt=""/>
                        </span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品详情:</span>
                        <div dangerouslySetInnerHTML={{__html: '<a href="http://www.atguigu.com">尚硅谷</a>'}}></div>
                    </Item>
                </List>
            </Card>
        )
    }
}