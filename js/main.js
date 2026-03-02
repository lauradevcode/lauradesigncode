// Intersection Observer for fade-up animations
const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Contador em tempo real
function animateCounter(element, target, duration = 2000, suffix = '') {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (suffix === '★') {
            element.textContent = current.toFixed(1) + suffix;
        } else if (suffix === '+') {
            element.textContent = Math.floor(current) + suffix;
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Iniciar contadores quando visíveis
function startCounters() {
    const projectCount = document.getElementById('projectCount');
    const ratingCount = document.getElementById('ratingCount');
    
    if (projectCount && ratingCount) {
        // Verificar se os elementos já foram animados
        if (!projectCount.dataset.animated) {
            animateCounter(projectCount, 20, 2000, '+');
            projectCount.dataset.animated = 'true';
        }
        
        if (!ratingCount.dataset.animated) {
            animateCounter(ratingCount, 9.1, 2000, '★');
            ratingCount.dataset.animated = 'true';
        }
    }
}

// Observe all fade-up elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));
    
    // Iniciar contadores quando a seção hero estiver visível
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroSection);
    }
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        
        // Toggle icon
        const icon = mobileMenuToggle.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Smooth scroll for anchor links - SEM BLOQUEIO DE BOTÕES
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Permitir cliques normais em botões WhatsApp
        if (!anchor.getAttribute('href').includes('wa.me')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-menu a[href^="#"]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active,
    .mobile-menu a.active {
        color: var(--red) !important;
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section (CORRIGIDO - BOTÕES SEMPRE CLICÁVEIS)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero .container');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (hero && heroContent) {
        // Aplicar parallax apenas ao conteúdo de texto, não aos botões
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        
        // GARANTIR QUE BOTÕES SEMPRE ESTEJAM VISÍVEIS E CLICÁVEIS
        if (heroButtons) {
            heroButtons.style.opacity = '1';
            heroButtons.style.pointerEvents = 'auto';
            heroButtons.style.zIndex = '1000';
            heroButtons.style.position = 'relative';
        }
        
        // Manter opacidade do container para efeito visual sem afetar botões
        heroContent.style.opacity = Math.max(0.7, 1 - (scrolled * 0.0005));
    }
});

// Add loading animation for images (removido opacity: 0)
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
});

// Add CSS for image loading (removido opacity: 0)
const imgStyle = document.createElement('style');
imgStyle.textContent = `
    img.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(imgStyle);

// Prevent scroll jump when menu is open
let scrollPosition = 0;

mobileMenuToggle?.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
        scrollPosition = window.pageYOffset;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';
    } else {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollPosition);
    }
});

// Fix for iOS Safari viewport issues
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
if (isIOS) {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedUpdateNav = debounce(updateActiveNav, 100);
window.addEventListener('scroll', debouncedUpdateNav);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        
        // Restore scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollPosition);
    }
});

// Form validation (if you add forms later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Add CSS for form validation
const formStyle = document.createElement('style');
formStyle.textContent = `
    input.error, textarea.error {
        border-color: var(--red) !important;
        box-shadow: 0 0 0 2px rgba(230, 57, 70, 0.2) !important;
    }
`;
document.head.appendChild(formStyle);

console.log('Portfolio Laura Lopes - Carregado com sucesso');
