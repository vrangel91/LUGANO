<template>
  <div class="skin-card" @click="$router.push(`/item/${skin.id}`)">
    <div class="skin-image-wrapper">
      <div class="skin-image">
        <img :src="getImageUrl(skin.imageUrl)" :alt="skin.name" />
      </div>
      <div class="rarity-badge" :class="`rarity-${skin.rarity.toLowerCase()}`">
        {{ skin.rarity }}
      </div>
    </div>
    
    <div class="skin-info">
      <h3 class="skin-name">{{ skin.name }}</h3>
      <div class="skin-meta">
        <span class="hero-badge">
          <span class="hero-icon">⚔️</span>
          {{ skin.hero.name }}
        </span>
      </div>
      <div class="skin-footer">
        <div class="price">
          <span class="price-label">Valor</span>
          <span class="price-value">R$ {{ formatValue(skin.value) }}</span>
        </div>
        <button 
          v-if="itemInCart" 
          @click.stop="handleRemoveFromCart" 
          class="btn-remove btn-compact"
        >
          Remover
        </button>
        <button 
          v-else 
          @click.stop="handleAddToCart" 
          class="btn-primary btn-compact"
        >
          Adicionar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCart } from '../composables/useCart';

export default {
  name: 'SkinCard',
  props: {
    skin: {
      type: Object,
      required: true
    }
  },
  setup() {
    const cartStore = useCart();
    return { 
      cart: cartStore.cart,
      addToCart: cartStore.addToCart, 
      removeFromCart: cartStore.removeFromCart
    };
  },
  data() {
    return {
    }
  },
  computed: {
    itemInCart() {
      return this.cart.items.some(item => item.id === this.skin.id);
    }
  },
  methods: {
    getImageUrl(url) {
      if (!url) return '/placeholder-skin.jpg';
      if (url.startsWith('http')) return url;
      return `http://localhost:3000${url}`;
    },
    formatValue(value) {
      return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    },
    handleAddToCart() {
      this.addToCart(this.skin);
    },
    handleRemoveFromCart() {
      this.removeFromCart(this.skin.id);
    },
  }
}
</script>

<style scoped>
.skin-card {
  background: var(--color-dark-secondary);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.skin-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
  border-color: var(--color-gold);
}


.skin-image-wrapper {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: linear-gradient(135deg, var(--color-dark), var(--color-dark-tertiary));
}

.skin-image {
  width: 100%;
  height: 100%;
  position: relative;
}

.skin-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.skin-card:hover .skin-image img {
  transform: scale(1.1);
}


.rarity-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.rarity-common { color: #9e9e9e; border-color: #9e9e9e; }
.rarity-uncommon { color: #4caf50; border-color: #4caf50; }
.rarity-raro { color: #2196f3; border-color: #2196f3; }
.rarity-mítico { color: #9c27b0; border-color: #9c27b0; }
.rarity-lendário { color: #ff9800; border-color: #ff9800; }
.rarity-arcana { color: #e91e63; border-color: #e91e63; }
.rarity-imortal { 
  color: var(--color-gold); 
  border-color: var(--color-gold);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.skin-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.skin-name {
  color: var(--color-gold);
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.skin-meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--color-dark-tertiary);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  font-size: 13px;
  color: var(--color-text);
}

.hero-icon {
  font-size: 14px;
}

.skin-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid var(--color-border);
}

.price {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.price-label {
  font-size: 11px;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.price-value {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-gold);
}

.btn-compact {
  padding: 10px 20px;
  font-size: 14px;
  white-space: nowrap;
}

.btn-remove {
  padding: 10px 20px;
  background: transparent;
  border: 1px solid var(--color-red);
  color: var(--color-red);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-remove:hover {
  background: rgba(198, 40, 40, 0.1);
  border-color: var(--color-red);
  color: var(--color-red);
}

@media (max-width: 768px) {
  .skin-image-wrapper {
    height: 240px;
  }
  
  .skin-name {
    font-size: 18px;
  }
  
  .price-value {
    font-size: 18px;
  }
}
</style>
