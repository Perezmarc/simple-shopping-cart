<template>
  <div class="items-list-wrapper">
    <div class="item-wrapper" v-for="(item, index) in cartItems" :key="index">
      <div class="item-img">
        <img :src="`src/api/mockData/${item.picture}`" />
      </div>
      <div class="item-info">
        <p>{{item.name}}</p>
      </div>
      <div class="item-quantity">
        <span @click="changeQuantity(item, item.quantity - 1)">-</span>
        <input :value="item.quantity" @change="e => changeQuantity(item, e)" type="number" class="quantity-input" disabled/>
        <span @click="changeQuantity(item, item.quantity + 1)">+</span>
      </div>
      <div class="item-price">
        <p>{{item.price.value * item.quantity | currency(item.price.currency)}} </p>
      </div>
      <div class="item-actions">
        <img @click="deleteItem(item)" src="../../../assets/img/icons/cross.png" class="icon-close" />
      </div>
    </div>
    <div v-if="cartItems.length === 0">
      <h4>No items in the cart</h4>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../../stylus/global/variables'
.items-list-wrapper
  flex: 1 1 auto
  display: flex
  flex-direction: column
  flex-wrap: wrap
  justify-content: flex-start
  .item-wrapper
    flex: 1 1 auto
    display: flex
    flex-direction: row
    flex-wrap: wrap
    text-align: left
    border-bottom: 1px solid $theme.grey.lighten-1
    font-family: $font.bold-2
    @media (min-width: 768px)
      max-height: 140px
    & > div
      display: flex
      justify-content: flex-start
      align-items: center
      margin-right: 20px
    p
      margin-top: 10px
      margin-bottom: 10px
    .item-img
      flex: 0 0 auto
      img
        width: auto
        max-height: 140px
    .item-info
      font-size: 18px
      flex: 1 1 auto
    .item-actions, .item-price, .item-quantity
      margin-top: 10px
      display: flex
      justify-content: center
      margin: 20px
      & > span, & > img
        cursor: pointer
        padding: 5px
      & > *
        flex: 1 1 auto
      & > :last-child
        flex: 0 0 auto
    .quantity-input
      padding: 10px
      border-radius: 5px
      max-width: 30px
      border: 1px solid $theme.grey.lighten-1
      background: transparent
      text-align: center
      font-size: 12px
      margin: 0 10px
      -webkit-appearance: none
      appearance: none
</style>

<script>
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
  methods: {
    ...mapActions('cart', ['addItemToCart', 'deleteItemFromCart', 'setItemQuantity']),
    addItem(item){
      this.addItemToCart(item)
    },
    changeQuantity(item, quantity){
      this.setItemQuantity({item, quantity})
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
