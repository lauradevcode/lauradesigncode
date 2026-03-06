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

// Contador animado
function animateCounter(element, target, duration = 2000, suffix = '') {
    const increment = target / (duration / 16);
    let current = 0;
    
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

function startCounters() {
    const projectCount = document.getElementById('projectCount');
    const ratingCount = document.getElementById('ratingCount');
    
    if (projectCount && !projectCount.dataset.animated) {
        animateCounter(projectCount, 20, 2000, '+');
        projectCount.dataset.animated = 'true';
    }
    
    if (ratingCount && !ratingCount.dataset.animated) {
        animateCounter(ratingCount, 9.1, 2000, '★');
        ratingCount.dataset.animated = 'true';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Observar elementos fade-up
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    
    // Iniciar contadores quando hero estiver visível
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        heroObserver.observe(heroSection);
    }
});

// Mobile menu
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
let scrollPosition = 0;

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        const isOpening = !mobileMenu.classList.contains('active');
        mobileMenu.classList.toggle('active');
        
        const icon = mobileMenuToggle.querySelector('i');
        if (isOpening) {
            icon.classList.replace('fa-bars', 'fa-times');
            scrollPosition = window.pageYOffset;
            document.body.style.cssText = `overflow:hidden;position:fixed;top:-${scrollPosition}px;width:100%`;
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
            document.body.style.cssText = '';
            window.scrollTo(0, scrollPosition);
        }
    });
    
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.replace('fa-times', 'fa-bars');
            document.body.style.cssText = '';
            window.scrollTo(0, scrollPosition);
        });
    });
}

// ESC fecha o menu mobile
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.replace('fa-times', 'fa-bars');
        document.body.style.cssText = '';
        window.scrollTo(0, scrollPosition);
    }
});

// Smooth scroll - APENAS para links âncora (#), NÃO para links externos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Active nav link baseado no scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-menu a[href^="#"]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
            });
        }
    });
}

// Debounce para performance
function debounce(fn, wait) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}

window.addEventListener('scroll', debounce(updateActiveNav, 80));

// CSS para nav ativa
const styleNav = document.createElement('style');
styleNav.textContent = `.nav-links a.active, .mobile-menu a.active { color: var(--red) !important; }`;
document.head.appendChild(styleNav);

// iOS Safari fix
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    const viewport = document.querySelector('meta[name="viewport"]');
    viewport?.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
}

console.log('Portfolio Laura Lopes - Carregado ✅');    