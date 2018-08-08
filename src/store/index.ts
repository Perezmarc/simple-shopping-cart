import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import VuexPersist from 'vuex-persist';
Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

export default new Vuex.Store({
  modules: {
    cart
  },
  strict: false,
  plugins: [vuexLocalStorage.plugin]
})