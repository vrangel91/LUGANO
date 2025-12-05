<template>
  <footer class="footer">
    <div class="footer-background"></div>
    <div class="footer-content">
      <div class="footer-section">
        <h3 class="footer-title">RGC SHOP</h3>
        <p class="footer-description">
          Catálogo premium de skins Dota 1. Encontre as melhores skins para seus heróis favoritos.
        </p>
      </div>

      <div class="footer-section">
        <h4 class="footer-subtitle">Navegação</h4>
        <ul class="footer-links">
          <li>
            <router-link to="/" class="footer-link">
              <span class="link-icon">📦</span>
              <span>Catálogo</span>
            </router-link>
          </li>
          <li v-if="isAdmin">
            <router-link to="/a/d" class="footer-link">
              <span class="link-icon">⚙️</span>
              <span>Painel Admin</span>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="footer-section">
        <h4 class="footer-subtitle">Contato</h4>
        <p class="footer-text">
          Entre em contato via WhatsApp para consultar sobre nossas skins disponíveis.
        </p>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-bottom-content">
        <p class="footer-copyright">
          © {{ currentYear }} RGC SHOP. Todos os direitos reservados.
        </p>
        <p class="footer-credit">
          Desenvolvido por <strong class="developer-name">
            <span class="name-text">viNNNNNNicius</span>
            <span class="particle particle-1"></span>
            <span class="particle particle-2"></span>
            <span class="particle particle-3"></span>
            <span class="particle particle-4"></span>
            <span class="particle particle-5"></span>
            <span class="neon-glow"></span>
            <span class="energy-wave"></span>
          </strong>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    isAdmin() {
      return localStorage.getItem('adminToken') !== null;
    },
    currentYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style scoped>
.footer {
  position: relative;
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 215, 0, 0.2);
  margin-top: auto;
  width: 100%;
  overflow: hidden;
}

.footer-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg,
      rgba(26, 26, 26, 0.8) 0%,
      rgba(10, 10, 10, 0.9) 100%);
  z-index: 0;
}

.footer-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 60px;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.footer-title {
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, var(--color-gold), #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 3px;
  margin: 0;
  text-transform: uppercase;
}

.footer-subtitle {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-gold);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  padding-bottom: 12px;
}

.footer-subtitle::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, var(--color-gold), transparent);
}

.footer-description {
  color: var(--color-text-secondary);
  font-size: 15px;
  line-height: 1.8;
  margin: 0;
}

.footer-text {
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.8;
  margin: 0;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 15px;
  transition: all 0.3s ease;
  padding: 8px 0;
  position: relative;
}

.footer-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 2px;
  background: var(--color-gold);
  transition: width 0.3s ease;
}

.footer-link:hover::before {
  width: 30px;
}

.footer-link:hover {
  color: var(--color-gold);
  transform: translateX(8px);
}

.link-icon {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.footer-link:hover .link-icon {
  transform: scale(1.2) rotate(5deg);
}

.footer-bottom {
  position: relative;
  z-index: 1;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.footer-bottom-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-copyright {
  color: var(--color-text-secondary);
  font-size: 14px;
  margin: 0;
}

.footer-credit {
  color: var(--color-text-secondary);
  font-size: 14px;
  margin: 0;
}

.footer-credit strong {
  color: var(--color-gold);
  font-weight: 600;
  position: relative;
}

.developer-name {
  display: inline-block;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: visible;
}

.name-text {
  position: relative;
  z-index: 5;
  display: inline-block;
  color: var(--color-gold);
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 
    0 0 5px rgba(255, 215, 0, 0.8),
    0 0 10px rgba(255, 215, 0, 0.6),
    0 0 15px rgba(255, 215, 0, 0.4),
    0 0 20px rgba(255, 215, 0, 0.2);
  animation: neon-flicker 3s ease-in-out infinite;
  transition: all 0.3s ease;
}

/* Partículas flutuantes */
.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--color-gold);
  border-radius: 50%;
  box-shadow: 
    0 0 6px rgba(255, 215, 0, 0.8),
    0 0 12px rgba(255, 215, 0, 0.6);
  pointer-events: none;
  z-index: 1;
  opacity: 0.8;
}

.particle-1 {
  top: -10px;
  left: 10%;
  animation: float-1 4s ease-in-out infinite;
}

