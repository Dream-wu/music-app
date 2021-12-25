import axios from "axios";

let service = axios.create({
    baseURL: 'localhost:8080'  //本地联调
});

// 获取banner图
export const getBanner = function (type = 0) {
    return service.get(`/banner?type=${type}`);
}

// 推荐歌单
export const getMusicList = function (limit = 10) {
    return service.get(`/personalized?limit=${limit}`);
}

// 歌单详情
export const getPlayListDetail = function (id) {
    return service.get(`/playlist/detail?id=${id}`);
}

// 获取歌词（不需要登录）
export const getLyric = function (id) {
    return service.get(`/lyric?id=${id}`);
}

// 搜索（不需要登录）
export const searchMusic = function (keywords) {
    return service.get(`/search?keywords=${keywords}`);
}

// 登录-手机号
export const phoneLogin = function (phone, password) {
    return service.get(`/login/cellphone?phone=${phone}&password=${password}`);
}
   
// export default service;
