document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Logic
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', reveal);
    reveal(); // Initial check

    // A lógica de menu e cabeçalho agora está unificada no header.js

    // Accessibility Functions
    window.toggleAltoContraste = function() {
        document.documentElement.classList.toggle('alto-contraste');
        const isHighContrast = document.documentElement.classList.contains('alto-contraste');
        localStorage.setItem('altoContraste', isHighContrast);
    };

    window.toggleVLibras = function() {
        const vlibrasButton = document.querySelector('[vw-access-button]');
        if (vlibrasButton) {
            vlibrasButton.click();
        }
    };

    // Load saved preferences
    if (localStorage.getItem('altoContraste') === 'true') {
        document.documentElement.classList.add('alto-contraste');
    }

    // Card Glow Effect Tracking
    const cards = document.querySelectorAll('.card');
    
    if (cards.length > 0) {
        document.addEventListener('pointermove', (e) => {
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--x', x);
                card.style.setProperty('--y', y);
            });
        });

        // Intersection Observer for Touch Devices (Mobile viewport activation)
        if (window.matchMedia('(hover: none)').matches || window.innerWidth <= 1024) {
            const observerOptions = {
                root: null,
                rootMargin: '-30% 0px -30% 0px', // Trigger zone in the middle 40% of screen
                threshold: 0
            };
            
            const activeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-active');
                    } else {
                        entry.target.classList.remove('is-active');
                    }
                });
            }, observerOptions);

            cards.forEach(card => activeObserver.observe(card));
        }
    }

    // A lógica de data do rodapé agora é gerenciada pelo footer.js

    // Hero images: smooth load-in
    const heroLayers = document.querySelectorAll('.hero-parallax-layer--front');
    heroLayers.forEach((img) => {
        if (!(img instanceof HTMLImageElement)) return;
        const markLoaded = () => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => img.classList.add('is-loaded'));
            });
        };
        if (img.complete && img.naturalWidth > 0) {
            markLoaded();
        } else {
            img.addEventListener('load', markLoaded, { once: true });
            img.addEventListener('error', () => img.classList.add('is-loaded'), { once: true });
        }
    });
});