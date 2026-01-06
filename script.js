// Data
const hostels = [
    { name: "Colmena", logo: "images/colmena.jpeg", lat: -32.9458318, lng: -60.6395654, address: "Mitre 778", link: "https://instagram.com" },
    { name: "Hostel Point", logo: "images/hostelpoint.jpeg", lat: -32.9388472, lng: -60.6469437, address: "Catamarca 1837", link: "https://instagram.com" },
    { name: "Wolfhost", logo: "images/wolfhost.jpeg", lat: -32.9551428, lng: -60.6374348, address: "Maipu 1470", link: "https://instagram.com" },
    { name: "High Hostel", logo: "images/highhostel.jpeg", lat: -32.9433854, lng: -60.6402415, address: "Entre Rios 583", link: "https://instagram.com" },
    { name: "La Nueva Comunidad", logo: "images/lanuevacomunidad.jpeg", lat: -32.9411663, lng: -60.6440092, address: "Roca 453", link: "https://instagram.com" },
    { name: "Cool Raul", logo: "images/coolraulhostel.jpeg", lat: -32.9426443, lng: -60.6454075, address: "San Lorenzo 1670", link: "https://instagram.com" },
    { name: "Hostel Pop", logo: "images/hostelpop.jpeg", lat: -32.9562239, lng: -60.6474648, address: "Av. Pellegrini 1577", link: "https://instagram.com" },
    { name: "Sonder Hostel", logo: "images/sonderhostel.jpeg", lat: -32.9575517, lng: -60.6353023, address: "Buenos Aires 1642", link: "https://instagram.com" },
    { name: "Hostel RealRos", logo: "images/hostelrealros.jpeg", lat: -32.9560059, lng: -60.6474474, address: "Av. Pellegrini 1580", link: "https://instagram.com" },
    { name: "Hostel Freedom", logo: "images/hostelfreedom.jpeg", lat: -32.9456899, lng: -60.6349128, address: "Maipu 646", link: "https://instagram.com" }
];

const bars = [
    { name: "Anker", discount: "15% OFF", lat: -32.93514685701978, lng: -60.65226338331967, address: "Jujuy 2290", logo: "images/anker.png" },
    { name: "Growler Pichincha", discount: "15% OFF", lat: -32.93358053072704, lng: -60.65204445282001, address: "Alvear 51 bis", logo: "images/pichincha.png" },
    { name: "Feelin'", discount: "15% OFF", lat: -32.93900940522283, lng: -60.646288992277405, address: "Italia 301", logo: "images/feelin.png" },
    { name: "Mercado Zarpado", discount: "15% OFF", lat: -32.94903544740613, lng: -60.637804507574444, address: "San Luis 1038", logo: "images/mercadozarpado.png" },
    { name: "Club Terrazas", discount: "15% OFF", lat: -32.93773864026596, lng: -60.63962129474464, address: "Jujuy 1351", logo: "images/club-terrazas.png" },
    { name: "El Gran Chopp", discount: "25% OFF en comidas", lat: -32.95584090950327, lng: -60.64762525547497, address: "Pellegrini 1590", logo: "images/gran-chopp.jpeg" },
    { name: "Growler Abasto", discount: "15% OFF", lat: -32.9581832691446, lng: -60.64852429278909, address: "Pte. Roca 1898", logo: "images/abasto.png" },
    { name: "Growler Col. Arq.", discount: "15% OFF", lat: -32.94609580128957, lng: -60.63161651939801, address: "Av. Belgrano 646", logo: "images/colegio.png" },
    { name: "Bouquet", discount: "10% OFF", lat: -32.948660819382084, lng: -60.648521853147095, address: "San Juan 1777", logo: "images/bouquet.PNG" },
    { name: "Lumvra", discount: "Consultar", lat: -32.95559205181681, lng: -60.64852955757221, address: "Pellegrini 1646", logo: "images/Lumvra.png" }
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
            .bindPopup(`<b>${h.name}</b><br>${h.address}`);
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
    bars.forEach(b => {
        const customIcon = L.icon({
            iconUrl: b.logo,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20],
            className: 'map-marker-logo'
        });

        L.marker([b.lat, b.lng], {icon: customIcon})
            .addTo(mapBenefits)
            .bindPopup(`<b>${b.name}</b><br>${b.address}<br>${b.discount}`);
    });
}

// Benefits Modal Logic
const modal = document.getElementById('benefits-modal');
const qrModal = document.getElementById('qr-modal');
const btnAccess = document.getElementById('btn-access-benefits');
const btnNavBenefits = document.getElementById('btn-nav-benefits');
const btnClose = document.querySelector('.close-modal');
const btnCloseQr = document.querySelector('.close-qr');
const barsList = document.getElementById('bars-list');

// QR Modal Elements
const qrPasswordScreen = document.getElementById('qr-password-screen');
const qrContent = document.getElementById('qr-content');
const btnQrPassword = document.getElementById('btn-qr-password');
const inputQrPass = document.getElementById('qr-password-input');
const errorQrMsg = document.getElementById('qr-password-error');

// Populate Bars List
function populateBars() {
    barsList.innerHTML = '';
    bars.forEach(bar => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="bar-info">
                <img src="${bar.logo}" alt="${bar.name}" class="bar-logo-small">
                <div class="bar-details">
                    <span class="bar-name">${bar.name}</span>
                    <span class="bar-address">${bar.address}</span>
                    <span class="discount-badge">${bar.discount}</span>
                </div>
            </div>
            <button class="btn-qr-small">OBTENER QR</button>
        `;
        
        const btnQr = li.querySelector('.btn-qr-small');
        btnQr.addEventListener('click', () => {
            qrModal.classList.remove('hidden');
            // Reset QR modal state
            qrPasswordScreen.classList.remove('hidden');
            qrContent.classList.add('hidden');
            inputQrPass.value = '';
            errorQrMsg.classList.add('hidden');
        });

        barsList.appendChild(li);
    });
}

function openBenefitsModal() {
    modal.classList.remove('hidden');
    populateBars();
    setTimeout(() => {
        initBenefitsMap();
        mapBenefits.invalidateSize();
    }, 100);
}

btnAccess.addEventListener('click', openBenefitsModal);
btnNavBenefits.addEventListener('click', openBenefitsModal);

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

btnQrPassword.addEventListener('click', () => {
    const pass = inputQrPass.value.toLowerCase().trim();
    // Simple password check - hardcoded for demo
    if (pass === '5618') {
        qrPasswordScreen.classList.add('hidden');
        qrContent.classList.remove('hidden');
    } else {
        errorQrMsg.classList.remove('hidden');
    }
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initMaps();
});
