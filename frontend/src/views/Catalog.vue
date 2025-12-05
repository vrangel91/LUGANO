<template>
  <div class="catalog">
    <Header @open-cart="$emit('open-cart')" />
    <main>
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-background">
          <div class="hero-image"></div>
          <div class="hero-gradient"></div>
          <div class="hero-pattern"></div>
          <div class="hero-smoke">
            <!-- Camadas de neblina flutuante -->
            <div class="smoke-layer smoke-layer-1" v-for="n in 8" :key="`smoke-1-${n}`" :style="getSmokeStyle(n, 1)">
            </div>
            <div class="smoke-layer smoke-layer-2" v-for="n in 6" :key="`smoke-2-${n}`" :style="getSmokeStyle(n, 2)">
            </div>
            <div class="smoke-layer smoke-layer-3" v-for="n in 4" :key="`smoke-3-${n}`" :style="getSmokeStyle(n, 3)">
            </div>
          </div>
        </div>
        <div class="container">
          <div class="hero-content">
            <div class="hero-badge">
              <svg class="badge-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="badge-text">Catálogo Premium</span>
            </div>

            <h1 class="hero-title">
              <span class="title-line title-main">
                <span class="title-word" v-for="(word, i) in titleWords" :key="i"
                  :style="{ animationDelay: `${i * 0.1}s` }">
                  {{ word }}
                </span>
              </span>
            </h1>

            <p class="hero-description">
              Descubra e adquira as skins mais raras e exclusivas para seus heróis favoritos
            </p>

            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-number">{{ stats.totalSkins || '...' }}</div>
                <div class="stat-label">Skins Disponíveis</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">{{ stats.totalHeroes || '...' }}</div>
                <div class="stat-label">Heróis</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">{{ stats.rarities || '7' }}</div>
                <div class="stat-label">Níveis de Raridade</div>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-scroll-indicator">
          <div class="scroll-mouse">
            <div class="scroll-wheel"></div>
          </div>
          <span class="scroll-text">Role para explorar</span>
        </div>
      </section>

      <!-- Filtros Modernos -->
      <div class="filters-section">
        <div class="filters-header">
          <h2 class="filters-title">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Filtros
          </h2>
          <button @click="toggleFilters" class="toggle-filters-btn" :class="{ active: showFilters }">
            {{ showFilters ? 'Ocultar' : 'Mostrar' }} Filtros
          </button>
        </div>

        <transition name="slide-down">
          <div v-if="showFilters" class="filters">
            <div class="filter-row">
              <div class="filter-group">
                <label class="filter-label">
                  <svg class="label-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Herói
                </label>
                <div class="select-wrapper">
                  <select v-model="filters.hero" @change="applyFilters" class="filter-select">
                    <option value="">Todos os Heróis</option>
                    <option v-for="hero in heroes" :key="hero.id" :value="hero.id">
                      {{ hero.name }}
                    </option>
                  </select>
                  <svg class="select-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>

              <div class="filter-group">
                <label class="filter-label">
                  <svg class="label-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Raridade
                </label>
                <div class="select-wrapper">
                  <select v-model="filters.rarity" @change="applyFilters" class="filter-select">
                    <option value="">Todas as Raridades</option>
                    <option v-for="rarity in rarities" :key="rarity" :value="rarity">
                      {{ rarity }}
                    </option>
                  </select>
                  <svg class="select-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div class="filter-row">
              <div class="filter-group">
                <label class="filter-label">
                  <svg class="label-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Valor Mínimo
                </label>
                <input type="number" v-model="filters.minValue" @input="applyFilters" placeholder="0.00" step="0.01"
                  min="0" class="filter-input" />
              </div>

              <div class="filter-group">
                <label class="filter-label">
                  <svg class="label-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Valor Máximo
                </label>
                <input type="number" v-model="filters.maxValue" @input="applyFilters" placeholder="9999.99" step="0.01"
                  min="0" class="filter-input" />
              </div>
            </div>

            <div class="filter-actions">
              <button @click="clearFilters" class="btn-clear">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Limpar Filtros
              </button>
              <div class="results-count">
                <span class="count-number">{{ skins.length }}</span>
                <span class="count-text">skin{{ skins.length !== 1 ? 's' : '' }} encontrada{{ skins.length !== 1 ? 's'
                  : '' }}</span>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div class="content-container">
        <!-- Loading State -->
        <div v-if="loading" class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">Carregando skins...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-container">
          <svg class="error-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 17H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.29 3.86L1.82 18C1.64543 18.3024 1.55299 18.6453 1.55201 18.9945C1.55103 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7238C2.83871 20.9009 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9009 21.4623 20.7238C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5318 3.56622 13.2807 3.32311 12.9812 3.15447C12.6817 2.98584 12.3438 2.89725 12 2.89725C11.6562 2.89725 11.3183 2.98584 11.0188 3.15447C10.7193 3.32311 10.4682 3.56622 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p class="error-text">{{ error }}</p>
          <button @click="loadSkins" class="btn-primary">Tentar Novamente</button>
        </div>

        <!-- Empty State -->
        <div v-else-if="skins.length === 0" class="empty-state">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 16V8C21 7.46957 20.7893 6.96086 20.4142 6.58579C20.0391 6.21071 19.5304 6 19 6H5C4.46957 6 3.96086 6.21071 3.58579 6.58579C3.21071 6.96086 3 7.46957 3 8V16C3 16.5304 3.21071 17.0391 3.58579 17.4142C3.96086 17.7893 4.46957 18 5 18H19C19.5304 18 20.0391 17.7893 20.4142 17.4142C20.7893 17.0391 21 16.5304 21 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 10H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h3 class="empty-title">Nenhuma skin encontrada</h3>
          <p class="empty-description">
            Tente ajustar os filtros ou verifique se há skins cadastradas.
          </p>
          <button @click="clearFilters" class="btn-primary">Limpar Filtros</button>
        </div>

        <!-- Skins Grid -->
        <div v-else class="skins-grid">
          <SkinCard v-for="skin in skins" :key="skin.id" :skin="skin" @click="$router.push(`/item/${skin.id}`)" />
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import SkinCard from '../components/SkinCard.vue';
import { skinService } from '../services/skinService';
import { heroService } from '../services/heroService';

