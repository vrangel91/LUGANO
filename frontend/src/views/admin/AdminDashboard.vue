<template>
  <div class="admin-dashboard">
    <AdminSidebar />
    <div class="admin-content">
      <header class="admin-header">
        <div class="header-content">
          <h1 class="page-title">Dashboard</h1>
          <div class="header-actions">
            <div class="user-info">
              <svg class="user-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="username">Admin</span>
            </div>
          </div>
        </div>
      </header>

      <main class="admin-main">
        <div class="container">
          <!-- Stats Cards -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3 9H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9 21V9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="stat-content">
                <h3 class="stat-label">Total de Skins</h3>
                <p class="stat-number">{{ stats.totalSkins }}</p>
                <span class="stat-change positive">+{{ recentSkins.length }} recentes</span>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="stat-content">
                <h3 class="stat-label">Total de Heróis</h3>
                <p class="stat-number">{{ stats.totalHeroes }}</p>
                <span class="stat-change">Ativos</span>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 3H18L22 9L12 22L2 9L6 3Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11 3L8 9L12 22L16 9L13 3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 9H22" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="stat-content">
                <h3 class="stat-label">Valor Total</h3>
                <p class="stat-number">R$ {{ formatTotalValue() }}</p>
                <span class="stat-change">Inventário</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="quick-actions">
            <h2 class="section-title">Ações Rápidas</h2>
            <div class="actions-grid">
              <router-link to="/a/i/n" class="action-card">
                <svg class="action-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h3>Adicionar Skin</h3>
                <p>Criar uma nova skin no catálogo</p>
              </router-link>
              
              <router-link to="/a/i" class="action-card">
                <svg class="action-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5C15 5.53043 14.7893 6.03914 14.4142 6.41421C14.0391 6.78929 13.5304 7 13 7H11C10.4696 7 9.96086 6.78929 9.58579 6.41421C9.21071 6.03914 9 5.53043 9 5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9 12H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9 16H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h3>Gerenciar Skins</h3>
                <p>Visualizar e editar todas as skins</p>
              </router-link>
            </div>
          </div>

          <!-- Recent Skins -->
          <div class="recent-section">
            <div class="section-header">
              <h2 class="section-title">Últimas Skins Adicionadas</h2>
              <router-link to="/a/i" class="view-all-link">
                Ver todas →
              </router-link>
            </div>

            <div v-if="loading" class="loading-state">
              <div class="spinner"></div>
              <p>Carregando...</p>
            </div>

            <div v-else-if="recentSkins.length === 0" class="empty-state">
              <svg class="empty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 16V8C21 7.46957 20.7893 6.96086 20.4142 6.58579C20.0391 6.21071 19.5304 6 19 6H5C4.46957 6 3.96086 6.21071 3.58579 6.58579C3.21071 6.96086 3 7.46957 3 8V16C3 16.5304 3.21071 17.0391 3.58579 17.4142C3.96086 17.7893 4.46957 18 5 18H19C19.5304 18 20.0391 17.7893 20.4142 17.4142C20.7893 17.0391 21 16.5304 21 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 10H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <h3>Nenhuma skin cadastrada</h3>
              <p>Comece adicionando sua primeira skin!</p>
              <router-link to="/a/i/n" class="btn-primary">
                Adicionar Skin
              </router-link>
            </div>

            <div v-else class="recent-skins-grid">
              <div 
                v-for="skin in recentSkins" 
                :key="skin.id" 
                class="recent-skin-card"
              >
                <div class="skin-image-wrapper">
                  <img 
                    :src="getImageUrl(skin.imageUrl)" 
                    :alt="skin.name" 
                    class="skin-image"
                  />
                  <div class="skin-rarity-badge" :class="`rarity-${skin.rarity.toLowerCase()}`">
                    {{ skin.rarity }}
                  </div>
                </div>
                <div class="skin-info">
                  <h3 class="skin-name">{{ skin.name }}</h3>
                  <p class="skin-hero">{{ skin.hero.name }}</p>
                  <div class="skin-footer">
                    <span class="skin-value">R$ {{ formatValue(skin.value) }}</span>
                    <router-link 
                      :to="`/a/i/e/${skin.id}`" 
                      class="edit-link"
                    >
                      Editar →
                    </router-link>
                  </div>
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
import { heroService } from '../../services/heroService';

