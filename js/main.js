/**
 * Boutique MBOUP - Design Marron/Beige/Or
 * Animations et interactions élégantes
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- LOADER ---
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
    
    // --- HEADER SCROLL EFFECT ---
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
    
    // --- BACK TO TOP BUTTON ---
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // --- ANIMATION AU SCROLL (Intersection Observer) ---
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
    
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
    
    document.querySelectorAll('.category-card').forEach(card => {
        observer.observe(card);
    });
    
    // --- TOAST NOTIFICATION ---
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        
        let icon = '✨';
        if (type === 'success') icon = '✓';
        if (type === 'error') icon = '✗';
        
        toast.innerHTML = `${icon} ${message}`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    window.showToast = showToast;
    
    // --- MENU MOBILE - Fermeture automatique ---
    const menuCheckbox = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuCheckbox && menuCheckbox.checked) {
                menuCheckbox.checked = false;
            }
        });
    });
    
    // --- FILTRES PRODUITS ---
    const filterLinks = document.querySelectorAll('.filter-link');
    
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            filterLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            showToast(`${link.textContent} sélectionné`, 'success');
        });
    });
    
    // --- GESTION DES TAILLES ---
    const sizeBtns = document.querySelectorAll('.size-btn');
    
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showToast(`Taille ${btn.textContent} sélectionnée`, 'success');
        });
    });
    
    // --- MODAL DE CONFIRMATION ---
    const commandeBtns = document.querySelectorAll('.btn-whatsapp');
    
    commandeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!btn.hasAttribute('data-no-modal') && !btn.getAttribute('href')?.includes('mailto')) {
                e.preventDefault();
                const href = btn.getAttribute('href');
                
                const modal = document.createElement('div');
                modal.className = 'modal';
                modal.style.cssText = `
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(42, 27, 15, 0.9);
                    z-index: 2000;
                    justify-content: center;
                    align-items: center;
                `;
                modal.innerHTML = `
                    <div style="
                        background: linear-gradient(135deg, #faf6f0, #e8d9c5);
                        padding: 35px;
                        border-radius: 20px;
                        max-width: 450px;
                        text-align: center;
                        animation: fadeInUp 0.3s;
                        border: 1px solid #d4af37;
                    ">
                        <i class="fas fa-gem" style="font-size: 48px; color: #d4af37; margin-bottom: 20px;"></i>
                        <h3 style="color: #4a2c1a;">Confirmation</h3>
                        <p style="color: #7a5230; margin: 15px 0;">Vous allez être redirigé vers WhatsApp pour finaliser votre commande.</p>
                        <button class="modal-close" style="
                            background: linear-gradient(135deg, #d4af37, #b8860b);
                            color: #4a2c1a;
                            border: none;
                            padding: 12px 30px;
                            border-radius: 50px;
                            cursor: pointer;
                            font-weight: 600;
                            margin-top: 15px;
                        ">Continuer</button>
                    </div>
                `;
                
                document.body.appendChild(modal);
                modal.style.display = 'flex';
                
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
    
    // --- FORMULAIRE CONTACT ---
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = contactForm.querySelector('[name="name"]')?.value;
            const email = contactForm.querySelector('[name="_replyto"]')?.value;
            const message = contactForm.querySelector('[name="message"]')?.value;
            
            if (!name || !email || !message) {
                showToast('Veuillez remplir tous les champs', 'error');
                return;
            }
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showToast('Message envoyé avec succès ! ✨', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // --- GALERIE PRODUIT (hover) ---
    const thumbs = document.querySelectorAll('.thumb');
    const mainImg = document.getElementById('mainProductImage');
    
    if (thumbs.length && mainImg) {
        thumbs.forEach(thumb => {
            thumb.addEventListener('mouseover', () => {
                mainImg.src = thumb.src;
            });
        });
    }
    
    // --- ANIMATION D'ENTRÉE POUR LE HERO ---
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.opacity = '1';
        }, 100);
    }
    
    console.log('✨ Boutique MBOUP - Design Marron, Beige & Or chargé ✨');
    
    // --- DÉCORATION DE BIENVENUE ---
    setTimeout(() => {
        showToast('Bienvenue chez Boutique MBOUP ✨', 'success');
    }, 800);
});