export default {
  name: 'Catalog',
  components: {
    Header,
    Footer,
    SkinCard
  },
  data() {
    return {
      skins: [],
      heroes: [],
      rarities: ['Comum', 'Incomum', 'Raro', 'Mítico', 'Lendário', 'Arcana', 'Imortal'],
      filters: {
        hero: '',
        rarity: '',
        minValue: '',
        maxValue: ''
      },
      loading: true,
      error: null,
      showFilters: true,
      stats: {
        totalSkins: 0,
        totalHeroes: 0,
        rarities: 7
      },
      titleWords: ['Catálogo', 'de', 'Skins']
    }
  },
  async mounted() {
    await Promise.all([
      this.loadHeroes(),
      this.loadSkins(),
      this.loadStats()
    ]);
  },
  methods: {
    async loadHeroes() {
      try {
        const response = await heroService.getAll();
        this.heroes = response.data;
      } catch (error) {
        console.error('Erro ao carregar heróis:', error);
      }
    },
    async loadSkins() {
      this.loading = true;
      this.error = null;
      try {
        const response = await skinService.getAll(this.filters);
        this.skins = response.data;
      } catch (error) {
        this.error = 'Erro ao carregar skins. Tente novamente mais tarde.';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    applyFilters() {
      this.loadSkins();
    },
    clearFilters() {
      this.filters = {
        hero: '',
        rarity: '',
        minValue: '',
        maxValue: ''
      };
      this.loadSkins();
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    async loadStats() {
      try {
        const [skinsRes, heroesRes] = await Promise.all([
          skinService.getAll(),
          heroService.getAll()
        ]);
        this.stats.totalSkins = skinsRes.data.length;
        this.stats.totalHeroes = heroesRes.data.length;
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      }
    },
    getSmokeStyle(index, layer) {
      const left = Math.random() * 120 - 10; // Permite sair um pouco das bordas
      const bottom = Math.random() * 100;
      const delay = Math.random() * 20;

      // Configurações por camada
      const layerConfig = {
        1: {
          width: 200 + Math.random() * 150,
          height: 150 + Math.random() * 100,
          duration: 25 + Math.random() * 15,
          opacity: 0.15 + Math.random() * 0.1,
          blur: 40 + Math.random() * 20
        },
        2: {
          width: 250 + Math.random() * 200,
          height: 180 + Math.random() * 120,
          duration: 30 + Math.random() * 20,
          opacity: 0.12 + Math.random() * 0.08,
          blur: 50 + Math.random() * 30
        },
        3: {
          width: 300 + Math.random() * 250,
          height: 220 + Math.random() * 150,
          duration: 35 + Math.random() * 25,
          opacity: 0.1 + Math.random() * 0.05,
          blur: 60 + Math.random() * 40
        }
      };

      const config = layerConfig[layer];
      const randomX = (Math.random() - 0.5) * 300; // Movimento horizontal
      const randomY = (Math.random() - 0.5) * 200; // Movimento vertical

      // Cores de neblina (cinza/azulado escuro, típico de Dota)
      const smokeColors = [
        'rgba(20, 20, 30, 0.4)',    // Cinza escuro azulado
        'rgba(30, 25, 40, 0.4)',    // Roxo escuro
        'rgba(25, 30, 45, 0.4)',    // Azul escuro
        'rgba(35, 30, 50, 0.4)',   // Roxo médio escuro
        'rgba(20, 25, 35, 0.4)',    // Cinza azulado
      ];
      const color = smokeColors[Math.floor(Math.random() * smokeColors.length)];

      return {
        width: `${config.width}px`,
        height: `${config.height}px`,
        left: `${left}%`,
        bottom: `${bottom}%`,
        '--smoke-color': color,
        '--smoke-opacity': config.opacity,
        '--smoke-blur': `${config.blur}px`,
        '--random-x': `${randomX}px`,
        '--random-y': `${randomY}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${config.duration}s`
      };
    }
  }
}
</script>

<style scoped>
.catalog {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, var(--color-dark) 0%, var(--color-dark-secondary) 100%);
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 50px 0 80px;
  margin-top: 70px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/hero-background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.15;
  z-index: 0;
  animation: imagePulse 20s ease-in-out infinite;
  transform-origin: center center;
}

@keyframes imagePulse {
  0% {
    transform: scale(1.3);
    opacity: 0;
  }

  10% {
    opacity: 0.15;
  }

  50% {
    transform: scale(1);
    opacity: 0.2;
  }

  90% {
    opacity: 0.15;
  }

  100% {
    transform: scale(1.1);
    opacity: 0.15;
  }
}

.hero-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg,
      rgba(198, 40, 40, 0.15) 0%,
      rgba(25, 118, 210, 0.15) 50%,
      rgba(198, 40, 40, 0.15) 100%);
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

.hero-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(198, 40, 40, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 20%, rgba(25, 118, 210, 0.1) 0%, transparent 50%);
  animation: patternMove 20s ease infinite;
}

