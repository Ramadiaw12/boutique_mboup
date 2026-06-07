/**
 * Boutique MBOUP - Site Vitrine
 * JavaScript moderne avec animations et interactions
 */

// ===== ATTENDRE QUE LE DOM SOIT CHARGÉ =====
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. LOADER ---
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="spinner"></div>';
    document.body.prepend(loader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hide');
            setTimeout(() => loader.remove(), 500);
        }, 500);
    });
    
    // --- 2. HEADER SCROLL EFFECT ---
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // --- 3. MENU MOBILE - Fermeture automatique ---
    const menuCheckbox = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuCheckbox && menuCheckbox.checked) {
                menuCheckbox.checked = false;
            }
        });
    });
    
    // --- 4. ANIMATION AU SCROLL (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer les cartes produits
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observer les cartes catégories
    document.querySelectorAll('.category-card').forEach(card => {
        observer.observe(card);
    });
    
    // --- 5. FILTRES PRODUITS (simulation) ---
    const filterLinks = document.querySelectorAll('.filter-link');
    
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Activer le filtre
            filterLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const filterValue = link.textContent;
            showToast(`Filtre: ${filterValue}`, 'info');
        });
    });
    
    // --- 6. GESTION DES TAILLES (page produit) ---
    const sizeBtns = document.querySelectorAll('.size-btn');
    
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showToast(`Taille ${btn.textContent} sélectionnée`, 'info');
        });
    });
    
    // --- 7. COPIE DU LIEN WHATSAPP PRÉ-REMPLI ---
    const whatsappBtns = document.querySelectorAll('.btn-whatsapp, .product-actions .btn-whatsapp');
    
    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const message = btn.getAttribute('href');
            if (message && message.includes('wa.me')) {
                console.log('Ouverture WhatsApp...');
            }
        });
    });
    
    // --- 8. MODAL DE CONFIRMATION POUR COMMANDE ---
    const commandeBtns = document.querySelectorAll('.btn-whatsapp');
    
    commandeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!btn.hasAttribute('data-no-modal')) {
                e.preventDefault();
                const href = btn.getAttribute('href');
                
                const modal = document.createElement('div');
                modal.className = 'modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <i class="fas fa-shopping-cart" style="font-size: 48px; color: #e67e22; margin-bottom: 20px;"></i>
                        <h3>Confirmation</h3>
                        <p>Vous allez être redirigé vers WhatsApp pour finaliser votre commande.</p>
                        <button class="modal-close">Continuer</button>
                    </div>
                `;
                
                document.body.appendChild(modal);
                modal.classList.add('show');
                
                const closeBtn = modal.querySelector('.modal-close');
                closeBtn.addEventListener('click', () => {
                    modal.remove();
                    window.open(href, '_blank');
                });
                
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.remove();
                    }
                });
            }
        });
    });
    
    // --- 9. FORMULAIRE DE CONTACT AVEC VALIDATION ---
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = contactForm.querySelector('[name="name"]')?.value;
            const email = contactForm.querySelector('[name="_replyto"]')?.value;
            const message = contactForm.querySelector('[name="message"]')?.value;
            
            if (!name || !email || !message) {
                showToast('Veuillez remplir tous les champs obligatoires', 'error');
                return;
            }
            
            if (!email.includes('@')) {
                showToast('Veuillez entrer un email valide', 'error');
                return;
            }
            
            // Simulation d'envoi
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showToast('Message envoyé avec succès ! Nous vous répondrons sous 24h.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
            
            // En réel, décommentez pour Formspree
            // const response = await fetch(contactForm.action, {
            //     method: 'POST',
            //     body: new FormData(contactForm),
            //     headers: { 'Accept': 'application/json' }
            // });
        });
    }
    
    // --- 10. TOAST NOTIFICATION ---
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        
        let icon = 'ℹ️';
        if (type === 'success') icon = '✅';
        if (type === 'error') icon = '❌';
        if (type === 'info') icon = 'ℹ️';
        
        toast.innerHTML = `${icon} ${message}`;
        
        if (type === 'success') toast.style.background = '#1e8449';
        if (type === 'error') toast.style.background = '#c0392b';
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    // Exposer la fonction globalement
    window.showToast = showToast;
    
    // --- 11. BACK TO TOP BUTTON ---
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #e67e22;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // --- 12. ANIMATION SUR LE TITRE DE LA PAGE ---
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.style.opacity = '0';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
        }, 100);
    }
    
    // --- 13. GESTION DES IMAGES PRODUITS (hover galerie) ---
    const thumbs = document.querySelectorAll('.thumb');
    const mainImg = document.getElementById('mainProductImage');
    
    if (thumbs.length && mainImg) {
        thumbs.forEach(thumb => {
            thumb.addEventListener('mouseover', () => {
                mainImg.src = thumb.src;
            });
        });
    }
    
    // --- 14. SMOOTH SCROLL POUR LIENS INTERNES ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // --- 15. DÉTECTION DU RÉSEAU (pour info) ---
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.saveData) {
            console.log('Mode économie de données actif');
        }
    }
    
    console.log('Site MBOUP chargé avec succès !');
});