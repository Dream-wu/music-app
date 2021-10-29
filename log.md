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
- 新版本7：
```
npm i swiper  (新版本7)  
// 有报错：npm ERR! Cannot read property 'match' of undefined
```

- 旧版本安装：
```
npm install swiper vue-awesome-swiper --save
# or
yarn add swiper vue-awesome-swiper
# Swiper5 is recommended
yarn add swiper@5.x vue-awesome-swiper
```
