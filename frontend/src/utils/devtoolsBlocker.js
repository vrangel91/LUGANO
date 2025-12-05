// Sistema de bloqueio de DevTools
export function initDevToolsBlocker() {
  if (typeof window === 'undefined') return;

  // Detectar abertura do DevTools
  let devtools = {
    open: false,
    orientation: null
  };

  const threshold = 160;

  // Monitorar redimensionamento
  const checkDevTools = setInterval(() => {
    if (
      window.outerHeight - window.innerHeight > threshold ||
      window.outerWidth - window.innerWidth > threshold
    ) {
      if (!devtools.open) {
        devtools.open = true;
        blockAccess();
      }
    } else {
      devtools.open = false;
    }
  }, 500);

  // Função para bloquear acesso com layout moderno
  function blockAccess() {
    document.body.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
          color: #fff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          overflow: hidden;
          position: relative;
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .container {
          text-align: center;
          z-index: 10;
          position: relative;
          animation: fadeInUp 0.8s ease-out;
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
        
        .icon-container {
          margin-bottom: 30px;
          position: relative;
        }
        
        .lock-icon {
          width: 120px;
          height: 120px;
          margin: 0 auto;
          position: relative;
          animation: lockPulse 2s ease-in-out infinite;
        }
        
        @keyframes lockPulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.5));
          }
          50% {
            transform: scale(1.1);
            filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.8));
          }
        }
        
        .lock-icon svg {
          width: 100%;
          height: 100%;
          stroke: #ffd700;
          fill: none;
          stroke-width: 2;
          filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.6));
        }
        
        .title {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s ease infinite;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 40px;
          letter-spacing: 1px;
          animation: fadeIn 1s ease-out 0.3s both;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .message {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 30px;
          animation: fadeIn 1s ease-out 0.6s both;
        }
        
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }
        
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 215, 0, 0.6);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }
        
        .particle:nth-child(1) { left: 10%; animation-delay: 0s; animation-duration: 8s; }
        .particle:nth-child(2) { left: 20%; animation-delay: 1s; animation-duration: 7s; }
        .particle:nth-child(3) { left: 30%; animation-delay: 2s; animation-duration: 9s; }
        .particle:nth-child(4) { left: 40%; animation-delay: 0.5s; animation-duration: 6s; }
        .particle:nth-child(5) { left: 50%; animation-delay: 1.5s; animation-duration: 8s; }
        .particle:nth-child(6) { left: 60%; animation-delay: 2.5s; animation-duration: 7s; }
        .particle:nth-child(7) { left: 70%; animation-delay: 0.8s; animation-duration: 9s; }
        .particle:nth-child(8) { left: 80%; animation-delay: 1.8s; animation-duration: 6s; }
        .particle:nth-child(9) { left: 90%; animation-delay: 2.8s; animation-duration: 8s; }
        
        .glow-effect {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          animation: glowPulse 3s ease-in-out infinite;
          z-index: 0;
        }
        
        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
      </style>
      
      <div class="particles">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
      </div>
      
      <div class="glow-effect"></div>
      
      <div class="container">
        <div class="icon-container">
          <div class="lock-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="16" r="1" fill="currentColor"/>
            </svg>
          </div>
        </div>
        
        <h1 class="title">Acesso Negado</h1>
        <p class="subtitle">Esta ação não é permitida</p>
        <p class="message">Redirecionando...</p>
      </div>
    `;
    
    document.body.style.cssText = 'margin: 0; padding: 0; overflow: hidden;';
    
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  // Detectar console aberto
  const element = new Image();
  Object.defineProperty(element, 'id', {
    get: function() {
      blockAccess();
    }
  });

  // Bloquear métodos do console
  const consoleMethods = [
    'log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml',
    'group', 'groupEnd', 'time', 'timeEnd', 'count', 'trace', 'profile',
    'profileEnd', 'table', 'clear', 'groupCollapsed'
  ];

  consoleMethods.forEach(method => {
    try {
      console[method] = function() {};
    } catch (e) {}
  });

  // Bloquear atalhos
  document.addEventListener('keydown', (e) => {
    // F12
    if (e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      blockAccess();
      return false;
    }
    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      e.preventDefault();
      e.stopPropagation();
      blockAccess();
      return false;
    }
    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      e.preventDefault();
      e.stopPropagation();
      blockAccess();
      return false;
    }
    // Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
      e.preventDefault();
      e.stopPropagation();
      blockAccess();
      return false;
    }
    // Ctrl+U (view source)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Ctrl+S (save)
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Ctrl+P (print)
    if (e.ctrlKey && e.keyCode === 80) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);

  // Bloquear menu de contexto
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, true);

  // Bloquear seleção de texto
  document.addEventListener('selectstart', (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, true);

  // Bloquear drag
  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, true);

  // Bloquear copy
  document.addEventListener('copy', (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, true);

  // Bloquear cut
  document.addEventListener('cut', (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, true);

  // Proteger objetos globais
  try {
    Object.freeze(Object);
    Object.freeze(Array);
    Object.freeze(String);
    Object.freeze(Number);
  } catch (e) {}

  return () => {
    clearInterval(checkDevTools);
  };
}

