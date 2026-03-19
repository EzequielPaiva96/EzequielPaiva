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

    // Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

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

    // Footer Date logic
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});