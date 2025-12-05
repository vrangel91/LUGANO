<template>
  <div class="admin-skins">
    <AdminSidebar />
    <div class="admin-content">
      <header class="admin-header">
        <div class="header-content">
          <h1 class="page-title">Gerenciar Skins</h1>
          <div class="header-actions">
            <router-link to="/a/i/n" class="btn-primary">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Adicionar Skin
            </router-link>
          </div>
        </div>
      </header>

      <main class="admin-main">
        <div class="container">
          <!-- Search and Filters -->
          <div class="filters-bar">
            <div class="search-box">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Buscar por nome, herói ou raridade..."
                class="search-input"
              />
            </div>
            <div class="filter-badges">
              <span class="total-badge">{{ filteredSkins.length }} skins</span>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="loading-state">
            <div class="spinner"></div>
            <p>Carregando skins...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="error-state">
            <svg class="error-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 17H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10.29 3.86L1.82 18C1.64543 18.3024 1.55299 18.6453 1.55201 18.9945C1.55103 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7238C2.83871 20.9009 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9009 21.4623 20.7238C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5318 3.56622 13.2807 3.32311 12.9812 3.15447C12.6817 2.98584 12.3438 2.89725 12 2.89725C11.6562 2.89725 11.3183 2.98584 11.0188 3.15447C10.7193 3.32311 10.4682 3.56622 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h3>Erro ao carregar skins</h3>
            <p>{{ error }}</p>
            <button @click="loadSkins" class="btn-primary">Tentar novamente</button>
          </div>

          <!-- Empty State -->
          <div v-else-if="filteredSkins.length === 0" class="empty-state">
            <svg class="empty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 16V8C21 7.46957 20.7893 6.96086 20.4142 6.58579C20.0391 6.21071 19.5304 6 19 6H5C4.46957 6 3.96086 6.21071 3.58579 6.58579C3.21071 6.96086 3 7.46957 3 8V16C3 16.5304 3.21071 17.0391 3.58579 17.4142C3.96086 17.7893 4.46957 18 5 18H19C19.5304 18 20.0391 17.7893 20.4142 17.4142C20.7893 17.0391 21 16.5304 21 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 10H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h3>Nenhuma skin encontrada</h3>
            <p v-if="searchQuery">Tente ajustar sua busca</p>
            <p v-else>Comece adicionando sua primeira skin!</p>
            <router-link to="/a/i/n" class="btn-primary">
              Adicionar Skin
            </router-link>
          </div>

          <!-- Skins Grid -->
          <div v-else class="skins-grid">
            <div 
              v-for="skin in filteredSkins" 
              :key="skin.id" 
              class="skin-card"
            >
              <div class="skin-image-wrapper">
                <img 
                  :src="getImageUrl(skin.imageUrl)" 
                  :alt="skin.name" 
                  class="skin-image"
                />
                <div class="skin-overlay">
                  <div class="skin-actions">
                    <router-link 
                      :to="`/a/i/e/${skin.id}`" 
                      class="action-btn edit-btn"
                      title="Editar"
                    >
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.5 2.5C18.8978 2.10218 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10218 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10218 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </router-link>
                    <button 
                      @click="confirmDelete(skin)" 
                      class="action-btn delete-btn"
                      title="Excluir"
                    >
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="skin-rarity-badge" :class="`rarity-${skin.rarity.toLowerCase()}`">
                  {{ skin.rarity }}
                </div>
              </div>
              
              <div class="skin-info">
                <h3 class="skin-name">{{ skin.name }}</h3>
                <div class="skin-meta">
                  <span class="skin-hero">
                    <svg class="meta-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {{ skin.hero.name }}
                  </span>
                  <span class="skin-value">
                    <svg class="meta-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    R$ {{ formatValue(skin.value) }}
                  </span>
                </div>
                <div class="skin-date">
                  Adicionada em {{ formatDate(skin.createdAt) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import AdminSidebar from '../../components/admin/AdminSidebar.vue';
import { adminService } from '../../services/adminService';

export default {
  name: 'AdminSkins',
  components: {
    AdminSidebar
  },
  data() {
    return {
      skins: [],
      searchQuery: '',
      loading: true,
      error: null
    }
  },
  computed: {
    filteredSkins() {
      if (!this.searchQuery) return this.skins;
      
      const query = this.searchQuery.toLowerCase();
      return this.skins.filter(skin => 
        skin.name.toLowerCase().includes(query) ||
        skin.hero.name.toLowerCase().includes(query) ||
        skin.rarity.toLowerCase().includes(query)
      );
    }
  },
  async mounted() {
    await this.loadSkins();
  },
  methods: {
    async loadSkins() {
      this.loading = true;
      this.error = null;
      try {
        const response = await adminService.getSkins();
        this.skins = response.data;
      } catch (error) {
        this.error = 'Erro ao carregar skins';
        console.error(error);
      } finally {
        this.loading = false;
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
    formatDate(dateString) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date);
    },
    confirmDelete(skin) {
      const confirm1 = confirm(`Tem certeza que deseja excluir a skin "${skin.name}"?`);
      if (confirm1) {
        const confirm2 = confirm('Esta ação não pode ser desfeita. Confirmar exclusão?');
        if (confirm2) {
          this.deleteSkin(skin.id);
        }
      }
    },
    async deleteSkin(id) {
      try {
        await adminService.deleteSkin(id);
        this.skins = this.skins.filter(s => s.id !== id);
        // Show success notification
        alert('Skin excluída com sucesso!');
      } catch (error) {
        alert(error.response?.data?.error || 'Erro ao excluir skin');
      }
    }
  }
}
</script>

<style scoped>
.admin-skins {
  min-height: 100vh;
  display: flex;
  background: var(--color-dark);
}

.admin-content {
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left 0.3s ease;
}

body.sidebar-collapsed .admin-content {
  margin-left: 80px;
}

.admin-header {
  width: 100%;
  background: linear-gradient(135deg, 
    var(--color-dark-secondary) 0%, 
    var(--color-dark-tertiary) 100%);
  border-bottom: 1px solid var(--color-border);
  padding: 24px 40px;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
  color: var(--color-dark);
  border: none;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}

.btn-icon {
  width: 18px;
  height: 18px;
  color: currentColor;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
}

.admin-main {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

/* Filters Bar */
.filters-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
  padding: 20px;
  background: linear-gradient(135deg, 
    var(--color-dark-secondary) 0%, 
    var(--color-dark-tertiary) 100%);
  border: 1px solid var(--color-border);
  border-radius: 16px;
}

.search-box {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 16px;
  width: 20px;
  height: 20px;
  color: var(--color-text-secondary);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  background: var(--color-dark);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  color: var(--color-text);
  font-size: 16px;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
}

.total-badge {
  padding: 10px 20px;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid var(--color-border-gold);
  border-radius: 20px;
  color: var(--color-gold);
  font-weight: 700;
  font-size: 14px;
}

/* Skins Grid */
.skins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.skin-card {
  background: linear-gradient(135deg, 
    var(--color-dark-secondary) 0%, 
    var(--color-dark-tertiary) 100%);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.skin-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  border-color: var(--color-border-gold);
}

.skin-image-wrapper {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: var(--color-dark);
}

.skin-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.skin-card:hover .skin-image {
  transform: scale(1.1);
}

.skin-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(4px);
}

.skin-card:hover .skin-overlay {
  opacity: 1;
}

.skin-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.action-btn svg {
  width: 20px;
  height: 20px;
}

.edit-btn {
  background: linear-gradient(135deg, var(--color-blue) 0%, var(--color-blue-dark) 100%);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.4);
}

