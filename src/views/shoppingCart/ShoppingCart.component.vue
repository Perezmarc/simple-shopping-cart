<template>
  <div class="main-container">
    <div class="shopping-cart-wrapper">
      <!-- ITEMS LIST -->
      <div class="shopping-cart-list-container">
        <div class="header-wrapper">
          <div class="header-title">
            <h3>Shopping Cart</h3>
          </div>
        </div>
        <cart-items-list />
        <div class="footer-wrapper">
          <div class="footer-actions">
            <div @click="$router.push({name: 'items'})">
              <img src="../../assets/img/icons/arrow-left.png" class="icon-arrow-left"/>
              <span>Continue Shopping</span>
            </div>

            <div class="subtotal-wrapper">
              <span class="subtotal-text">Subtotal: </span> <span class="subtotal-value">{{this.totalPrice.value | currency(this.totalPrice.currency)}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- CHECKOUT -->
      <div class="checkout-form-wrapper">
        <checkout-form />
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
  @import './ShoppingCart.styl'
</style>

<script>
import { ItemsService } from '../../api/items.service'
import CartItemsList from './components/CartItemsList.component.vue'
import CheckoutForm from './components/CheckoutForm.component.vue'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  components: {
    CartItemsList,
    CheckoutForm
  },
  data() {
    return {
      items: []
    };
  },
  computed: {
    ...mapGetters('cart', {
      totalPrice: 'cartTotalPrice',
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
