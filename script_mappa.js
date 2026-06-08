// ==========================================
// 1. GESTIONE MENU HAMBURGER ANCHE SULLA MAPPA
// ==========================================

    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    });

// ==========================================
// 2. CREAZIONE DELLA MAPPA
// ==========================================
const map = L.map('mappa').setView([46.2950, 9.8400], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

setTimeout(() => { map.invalidateSize(); }, 200);

// ==========================================
// 3. TRACCIATO AD ALTISSIMA DENSITÀ (SOVRAPPOSTO AL CONFINE)
// ==========================================
const confiniValmalenco = [
    // --- CHIUSURA A SUD (Torre di Santa Maria) ---
    [46.2000, 9.8000], [46.1980, 9.8100], [46.1960, 9.8220], [46.1945, 9.8350], 
    [46.1950, 9.8500], [46.1965, 9.8620], [46.2000, 9.8700], 
    
    // --- RISALITA SUL LATO EST (Dorsale Val di Togno / Cima Fontana) ---
    [46.2060, 9.8820], [46.2110, 9.8950], [46.2160, 9.9080], [46.2220, 9.9200],
    [46.2280, 9.9310], [46.2320, 9.9420], [46.2350, 9.9550], [46.2380, 9.9700],
    [46.2410, 9.9880], [46.2460, 10.0050], [46.2520, 10.0180], [46.2590, 10.0260],
    
    // --- CONFINE REALE DA PASSO CANCIANO A PIZZO SCALINO ---
    [46.2660, 10.0310], [46.2710, 10.0315], [46.2750, 10.0305], [46.2770, 10.0270],
    [46.2790, 10.0220], [46.2820, 10.0150], [46.2844, 10.0108], // PIZZO SCALINO
    
    // --- SEGUENDO IL TRATTEGGIATO VIOLA VERSO PASSO CAMPAGNEDA ---
    [46.2865, 10.0075], [46.2885, 10.0060], [46.2910, 10.0055], [46.2940, 10.0065],
    [46.2965, 10.0085], [46.2985, 10.0105], [46.3015, 10.0120], [46.3045, 10.0145],
    [46.3080, 10.0180], [46.3115, 10.0220], [46.3150, 10.0245], [46.3185, 10.0255], 
    [46.3205, 10.0250], // Passo di Campagneda
    
    // --- VAL POSCHIAVINA / PIZZO VARUNA (CURVA DEL CONFINE) ---
    [46.3225, 10.0235], [46.3250, 10.0210], [46.3280, 10.0185], [46.3310, 10.0150],
    [46.3325, 10.0115], [46.3350, 10.0090], [46.3380, 10.0060], [46.3415, 10.0025],
    [46.3450, 9.9985],  [46.3490, 9.9935],  [46.3525, 9.9890],  [46.3550, 9.9850], // PIZZO VARUNA
    
    // --- DISCESA ULTRA-FITTA VERSO PASSO DI FELLARIA ---
    [46.3565, 9.9825], [46.3580, 9.9780], [46.3595, 9.9740], [46.3610, 9.9695],
    [46.3625, 9.9645], [46.3640, 9.9590], [46.3655, 9.9535], [46.3670, 9.9480],
    [46.3685, 9.9425], [46.3705, 9.9375], [46.3735, 9.9310], [46.3760, 9.9260],
    [46.3790, 9.9180], [46.3810, 9.9130], [46.3820, 9.9100], // Passo di Fellaria
    
    // --- CRESTA DEL BERNINA E GHIACCIAI (ZONA CORRETTA SCREENSHOT) ---
    [46.3824, 9.9065], [46.3828, 9.9020], [46.3832, 9.8965], [46.3837, 9.8915],
    [46.3842, 9.8860], [46.3845, 9.8810], [46.3846, 9.8760], [46.3844, 9.8715],
    [46.3840, 9.8667], // PIZZO BERNINA / CRAST' AGÜZZA
    [46.3835, 9.8610], [46.3825, 9.8555], [46.3812, 9.8505], [46.3795, 9.8455],
    [46.3775, 9.8400], [46.3750, 9.8340], [46.3725, 9.8270], [46.3700, 9.8200], // Passo di Sella / Scerscen
    
    // --- DORSALE VERSO PASSO DEL MURETTO ---
    [46.3703, 9.8130], [46.3708, 9.8040], [46.3710, 9.7940], [46.3707, 9.7845],
    [46.3701, 9.7730], [46.3692, 9.7610], [46.3683, 9.7490], [46.3673, 9.7360],
    [46.3661, 9.7245], [46.3650, 9.7150], // PASSO DEL MURETTO
    
    // --- CURVA REALE VERSO IL MONTE DEL FORNO ---
    [46.3630, 9.7120], [46.3600, 9.7085], [46.3565, 9.7045], [46.3525, 9.7010],
    [46.3480, 9.6980], [46.3435, 9.6955], [46.3380, 9.6935], [46.3325, 9.6912], // MONTE DEL FORNO
    
    // --- DISCESA SUL LATO OVEST (Sissone e Disgrazia Ovest) ---
    [46.3265, 9.6885], [46.3205, 9.6855], [46.3145, 9.6815], [46.3075, 9.6785],
    [46.2995, 9.6780], [46.2915, 9.6790], [46.2900, 9.6800], // Passo di Mello
    
    // --- CHIUSURA FINALE VERSO TORRE DI SANTA MARIA ---
    [46.2835, 9.6885], [46.2765, 9.6975], [46.2705, 9.7065], [46.2645, 9.7145],
    [46.2575, 9.7255], [46.2495, 9.7405], [46.2415, 9.7485], [46.2335, 9.7555],
    [46.2245, 9.7645], [46.2135, 9.7765], [46.2045, 9.7895]
];

// Copertura nera totale per l'esterno
const tuttoIlMondo = [[90, -180], [90, 180], [-90, 180], [-90, -180]];

L.polygon([tuttoIlMondo, confiniValmalenco], {
    color: 'none',
    fillColor: '#0a0a0a',
    fillOpacity: 0.68
}).addTo(map);

// LINEA ROSSA AD ALTISSIMA DENSITÀ PERFETTAMENTE SOVRAPPOSTA
L.polygon(confiniValmalenco, {
    color: '#e74c3c',
    weight: 3,
    dashArray: '',
    fillColor: 'none'
}).addTo(map);

// ==========================================
// 4. ICONE DEI SEGNALINI
// ==========================================
const iconaRossa = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [38, 62],
    iconAnchor: [19, 62],
    popupAnchor: [1, -50],
    shadowSize: [62, 62]
});

