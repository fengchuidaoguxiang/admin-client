## 笔记
  1).git操作
  2).搭建项目

## async/await的理解和使用
  1).作用？
      简化promise对象的使用：不用再使用then()来指定回调函数
      以同步编码（没有回调函数了）方式实现异步流程
  2).哪里使用await? 
      在返回promise对象的表达式左侧写await：左侧得到的不再是promise，而是promise异步执行成功的value数据
  3).哪里使用async? 
      await所在最近函数定义的左侧写async
