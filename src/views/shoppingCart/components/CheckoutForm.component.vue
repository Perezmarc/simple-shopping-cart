<template>
  <div class="checkout-form-container">
    <h3>Card Details</h3>

    <label>Card type</label>
    <div class="credit-card-selection-wrapper">
      <div class="credit-card-wrapper" :class="form.cardType">
        <img v-if="form.cardType === 'mastercard'" src="../../../assets/img/mastercard.png">
        <img v-else src="../../../assets/img/visa.png">
        <div class="credit-card-info">
          <div class="number">
            <span v-mask="'#### #### #### ####'" v-if="form.cardNumber">{{form.cardNumber}}</span>
            <span v-else>**** **** **** ****</span>
          </div>
          <div class="info">
            <span>{{form.name}}</span>
            <span v-if="form.expirationDate.month && form.expirationDate.year">{{form.expirationDate.month}} / {{form.expirationDate.year}}</span>
          </div>
        </div>
      </div>
      <div class="credit-card-option">
        <img v-if="form.cardType === 'visa'" @click="form.cardType = 'mastercard'" src="../../../assets/img/mastercard.png">
        <img v-else @click="form.cardType = 'visa'" src="../../../assets/img/visa.png">
      </div>
    </div>
    

    
    <label>Name on card</label>
    <c-input v-model="form.name" type="text"/>
    <label>Card number</label>
    <c-input v-model="form.cardNumber" type="credit-card" v-mask="'#### #### #### ####'" placeholder="**** **** **** ****"/>
    <div class="info-extra-wrapper">
      <div>
        <label>Expiration Date</label>
        <div class="expiration-date-wrapper">
          <div class="c-select-wrapper">
            <c-select v-model="form.expirationDate.month">
              <option value="mm">mm</option>
              <option v-for="month in months" :key="month" :value="month">{{month}}</option>
            </c-select>
          </div>
          <div class="c-select-wrapper">
            <c-select v-model="form.expirationDate.year">
              <option value="yyyy">yyyy</option>
              <option v-for="year in years" :key="year" :value="year">{{year}}</option>
            </c-select>
          </div>
        </div>
      </div>
      <div>
        <label>CVV</label>
        <c-input v-model="form.cvv" type="text" v-mask="'###'" placeholder="XXX"/>
      </div>
    </div>
    <c-button @click="checkout()" color="primary" :outline="false" :disabled="!isFormValid">Checkout</c-button>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../../stylus/global/variables'
.checkout-form-container
  flex: 1 1 auto
  display: flex
  flex-direction: column
  border-radius: 10px
  background: linear-gradient(45deg, #2c2d31, #41434b)
  color: #fff
  padding: 40px
  margin-top: 60px
  @media (min-width: 768px)
    margin-top: 0
    margin-left: 75px
  h3
    margin-top: 0
  .credit-card-selection-wrapper
    display: flex
    flex-wrap: wrap
    .credit-card-option
      flex: 0 1 76px
      display: flex
      align-items: center
      margin-left: auto
      img 
        width: 100%
        cursor: pointer
  .credit-card-wrapper
    height: 100px
    width: 200px
    background: #8d8f97
    height: 130px
    width: 240px
    border-radius: 10px
    margin: 20px 0
    position: relative
    padding: 20px
    display: flex
    flex-direction: column
    @media (min-width: 768px)
      margin: 20px 20px 40px -90px
    img
      align-self: self-start
    .credit-card-info
      flex: 1 1 auto
      display: flex
      flex-direction: column
      .number
        flex: 1 1 auto
        display: flex
        flex-direction: column
        justify-content: center
      .info
        min-height: 20px
        display: flex
        justify-content: space-between
    &:after
      content: url('../../../assets/img/visa.png')
      position: absolute 
      right: 3px
      top: 3px
      display: block
      opacity: 0.05
    &.visa:after
      content: url('../../../assets/img/visa.png')
    &.mastercard:after
      content: url('../../../assets/img/mastercard.png')
    img
      height: 20px

  .info-extra-wrapper
    display: flex
    justify-content: space-between
    & > div
      display: flex
      flex-direction: column
      & > .expiration-date-wrapper
        display: flex

    .c-select-wrapper
      min-width: 70px
      margin-right: 20px
    .c-input
      max-width: 100px
      
</style>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
const currentYear = (new Date()).getFullYear()

export default {
  data() {
    return {
      items: [],
      form: {
        name: '',
        cardNumber: '',
        cardType: 'visa',
        expirationDate: {
          month: 'mm',
          year: 'yyyy'
        },
        cvv: ''
      },
      months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      years: [ currentYear, currentYear + 1, currentYear + 2, currentYear + 3, currentYear + 4, currentYear + 5, currentYear + 6, currentYear + 7, currentYear + 8  ],
    };
  },
  computed: {
    ...mapGetters('cart', {
      totalItems: 'cartTotalItems',
      cartItems: 'cartItems'
    }),
    isFormValid() {
      return !!(
        this.form.name 
        && this.form.cardNumber 
        && this.form.cardType 
        && this.form.expirationDate.month 
        && this.form.expirationDate.year
        && this.form.expirationDate.month !== 'mm'
        && this.form.expirationDate.year !== 'yyyy'
        && this.form.cvv)
    }
  },
  methods: {
    ...mapActions('cart', ['addItemToCart', 'deleteItemFromCart', 'checkoutCart']),
    addItem(item){
      this.addItemToCart(item)
    },
    deleteItem(item){
      this.deleteItemFromCart(item)
    },
    isItemInCart (item){
      const cartItem = this.cartItems.find(i => item.name === i.name)
      return !!cartItem
    },
    checkout () {
      if (this.isFormValid) this.checkoutCart()
    }
  }
};
</script>
