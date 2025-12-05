<template>
  <header class="header" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <div class="header-content">
        <router-link to="/" class="logo">
          <img src="/logorgc.png" alt="RGC SHOP" class="logo-image" />
        </router-link>

        <nav class="nav">
          <router-link to="/" class="nav-link">
            <span>Catálogo</span>
          </router-link>
          <button @click="openCart" class="cart-btn" :class="{ 'has-items': cartCount > 0 }">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 17.9 19 19 19C20.1 19 21 18.1 21 17V13M9 19.5C9.8 19.5 10.5 20.2 10.5 21C10.5 21.8 9.8 22.5 9 22.5C8.2 22.5 7.5 21.8 7.5 21C7.5 20.2 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21C21.5 21.8 20.8 22.5 20 22.5C19.2 22.5 18.5 21.8 18.5 21C18.5 20.2 19.2 19.5 20 19.5Z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
          </button>
          <router-link v-if="isAdmin" to="/a/d" class="nav-link">
            <span>Admin</span>
          </router-link>
          <button v-if="isAdmin" @click="logout" class="btn-logout">
            Sair
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { useCart } from '../composables/useCart';

export default {
  name: 'Header',
  emits: ['open-cart'],
  setup() {
    const { cart } = useCart();
    return { cart };
  },
  data() {
    return {
      isScrolled: false
    }
  },
  computed: {
    isAdmin() {
      return localStorage.getItem('adminToken') !== null;
    },
    cartCount() {
      return this.cart.items.length;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 20;
    },
    logout() {
      localStorage.removeItem('adminToken');
      this.$router.push('/');
    },
    openCart() {
      this.$emit('open-cart');
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(26, 26, 26, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.header.scrolled {
  background: rgba(26, 26, 26, 0.95);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  border-bottom-color: rgba(255, 255, 255, 0.15);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;
}

/* Logo */
.logo {
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.logo:hover {
  opacity: 0.8;
}

.logo-image {
  height: 40px;
  width: auto;
  object-fit: contain;
  transition: all 0.3s ease;
}

.logo:hover .logo-image {
  transform: scale(1.05);
  filter: brightness(1.1);
}

/* Navigation */
.nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  position: relative;
  color: var(--color-text);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  padding: 8px 0;
  transition: color 0.2s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-gold);
  transition: width 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-gold);
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

/* Logout Button */
.cart-btn {
  position: relative;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-text);
  width: 44px;
  height: 44px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  padding: 0;
}

.cart-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--color-gold);
  color: var(--color-gold);
}

.cart-btn.has-items {
  border-color: var(--color-gold);
  color: var(--color-gold);
}

.cart-btn svg {
  width: 22px;
  height: 22px;
}

.cart-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: var(--color-gold);
  color: var(--color-dark);
  font-size: 11px;
  font-weight: 700;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.4);
}

.btn-logout {
  padding: 10px 20px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-text);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-logout:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
  color: var(--color-text);
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    padding: 16px 20px;
  }

  .logo-image {
    height: 32px;
  }

  .nav {
    gap: 20px;
  }

  .nav-link {
    font-size: 14px;
  }

  .btn-logout {
    padding: 8px 16px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .nav {
    gap: 16px;
  }

  .nav-link {
    font-size: 13px;
  }

  .btn-logout {
    padding: 8px 12px;
    font-size: 12px;
  }
}
</style>
