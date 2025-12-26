// Data
const hostels = [
    { name: "Colmena", logo: "images/colmena.jpeg", lat: -32.947, lng: -60.630, link: "https://instagram.com" },
    { name: "Hostel Point", logo: "images/hostelpoint.jpeg", lat: -32.940, lng: -60.645, link: "https://instagram.com" },
    { name: "Wolfhost", logo: "images/wolfhost.jpeg", lat: -32.950, lng: -60.650, link: "https://instagram.com" },
    { name: "High Hostel", logo: "images/highhostel.jpeg", lat: -32.935, lng: -60.640, link: "https://instagram.com" },
    { name: "La Nueva Comunidad", logo: "images/lanuevacomunidad.jpeg", lat: -32.955, lng: -60.635, link: "https://instagram.com" },
    { name: "Cool Raul", logo: "images/coolraulhostel.jpeg", lat: -32.942, lng: -60.638, link: "https://instagram.com" },
    { name: "Hostel Pop", logo: "images/hostelpop.jpeg", lat: -32.948, lng: -60.642, link: "https://instagram.com" },
    { name: "Sonder Hostel", logo: "images/sonderhostel.jpeg", lat: -32.938, lng: -60.655, link: "https://instagram.com" },
    { name: "Hostel RealRos", logo: "images/hostelrealros.jpeg", lat: -32.945, lng: -60.660, link: "https://instagram.com" },
    { name: "Hostel Freedom", logo: "images/hostelfreedom.jpeg", lat: -32.952, lng: -60.648, link: "https://instagram.com" }
];

const bars = [
    { name: "Anker", discount: "15% OFF", lat: -32.930, lng: -60.650 },
    { name: "Growler Pichincha", discount: "15% OFF", lat: -32.932, lng: -60.655 },
    { name: "Felling", discount: "15% OFF", lat: -32.935, lng: -60.660 },
    { name: "Mercado Zarpado", discount: "15% OFF", lat: -32.940, lng: -60.630 },
    { name: "Growler Terraza", discount: "15% OFF", lat: -32.945, lng: -60.635 },
    { name: "El Gran Chopp", discount: "25% OFF", lat: -32.950, lng: -60.640 },
    { name: "Growler Abasto", discount: "15% OFF", lat: -32.955, lng: -60.645 },
    { name: "Growler Col. Arq.", discount: "15% OFF", lat: -32.960, lng: -60.650 },
    { name: "Busquete", discount: "Consultar", lat: -32.938, lng: -60.642 },
    { name: "Lunvra", discount: "Consultar", lat: -32.942, lng: -60.648 },
    { name: "Beatmemo", discount: "Consultar", lat: -32.948, lng: -60.652 },
    { name: "Sodita", discount: "Consultar", lat: -32.952, lng: -60.658 }
];

// Initialize Carousel
function initCarousel() {
    const track = document.getElementById('hostelCarousel');
    // Duplicate items for infinite scroll effect
    const allHostels = [...hostels, ...hostels]; 
    
    allHostels.forEach(hostel => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
            <a href="${hostel.link}" target="_blank">
                <img src="${hostel.logo}" alt="${hostel.name}" title="${hostel.name}">
            </a>
        `;
        track.appendChild(item);
    });
}

// Initialize Maps
let mapHostels, mapBenefits;

function initMaps() {
    // Map Hostels (Main Page)
    mapHostels = L.map('map-hostels').setView([-32.94682, -60.63932], 13); // Rosario Center
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapHostels);

    const hostelIcon = L.icon({
        iconUrl: 'images/isologoverde.png', // Using logo as marker
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
    });

    hostels.forEach(h => {
        const customIcon = L.icon({
            iconUrl: h.logo,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20],
            className: 'map-marker-logo'
        });

        L.marker([h.lat, h.lng], {icon: customIcon})
            .addTo(mapHostels)
            .bindPopup(`<b>${h.name}</b>`);
    });
}

function initBenefitsMap() {
    if (mapBenefits) return; // Already initialized

    // Map Benefits (Modal)
    mapBenefits = L.map('map-benefits').setView([-32.94682, -60.63932], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapBenefits);

    // Bar Markers (Orange/Different)
    // Using a default marker with a different color filter or just default blue for now
    // Ideally we'd use a custom icon for bars
    bars.forEach(b => {
        L.marker([b.lat, b.lng])
            .addTo(mapBenefits)
            .bindPopup(`<b>${b.name}</b><br>${b.discount}`);
    });
}

// Benefits Modal Logic
const modal = document.getElementById('benefits-modal');
const qrModal = document.getElementById('qr-modal');
const btnAccess = document.getElementById('btn-access-benefits');
const btnNavBenefits = document.getElementById('btn-nav-benefits');
const btnClose = document.querySelector('.close-modal');
const btnCloseQr = document.querySelector('.close-qr');
const passwordScreen = document.getElementById('password-screen');
const benefitsContent = document.getElementById('benefits-content');
const btnSubmitPass = document.getElementById('btn-submit-password');
const inputPass = document.getElementById('benefit-password');
const errorMsg = document.getElementById('password-error');
const barsList = document.getElementById('bars-list');

// Populate Bars List
function populateBars() {
    barsList.innerHTML = '';
    bars.forEach(bar => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="bar-info">
                <span class="bar-name">${bar.name}</span>
                <span class="discount-badge">${bar.discount}</span>
            </div>
            <button class="btn-qr-small">OBTENER QR</button>
        `;
        
        const btnQr = li.querySelector('.btn-qr-small');
        btnQr.addEventListener('click', () => {
            qrModal.classList.remove('hidden');
        });

        barsList.appendChild(li);
    });
}

btnAccess.addEventListener('click', () => {
    modal.classList.remove('hidden');
    // Reset state
    passwordScreen.classList.remove('hidden');
    benefitsContent.classList.add('hidden');
    inputPass.value = '';
    errorMsg.classList.add('hidden');
});

btnNavBenefits.addEventListener('click', () => {
    modal.classList.remove('hidden');
    // Reset state
    passwordScreen.classList.remove('hidden');
    benefitsContent.classList.add('hidden');
    inputPass.value = '';
    errorMsg.classList.add('hidden');
});

btnClose.addEventListener('click', () => {
    modal.classList.add('hidden');
});

btnCloseQr.addEventListener('click', () => {
    qrModal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
    if (e.target === qrModal) {
        qrModal.classList.add('hidden');
    }
});

btnSubmitPass.addEventListener('click', () => {
    const pass = inputPass.value.toLowerCase().trim();
    // Simple password check - hardcoded for demo
    if (pass === 'hostels' || pass === 'rosario' || pass === '1234') {
        passwordScreen.classList.add('hidden');
        benefitsContent.classList.remove('hidden');
        populateBars();
        // Need to invalidate size for Leaflet to render correctly in hidden container
        setTimeout(() => {
            initBenefitsMap();
            mapBenefits.invalidateSize();
        }, 100);
    } else {
        errorMsg.classList.remove('hidden');
    }
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initMaps();
});
