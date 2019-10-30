## 笔记
  1).git操作
  2).搭建项目

## async/await的理解和使用
  1).理解
      简化promise对象的使用：不再使用then()来指定回调函数
      以同步编码方式实现异步流程
  2).使用
     哪里使用await? 在返回promise对象的表达式左侧：左侧得到的不再是promise，而是promise的成功的值  
     哪里使用async? await所在最近函数定义的左侧