.edit-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(25, 118, 210, 0.6);
}

.delete-btn {
  background: linear-gradient(135deg, var(--color-red) 0%, var(--color-red-dark) 100%);
  box-shadow: 0 4px 12px rgba(198, 40, 40, 0.4);
}

.delete-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(198, 40, 40, 0.6);
}

.skin-rarity-badge {
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
}

.skin-info {
  padding: 20px;
}

.skin-name {
  color: var(--color-text);
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px 0;
}

.skin-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.skin-hero,
.skin-value {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.meta-icon {
  width: 16px;
  height: 16px;
  color: currentColor;
  flex-shrink: 0;
}

.skin-value {
  color: var(--color-gold);
  font-weight: 700;
}

.skin-date {
  color: var(--color-text-tertiary);
  font-size: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
}

/* Loading & Empty States */
.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: var(--color-dark-secondary);
  border: 1px solid var(--color-border);
  border-radius: 16px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-gold);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-icon,
.empty-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 20px;
  color: var(--color-text-tertiary);
  opacity: 0.5;
}

.error-state h3,
.empty-state h3 {
  color: var(--color-text);
  font-size: 24px;
  margin: 0 0 8px 0;
}

.error-state p,
.empty-state p {
  color: var(--color-text-secondary);
  margin: 0 0 24px 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .admin-content {
    margin-left: 80px;
  }
  
  body.sidebar-collapsed .admin-content {
    margin-left: 80px;
  }
}

@media (max-width: 768px) {
  .admin-content {
    margin-left: 0;
  }

  .admin-header {
    padding: 20px;
    flex-direction: column;
    gap: 16px;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .admin-main {
    padding: 20px;
  }

  .filters-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .skins-grid {
    grid-template-columns: 1fr;
  }
}
</style>
