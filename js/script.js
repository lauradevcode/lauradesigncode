// JSON-LD Structured Data for SEO
const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Laura Lopes",
    "jobTitle": "Desenvolvedora Web e Designer Digital",
    "description": "Especialista em desenvolvimento de sites e sistemas com design de impacto e automação inteligente",
    "url": "https://lauralopes.com",
    "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Purple%20Cartoon%20Gamer%20Girl%20Illustration%20Gaming%20Logo%20%284%29-SOsBEfHbZo8439hJf4zhz6IL6TGt05.png",
    "sameAs": [
        "https://www.behance.net/laurauxuidesigner"
    ],
    "offers": {
        "@type": "Service",
        "serviceType": ["Desenvolvimento Web", "Design Gráfico", "Automação Digital"],
        "description": "Sites modernos, responsivos e sistemas web completos"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "Portuguese"
    }
};

// Inject structured data into head
const script = document.createElement('script');
script.type = 'application/ld+json';
script.textContent = JSON.stringify(structuredData);
document.head.appendChild(script);

// Hamburger menu functionality
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
});

// Close menu when clicking on overlay
overlay.addEventListener('click', function() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
    });
});

let popupShown = false;

function showWhatsAppPopup() {
    if (!popupShown) {
        document.getElementById('whatsappPopup').classList.add('show');
        popupShown = true;
        
        setTimeout(() => {
            if (document.getElementById('whatsappPopup').classList.contains('show')) {
                closeWhatsAppPopup();
            }
        }, 5000);
    }
}

function closeWhatsAppPopup() {
    document.getElementById('whatsappPopup').classList.remove('show');
}

document.getElementById('whatsappFloat').addEventListener('click', function(e) {
    e.preventDefault();
    if (document.getElementById('whatsappPopup').classList.contains('show')) {
        const whatsappURL = 'https://wa.me/5561998548265?text=Oi! Vim do site. E quero fazer orçamento de...';
        window.open(whatsappURL, '_blank');
        closeWhatsAppPopup();
    } else {
        showWhatsAppPopup();
    }
});

setTimeout(showWhatsAppPopup, 3000);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    const serviceNames = {
        'design': 'Design Gráfico',
        'web': 'Desenvolvimento Web',
        'automacao': 'Automação & Chatbots',
        'completo': 'Projeto Completo'
    };
    
    const whatsappMessage = `Olá Laura! 👋

*Nome:* ${name}
*WhatsApp:* ${phone}
*Serviço:* ${serviceNames[service] || service}

*Projeto:*
${message}

Gostaria de solicitar um orçamento!`;
    
    const whatsappURL = `https://wa.me/5561998548265?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, '_blank');
});

window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.98)';
        nav.style.borderBottom = '1px solid rgba(220, 38, 127, 0.4)';
    } else {
        nav.style.background = 'rgba(20, 20, 20, 0.95)';
        nav.style.borderBottom = '1px solid rgba(220, 38, 127, 0.2)';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        ) || (
            rect.top < window.innerHeight && rect.bottom > 0
        );
    }

    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial, .fade-in-up');
        
        elements.forEach((element, index) => {
            if (isElementInViewport(element)) {
                setTimeout(() => {
                    element.classList.add('visible');
                }, index * 100);
            }
        });
    }

    animateOnScroll();

    window.addEventListener('scroll', animateOnScroll);

    const whatsappBtn = document.querySelector('.whatsapp-float');
    const popup = document.querySelector('.whatsapp-popup');

    whatsappBtn.addEventListener('mouseenter', function() {
        popup.style.display = 'block';
        setTimeout(() => {
            popup.style.opacity = '1';
            popup.style.transform = 'translateY(0)';
        }, 10);
    });

    whatsappBtn.addEventListener('mouseleave', function() {
        popup.style.opacity = '0';
        popup.style.transform = 'translateY(10px)';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
    });

    const buttons = document.querySelectorAll('.btn, .service-card, .portfolio-item');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});
