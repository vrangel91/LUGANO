import { reactive } from 'vue';

const cartState = reactive({
  items: []
});

export function useCart() {
  const addToCart = (skin) => {
    // Verificar se já está no carrinho
    const exists = cartState.items.find(item => item.id === skin.id);
    if (!exists) {
      cartState.items.push({
        id: skin.id,
        name: skin.name,
        heroName: skin.hero.name,
        value: skin.value,
        imageUrl: skin.imageUrl,
        rarity: skin.rarity
      });
    }
  };

  const removeFromCart = (skinId) => {
    const index = cartState.items.findIndex(item => item.id === skinId);
    if (index > -1) {
      cartState.items.splice(index, 1);
    }
  };

  const clearCart = () => {
    cartState.items = [];
  };

  const getTotalValue = () => {
    return cartState.items.reduce((total, item) => total + parseFloat(item.value || 0), 0);
  };

  const getCartCount = () => {
    return cartState.items.length;
  };

  const isInCart = (skinId) => {
    return cartState.items.some(item => item.id === skinId);
  };

  return {
    cart: cartState,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalValue,
    getCartCount,
    isInCart
  };
}

