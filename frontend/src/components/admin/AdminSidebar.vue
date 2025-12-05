<template>
  <aside class="admin-sidebar" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-header">
      <div class="logo">
        <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="logo-text" v-if="!isCollapsed">RGC Admin</span>
      </div>
      <button @click="toggleCollapse" class="collapse-btn" title="Recolher menu">
        <span v-if="!isCollapsed">‹</span>
        <span v-else>›</span>
      </button>
    </div>

    <nav class="sidebar-nav">
      <router-link 
        to="/a/d" 
        class="nav-item"
        active-class="active"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="14" y="3" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="3" y="14" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="14" y="14" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="nav-text" v-if="!isCollapsed">Dashboard</span>
      </router-link>
      
      <router-link 
        to="/a/i" 
        class="nav-item"
        active-class="active"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 9H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 21V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="nav-text" v-if="!isCollapsed">Gerenciar Skins</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <button @click="logout" class="logout-btn">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="nav-text" v-if="!isCollapsed">Sair</span>
      </button>
      <router-link to="/" class="back-site-link" v-if="!isCollapsed">
        ← Voltar ao site
      </router-link>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'AdminSidebar',
  data() {
    return {
      isCollapsed: false
    }
  },
  watch: {
    isCollapsed(newVal) {
      if (newVal) {
        document.body.classList.add('sidebar-collapsed');
      } else {
        document.body.classList.remove('sidebar-collapsed');
      }
    }
  },
  mounted() {
    // Aplicar estado inicial
    if (this.isCollapsed) {
      document.body.classList.add('sidebar-collapsed');
    }
  },
  beforeUnmount() {
    // Limpar classe ao desmontar
    document.body.classList.remove('sidebar-collapsed');
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    logout() {
      localStorage.removeItem('adminToken');
      this.$router.push('/a');
    }
  }
}
</script>

<style scoped>
.admin-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 280px;
  background: linear-gradient(180deg, 
    var(--color-dark-secondary) 0%, 
    var(--color-dark) 100%);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  transition: width 0.3s ease;
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.5);
}

.admin-sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 215, 0, 0.05);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 20px;
  color: var(--color-gold);
}

.logo-icon {
  width: 28px;
  height: 28px;
  color: var(--color-gold);
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.5));
}

.logo-text {
  white-space: nowrap;
  transition: opacity 0.3s ease;
}

.collapse-btn {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.2s ease;
}

.collapse-btn:hover {
  background: var(--color-dark-tertiary);
  border-color: var(--color-gold);
  color: var(--color-gold);
}

.sidebar-nav {
  flex: 1;
  padding: 20px 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  position: relative;
}

.nav-item:hover {
  background: rgba(255, 215, 0, 0.05);
  color: var(--color-text);
  border-left-color: var(--color-gold);
}

.nav-item.active {
  background: linear-gradient(90deg, 
    rgba(255, 215, 0, 0.1) 0%, 
    transparent 100%);
  color: var(--color-gold);
  border-left-color: var(--color-gold);
  font-weight: 600;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, 
    var(--color-gold) 0%, 
    var(--color-gold-dark) 100%);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.nav-icon {
  width: 20px;
  height: 20px;
  min-width: 20px;
  color: currentColor;
  flex-shrink: 0;
}

.nav-text {
  white-space: nowrap;
  transition: opacity 0.3s ease;
}

.admin-sidebar.collapsed .nav-text,
.admin-sidebar.collapsed .logo-text {
  opacity: 0;
  width: 0;
  overflow: hidden;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
}

.logout-btn:hover {
  background: rgba(198, 40, 40, 0.1);
  border-color: var(--color-red);
  color: var(--color-red);
}

.back-site-link {
  color: var(--color-text-tertiary);
  text-decoration: none;
  font-size: 13px;
  padding: 8px;
  text-align: center;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.back-site-link:hover {
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.05);
}

/* Scrollbar personalizada */
.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 3px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: var(--color-border-light);
}

@media (max-width: 768px) {
  .admin-sidebar {
    width: 80px;
  }
  
  .admin-sidebar:not(.collapsed) {
    width: 280px;
  }
}
</style>

