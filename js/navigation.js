document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // Fonction pour basculer le menu
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    // Event listener pour le bouton du menu
    menuToggle.addEventListener('click', toggleMenu);

    // Fermer le menu quand on clique sur un lien
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    // Ajuster la navigation lors du défilement
    let lastScroll = 0;
    const nav = document.querySelector('.nav-container');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            // Défilement vers le bas
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            // Défilement vers le haut
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Gestion du fil d'Ariane
    function updateBreadcrumb() {
        const sections = ['accueil', 'about', 'projets', 'competences', 'contact'];
        const breadcrumb = document.querySelector('.breadcrumb');
        const currentSectionElement = document.getElementById('currentSection');
        
        // Détecter la section visible
        const currentSection = sections.find(section => {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom >= 100;
            }
            return false;
        });

        if (currentSection) {
            // Mettre à jour le texte
            const sectionName = currentSection.charAt(0).toUpperCase() + currentSection.slice(1);
            currentSectionElement.querySelector('span').textContent = sectionName;
            
            // Afficher le fil d'Ariane
            breadcrumb.classList.add('visible');
            
            // Ajouter une icône appropriée
            const icon = currentSectionElement.querySelector('i');
            icon.className = 'fas'; // Réinitialiser la classe
            
            switch(currentSection) {
                case 'about':
                    icon.classList.add('fa-user');
                    break;
                case 'projets':
                    icon.classList.add('fa-code');
                    break;
                case 'competences':
                    icon.classList.add('fa-tools');
                    break;
                case 'contact':
                    icon.classList.add('fa-envelope');
                    break;
                default:
                    icon.classList.add('fa-chevron-right');
            }
        } else {
            breadcrumb.classList.remove('visible');
        }
    }

    // Écouter le défilement
    window.addEventListener('scroll', updateBreadcrumb);
    // Initialiser le fil d'Ariane
    document.addEventListener('DOMContentLoaded', updateBreadcrumb);
}); 