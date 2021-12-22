import { createStore } from 'vuex';
import {getLyric} from '@/api/index.js'
import { phoneLogin } from '../api';

export default createStore({
  state: {
    // playlist: [{
    //   id: 82248215,
    //   name: "阳阳的弹唱第九弹",
    //   alt: {
    //     id: 82248215,
    //     name: "阳阳的弹唱第九弹",
    //     pic: 109951164421439440,
    //     picUrl: "http://p4.music.126.net/kEdjLwdXnTwI30PWcxihkQ==/109951164421439442.jpg",
    //     pic_str: "109951164421439442",
    //   }
    // }],
    playlist: [],
    playCurrentIndex: 0,
    lyric: '',
    currentTime: 0,
    timerId: null,
    user: {
      isLogin: false
    }
  },
  // store的计算属性
  getters: {
    lyricList: function (state) {
      let arr = state.lyric.split(/\n/igs).map(item => {
        let min = parseInt(item.slice(1, 3));
        let sec = parseInt(item.slice(4, 6));
        let mill = parseInt(item.slice(7, 10));
        let lyric = item.slice(12, item.length);
        return {
          min, sec, mill, lyric, item,
          time: mill + sec*1000 + min*60*1000
        }
      });

      arr.forEach((item, i) => {
        if (i == 0) {
          item.preTime = 0;
        } else {
          item.preTime = arr[i-1].time
        }
        if (i === arr.length - 1) {
          item.nextTime = 10 * 1000;  // 十分钟
        } else {
          item.nextTime = arr[i+1].time
        }
      })
      // console.log('lyricList', arr)
      return arr;
    }
  },
  mutations: {
    setPlaylist(state, data) {
      state.playlist = data;
      console.log('playlist:', data)
    },
    pushPlaylist(state, data) {
      state.playlist.push(data);
    },
    setPlayIndex(state, data) {
      state.playCurrentIndex = data;
    },
    setLyric(state, data) {
      state.lyric = data || '';
    },
    setCurrentTime(state, value) {
      state.currentTime = value;
    },
    reset(state, data) {
      state.playlist = [];
      state.playCurrentIndex = 0;
      state.lyric = '';
      state.currentTime = 0;
    },
    setTimerId(state, data) {
      state.timerId = data;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  // 异步操作
  actions: {
    async reqLyric({ commit }, payload) {
      let res = await getLyric(payload.id);
      // let res = await getLyric('33894312');
      res.data.lrc && commit('setLyric', res.data.lrc.lyric)
    },
    async phoneLogin({ commit }, payload) {
      const { phone, password} = payload;
      let res = await phoneLogin(phone, password);
      if (res.data.code == '200') {
        commit('setUser', {isLogin: true})
      }
      return res;
    }
  },
  modules: {
  }
})
