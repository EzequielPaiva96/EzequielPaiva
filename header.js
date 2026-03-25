/**
 * Componente de Cabeçalho Dinâmico para Ezequiel Paiva - Soluções em TI
 * Redesign Light Theme — Inspirado no Google Antigravity
 */

function initHeader() {
    const isSubpage = window.location.pathname.includes('/servicos/');
    const basePath = isSubpage ? '../' : '';
    const indexLink = isSubpage ? '../index.html' : '#';
    const logoPath = isSubpage ? '../assets/logo.webp' : 'assets/logo.webp';

    const headerHTML = `
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-4 flex justify-between items-center">
        <!-- Logo e Título -->
        <a href="${indexLink}" class="flex items-center gap-3 group">
            <img src="${logoPath}" alt="Logo Ezequiel Paiva" fetchpriority="high" loading="eager" class="w-10 h-10 rounded-xl object-contain group-hover:rotate-6 transition-transform duration-300">
            <div class="flex flex-col">
                <span class="text-xl font-bold tracking-tight text-texto-claro group-hover:text-acento transition-colors">Ezequiel Paiva</span>
                <span class="text-[10px] uppercase tracking-[0.2em] font-semibold text-texto-secundario">Soluções em TI</span>
            </div>
        </a>
        
        <!-- Menu Desktop -->
        <div class="hidden lg:flex space-x-8 text-sm font-medium text-texto-secundario">
            <a href="${indexLink}" class="hover:text-acento transition duration-300">Home</a>
            <a href="${isSubpage ? '../index.html#servicos' : '#servicos'}" class="hover:text-acento transition duration-300">Serviços</a>
            <a href="${isSubpage ? '../index.html#experiencia' : '#experiencia'}" class="hover:text-acento transition duration-300">Resultados</a>
            <a href="${isSubpage ? '../index.html#atendimento' : '#atendimento'}" class="hover:text-acento transition duration-300">Quem Atendemos</a>
            <a href="${isSubpage ? '../index.html#contato' : '#contato'}" class="hover:text-acento transition duration-300">Contato</a>
        </div>
        
        <!-- Ferramentas e Mobile -->
        <div class="flex items-center gap-2 sm:gap-3">
            <button onclick="toggleAltoContraste()" title="Alto Contraste" class="p-2 flex items-center justify-center transition-all duration-300 text-texto-secundario hover:text-acento rounded-xl hover:bg-fundo-secundario">
                <i class="fas fa-circle-half-stroke text-lg"></i>
            </button>
            <button onclick="toggleVLibras()" title="VLibras" class="p-2 flex items-center justify-center transition-all duration-300 text-texto-secundario hover:text-acento rounded-xl hover:bg-fundo-secundario">
                <i class="fas fa-hands-asl-interpreting text-md"></i>
            </button>
            
            <button id="mobile-menu-button" class="lg:hidden flex items-center justify-center p-2 focus:outline-none rounded-xl hover:bg-fundo-secundario transition-colors">
                <div class="hamburger-icon" id="hamburger-icon">
                    <div class="hamburger-line line-1"></div>
                    <div class="hamburger-line line-2"></div>
                    <div class="hamburger-line line-3"></div>
                </div>
            </button>
        </div>
    </nav>

    <!-- Menu Mobile -->
    <div id="mobile-menu" class="lg:hidden overflow-hidden max-h-0 opacity-0 px-4 space-y-1 text-center transition-all duration-300 ease-in-out bg-fundo-principal">
        <a href="${indexLink}" class="block py-3 text-texto-claro hover:text-acento transition duration-300 rounded-xl hover:bg-fundo-secundario">Home</a>
        <a href="${isSubpage ? '../index.html#servicos' : '#servicos'}" class="block py-3 text-texto-claro hover:text-acento transition duration-300 rounded-xl hover:bg-fundo-secundario">Serviços</a>
        <a href="${isSubpage ? '../index.html#experiencia' : '#experiencia'}" class="block py-3 text-texto-claro hover:text-acento transition duration-300 rounded-xl hover:bg-fundo-secundario">Resultados</a>
        <a href="${isSubpage ? '../index.html#atendimento' : '#atendimento'}" class="block py-3 text-texto-claro hover:text-acento transition duration-300 rounded-xl hover:bg-fundo-secundario">Quem Atendemos</a>
        <a href="${isSubpage ? '../index.html#contato' : '#contato'}" class="block py-3 text-texto-claro hover:text-acento transition duration-300 rounded-xl hover:bg-fundo-secundario">Contato</a>
        <div class="flex justify-center gap-6 py-4 border-t border-borda mt-2">
            <a href="https://linkedin.com" target="_blank" class="text-texto-secundario hover:text-acento transition-colors"><i class="fab fa-linkedin text-lg"></i></a>
            <a href="https://instagram.com" target="_blank" class="text-texto-secundario hover:text-acento transition-colors"><i class="fab fa-instagram text-lg"></i></a>
        </div>
    </div>
    `;

    const container = document.getElementById('site-header-container');
    if (container) {
        container.innerHTML = headerHTML;
        initMobileMenu();
    }
}

function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('menu-active');
            if (hamburgerIcon) {
                hamburgerIcon.classList.toggle('hamburger-active');
            }
        });

        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('menu-active');
                if (hamburgerIcon) hamburgerIcon.classList.remove('hamburger-active');
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', initHeader);
