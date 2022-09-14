import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// 封装本地存储，vuex-persistedstate(可作为项目亮点)

// vuex-persistedstate-->持久化state

// 1.下载
// - yarn add vuex-persistedstate@3.2.1
// 2.引入
// - import createPersistedstate from 'vuex-persistedstate'
// 3.调用
// - plugins:[createPersistedstate()]

// 配置项
// key: 默认值是vuex
// storage: 存储的方式，默认值是本地存储
// reducer: 指定持久化哪些数据.函数，return一个对象，对象就作为存储的value
// - 参数state
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      // storage: window.sessionStorage,
      reducer({ tokenObj, myChannels }) {
        return { tokenObj, myChannels }
      }
    })
  ],
  state: {
    tokenObj: {},
    myChannels: []
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      // 将token存在vuex
      state.tokenObj = token
    },
    /**
     *
     * @param {Array} channels 删除或者添加后的最新的channels
     */
    SET_MY_CHANNELS(state, channels) {
      state.myChannels = channels
    }
  }
})