const iconaVerde = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// ==========================================
// 5. POSIZIONAMENTO SEGNALINI
// ==========================================
L.marker([46.2643, 9.8494], {icon: iconaRossa}).addTo(map)
    .bindPopup('<b>Chiesa in Valmalenco</b>')
    .openPopup(); 

L.marker([46.2694, 9.8812], {icon: iconaVerde}).addTo(map).bindPopup('<b>Lanzada</b>');
L.marker([46.2572, 9.8592], {icon: iconaVerde}).addTo(map).bindPopup('<b>Caspoggio</b>');

// Segnalino verde su Pian del Lupo (Chiareggio)
L.marker([46.3143, 9.7812], {icon: iconaVerde}).addTo(map).bindPopup('<b>Chiareggio</b><br>Pian del Lupo');

// ==========================================
// 6. GEOLOCALIZZAZIONE PROTETTA
// ==========================================
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const utenteLat = position.coords.latitude;
            const utenteLng = position.coords.longitude;

            L.circle([utenteLat, utenteLng], {
                color: '#3498db',
                fillColor: '#3498db',
                fillOpacity: 0.3,
                radius: 120
            }).addTo(map);

            L.marker([utenteLat, utenteLng]).addTo(map).bindPopup('<b>Tu sei qui</b>');
        },
        (error) => { console.log("Geolocalizzazione non agganciata: " + error.message); },
        { enableHighAccuracy: false, timeout: 5000 }
    );
} // <-- Adesso chiude correttamente anche l'intero blocco IF!