export default {
  name: 'AdminDashboard',
  components: {
    AdminSidebar
  },
  data() {
    return {
      stats: {
        totalSkins: 0,
        totalHeroes: 0
      },
      recentSkins: [],
      loading: true
    }
  },
  async mounted() {
    await this.loadStats();
  },
  methods: {
    async loadStats() {
      this.loading = true;
      try {
        const [skinsRes, heroesRes] = await Promise.all([
          adminService.getSkins(),
          heroService.getAll()
        ]);
        
        this.stats.totalSkins = skinsRes.data.length;
        this.stats.totalHeroes = heroesRes.data.length;
        this.recentSkins = skinsRes.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
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
    formatTotalValue() {
      const total = this.recentSkins.reduce((sum, skin) => sum + parseFloat(skin.value || 0), 0);
      return this.formatValue(total);
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
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

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.user-icon {
  width: 20px;
  height: 20px;
  color: var(--color-text);
}

.username {
  color: var(--color-text);
  font-weight: 600;
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

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.stat-card {
  background: linear-gradient(135deg, 
    var(--color-dark-secondary) 0%, 
    var(--color-dark-tertiary) 100%);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, 
    var(--color-gold) 0%, 
    var(--color-gold-dark) 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  border-color: var(--color-border-gold);
}

.stat-card:hover::before {
  transform: scaleX(1);
}

.stat-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.stat-icon svg {
  width: 32px;
  height: 32px;
}

.stat-content {
  flex: 1;
}

.stat-label {
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 4px 0;
  line-height: 1;
}

.stat-change {
  font-size: 12px;
  color: var(--color-text-tertiary);
  font-weight: 500;
}

.stat-change.positive {
  color: #4caf50;
}

/* Quick Actions */
.quick-actions {
  margin-bottom: 40px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 20px 0;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.action-card {
  background: linear-gradient(135deg, 
    var(--color-dark-secondary) 0%, 
    var(--color-dark-tertiary) 100%);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 28px;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.action-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-gold);
  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.2);
}

.action-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  color: var(--color-gold);
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.3));
}

.action-card h3 {
  color: var(--color-gold);
  font-size: 18px;
  margin: 0 0 8px 0;
}

.action-card p {
  color: var(--color-text-secondary);
  font-size: 14px;
  margin: 0;
}

/* Recent Section */
.recent-section {
  margin-top: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.view-all-link {
  color: var(--color-gold);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
}

.view-all-link:hover {
  color: var(--color-gold-light);
  transform: translateX(4px);
}

.recent-skins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.recent-skin-card {
  background: linear-gradient(135deg, 
    var(--color-dark-secondary) 0%, 
    var(--color-dark-tertiary) 100%);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.recent-skin-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  border-color: var(--color-border-gold);
}

.skin-image-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: var(--color-dark);
}

.skin-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.recent-skin-card:hover .skin-image {
  transform: scale(1.1);
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
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.skin-hero {
  color: var(--color-text-secondary);
  font-size: 14px;
  margin: 0 0 16px 0;
}

.skin-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skin-value {
  color: var(--color-gold);
  font-size: 20px;
  font-weight: 700;
}

.edit-link {
  color: var(--color-blue);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.edit-link:hover {
  color: var(--color-blue-light);
  transform: translateX(4px);
}

/* Loading & Empty States */
.loading-state,
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

.empty-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 20px;
  color: var(--color-text-tertiary);
  opacity: 0.5;
}

.empty-state h3 {
  color: var(--color-text);
  font-size: 24px;
  margin: 0 0 8px 0;
}

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
  }

  .admin-main {
    padding: 20px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .recent-skins-grid {
    grid-template-columns: 1fr;
  }
}
</style>
