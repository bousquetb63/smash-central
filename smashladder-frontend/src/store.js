import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: null
  },
  getters: {
    getName(state) {
      return state.name;
    }
  },
  mutations: {
    changeName(state, newName) {
      state.name = newName;
    }
  },
  actions: {
    changeName(context, name) {
      console.log(arguments);
      context.commit('changeName', name);
    }
  }
})
