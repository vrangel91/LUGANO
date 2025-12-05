<template>
  <div class="admin-login">
    <div class="login-background">
      <div class="bg-pattern"></div>
      <div class="bg-gradient"></div>
    </div>
    
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="logo-wrapper">
            <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h1 class="login-title">RGC Admin</h1>
          </div>
          <p class="login-subtitle">Painel de Administração</p>
        </div>

        <form @submit.prevent="login" class="login-form">
          <div v-if="error" class="alert alert-error">
            <svg class="alert-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 17H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10.29 3.86L1.82 18C1.64543 18.3024 1.55299 18.6453 1.55201 18.9945C1.55103 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7238C2.83871 20.9009 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9009 21.4623 20.7238C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5318 3.56622 13.2807 3.32311 12.9812 3.15447C12.6817 2.98584 12.3438 2.89725 12 2.89725C11.6562 2.89725 11.3183 2.98584 11.0188 3.15447C10.7193 3.32311 10.4682 3.56622 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ error }}</span>
          </div>

          <div class="form-group">
            <label class="form-label">Username</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <input
                type="text"
                v-model="username"
                required
                autocomplete="username"
                class="form-input"
                placeholder="Digite seu username"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Senha</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <input
                type="password"
                v-model="password"
                required
                autocomplete="current-password"
                class="form-input"
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          <button 
            type="submit" 
            class="btn-login" 
            :disabled="loading"
          >
            <span v-if="loading" class="btn-spinner"></span>
            <span v-else>Entrar</span>
          </button>
        </form>

        <div class="login-footer">
          <router-link to="/" class="back-link">
            ← Voltar ao site
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { adminService } from '../../services/adminService';

export default {
  name: 'AdminLogin',
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      error: null
    }
  },
  methods: {
    async login() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await adminService.login(this.username, this.password);
        localStorage.setItem('adminToken', response.data.token);
        this.$router.push('/a/d');
      } catch (error) {
        this.error = error.response?.data?.error || 'Erro ao fazer login. Verifique suas credenciais.';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.admin-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
  background: var(--color-dark);
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(198, 40, 40, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 20%, rgba(25, 118, 210, 0.1) 0%, transparent 50%);
  animation: pulse 8s ease-in-out infinite;
}

.bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(10, 10, 10, 0.9) 0%, 
    rgba(26, 26, 26, 0.95) 100%);
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
}

.login-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 440px;
}

.login-card {
  background: linear-gradient(135deg, 
    var(--color-dark-secondary) 0%, 
    var(--color-dark-tertiary) 100%);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 12px;
}

.logo-icon {
  width: 48px;
  height: 48px;
  color: var(--color-gold);
  filter: drop-shadow(0 0 12px rgba(255, 215, 0, 0.5));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.login-title {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.login-subtitle {
  color: var(--color-text-secondary);
  font-size: 14px;
  margin: 0;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.alert {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
}

.alert-error {
  background: rgba(198, 40, 40, 0.1);
  border: 1px solid var(--color-red);
  color: var(--color-red);
}

.alert-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: currentColor;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-label {
  color: var(--color-text);
  font-weight: 600;
  font-size: 14px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 16px;
  width: 20px;
  height: 20px;
  color: var(--color-text-secondary);
  z-index: 1;
  pointer-events: none;
}

.form-input {
  width: 100%;
  padding: 16px 16px 16px 52px;
  background: var(--color-dark);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  color: var(--color-text);
  font-size: 16px;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
}

.form-input::placeholder {
  color: var(--color-text-tertiary);
}

.btn-login {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
  color: var(--color-dark);
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid var(--color-dark);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.login-footer {
  margin-top: 32px;
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
}

.back-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.back-link:hover {
  color: var(--color-gold);
  transform: translateX(-4px);
}

@media (max-width: 768px) {
  .login-card {
    padding: 36px 28px;
  }

  .login-title {
    font-size: 28px;
  }
}
</style>
