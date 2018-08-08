<template>
  <div class="main-container">
    <div class="header-wrapper">
      <div class="header-title">
        <h3>Kitchen</h3>
      </div>
      <div class="header-actions" @click="$router.push({name: 'shopping-cart'})">
        <img src="../../assets/img/icons/store.png" class="icon-store" />
        <h4>{{totalItems}}</h4>
      </div>
    </div>

    <div class="items-list-wrapper">
      <div class="item-wrapper" v-for="(item, index) in items" :key="index">
        <div class="item-img">
          <img :src="`src/api/mockData/${item.picture}`" />
        </div>
        <div class="item-info">
          <p>{{item.name}}</p>
          <p>{{item.price.value | currency(item.price.currency)}}</p>
        </div>
        <div class="item-actions">
          <c-button @click="addItem(item)" :outline="true">Add card</c-button>
          <c-button @click="deleteItem(item)" :outline="true" :disabled="!isItemInCart(item)"><img src="../../assets/img/icons/cross.png"></c-button>
        </div>
      </div>
    </div>

    <div class="footer-wrapper">
      <div class="footer-actions">
        <div>
          <img src="../../assets/img/icons/arrow-left.png" class="icon-arrow-left"/>
          <span>Previous</span>
        </div>
        <div>
          <span>Next</span>
          <img src="../../assets/img/icons/arrow-left.png" class="icon-arrow-right"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
  @import './ItemsList.styl'
</style>

<script>
import {ItemsService} from '../../api/items.service'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      items: []
    };
  },
  computed: {
    ...mapGetters('cart', {
      totalItems: 'cartTotalItems',
      cartItems: 'cartItems'
    }),
  },
  async created () {
    this.items = await ItemsService.getMockData()
  },
  methods: {
    ...mapActions('cart', ['addItemToCart', 'deleteItemFromCart']),
    async getItems () {
      return ItemsService.getMockData()
    },
    addItem(item){
      this.addItemToCart(item)
    },
    deleteItem(item){
      this.deleteItemFromCart(item)
    },
    isItemInCart (item){
      const cartItem = this.cartItems.find(i => item.name === i.name)
      return !!cartItem
    }
  }
};
</script>
