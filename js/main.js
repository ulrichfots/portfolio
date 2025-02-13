// Gestion du chargement progressif
document.addEventListener('DOMContentLoaded', () => {
    // Animation d'entrée de la page
    const hero = document.querySelector('.hero-content');
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        hero.style.transition = 'all 1s ease';
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }, 300);

    // Gestion du thème
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Vérifier le thème enregistré ou la préférence système
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // Gestionnaire de changement de thème
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animation de transition
        document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
    });
    
    // Écouter les changements de préférence système
    prefersDarkScheme.addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
});

// Gestion du défilement fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Observer d'intersection pour les animations au défilement
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Ajout des éléments à observer
document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element);
});

// Gestion du sélecteur de langue
document.addEventListener('DOMContentLoaded', function() {
    const langSelector = document.querySelector('.language-selector');
    const currentLang = document.getElementById('currentLang');

    // Ouvrir/fermer le dropdown au clic
    currentLang.addEventListener('click', (e) => {
        e.stopPropagation();
        langSelector.classList.toggle('active');
    });

    // Fermer le dropdown en cliquant ailleurs
    document.addEventListener('click', () => {
        langSelector.classList.remove('active');
    });

    // Sélection d'une langue
    document.querySelectorAll('.lang-dropdown li').forEach(option => {
        option.addEventListener('click', (e) => {
            const lang = option.dataset.lang;
            const flag = option.querySelector('img').src;
            
            // Mettre à jour l'affichage
            currentLang.querySelector('img').src = flag;
            currentLang.querySelector('span').textContent = lang.toUpperCase();
            
            // Fermer le dropdown
            langSelector.classList.remove('active');
            
            // Ici vous pouvez ajouter la logique pour changer la langue
            console.log(`Langue sélectionnée : ${lang}`);
        });
    });
});

function changeLanguage(lang) {
    // Implémenter la logique de changement de langue
    // Par exemple, charger un fichier de traduction et mettre à jour le contenu
    console.log(`Changing language to: ${lang}`);
}

// Protection de la photo de profil
document.addEventListener('DOMContentLoaded', function() {
    const profileImage = document.querySelector('.profile-frame img');
    
    // Désactiver le clic droit
    profileImage.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    // Désactiver le copier-coller
    profileImage.addEventListener('copy', (e) => {
        e.preventDefault();
        return false;
    });

    // Désactiver le glisser-déposer
    profileImage.addEventListener('dragstart', (e) => {
        e.preventDefault();
        return false;
    });

    // Désactiver les raccourcis clavier
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && 
            (e.key === 'c' || e.key === 's' || e.key === 'u' || 
             e.key === 'p' || e.key === 'i')) {
            e.preventDefault();
            return false;
        }
    });
}); 