@keyframes patternMove {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  33% {
    transform: translate(20px, -20px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.hero-smoke {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.smoke-layer {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(ellipse at center,
      var(--smoke-color, rgba(20, 20, 30, 0.4)) 0%,
      var(--smoke-color, rgba(20, 20, 30, 0.3)) 40%,
      transparent 70%);
  opacity: var(--smoke-opacity, 0.15);
  filter: blur(var(--smoke-blur, 50px));
  animation: smokeFloat ease-in-out infinite;
  mix-blend-mode: screen;
}

.smoke-layer-1 {
  animation-duration: 25s;
  z-index: 1;
}

.smoke-layer-2 {
  animation-duration: 30s;
  z-index: 2;
}

.smoke-layer-3 {
  animation-duration: 35s;
  z-index: 3;
}

@keyframes smokeFloat {
  0% {
    transform: translate(0, 0) scale(0.8) rotate(0deg);
    opacity: 0;
  }

  10% {
    opacity: calc(var(--smoke-opacity, 0.15) * 0.5);
    transform: translate(calc(var(--random-x, 0) * 0.1), calc(var(--random-y, 0) * 0.1)) scale(0.9) rotate(5deg);
  }

  25% {
    opacity: var(--smoke-opacity, 0.15);
    transform: translate(calc(var(--random-x, 0) * 0.25), calc(var(--random-y, 0) * 0.25)) scale(1) rotate(10deg);
  }

  50% {
    opacity: calc(var(--smoke-opacity, 0.15) * 1.2);
    transform: translate(calc(var(--random-x, 0) * 0.5), calc(var(--random-y, 0) * 0.5)) scale(1.1) rotate(15deg);
  }

  75% {
    opacity: var(--smoke-opacity, 0.15);
    transform: translate(calc(var(--random-x, 0) * 0.75), calc(var(--random-y, 0) * 0.75)) scale(1) rotate(10deg);
  }

  90% {
    opacity: calc(var(--smoke-opacity, 0.15) * 0.7);
    transform: translate(calc(var(--random-x, 0) * 0.9), calc(var(--random-y, 0) * 0.9)) scale(0.95) rotate(5deg);
  }

  100% {
    opacity: 0;
    transform: translate(var(--random-x, 0), var(--random-y, 0)) scale(0.8) rotate(0deg);
  }
}

/* Efeito adicional de ondulação suave */
.smoke-layer::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(ellipse at center,
      transparent 0%,
      var(--smoke-color, rgba(20, 20, 30, 0.2)) 50%,
      transparent 100%);
  border-radius: 50%;
  animation: smokePulse 8s ease-in-out infinite;
  opacity: 0.5;
}

@keyframes smokePulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.3;
  }

  50% {
    transform: scale(1.2);
    opacity: 0.6;
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  animation: fadeInUp 1s ease-out;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 50px;
  backdrop-filter: blur(10px);
  animation: fadeIn 1s ease-out 0.3s both;
  align-self: center;
}

.badge-icon {
  width: 18px;
  height: 18px;
  color: var(--color-gold);
  flex-shrink: 0;
  stroke: currentColor;
}

.badge-text {
  font-size: 14px;
  color: var(--color-gold);
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.hero-title {
  line-height: 1.2;
  margin: 0;
}

.title-line {
  display: block;
  margin-bottom: 10px;
}

.title-main {
  font-size: clamp(36px, 8vw, 72px);
  font-weight: 800;
  letter-spacing: -1px;
}

.title-word {
  display: inline-block;
  background: linear-gradient(135deg, var(--color-gold), #ffed4e, var(--color-gold));
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s ease infinite, fadeInUp 0.8s ease-out both;
  text-shadow: 0 0 40px rgba(255, 215, 0, 0.5);
  margin-right: 15px;
}

@keyframes shimmer {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

.title-subtitle {
  font-size: clamp(24px, 4vw, 40px);
  font-weight: 300;
  color: var(--color-text);
  letter-spacing: 8px;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.title-accent {
  color: var(--color-gold);
  font-weight: 600;
}

.hero-description {
  font-size: clamp(16px, 2vw, 20px);
  color: var(--color-text-secondary);
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.8;
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 30px;
  background: rgba(26, 26, 26, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 215, 0, 0.1);
  animation: fadeInUp 0.8s ease-out 0.8s both;
  align-self: center;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: var(--color-gold);
  line-height: 1;
  margin-bottom: 8px;
  background: linear-gradient(135deg, var(--color-gold), #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 12px;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, transparent, rgba(255, 215, 0, 0.3), transparent);
}


.hero-scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  animation: fadeIn 1s ease-out 1.2s both, bounce 2s ease infinite;
  z-index: 2;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }

  50% {
    transform: translateX(-50%) translateY(-10px);
  }
}

.scroll-mouse {
  width: 24px;
  height: 40px;
  border: 2px solid rgba(255, 215, 0, 0.5);
  border-radius: 12px;
  position: relative;
}

.scroll-wheel {
  width: 4px;
  height: 8px;
  background: var(--color-gold);
  border-radius: 2px;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll 2s ease infinite;
}

@keyframes scroll {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(16px);
  }
}

.scroll-text {
  font-size: 12px;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 2px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

main {
  flex: 1;
  padding: 0 0 40px 0;
  margin-top: 0;
  /* Header fixo não precisa de margin */
}

.content-container {
  width: 90vw;
  margin: 0 auto;
  padding: 40px 20px;
  background: var(--color-dark-secondary);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 40px;
  border-radius: 16px;
}

/* Filters Section */
.filters-section {
  width: 90vw;
  margin: 60px auto 40px;
  padding: 0 20px;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-left: -20px;
  margin-right: -20px;
  padding: 20px;
  background: var(--color-dark-secondary);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.filters-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  color: var(--color-gold);
}

.filters-title .icon {
  width: 28px;
  height: 28px;
  color: var(--color-gold);
  flex-shrink: 0;
}

.toggle-filters-btn {
  background: var(--color-dark-tertiary);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.toggle-filters-btn:hover {
  background: var(--color-dark-secondary);
  border-color: var(--color-gold);
}

.toggle-filters-btn.active {
  background: var(--color-gold);
  color: var(--color-dark);
  border-color: var(--color-gold);
}

.filters {
  background: var(--color-dark-secondary);
  padding: 30px;
  margin-left: -20px;
  margin-right: -20px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.filter-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text);
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.label-icon {
  width: 18px;
  height: 18px;
  color: currentColor;
  flex-shrink: 0;
}

/* Select Wrapper */
.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.select-wrapper::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 215, 0, 0.02) 100%);
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 0;
}

.select-wrapper:hover::before {
  opacity: 1;
}

.select-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--color-text-secondary);
  pointer-events: none;
  z-index: 2;
  transition: all 0.3s ease;
}

.select-wrapper:hover .select-arrow {
  color: var(--color-gold);
  transform: translateY(-50%) scale(1.1);
}

.filter-select:focus + .select-arrow {
  color: var(--color-gold);
  transform: translateY(-50%) rotate(180deg);
  transition: all 0.3s ease;
}

.filter-select {
  width: 100%;
  background: var(--color-dark-tertiary);
  border: 2px solid var(--color-border);
  color: var(--color-text);
  padding: 14px 48px 14px 16px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  position: relative;
  z-index: 1;
  background-image: none;
}

.filter-select:hover {
  border-color: rgba(255, 215, 0, 0.3);
  background: rgba(255, 215, 0, 0.02);
}

.filter-select:focus {
  outline: none;
  border-color: var(--color-gold);
  box-shadow: 
    0 0 0 3px rgba(255, 215, 0, 0.1),
    0 4px 12px rgba(255, 215, 0, 0.1);
  background: rgba(255, 215, 0, 0.05);
}

.filter-select option {
  background: var(--color-dark-secondary);
  color: var(--color-text);
  padding: 12px;
  font-size: 15px;
}

.filter-select option:hover {
  background: rgba(255, 215, 0, 0.1);
}

.filter-select option:checked {
  background: rgba(255, 215, 0, 0.2);
  color: var(--color-gold);
}

.filter-input {
  background: var(--color-dark-tertiary);
  border: 2px solid var(--color-border);
  color: var(--color-text);
  padding: 14px 16px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
  width: 100%;
}

.filter-input:hover {
  border-color: rgba(255, 215, 0, 0.3);
  background: rgba(255, 215, 0, 0.02);
}

.filter-input:focus {
  outline: none;
  border-color: var(--color-gold);
  box-shadow: 
    0 0 0 3px rgba(255, 215, 0, 0.1),
    0 4px 12px rgba(255, 215, 0, 0.1);
  background: rgba(255, 215, 0, 0.05);
}

.filter-input::placeholder {
  color: var(--color-text-tertiary);
  opacity: 0.6;
}

.filter-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}

