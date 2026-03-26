/**
 * Componente de Rodapé Dinâmico para Ezequiel Paiva - Soluções em TI
 * Redesign Light Theme — Inspirado no Google Antigravity
 */

function initFooter() {
    const isSubpage = window.location.pathname.includes('/servicos/');
    const indexLink = isSubpage ? '../index.html' : '';
    const currentYear = new Date().getFullYear();

    const footerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-sm">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 pb-8 text-center md:text-left">
            <!-- Sobre -->
            <div class="reveal">
                <div class="flex items-center gap-2 justify-center md:justify-start mb-4">
                    <span class="text-xl font-bold text-texto-claro">Ezequiel Paiva</span>
                    <span class="text-xs font-semibold text-acento bg-acento/10 px-2 py-0.5 rounded-full">TI</span>
                </div>
                <p class="text-texto-secundario leading-relaxed">Transformando tecnologia em vantagem competitiva para o seu negócio.</p>
                <div class="flex justify-center md:justify-start gap-4 mt-5">
                    <a href="https://linkedin.com" target="_blank" class="w-10 h-10 flex items-center justify-center rounded-xl bg-fundo-secundario hover:bg-acento hover:text-white text-texto-secundario transition-all duration-300">
                        <i class="fab fa-linkedin text-lg"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" class="w-10 h-10 flex items-center justify-center rounded-xl bg-fundo-secundario hover:bg-acento hover:text-white text-texto-secundario transition-all duration-300">
                        <i class="fab fa-instagram text-lg"></i>
                    </a>
                </div>
            </div>

            <!-- Contato -->
            <div class="reveal">
                <h4 class="font-semibold text-texto-claro mb-4">Contato</h4>
                <div class="space-y-3">
                    <p class="text-texto-secundario flex items-center justify-center md:justify-start gap-2">
                        <span class="w-8 h-8 flex items-center justify-center rounded-lg bg-acento/10 text-acento text-xs"><i class="fas fa-envelope"></i></span>
                        contato@ezequielpaiva.com.br
                    </p>
                    <p class="text-texto-secundario flex items-center justify-center md:justify-start gap-2">
                        <span class="w-8 h-8 flex items-center justify-center rounded-lg bg-acento/10 text-acento text-xs"><i class="fas fa-phone"></i></span>
                        (98) 98420-4274
                    </p>
                    <p class="text-texto-secundario flex items-center justify-center md:justify-start gap-2">
                        <span class="w-8 h-8 flex items-center justify-center rounded-lg bg-acento/10 text-acento text-xs"><i class="fas fa-location-dot"></i></span>
                        São Luís, Maranhão
                    </p>
                </div>
            </div>

            <!-- Navegação Rápida -->
            <div class="reveal">
                <h4 class="font-semibold text-texto-claro mb-4">Navegação</h4>
                <ul class="space-y-3">
                    <li><a href="${indexLink}#servicos" class="text-texto-secundario hover:text-acento transition duration-300">Nossos Serviços</a></li>
                    <li><a href="${indexLink}#atendimento" class="text-texto-secundario hover:text-acento transition duration-300">Quem Atendemos</a></li>
                    <li><a href="${indexLink}#experiencia" class="text-texto-secundario hover:text-acento transition duration-300">Excelência</a></li>
                    <li><a href="${indexLink}#contato" class="text-texto-secundario hover:text-acento transition duration-300">Fale Conosco</a></li>
                </ul>
            </div>
        </div>
        
        <div class="text-center pt-8 border-t border-borda text-texto-secundario text-xs">
            &copy; ${currentYear} Paiva Soluções Tecnológicas. Todos os direitos reservados.
        </div>
    </div>
    
    <!-- Botão Whatsapp Flutuante -->
    <a href="https://wa.me/+5598984204274" target="_blank"
        class="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110 z-50 flex items-center justify-center hover:shadow-xl">
        <i class="fab fa-whatsapp text-2xl"></i>
    </a>
    `;

    const container = document.getElementById('site-footer-container');
    if (container) {
        container.innerHTML = footerHTML;
    }
}

document.addEventListener('DOMContentLoaded', initFooter);
