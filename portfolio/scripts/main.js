// Animations GSAP améliorées
gsap.registerPlugin(ScrollTrigger);

// Animation d'entrée de la page
gsap.from('.hero-content', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: "power4.out",
    stagger: 0.2
});

// Animation des sections au scroll
document.querySelectorAll('section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Animation du curseur personnalisé
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out"
    });
});

// Animation des cartes de projet au hover
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Animation des compétences
const animateSkills = () => {
    document.querySelectorAll('.skill-card').forEach(card => {
        const level = card.querySelector('.skill-level');
        gsap.to(level, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            width: level.style.getPropertyValue('--level'),
            duration: 1.5,
            ease: "power3.out"
        });
    });
};

// Effet parallaxe sur le hero
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    gsap.to('.hero-content', {
        x: moveX,
        y: moveY,
        duration: 1,
        ease: "power2.out"
    });
});

// Projets exemple
const projects = [
    {
        title: 'Projet 1',
        description: 'Description du projet 1',
        image: 'path/to/image1.jpg',
        technologies: ['HTML', 'CSS', 'JavaScript']
    },
    // Ajoutez d'autres projets
];

// Fonction pour créer les cartes de projet
function createProjectCards() {
    const projectGrid = document.querySelector('.project-grid');
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="technologies">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
        `;
        projectGrid.appendChild(card);
    });
}

// Animation des compétences lors du scroll
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelector('.skill-level').style.width = 
                entry.target.querySelector('.skill-level').style.getPropertyValue('--level');
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
});

// Smooth scroll pour la navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialisation
createProjectCards();
animateSkills();

// Ajoutez ce code pour le menu mobile
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-container');
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    hamburger.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    nav.insertBefore(hamburger, nav.querySelector('.nav-links'));
};

// Ajout du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Création des particules
const createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.width = particle.style.height = Math.random() * 5 + 'px';
        particlesContainer.appendChild(particle);
    }
};

// Animation du curseur personnalisé améliorée
const cursor = document.querySelector('.custom-cursor');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const animateCursor = () => {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(animateCursor);
};

// Effet de parallaxe amélioré
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    gsap.to('.hero-content', {
        rotateX: moveY * 2,
        rotateY: -moveX * 2,
        duration: 1,
        ease: 'power2.out'
    });
});

// Animation des sections au scroll
const animateSections = () => {
    gsap.utils.toArray('section').forEach((section, i) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            toggleClass: 'visible',
            onEnter: () => {
                gsap.to(section, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out'
                });
            },
            onLeaveBack: () => {
                gsap.to(section, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                });
            }
        });
    });
};

// Initialisation
createParticles();
animateCursor();
animateSections();
createMobileMenu(); 