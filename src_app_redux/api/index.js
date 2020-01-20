/*
基本要求：能根据接口文档 定义 接口请求函数
包含应用中所有接口请求函数的模块：接口请求函数
每个函数的返回值都是promise对象
*/
import ajax from './ajax';
import jsonp from 'jsonp'; // axios不能发jsonp请求
import {message} from 'antd';

// const BASE = 'http://localhost:5000';
const BASE = '';


// 请求登录
export const reqLogin = (username, password) => ajax.post( BASE + '/login',{username, password});

//等价于上面的reqLogin方法
// 请求登录
// export const reqLogin = (username, password) => (
//     ajax({
//         method: 'post',
//         url: BASE + '/login',
//         data: { // data是对象，默认使用json格式的请求体携带参数数据
//             username,
//             password
//         }
//         // data: qs.stringify({username, password})
//     })
// )

//等价于上面的reqLogin方法
// 请求登录
// export function reqLogin(username, password) {
//     return ajax({
//         method: 'post',
//         url: BASE + '/login',
//         data: { // data是对象，默认使用json格式的请求体携带参数数据
//             username,
//             password
//         }
//         // data: qs.stringify({username, password})
//     });
// }

//将实参数据赋值给形参变量(老版)
// export function reqLogin(username, password) {
//     return ajax('login',{username, password}, 'POST');
// }


// const name = 'admin';
// const pwd = 'admin';
// reqLogin(name, pwd).then(result => { // response.data的值
//     //const result = response.data;
//     console.log('请求成功了', result);
// })

// 添加用户(老版)
// export const reqAddUser = (user) => ajax('/manager/user/add',user, 'POST');



// 发送jsonp请求得到天气信息
export const reqWeather = (city) => {
    // 执行器函数：内部去执行异步任务，成功了调用resolve(),失败了调用reject()
    // 此处我们实现成不调用reject()，直接提示错误
    return new Promise((resolve, reject) => { 
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        jsonp(url, {}, ( error, data ) => {
            if(!error && data.error === 0){ // 成功
                const {dayPictureUrl,weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather} );
            }else{ // 失败
                message.error('获取天气信息失败');
            }
        }); 
    });

}

// const persons/personList/personArr = [{},{}]


// 获取一级/二级分类列表
export const reqCategorys = (parentId) => ajax.get(BASE + '/manage/category/list', {
    params: {
        parentId
    }
});

//export const reqCategorys = () => ajax.get(BASE + '/manage/category/list');
// export const reqCategorys = () => ajax({
//     // method: 'GET',
//     url: BASE + '/manage/category/list' 
// });

// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax.post(BASE + '/manage/category/add', {categoryName, parentId});

// export const reqAddCategory = (categoryName) => ajax.post( BASE + '/manage/category/add' ,{categoryName});

// 修改分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax.post(BASE + '/manage/category/update', {categoryId, categoryName});

// export const reqUpdateCategory = ({categoryId, categoryName}) => ajax.post( BASE + '/manage/category/update' ,{
//     categoryId,
//     categoryName
// });

// 根据分类id获取分类
export const reqCategory = (categoryId) => ajax.get(BASE + '/manage/category/info', {
    params: {
        categoryId
    }
})

// 获取商品分页列表
export const reqProducts = ( pageNum, pageSize ) => ajax( BASE + '/manage/product/list', {
    params: { // 包含所以query参数的对象
        pageNum,
        pageSize
    }});

// 根据Name/desc搜索商品分页列表
export const reqSearchProducts = ({
    pageNum, 
    pageSize,
    searchName,
    searchType // 它的值是'productName' 或者 'productDesc'
}) => ajax( BASE + '/manage/product/search', {
    // method: 'GET',
    params: {
        pageNum,
        pageSize,
        [searchType]: searchName,
        // productName: searchName,
        // productDesc: searchName,
    }
} )

// 删除指定名称的图片
export const reqDeleteImg = (name) => ajax.post(BASE + '/manage/img/delete', {name});

// 添加或修改商品
export const reqAddOrUpdateProduct = (product) => ajax.post(BASE + '/manage/product/' + (product._id ? 'update' : 'add'), product);

// 修改商品
// export const reqUpdateProduct = (product) => ajax.post(BASE + '/manage/product/update', product);

// 获取所有角色的列表
export const reqRoles = () => ajax.get(BASE + "/manage/role/list");

// 添加角色
export const reqAddRole = (roleName) => ajax.post(BASE + "/manage/role/add", {roleName});

// 修改角色
export const reqUpdateRole = (role) => ajax.post(BASE + "/manage/role/update", role);

// 获取所有用户的列表
export const reqUsers = () => ajax( BASE + '/manage/user/list' );

// 删除指定用户
export const reqDeleteUser = (userId) => ajax.post( BASE + '/manage/user/delete', {userId});

// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax.post( BASE + '/manage/role/' + (user._id ? 'update' : 'add'), user)

//对商品进行上架/下架处理
//方式一：以函数方式下发POST请求
export const reqUpdateStatus = ( productId, status ) => ajax(BASE + '/manage/product/updateStatus', {
    method: 'POST',
    data: {
        productId,
        status
    }
});
//方式二：以对象方式下发POST请求
/* ajax.post(BASE + '/manage/product/updateStatus', {
    productId,
    status
}); */

