import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  state: {
    isGetterRouter: false,
    isCollapsed: false,
    userInfo: {}
  },
  getters: {
  },
  mutations: {
    changeGetterRouter(state, value) {
      state.isGetterRouter = value
    },
    // 控制侧边栏的展开
    changeCollapsed(state) {
      state.isCollapsed = !state.isCollapsed
    },
    changeUserInfo(state, value) {
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    }
    ,
    clearUserInfo(state, value) {
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  // 控制是否持久化
  plugins: [createPersistedState(
    {
      paths: ["isCollapsed", "userInfo"]
    }
  )],
})
