import { CartService } from '../../api/cart.service'

interface Item {
  'name': string;
  'price': {
    'value': number;
    'currency': 'EUR' | undefined;
  };
  'picture': string;
  'quantity': number;
}

interface State {
  'items': Array<Item>;
  'checkoutStatus': 'success' | 'failed' | 'loading' | 'ready'
}


// initial state
const state: State = {
  items: [],
  checkoutStatus: 'ready'
}

// getters
const getters = {
  cartTotalPrice: (state) => {
    let currency = 'EUR'
    if( state.items[0] ) currency = state.items[0].price.currency
    const total = state.items.reduce((total, item: Item) => {
      return total + item.price.value * item.quantity
    }, 0)

    return { 
      value: total,
      currency
    }
  },
  cartItems: (state) => {
    return state.items
  },
  cartTotalItems: (state) => {
    return state.items.reduce((total, item: Item) => {
      return total + item.quantity
    }, 0)
  }
}

// actions
const actions = {
  checkoutCart ({ commit, state }, items) {
    commit('setCheckoutStatus', 'finished')
    commit('setCartItems', {items: []} )
  },

  addItemToCart ({ state, commit }, item) {
    commit('setCheckoutStatus', 'ready')
    const cartItem = state.items.find(i => item.name === i.name)
    if (!cartItem) {
      commit('pushItemToCart', { item })
    } else {
      commit('setItemQuantity', {item: cartItem, quantity: cartItem.quantity + 1})
    }
  },

  setItemQuantity ({ state, commit }, {item, quantity}) {
    commit('setCheckoutStatus', 'ready')
    const cartItem = state.items.find(i => item.name === i.name)
    if (cartItem) {
      commit('setItemQuantity', {item: cartItem, quantity})
    }
  },

  deleteItemFromCart ({ state, commit }, item) {
    commit('setCheckoutStatus', 'ready')
    const cartItem = state.items.find(i => item.name === i.name)
    if (cartItem) {
      commit('deleteItemFromCart', { item })
    }
  }
}

// mutations
const mutations = {
  pushItemToCart (state, { item }) {
    state.items.push({
      ...item,
      quantity: 1
    })
  },

  setItemQuantity (state, { item, quantity }) {
    state.items = state.items.map(i => {
      if (i.name === item.name) {
        i.quantity = quantity
      }
      return i
    })
  },

  deleteItemFromCart (state, { item }) {
    state.items = state.items.filter(i => i.name !== item.name)
  },

  setCartItems (state, { items }) {
    state.items = items
  },

  setCheckoutStatus (state, status) {
    state.checkoutStatus = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}