.btn-clear {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.btn-clear svg {
  width: 18px;
  height: 18px;
  color: currentColor;
  stroke: currentColor;
  flex-shrink: 0;
}

.btn-clear:hover {
  background: rgba(198, 40, 40, 0.1);
  border-color: var(--color-red);
  color: var(--color-red);
}

.btn-clear:hover svg {
  color: var(--color-red);
  stroke: var(--color-red);
}

.results-count {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.count-number {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-gold);
}

.count-text {
  font-size: 14px;
  color: var(--color-text-secondary);
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 20px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-gold);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: var(--color-text-secondary);
  font-size: 18px;
}

/* Error State */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 20px;
  text-align: center;
}

.error-icon {
  width: 64px;
  height: 64px;
  color: var(--color-red);
  opacity: 0.8;
  stroke: currentColor;
}

.error-text {
  color: var(--color-text);
  font-size: 18px;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  gap: 20px;
}

.empty-icon {
  width: 80px;
  height: 80px;
  color: var(--color-text-tertiary);
  opacity: 0.5;
  stroke: currentColor;
}

.empty-title {
  font-size: 24px;
  color: var(--color-text);
  margin-bottom: 10px;
}

.empty-description {
  color: var(--color-text-secondary);
  font-size: 16px;
  max-width: 500px;
}

/* Skins Grid */
.skins-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Transitions */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-20px);
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  max-height: 1000px;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    min-height: 70vh;
    padding: 50px 0 60px;
  }

  .hero-stats {
    flex-direction: column;
    gap: 20px;
    padding: 25px 20px;
  }

  .stat-divider {
    width: 60px;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(255, 215, 0, 0.3), transparent);
  }


  .hero-scroll-indicator {
    bottom: 20px;
  }

  .filters-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }

  .filter-row {
    grid-template-columns: 1fr;
  }

  .filter-actions {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }

  .skins-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .skins-grid {
    grid-template-columns: 1fr;
  }
}
</style>
