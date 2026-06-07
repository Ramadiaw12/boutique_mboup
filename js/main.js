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