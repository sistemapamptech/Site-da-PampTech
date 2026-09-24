/**
 * Pamptech - Script de Interatividade Completo
 */

// 1. Algoritmo de Rolagem Suave com Duração e Easing Customizáveis
function smoothScrollTo(targetPosition, duration) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // Função Easing para aceleração e desaceleração suave
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

document.addEventListener('DOMContentLoaded', () => {

  const SCROLL_DURATION = 800; // Tempo de deslizamento em ms (800ms = 0.8s)
  const HEADER_OFFSET = 85;    // Desconto da altura do cabeçalho fixo

  // 2. Manipulador de Rolagem Suave para os Links do Menu e para a Logo
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      // Se for apenas "#", ignora
      if (targetId === '#') return;

      // Voltar ao Topo suavemente (Clique na Logo ou em #topo)
      if (targetId === '#topo') {
        e.preventDefault();
        smoothScrollTo(0, SCROLL_DURATION);
        return;
      }

      // Deslizar até a seção (#sobre, #servicos, #portfolio, #contato)
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const elementPosition = targetElement.getBoundingClientRect().top;
        const targetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;
        
        smoothScrollTo(targetPosition, SCROLL_DURATION);
      }
    });
  });

  // 3. Menu Mobile Interativo (Abrir e Fechar)
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });

    // Fecha o menu mobile automaticamente ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }

  // 4. Animação ao Rolar a Página (Scroll Reveal)
  const revealElements = document.querySelectorAll('.reveal');

  const checkReveal = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < triggerBottom) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', checkReveal);
  checkReveal(); // Dispara o teste na carga inicial para revelar o topo

  // 5. Sombreamento no Header Fixo e Botão "Voltar ao Topo"
  const header = document.querySelector('header');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
      backToTopBtn?.classList.add('visible');
    } else {
      header?.classList.remove('scrolled');
      backToTopBtn?.classList.remove('visible');
    }
  });

  // 6. Contadores Numéricos Animados
  const counters = document.querySelectorAll('.counter-number');
  let animated = false;

  const startCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const speed = 200;
      const updateCount = () => {
        const count = +counter.innerText;
        const inc = target / speed;
        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  window.addEventListener('scroll', () => {
    const counterSection = document.querySelector('.counters-section');
    if (counterSection) {
      const top = counterSection.getBoundingClientRect().top;
      if (top < window.innerHeight && !animated) {
        startCounters();
        animated = true;
      }
    }
  });

  // 7. Envio do Formulário de Contato com Feedback Visual
  const form = document.getElementById('contactForm') || document.getElementById('formContato');
  const feedback = document.getElementById('formFeedback');
  const btnSubmit = document.getElementById('btnSubmit');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.innerText = 'Enviando...';
      }

      setTimeout(() => {
        if (feedback) {
          feedback.innerText = 'Mensagem enviada com sucesso! Entraremos em contato.';
          feedback.className = 'form-feedback success';
        }
        form.reset();
        
        if (btnSubmit) {
          btnSubmit.disabled = false;
          btnSubmit.innerText = 'Enviar Mensagem';
        }
      }, 1200);
    });
  }

});