import storageUtils from './storageUtils';

export default {
    user: storageUtils.getUser(), // 用来存储用户登陆信息，默认没有登陆，初始值为local中读取的user
}