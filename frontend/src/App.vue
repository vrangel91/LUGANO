<template>
  <div id="app">
    <router-view @open-cart="openCart" />
    <Cart :is-open="cartOpen" @close="closeCart" />
  </div>
</template>

<script>
import Cart from './components/Cart.vue';

export default {
  name: 'App',
  components: {
    Cart
  },
  data() {
    return {
      cartOpen: false
    }
  },
  methods: {
    openCart() {
      this.cartOpen = true;
    },
    closeCart() {
      this.cartOpen = false;
    }
  }
}
</script>

