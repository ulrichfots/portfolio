// Configuration de sécurité
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'votre_mot_de_passe_securise'
};

// Gestion de la connexion
async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Identifiants incorrects');
        }

        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        showDashboard();
    } catch (error) {
        alert(error.message);
    }
}

// Vérification de la session
function checkSession() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
        showDashboard();
    }
}

// Affichage du dashboard
function showDashboard() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'grid';
    loadAllData();
}

// Déconnexion
function handleLogout() {
    localStorage.removeItem('adminLoggedIn');
    location.reload();
}

// Remplacez les appels fetch par l'URL de votre API
const API_URL = 'http://localhost:3000/api';

// Chargement des données
function loadAllData() {
    fetch(`${API_URL}/formations`)
        .then(response => response.json())
        .then(data => {
            displayFormations(data);
        })
        .catch(error => console.error('Erreur:', error));
    
    // Charger les autres données...
}

// Affichage des formations
function displayFormations(formations) {
    const container = document.getElementById('formationsList');
    container.innerHTML = '';

    formations.forEach(formation => {
        const card = createFormationCard(formation);
        container.appendChild(card);
    });
}

// Création d'une carte de formation
function createFormationCard(formation) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
        <h4>${formation.title}</h4>
        <p>${formation.school}</p>
        <p>${formation.date}</p>
        <div class="card-actions">
            <button onclick="editItem('formation', ${formation.id})">
                <i class="fas fa-edit"></i>
            </button>
            <button onclick="deleteItem('formation', ${formation.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    return card;
}

// Édition d'un élément
function editItem(type, id) {
    // Afficher le modal d'édition avec les données de l'élément
    const modal = document.getElementById('editModal');
    modal.style.display = 'flex';
    // Charger les données dans le formulaire
}

// Suppression d'un élément
function deleteItem(type, id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
        // Appel API pour supprimer l'élément
        fetch(`/api/${type}/${id}`, {
            method: 'DELETE'
        })
        .then(() => loadAllData())
        .catch(error => console.error('Erreur:', error));
    }
}

// Navigation entre les onglets
document.querySelectorAll('.nav-tabs li').forEach(tab => {
    tab.addEventListener('click', () => {
        // Activer l'onglet
        document.querySelectorAll('.nav-tabs li').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Afficher la section correspondante
        const section = tab.dataset.tab;
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        document.getElementById(section).classList.add('active');
    });
});

// Initialisation
document.addEventListener('DOMContentLoaded', checkSession);

// Ajouter l'en-tête d'autorisation à toutes les requêtes
function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('adminToken');
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        }
    });
} 