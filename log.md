# 1、创建项目
vue create music-app

# 2、移动端项目
rem布局

# 3、字体图标引入
阿里图标库中搜索下载即可
svg格式：支持多色，用width设置大小
font-class格式：单色，性能兼容性比较好，用font-size设置大小

# 4、页面搭建
## 4.1 首页
轮播图：swiper插件
- 新版本7：（只能在vite中的vue3中使用）
```
npm i swiper  (新版本7)  
```

- 旧版本安装：(无法使用vue3)
```
npm install swiper vue-awesome-swiper --save   
# or
yarn add swiper vue-awesome-swiper
# Swiper5 is recommended
yarn add swiper@5.x vue-awesome-swiper
```
注意swiper7只能在vite中直接引入使用，因为它是基于esm模块编写的，webpack默认是cjs规范，不支持esm，除非你在webapck中引入babel 让node_modules 中支持 esm编译。
想在webpack的vue3中编译通过， 你得安装swiper6版本 这个是支持 cjs导入的，这个在引入就不会再报找不到的问题了、

只能普通创建方式，并且安装swiper@5版本,6版本使用有问题（下一张等按钮无效）



# vue3开发注意点
    - reactive定义的对象，不能直接重新赋值，重新赋值会导致失去响应式
# 后端服务地址
线上：https://neteasecloudmusicapi.vercel.app/#/?id=neteasecloudmusicapi
本地启动后端服务： http://localhost:3000

# 部署到码云静态服务器
只提交部署dist目录内容
