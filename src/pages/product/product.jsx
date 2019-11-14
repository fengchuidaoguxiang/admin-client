import React, { Component } from 'react';
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table
} from 'antd';
import LinkButton from '../../components/link-button';
import { reqProducts } from '../../api';

const Option = Select.Option;
/**
 * 商品管理
 */
export default class Product extends Component {

  state = {
    loading: false,
    products: [ ], // 商品列表
    total: 0, // 商品的总数量
    searchType: 'productName', // 默认是按商品名称搜索
    searchName: '', //搜索的关键字
  }

  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '￥' + price 
      },
      {
        title: '状态',
        width: 100,
        dataIndex: 'status',
        render: (status) => {
          let btnText = '下架';
          let text = '在售';
          if(status === 2){
            btnText = '上架';
            text = '已下架';
          }
          return (
            <span>
               <button>{btnText}</button> <br/>
               <span>{text}</span>
            </span>
  
          )
        } 
      },
      {
        title: '操作',
        dataIndex: 'price',
        render: (product) => (
          <span>
            <LinkButton>详情</LinkButton>
            <LinkButton>修改</LinkButton>
          </span>
        )
      }
    ]
  }

  /**
   * 异步获取指定页码商品列表显示
   */
  getProducts = async (pageNum) => {
    // 发请求获取数据
    const result = await reqProducts(pageNum, 2);
    if( result.status===0 ){
        // 取出数据
        const {total, list} = result.data;
        // 更新状态
        this.setState({
          products: list,
          total
        });
    }
  } 


  componentWillMount(){
    this.initColumns()
  }

  componentDidMount(){
    // 获取第一页显示
    this.getProducts();
  }

  render() {
    const { loading, products, total, searchType, searchName } = this.state;

    const title = (
      <span>
        <Select style={{width: 200}} value={searchType} onChange={() => {}}>
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input style={{width: 200, margin: '0 10px'}} placeholder="关键字" value={searchName}/>
        <Button type="primary">搜索 </Button>
      </span>
    );
    const extra = (
      <Button type="primary">
        <Icon type="plus"/>
        添加商品
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered={true}//如果属性值是true,可以把等号和true省略，只写属性名。bordered
          rowKey="_id"
          loading = {loading}
          columns={this.columns} 
          dataSource={products}
          pagination={{ total: total, defaultPageSize: 2, showQuickJumper: true, onChange: this.getProducts}} //外层花括号表示里面是js代码，里面花括号表示是一个对象
        />
      </Card>
    )
  }
}
