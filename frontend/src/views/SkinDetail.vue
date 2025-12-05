<template>
  <div class="skin-detail">
    <Header />
    <main>
      <div class="container">
        <div v-if="loading" class="loading">Carregando...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else-if="skin" class="skin-detail-content">
          <div class="skin-image-large">
            <img :src="getImageUrl(skin.imageUrl)" :alt="skin.name" />
          </div>
          <div class="skin-details">
            <h1 class="skin-name">{{ skin.name }}</h1>
            <p class="skin-hero">Herói: <strong>{{ skin.hero.name }}</strong></p>
            <p class="skin-rarity" :class="`rarity-${skin.rarity.toLowerCase()}`">
              Raridade: <strong>{{ skin.rarity }}</strong>
            </p>
            <p class="skin-value">Valor: <strong>R$ {{ formatValue(skin.value) }}</strong></p>
            <button @click="openWhatsApp" class="btn-primary btn-large">
              Consultar no WhatsApp
            </button>
            <router-link to="/" class="btn-secondary" style="margin-top: 15px; display: inline-block;">
              Voltar ao Catálogo
            </router-link>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { skinService } from '../services/skinService';

export default {
  name: 'SkinDetail',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      skin: null,
      loading: true,
      error: null,
      whatsappNumber: null
    }
  },
  async mounted() {
    await this.loadSkin();
    await this.loadWhatsAppNumber();
  },
  methods: {
    async loadSkin() {
      this.loading = true;
      this.error = null;
      try {
        const response = await skinService.getById(this.$route.params.id);
        this.skin = response.data;
      } catch (error) {
        this.error = 'Skin não encontrada';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async loadWhatsAppNumber() {
      try {
        const response = await fetch('/api/health');
        const data = await response.json();
        this.whatsappNumber = data.whatsappNumber;
      } catch (error) {
        console.error('Erro ao buscar número do WhatsApp:', error);
      }
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
    openWhatsApp() {
      if (!this.whatsappNumber) {
        alert('Número do WhatsApp não configurado');
        return;
      }
      
      const message = `Olá, tenho interesse na skin ${this.skin.name} do ${this.skin.hero.name}.`;
      const url = `https://api.whatsapp.com/send?phone=${this.whatsappNumber}&text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }
  }
}
</script>

<style scoped>
.skin-detail {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding: 40px 0;
}

.skin-detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

.skin-image-large {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-dark);
}

.skin-image-large img {
  width: 100%;
  height: auto;
  display: block;
}

.skin-details {
  background: var(--color-dark-secondary);
  padding: 30px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.skin-name {
  font-size: 32px;
  color: var(--color-gold);
  margin-bottom: 20px;
}

.skin-hero,
.skin-rarity,
.skin-value {
  font-size: 18px;
  margin-bottom: 15px;
  color: var(--color-text);
}

.skin-hero strong,
.skin-rarity strong,
.skin-value strong {
  color: var(--color-text);
}

@media (max-width: 768px) {
  .skin-detail-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .skin-name {
    font-size: 24px;
  }
}
</style>

