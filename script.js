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

    // Hero fade-out on scroll
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const fadeStart = 0;
        const fadeEnd = window.innerHeight * 0.80;

        const heroFade = () => {
            const scrollY = window.scrollY;
            const progress = Math.min(Math.max((scrollY - fadeStart) / (fadeEnd - fadeStart), 0), 1);
            const opacity = 1 - progress;
            const scale = 1 - (progress * 0.05);  // sutil zoom-out

            heroSection.style.opacity = opacity;
            heroSection.style.transform = `scale(${scale})`;
        };

        window.addEventListener('scroll', heroFade, { passive: true });
        heroFade();
    }

    // A lógica de menu e cabeçalho agora está unificada no header.js

    // ─── THEME MANAGEMENT ───
    // States: 'auto' (follows system), 'escuro' (forced dark), 'claro' (forced light)
    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro';
    }

    function applyTheme(mode) {
        const html = document.documentElement;
        html.classList.remove('tema-escuro', 'tema-claro');

        if (mode === 'escuro') {
            html.classList.add('tema-escuro');
        } else if (mode === 'claro') {
            html.classList.add('tema-claro');
        }
        // 'auto' → no class, CSS @media handles it

        // Update icon in header
        updateThemeIcon(mode);
    }

    function updateThemeIcon(mode) {
        const icon = document.getElementById('theme-toggle-icon');
        if (!icon) return;

        icon.classList.remove('fa-circle-half-stroke', 'fa-moon', 'fa-sun');

        if (mode === 'auto') {
            icon.classList.add('fa-circle-half-stroke');
            icon.title = 'Tema: Automático (sistema)';
        } else if (mode === 'escuro') {
            icon.classList.add('fa-moon');
            icon.title = 'Tema: Escuro';
        } else {
            icon.classList.add('fa-sun');
            icon.title = 'Tema: Claro';
        }
    }

    window.toggleTema = function() {
        const saved = localStorage.getItem('tema') || 'auto';
        let next;
        if (saved === 'auto') next = 'escuro';
        else if (saved === 'escuro') next = 'claro';
        else next = 'auto';

        localStorage.setItem('tema', next);
        applyTheme(next);
    };

    // Listen for system theme changes (when user is in 'auto' mode)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const saved = localStorage.getItem('tema') || 'auto';
        if (saved === 'auto') {
            applyTheme('auto');
        }
    });

    // Initialize theme
    const savedTheme = localStorage.getItem('tema') || 'auto';
    applyTheme(savedTheme);

    // Accessibility Functions (alto contraste — kept separate from dark mode)
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

    // Load saved accessibility preferences
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