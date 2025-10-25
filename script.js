function openModal(title, content) {
    const modal = document.getElementById('service-modal');
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-content').innerText = content;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('service-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    const closeMobileMenu = () => {
        mobileMenu.classList.add('hidden');
    };

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    const serviceModal = document.getElementById('service-modal');
    const serviceCards = document.querySelectorAll('.card');

    serviceCards.forEach(card => {
        const onClickString = card.getAttribute('onclick');
        if (onClickString) {
            const match = onClickString.match(/openModal\('(.*?)', '(.*?)'\)/);
            if (match && match.length === 3) {
                const title = match[1];
                const content = match[2];
                
                card.removeAttribute('onclick');
                
                card.addEventListener('click', function() {
                    openModal(title, content);
                });
            } else {
                console.warn("Estrutura do atributo onclick incorreta no card:", card);
                card.addEventListener('click', function() {
                    const fallbackTitle = this.querySelector('h4').innerText || 'Detalhes do Serviço';
                    const fallbackContent = this.querySelector('p').innerText || 'Sem descrição detalhada.';
                    openModal(fallbackTitle, fallbackContent);
                });
            }
        }
    });

    if (serviceModal) {
        serviceModal.addEventListener('click', function(e) {
            if (e.target.id === 'service-modal') {
                closeModal();
            }
        });
    }
});