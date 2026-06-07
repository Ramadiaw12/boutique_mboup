// Filtres dynamiques sur les pages catalogue
document.addEventListener('DOMContentLoaded', function() {
    // Filtrage des produits
    const filterLinks = document.querySelectorAll('.filter-link');
    const products = document.querySelectorAll('.product-card');
    
    if (filterLinks.length > 0) {
        filterLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Retirer la classe active de tous les filtres
                filterLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                products.forEach(product => {
                    if (filterValue === 'all') {
                        product.style.display = 'block';
                    } else {
                        const category = product.getAttribute('data-category');
                        if (category === filterValue) {
                            product.style.display = 'block';
                        } else {
                            product.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Menu mobile - fermeture automatique après clic
    const menuCheckbox = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuCheckbox) menuCheckbox.checked = false;
        });
    });
    
    // Animation smooth scroll pour les ancres
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
    
    // Gestion du changement d'image pour les variantes couleurs (si présent)
    const colorRadios = document.querySelectorAll('.color-radio');
    colorRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const newImageSrc = this.getAttribute('data-image');
            if (newImageSrc) {
                const mainImage = document.getElementById('mainImage');
                if (mainImage) mainImage.src = newImageSrc;
            }
        });
    });
});