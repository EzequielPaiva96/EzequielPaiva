/**
 * Componente de Rodapé Dinâmico para Ezequiel Paiva - Soluções em TI
 */

function initFooter() {
    const isSubpage = window.location.pathname.includes('/servicos/');
    const indexLink = isSubpage ? '../index.html' : '#';
    const currentYear = new Date().getFullYear();

    const footerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-sm">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pb-6 md:text-left">
            <!-- Sobre -->
            <div class="reveal">
                <h4 class="text-xl font-bold text-acento mb-3">Ezequiel Paiva | <span class="text-texto-claro">Soluções em TI </span></h4>
                <p class="text-texto-secundario">Transformando tecnologia em vantagem competitiva para o seu negócio.</p>
                <div class="flex md:justify-start gap-4 mt-4 text-texto-claro">
                    <a href="https://linkedin.com" target="_blank" class="hover:text-acento transition-colors"><i class="fab fa-linkedin text-xl"></i></a>
                    <a href="https://instagram.com" target="_blank" class="hover:text-acento transition-colors"><i class="fab fa-instagram text-xl"></i></a>
                </div>
            </div>

            <!-- Contato -->
            <div class="reveal">
                <h4 class="font-semibold text-texto-claro mb-3">Contato</h4>
                <p class="text-texto-secundario mb-1"><i class="fas fa-envelope text-acento mr-2"></i> contato@ezequielpaiva.com.br</p>
                <p class="text-texto-secundario mb-1"><i class="fas fa-phone text-acento mr-2"></i> (98) 98420-4274</p>
                <p class="text-texto-secundario"><i class="fas fa-location-dot text-acento mr-2"></i> São Luís, Maranhão</p>
            </div>

            <!-- Navegação Rápida -->
            <div class="reveal">
                <h4 class="font-semibold text-texto-claro mb-3">Navegação</h4>
                <ul class="space-y-2">
                    <li><a href="${indexLink}#servicos" class="text-texto-secundario hover:text-acento transition duration-300">Nossos Serviços</a></li>
                    <li><a href="${indexLink}#atendimento" class="text-texto-secundario hover:text-acento transition duration-300">Quem Atendemos</a></li>
                    <li><a href="${indexLink}#experiencia" class="text-texto-secundario hover:text-acento transition duration-300">Excelência</a></li>
                    <li><a href="${indexLink}#contato" class="text-texto-secundario hover:text-acento transition duration-300">Fale Conosco</a></li>
                </ul>
            </div>
        </div>
        
        <div class="text-center pt-8 border-t border-neutral-800 text-texto-secundario">
            &copy; ${currentYear} Paiva Soluções Tecnológicas. Todos os direitos reservados.
        </div>
    </div>
    
    <!-- Botão Whatsapp Flutuante -->
    <a href="https://wa.me/+5598984204274" target="_blank"
        class="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110 z-50 flex items-center justify-center">
        <i class="fab fa-whatsapp text-2xl"></i>
    </a>
    `;

    const container = document.getElementById('site-footer-container');
    if (container) {
        container.innerHTML = footerHTML;
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initFooter);
