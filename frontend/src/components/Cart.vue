<template>
  <div class="cart-container" :class="{ open: isOpen }">
    <div class="cart-overlay" @click="closeCart"></div>
    <div class="cart-sidebar">
      <div class="cart-header">
        <h2 class="cart-title">Carrinho</h2>
        <button @click="closeCart" class="cart-close-btn">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <div class="cart-content">
        <div v-if="cart.items.length === 0" class="cart-empty">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 16V8C21 7.46957 20.7893 6.96086 20.4142 6.58579C20.0391 6.21071 19.5304 6 19 6H5C4.46957 6 3.96086 6.21071 3.58579 6.58579C3.21071 6.96086 3 7.46957 3 8V16C3 16.5304 3.21071 17.0391 3.58579 17.4142C3.96086 17.7893 4.46957 18 5 18H19C19.5304 18 20.0391 17.7893 20.4142 17.4142C20.7893 17.0391 21 16.5304 21 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 10H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p>Carrinho vazio</p>
          <span>Adicione skins ao carrinho para continuar</span>
        </div>

        <div v-else class="cart-items">
          <div 
            v-for="item in cart.items" 
            :key="item.id" 
            class="cart-item"
          >
            <div class="item-image">
              <img :src="getImageUrl(item.imageUrl)" :alt="item.name" />
            </div>
            <div class="item-info">
              <h3 class="item-name">{{ item.name }}</h3>
              <p class="item-hero">{{ item.heroName }}</p>
              <p class="item-price">R$ {{ formatValue(item.value) }}</p>
            </div>
            <button @click="removeFromCart(item.id)" class="item-remove">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-if="cart.items.length > 0" class="cart-footer">
        <div class="cart-total">
          <span class="total-label">Total:</span>
          <span class="total-value">R$ {{ formatValue(getTotalValue()) }}</span>
        </div>
        <button @click="sendWhatsApp" class="btn-whatsapp">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11C21.0035 11.33 21.0035 11.67 21 12V11.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Enviar por WhatsApp
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCart } from '../composables/useCart';

export default {
  name: 'Cart',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup() {
    const { cart, removeFromCart, getTotalValue } = useCart();
    return { cart, removeFromCart, getTotalValue };
  },
  data() {
    return {
      whatsappNumber: null
    };
  },
  async mounted() {
    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      this.whatsappNumber = data.whatsappNumber;
    } catch (error) {
      console.error('Erro ao buscar número do WhatsApp:', error);
    }
  },
  methods: {
    closeCart() {
      this.$emit('close');
    },
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
    getGreeting() {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        return 'Bom dia';
      } else if (hour >= 12 && hour < 18) {
        return 'Boa tarde';
      } else {
        return 'Boa noite';
      }
    },
    sendWhatsApp() {
      if (!this.whatsappNumber) {
        alert('Número do WhatsApp não configurado');
        return;
      }

      if (this.cart.items.length === 0) {
        return;
      }

      // Formatar mensagem com nome do herói e valor de cada skin
      const greeting = this.getGreeting();
      let message = `${greeting}, tenho interesse nas seguintes skins:\n\n`;
      
      this.cart.items.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - Herói: ${item.heroName} - Valor: R$ ${this.formatValue(item.value)}\n`;
      });

      message += `\nTotal: R$ ${this.formatValue(this.getTotalValue())}`;

      const url = `https://api.whatsapp.com/send?phone=${this.whatsappNumber}&text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }
  }
};
</script>

<style scoped>
.cart-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cart-container.open {
  pointer-events: all;
  opacity: 1;
}

.cart-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}

.cart-sidebar {
  position: absolute;
  top: 0;
  right: 0;
  width: 420px;
  max-width: 90vw;
  height: 100vh;
  background: linear-gradient(180deg, 
    var(--color-dark-secondary) 0%, 
    var(--color-dark) 100%);
  border-left: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.5);
}

.cart-container.open .cart-sidebar {
  transform: translateX(0);
}

.cart-header {
  padding: 24px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 215, 0, 0.05);
}

.cart-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-gold);
  margin: 0;
}

.cart-close-btn {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  padding: 0;
}

.cart-close-btn * {
  pointer-events: none;
}

.cart-close-btn:hover {
  background: var(--color-dark-tertiary);
  border-color: var(--color-gold);
  color: var(--color-gold);
}

.cart-close-btn svg {
  width: 20px;
  height: 20px;
  color: var(--color-text);
  stroke: var(--color-text);
  fill: none;
  display: block;
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.cart-empty {
  text-align: center;
  padding: 60px 20px;
  color: var(--color-text-secondary);
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  opacity: 0.5;
  color: var(--color-text-tertiary);
}

.cart-empty p {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 8px 0;
}

.cart-empty span {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: var(--color-dark-tertiary);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.cart-item:hover {
  border-color: var(--color-border-gold);
  background: rgba(255, 215, 0, 0.05);
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--color-dark);
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.item-hero {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin: 0;
}

.item-price {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-gold);
  margin: 0;
}

.item-remove {
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  padding: 0;
}

.item-remove * {
  pointer-events: none;
}

.item-remove:hover {
  background: rgba(198, 40, 40, 0.1);
  color: var(--color-red);
}

.item-remove:hover svg {
  color: var(--color-red);
  stroke: var(--color-red);
}

.item-remove svg {
  width: 18px;
  height: 18px;
  color: var(--color-text-secondary);
  stroke: var(--color-text-secondary);
  fill: none;
  display: block;
}

.cart-footer {
  padding: 24px;
  border-top: 1px solid var(--color-border);
  background: var(--color-dark-secondary);
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px;
  background: var(--color-dark-tertiary);
  border-radius: 12px;
  border: 1px solid var(--color-border-gold);
}

.total-label {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
}

.total-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-gold);
}

.btn-whatsapp {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
}

.btn-whatsapp:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
}

.btn-whatsapp svg {
  width: 24px;
  height: 24px;
}

/* Scrollbar */
.cart-content::-webkit-scrollbar {
  width: 6px;
}

.cart-content::-webkit-scrollbar-track {
  background: transparent;
}

.cart-content::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 3px;
}

.cart-content::-webkit-scrollbar-thumb:hover {
  background: var(--color-border-light);
}

@media (max-width: 768px) {
  .cart-sidebar {
    width: 100%;
    max-width: 100vw;
  }
}
</style>