.particle-2 {
  top: -5px;
  right: 15%;
  animation: float-2 3.5s ease-in-out infinite 0.5s;
}

.particle-3 {
  bottom: -8px;
  left: 20%;
  animation: float-3 4.5s ease-in-out infinite 1s;
}

.particle-4 {
  bottom: -12px;
  right: 25%;
  animation: float-4 3.8s ease-in-out infinite 1.5s;
}

.particle-5 {
  top: 50%;
  right: -15px;
  transform: translateY(-50%);
  animation: float-5 4.2s ease-in-out infinite 0.8s;
}

/* Neon Glow - camadas de brilho */
.neon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 150%;
  background: radial-gradient(ellipse at center,
    rgba(255, 215, 0, 0.3) 0%,
    rgba(255, 215, 0, 0.15) 40%,
    transparent 70%);
  z-index: 0;
  pointer-events: none;
  animation: glow-pulse 2s ease-in-out infinite;
  filter: blur(8px);
}

/* Energy Wave */
.energy-wave {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255, 215, 0, 0.8) 20%,
    rgba(255, 215, 0, 1) 50%,
    rgba(255, 215, 0, 0.8) 80%,
    transparent 100%);
  z-index: 2;
  pointer-events: none;
  animation: energy-wave 2.5s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
}

/* Animações */
@keyframes neon-flicker {
  0%, 100% {
    opacity: 1;
    text-shadow: 
      0 0 5px rgba(255, 215, 0, 0.8),
      0 0 10px rgba(255, 215, 0, 0.6),
      0 0 15px rgba(255, 215, 0, 0.4),
      0 0 20px rgba(255, 215, 0, 0.2);
  }
  50% {
    opacity: 0.95;
    text-shadow: 
      0 0 8px rgba(255, 215, 0, 1),
      0 0 15px rgba(255, 215, 0, 0.8),
      0 0 25px rgba(255, 215, 0, 0.6),
      0 0 35px rgba(255, 215, 0, 0.4);
  }
}

@keyframes float-1 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(15px, -20px) scale(1.2);
    opacity: 1;
  }
}

@keyframes float-2 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-20px, -15px) scale(1.3);
    opacity: 1;
  }
}

@keyframes float-3 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(20px, 15px) scale(1.1);
    opacity: 1;
  }
}

@keyframes float-4 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-15px, 20px) scale(1.2);
    opacity: 1;
  }
}

@keyframes float-5 {
  0%, 100% {
    transform: translateY(-50%) translateX(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-50%) translateX(-25px) scale(1.3);
    opacity: 1;
  }
}

@keyframes glow-pulse {
  0%, 100% {
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.7;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes energy-wave {
  0%, 100% {
    opacity: 0;
    transform: translate(-50%, -50%) scaleX(0.5);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scaleX(1);
  }
}

/* Hover Effects */
.developer-name:hover .name-text {
  color: #ffed4e;
  text-shadow: 
    0 0 10px rgba(255, 215, 0, 1),
    0 0 20px rgba(255, 215, 0, 0.8),
    0 0 30px rgba(255, 215, 0, 0.6),
    0 0 40px rgba(255, 215, 0, 0.4),
    0 0 50px rgba(255, 215, 0, 0.2);
  transform: scale(1.05);
  animation: neon-flicker-fast 1s ease-in-out infinite;
}

.developer-name:hover .particle {
  opacity: 1;
  box-shadow: 
    0 0 10px rgba(255, 215, 0, 1),
    0 0 20px rgba(255, 215, 0, 0.8);
  animation-duration: 1.5s;
}

.developer-name:hover .neon-glow {
  opacity: 0.8;
  animation: glow-pulse-fast 1s ease-in-out infinite;
  filter: blur(12px);
}

.developer-name:hover .energy-wave {
  animation: energy-wave-fast 1s ease-in-out infinite;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
}

@keyframes neon-flicker-fast {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.98;
  }
}

@keyframes glow-pulse-fast {
  0%, 100% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1.1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

@keyframes energy-wave-fast {
  0%, 100% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scaleX(0.8);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scaleX(1.2);
  }
}


@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 50px;
    padding: 60px 20px 40px;
  }

  .footer-title {
    font-size: 24px;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 15px;
    padding: 25px 20px;
  }
}
</style>
