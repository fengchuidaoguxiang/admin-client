import React, { Component } from 'react';
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  message 
} from 'antd';
import throttle from 'lodash.throttle';

import LinkButton from '../../components/link-button';
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api';
import { PAGE_SIZE } from '../../utils/Constants';
import memoryUtils from '../../utils/memoryUtils';

const Option = Select.Option;
/**
 * Product的默认子路由组件
 */
export default class ProductHome extends Component {

  state = {
    loading: false, // 是否正在加载中
    products: [], // 商品的数组
    total: 0, // 商品的总数量
    searchType: 'productName', // 默认是按商品名称搜索
    searchName: '', //搜索的关键字
  }

  updateStatus = throttle(async (productId, status) => {
    // 计算更新后的值
    status = status===1 ? 2 : 1;
    // 请求更新
    const result = await reqUpdateStatus(productId, status);
    if(result.status === 0){
      message.success('更新商品状态成功！');
      // 获取当前页显示
      this.getProducts(this.pageNum);
    }
  }, 2000);

  /**
   * 初始化table的列的数组
   */
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
        render: (price) => '￥' + price // 当前指定了对应的属性，传入的是对应的属性值
      },
      {
        title: '状态',
        width: 100,
        //dataIndex: 'status',
        render: ({ _id, status }) => {
          let btnText = '下架';
          let text = '在售';
          if(status === 2){
            btnText = '上架';
            text = '已下架';
          }
          return (
            <span>
               <Button type="primary" onClick={() => {this.updateStatus(_id, status)}}>{btnText}</Button> <br/>
               <span>{text}</span>
            </span>
          )
        } 
      },
      {
        title: '操作',
        width: 100,
        render: (product) => (
          <span>
            <LinkButton 
                onClick={() => {
                    // 在内存中保存product
                    memoryUtils.product = product;
                    this.props.history.push('/product/detail', product);
                }}
            >
                详情
            </LinkButton>
            <LinkButton onClick={() => this.props.history.push('/product/addupdate', product)}>修改</LinkButton>
          </span>
        )
      }
    ]
  }

  /**
   * 异步获取指定页码商品分页（可能带搜索）列表显示
   */
  getProducts = async (pageNum) => {
    this.setState({loading: true}); // 显示loading
    // 保存当前请求的页码
    this.pageNum = pageNum;
    const { searchName, searchType } = this.state;
    let result;
    // 发请求获取数据
    if(!searchName){
       result = await reqProducts(pageNum, PAGE_SIZE);
    }else{
       result = await reqSearchProducts( { pageNum, pageSize: PAGE_SIZE,searchName, searchType })
    }
    this.setState({loading: false}); // 隐藏loading
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
    this.initColumns();  
  }

  componentDidMount(){
    // 获取第一页显示
    this.getProducts(1);
  }

  render() {
    const { loading, products, total, searchType, searchName } = this.state;

    const title = (
      <span>
        <Select 
         style={{width: 200}} 
         value={searchType}
         onChange={(value) => this.setState({searchType: value})}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input 
          style={{width: 200, margin: '0 10px'}} 
          placeholder="关键字" 
          value={searchName}
          onChange={event => this.setState({searchName: event.target.value})}
        />
        <Button type="primary" onClick={ () => this.getProducts(1) }>搜索</Button>
      </span>
    );
    const extra = (
      <Button type="primary" onClick={ () => this.props.history.push('/product/addupdate') }>
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
          pagination={{
             total: total, 
             defaultPageSize: PAGE_SIZE, 
             showQuickJumper: true, 
             onChange: this.getProducts,
             current: this.pageNum
          }} //外层花括号表示里面是js代码，里面花括号表示是一个对象
        />
      </Card>
    )
  }
}
