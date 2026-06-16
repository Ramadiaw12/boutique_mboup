// Animation au scroll
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Filtres dynamiques
    const filterLinks = document.querySelectorAll('.filter-link');
    const products = document.querySelectorAll('.product-card');
    
    if (filterLinks.length > 0) {
        filterLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                filterLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                products.forEach(product => {
                    if (filterValue === 'all') {
                        product.style.display = 'block';
                        product.style.animation = 'fadeInUp 0.5s ease';
                    } else {
                        const category = product.getAttribute('data-category');
                        if (category === filterValue) {
                            product.style.display = 'block';
                            product.style.animation = 'fadeInUp 0.5s ease';
                        } else {
                            product.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Menu mobile
    const menuCheckbox = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuCheckbox) menuCheckbox.checked = false;
        });
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== "#" && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = '#fff8f0';
            header.style.boxShadow = '0 5px 20px rgba(74, 55, 40, 0.1)';
        } else {
            header.style.background = '#fff8f0';
            header.style.boxShadow = '0 2px 20px rgba(74, 55, 40, 0.08)';
        }
    });
    
    // Animation hover sur les produits
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });
});


// ===== PAGINATION POUR COLLECTION ENFANT =====
document.addEventListener('DOMContentLoaded', function() {
    const pageLinks = document.querySelectorAll('.page-link');
    const pages = {
        '1': document.getElementById('page1'),
        '2': document.getElementById('page2'),
        '3': document.getElementById('page3')
    };
    
    // Fonction pour changer de page
    function showPage(pageNumber) {
        // Masquer toutes les pages
        Object.values(pages).forEach(page => {
            if (page) page.classList.remove('active');
        });
        
        // Afficher la page sélectionnée
        if (pages[pageNumber]) {
            pages[pageNumber].classList.add('active');
        }
        
        // Mettre à jour la classe active des liens
        pageLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') == pageNumber) {
                link.classList.add('active');
            }
        });
        
        // Scroll en haut de la page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Gérer les clics sur les liens de pagination
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageNumber = this.getAttribute('data-page');
            
            if (pageNumber && pages[pageNumber]) {
                showPage(pageNumber);
            }
        });
    });
    
    // Afficher la page 1 par défaut
    showPage('1');
});


// ===== PAGINATION POUR COLLECTION HOMME =====
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer toutes les pages
    const pages = {
        '1': document.getElementById('page1'),
        '2': document.getElementById('page2'),
        '3': document.getElementById('page3')
    };
    
    // Récupérer tous les liens de pagination
    const pageLinks = document.querySelectorAll('.page-link');
    let currentPage = 1;
    const totalPages = 3;
    
    // Fonction pour afficher une page
    function showPage(pageNumber) {
        // Vérifier que la page existe
        if (!pages[pageNumber]) return;
        
        // Masquer toutes les pages
        Object.values(pages).forEach(page => {
            if (page) page.classList.remove('active');
        });
        
        // Afficher la page sélectionnée
        pages[pageNumber].classList.add('active');
        currentPage = pageNumber;
        
        // Mettre à jour la classe active des liens
        pageLinks.forEach(link => {
            link.classList.remove('active');
            const page = link.getAttribute('data-page');
            
            // Si c'est un numéro de page
            if (page === String(pageNumber)) {
                link.classList.add('active');
            }
            
            // Gérer les flèches (elles n'ont pas de classe active)
            if (page === 'prev' || page === 'next') {
                link.classList.remove('active');
            }
        });
        
        // Scroll en haut de la page
        const productsSection = document.querySelector('.products-page') || document.querySelector('main');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Gérer les clics sur les liens de pagination
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const action = this.getAttribute('data-page');
            
            if (action === 'prev') {
                // Page précédente
                if (currentPage > 1) {
                    showPage(currentPage - 1);
                }
            } else if (action === 'next') {
                // Page suivante
                if (currentPage < totalPages) {
                    showPage(currentPage + 1);
                }
            } else {
                // Page spécifique (1, 2, 3)
                const pageNumber = parseInt(action);
                if (pageNumber >= 1 && pageNumber <= totalPages) {
                    showPage(pageNumber);
                }
            }
        });
    });
    
    // Afficher la page 1 par défaut
    showPage(1);
});