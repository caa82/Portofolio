/* ==========================================================
   app.js — Portofolio Elsa Insani + Integrasi Supabase
   Major UI/UX & Motion Upgrade (Synced with index.html & style.css)
   Pure Vanilla JavaScript (ES6+)
   ========================================================== */

/* ----------------------------------------------------------
   KONFIGURASI SUPABASE (BaaS)
---------------------------------------------------------- */
const SUPABASE_URL = 'https://qxmzjhpbptzpnfypzeux.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4bXpqaHBicHR6cG5meXB6ZXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3MTUyMDAsImV4cCI6MjEwODI5MTIwMH0.5cvsXJ5858fX8Uj8evTOClnkcDZ44OMOJxsGIbhJa0k';
const STORAGE_BUCKET = 'project-docs';

const USE_SUPABASE = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase);
const db = USE_SUPABASE ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

/* ----------------------------------------------------------
   DATA PROJECT LENGKAP DARI CV & PORTOFOLIO ELSA INSANI
---------------------------------------------------------- */
const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'Master Kode Lokasi — PT Astra Honda Motor (AHM)',
    category: 'Backend & Enterprise',
    year: 'Mei - Juni 2026',
    role: 'Fullstack Developer',
    client: 'PT Astra Honda Motor (AHM)',
    summary: 'Aplikasi web enterprise berbasis Spring Boot yang terintegrasi dengan SQL Developer dan server AHMAS untuk mengelola dan memigrasikan master kode lokasi baru.',
    problem: 'Pertambahan jaringan dan gudang baru PT Astra Honda Motor memerlukan integrasi master data lokasi yang tersinkronisasi antar sistem secara aman tanpa mengganggu transaksi berjalan.',
    solution: 'Membangun pipeline migrasi data yang memanfaatkan server AHMAS untuk pertukaran data yang aman, efisien, dan andal, dilengkapi validasi integritas data referensi kode lokasi.',
    architecture: 'Model-View-Controller (MVC) di atas Java Spring Boot, konektivitas database Oracle/SQL Developer melalui JDBC connection pooling, arsitektur REST API stateless dengan enkripsi transfer data server AHMAS.',
    tech_stack: ['Java', 'Spring Boot', 'NetBeans', 'SQL Developer', 'AHMAS Server', 'REST API'],
    image_url: '',
    github_url: '',
    demo_url: '',
    doc_analysis_url: '',
    document_url: ''
  },
  {
    id: 2,
    title: 'Mental Health Care — DKA Politeknik Astra',
    category: 'Mobile App',
    year: 'Juni - Agustus 2026',
    role: 'System Analyst',
    client: 'Departemen Kemahasiswaan & Alumni (DKA)',
    summary: 'Aplikasi mobile untuk Departemen Kemahasiswaan & Alumni guna mengukur kesiapan kerja serta memantau kondisi kesehatan mental mahasiswa secara berkala.',
    problem: 'Proses survei kesiapan kerja dan skrining kesehatan mental sebelumnya tersebar secara manual, menyulitkan konselor kampus dalam mendeteksi dan memberi pendampingan dini pada mahasiswa.',
    solution: 'Merancang analisis sistem mobile end-to-end dengan modul asesmen terstandar, scoring psikometrik otomatis, serta portal konselor untuk pemantauan tindak lanjut mahasiswa.',
    architecture: 'Arsitektur mobile modern menggunakan React Native berbasis modular screen, integrasi Supabase BaaS (Database PostgreSQL & Realtime Auth), serta pemodelan alur data dan use case menyeluruh via Draw.io.',
    tech_stack: ['React Native', 'JavaScript', 'Supabase', 'Draw.io', 'System Analysis', 'UI/UX'],
    image_url: '',
    github_url: 'https://github.com/caa82',
    demo_url: '',
    doc_analysis_url: '',
    document_url: ''
  },
  {
    id: 3,
    title: 'Sparepart Forecasting — UPT Teknik Alat Berat',
    category: 'Web App',
    year: 'Desember - Januari 2026',
    role: 'Project Leader | Fullstack Dev & System Analyst',
    client: 'UPT Teknik Alat Berat Politeknik Astra',
    summary: 'Aplikasi web berbasis Laravel yang digunakan mahasiswa dan instruktur Teknik Alat Berat untuk meramalkan kebutuhan pemesanan sparepart forecasting ke depan.',
    problem: 'Sering terjadinya kekosongan suku cadang kritis alat berat saat praktikum atau sebaliknya terjadi penumpukan inventaris lama akibat estimasi kebutuhan manual.',
    solution: 'Mengimplementasikan modul kalkulasi peramalan stok berbasis data historis konsumsi, notifikasi otomatis ambang batas minimum stok, dan dashboard monitoring pemesanan.',
    architecture: 'Monolith Laravel MVC dengan database relasional SQLite/MySQL, reporting engine dinamis untuk generate jadwal pemesanan supplier, dan pemodelan database relational ERD di Draw.io.',
    tech_stack: ['PHP', 'Laravel', 'Laragon', 'SQLite', 'Draw.io', 'Forecasting'],
    image_url: '',
    github_url: 'https://github.com/caa82',
    demo_url: 'https://drive.google.com/file/d/1Y9qwy4pto-2I_qTyAen1JjgKSnDblJ00/view?usp=sharing',
    doc_analysis_url: '',
    document_url: ''
  },
  {
    id: 4,
    title: 'Migrasi Sistem Informasi Akademik (SIA) — Modul Hasil Studi',
    category: 'System Design & Migration',
    year: 'November - Januari 2026',
    role: 'Project Leader | Fullstack Dev & System Analyst',
    client: 'Pusat Sistem Informasi (PSI) Politeknik Astra',
    summary: 'Migrasi modul Hasil Studi Sistem Informasi Akademik dari platform warisan ke Next.js serta penambahan fitur baru untuk program studi jenjang Diploma 4.',
    problem: 'Arsitektur lama berbasis ASP.NET monolitik mengalami bottleneck performa ketika ribuan mahasiswa mengakses hasil studi serentak, serta belum mendukung struktur kurikulum prodi baru D4.',
    solution: 'Memimpin analisis sistem berbasis Object-Oriented Analysis and Design (OOAD), memigrasikan antarmuka dan API ke Next.js, dan merestrukturisasi skema database nilai multi-strata.',
    architecture: 'Next.js Hybrid Rendering (Server-Side Rendering untuk keamanan nilai & Static Optimization), RESTful API backend, dokumentasi komprehensif diagram UML (Class, Sequence, Activity Diagram) pada Draw.io.',
    tech_stack: ['Next.js', 'React', 'ASP.NET', 'OOAD', 'UML', 'Draw.io', 'Database Migration'],
    image_url: '',
    github_url: 'https://github.com/caa82',
    demo_url: '',
    doc_analysis_url: 'https://drive.google.com/drive/folders/1P-uw4OJXgCnAlEDt6kBJap3OL9P35loC?usp=sharing',
    document_url: ''
  },
  {
    id: 5,
    title: 'ASTRAtech Aspiration Day (AAD) Website — MPM',
    category: 'Web App',
    year: 'Mei - Juli 2026',
    role: 'Project Leader | Fullstack Dev & System Analyst',
    client: 'MPM Politeknik Astra',
    summary: 'Portal web resmi untuk menghimpun, mengelompokkan, dan memonitor tindak lanjut aspirasi seluruh mahasiswa Politeknik Astra secara transparan.',
    problem: 'Aspirasi dan evaluasi fasilitas kampus sebelumnya tidak terkoordinir dengan baik, menimbulkan kesulitan dalam mengukur sejauh mana aspirasi telah direalisasikan oleh institusi.',
    solution: 'Platform web dengan sistem pelaporan terstruktur, kategorisasi komisi legislatif, tracking status aspirasi real-time (Diterima, Ditinjau, Selesai), dan integrasi survei kepuasan.',
    architecture: 'Laravel Framework terstruktur, autentikasi berbasis role (Mahasiswa, Komisi Aspirasi, BPH MPM), query caching untuk load traffic tinggi, perancangan DFD dan mockups di Draw.io.',
    tech_stack: ['PHP', 'Laravel', 'Laragon', 'MySQL', 'Draw.io', 'System Analysis'],
    image_url: '',
    github_url: 'https://github.com/caa82',
    demo_url: '',
    doc_analysis_url: '',
    document_url: ''
  },
  {
    id: 6,
    title: 'Dashboard MPM — Sistem Informasi Internal',
    category: 'Web App',
    year: 'Juli - Agustus 2026',
    role: 'Project Leader | Fullstack Dev & System Analyst',
    client: 'MPM Politeknik Astra',
    summary: 'Sistem manajemen informasi internal MPM untuk digitalisasi absensi, pemantauan Activity Plan & Indikator Kinerja (AP-IK), serta monitoring One Sheet Proposal (OSP).',
    problem: 'Pengawasan puluhan program kerja legislatif memerlukan rekapitulasi dokumen fisik dan spreadsheet manual yang rentan keterlambatan evaluasi bulanan.',
    solution: 'Dashboard terpusat yang memvisualisasikan capaian indikator kerja komisi, pelacakan dokumen OSP, dan otomatisasi rekapitulasi kehadiran pengurus organisasi.',
    architecture: 'Laravel web architecture dengan Chart.js analytics engine, role-based security, relational database design dengan integritas foreign key ketat, dan dokumentasi sistem lengkap.',
    tech_stack: ['PHP', 'Laravel', 'Chart.js', 'Laragon', 'MySQL', 'Draw.io'],
    image_url: '',
    github_url: 'https://github.com/caa82',
    demo_url: '',
    doc_analysis_url: '',
    document_url: ''
  },
  {
    id: 7,
    title: 'VIKING — Sistem Peminjaman Alat Hiking Desktop',
    category: 'Desktop App',
    year: 'April - Juli 2025',
    role: 'Project Leader | Fullstack Dev, UI/UX & Analyst',
    client: 'Politeknik Astra',
    summary: 'Aplikasi desktop untuk manajemen sewa perlengkapan outdoor (paket maupun satuan), kalkulasi denda otomatis, membership pendaki, dan laporan transaksi keuangan.',
    problem: 'Antrean penyewaan alat outdoor sering terhambat saat akhir pekan akibat verifikasi ketersediaan stok fisik dan penghitungan denda keterlambatan pengembalian secara manual.',
    solution: 'Aplikasi desktop interaktif dengan pencatatan status ketersediaan barang real-time, modul penghitung denda dinamis berbasis jam/hari, dan kartu keanggotaan.',
    architecture: 'Desktop Object-Oriented Programming (OOP) berbasis JavaFX dan C#, backend SQL Server terenkripsi, MVC design pattern, version control kolaboratif via GitHub.',
    tech_stack: ['Java', 'JavaFX', 'C#', 'SQL Server', 'GitHub', 'Draw.io', 'UI/UX Design'],
    image_url: '',
    github_url: 'https://github.com/caa82',
    demo_url: 'https://drive.google.com/file/d/1oS6dBuZrTJ6MQEedaqALMsqBhsptCP9j/view?usp=sharing',
    doc_analysis_url: '',
    document_url: ''
  },
  {
    id: 8,
    title: 'Toko Komputer Console App — Algoritma & File Processing',
    category: 'System Design & Migration',
    year: 'November 2024 - Januari 2025',
    role: 'Project Leader | Fullstack Dev & System Analyst',
    client: 'Politeknik Astra',
    summary: 'Aplikasi konsol berbasis bahasa C dengan implementasi algoritma pencarian biner, pengurutan, dan file processing untuk manajemen inventaris toko komputer.',
    problem: 'Kebutuhan sistem inventaris ringan tanpa overhead GUI yang mampu berjalan stabil pada mesin minim sumber daya dengan integritas data file binary.',
    solution: 'Mengembangkan sistem inventaris CLI dengan alokasi memori dinamis, penanganan stream file binary (.dat) untuk transaksi pembelian dan penjualan secara efisien.',
    architecture: 'Arsitektur prosedural modular C, manipulasi pointer dan struct, sorting dan searching algorithm teroptimasi, error handling input buffer command-line.',
    tech_stack: ['C Language', 'File Processing', 'Algorithms', 'Data Structures', 'CLI'],
    image_url: '',
    github_url: 'https://github.com/caa82',
    demo_url: '',
    doc_analysis_url: '',
    document_url: ''
  }
];

/* ----------------------------------------------------------
   DATA GALERI KEGIATAN LENGKAP (FALLBACK)
---------------------------------------------------------- */
const FALLBACK_GALLERY = [
  { id: 1, title: 'Gema Ramadhan (GARASI) MI 2025', role: 'Sekretaris Acara', image_url: 'img/GARASI.JPG', is_wide: true, sort_order: 1 },
  { id: 2, title: 'Sidang Pleno MPM Politeknik Astra', role: 'Sekretaris MPM', image_url: 'img/Sidang Pleno.JPG', is_wide: false, sort_order: 2 },
  { id: 3, title: 'Study Banding MPM x Polman x STHB', role: 'Sekretaris Delegasi', image_url: 'img/Study Banding.jpg', is_wide: false, sort_order: 3 },
  { id: 4, title: 'Training K3 SHE Agent ke Astra', role: 'SHE Agent Trainer', image_url: 'img/Safety_Astra.jpg', is_wide: false, sort_order: 4 },
  { id: 5, title: 'Malam Keakraban Manajemen Informatika 2025', role: 'Sekretaris Pelaksana', image_url: 'img/Malam Keakraban.jpg', is_wide: true, sort_order: 5 },
  { id: 6, title: "Parent's Day Politeknik Astra", role: 'Master of Ceremony', image_url: 'img/MC_Parents.jpg', is_wide: false, sort_order: 6 },
  { id: 7, title: 'Career Day Politeknik Astra', role: 'Liaison Officer (LO)', image_url: 'img/LO.jpg', is_wide: true, sort_order: 7 },
  { id: 8, title: 'Creative Art — Desain Mercusuar', role: 'Desain Grafis', image_url: 'img/art.png', is_wide: true, sort_order: 8 }
];

/* ----------------------------------------------------------
   STATE & DOM SELECTORS
---------------------------------------------------------- */
const state = {
  projects: [],
  gallery: [],
  category: 'All',
  query: '',
  lastFocus: null,
  lastLightboxFocus: null,
  activeYear: 'all',
  lightboxIndex: 0,
  galleryItems: []
};

const $ = (selector) => document.querySelector(selector);
const els = {
  grid: $('#project-grid'),
  filters: $('#filters'),
  search: $('#search-input'),
  count: $('#result-count'),
  empty: $('#empty-state'),
  resetBtn: $('#reset-filters'),
  overlay: $('#overlay'),
  drawer: $('#drawer'),
  drawerContent: $('#drawer-content'),
  drawerCategory: $('#drawer-category'),
  drawerClose: $('#drawer-close'),
  toasts: $('#toast-container'),
  form: $('#contact-form'),
  submitBtn: $('#submit-btn'),
  themeToggle: $('#theme-toggle'),
  yearTabs: $('#year-tabs'),
  eventsContainer: $('#events-container'),
  eventFilterCount: $('#event-filter-count'),
  lightbox: $('#lightbox'),
  lightboxImg: $('#lightbox-img'),
  lightboxTitle: $('#lightbox-title'),
  lightboxRole: $('#lightbox-role'),
  lightboxCounter: $('#lightbox-counter'),
  lightboxClose: $('#lightbox-close'),
  lightboxPrev: $('#lightbox-prev'),
  lightboxNext: $('#lightbox-next'),
  profileTrigger: $('#brand-profile-trigger'),
  profileModal: $('#profile-modal'),
  profileModalClose: $('#profile-modal-close'),
  mobileMenuToggle: $('#mobile-menu-toggle'),
  mobileNav: $('#mobile-nav')
};

/* ----------------------------------------------------------
   UTILITAS & SECURITY
---------------------------------------------------------- */
function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function safeURL(url) {
  if (!url) return '';
  try {
    const parsed = new URL(url, window.location.href);
    return (parsed.protocol === 'http:' || parsed.protocol === 'https:') ? parsed.href : '';
  } catch {
    return '';
  }
}

function debounce(func, delay = 150) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function syncBodyScrollLock() {
  const isDrawerOpen = els.drawer && els.drawer.classList.contains('is-open');
  const isLightboxOpen = els.lightbox && !els.lightbox.hidden;
  const isProfileOpen = els.profileModal && !els.profileModal.hidden;
  document.body.classList.toggle('no-scroll', Boolean(isDrawerOpen || isLightboxOpen || isProfileOpen));
}

// Menghasilkan placeholder cover visual bergaya Icon & Abstract Mesh (sebagai wadah dokumentasi project)
function generateProjectCover(project) {
  const configs = {
    'Backend & Enterprise': {
      color: '#6366F1',
      bgGlow: 'rgba(99, 102, 241, 0.22)',
      label: 'BACKEND & ENTERPRISE ARCHITECTURE',
      icon: `
        <ellipse cx="24" cy="9" rx="19" ry="6"/>
        <path d="M5 9v13c0 3.31 8.51 6 19 6s19-2.69 19-6V9"/>
        <path d="M5 15.5c0 3.31 8.51 6 19 6s19-2.69 19-6"/>
        <circle cx="12" cy="22" r="1.5" fill="#38BDF8"/>
        <circle cx="12" cy="28" r="1.5" fill="#38BDF8"/>
      `
    },
    'Mobile App': {
      color: '#0D9488',
      bgGlow: 'rgba(13, 148, 136, 0.22)',
      label: 'MOBILE APPLICATION & SERVICES',
      icon: `
        <rect x="11" y="4" width="26" height="40" rx="5"/>
        <line x1="20" y1="8" x2="28" y2="8"/>
        <circle cx="24" cy="38" r="1.8" fill="#0D9488"/>
        <rect x="16" y="14" width="16" height="12" rx="2" stroke-opacity="0.5"/>
        <line x1="16" y1="30" x2="32" y2="30" stroke-opacity="0.4"/>
      `
    },
    'Web App': {
      color: '#EA580C',
      bgGlow: 'rgba(234, 88, 12, 0.22)',
      label: 'WEB APPLICATION & ANALYTICS',
      icon: `
        <rect x="5" y="7" width="38" height="34" rx="4"/>
        <line x1="5" y1="16" x2="43" y2="16"/>
        <circle cx="11" cy="11.5" r="1.5" fill="#EA580C"/>
        <circle cx="17" cy="11.5" r="1.5" fill="#EA580C"/>
        <circle cx="23" cy="11.5" r="1.5" fill="#EA580C"/>
        <path d="M12 33l7-8 6 5 8-9" stroke="#FBBF24"/>
      `
    },
    'Desktop App': {
      color: '#E11D48',
      bgGlow: 'rgba(225, 29, 72, 0.22)',
      label: 'DESKTOP WORKSTATION & HARDWARE',
      icon: `
        <rect x="5" y="7" width="38" height="26" rx="3"/>
        <line x1="18" y1="33" x2="30" y2="33"/>
        <line x1="24" y1="33" x2="24" y2="40"/>
        <line x1="14" y1="40" x2="34" y2="40"/>
        <rect x="12" y="14" width="24" height="12" rx="2" stroke-opacity="0.5"/>
      `
    },
    'System Design & Migration': {
      color: '#2563EB',
      bgGlow: 'rgba(37, 99, 235, 0.22)',
      label: 'SYSTEM ARCHITECTURE & CORE ENGINE',
      icon: `
        <rect x="11" y="11" width="26" height="26" rx="4"/>
        <rect x="18" y="18" width="12" height="12" rx="2" stroke="#38BDF8"/>
        <line x1="17" y1="4" x2="17" y2="11"/>
        <line x1="24" y1="4" x2="24" y2="11"/>
        <line x1="31" y1="4" x2="31" y2="11"/>
        <line x1="17" y1="37" x2="17" y2="44"/>
        <line x1="24" y1="37" x2="24" y2="44"/>
        <line x1="31" y1="37" x2="31" y2="44"/>
        <line x1="4" y1="17" x2="11" y2="17"/>
        <line x1="4" y1="24" x2="11" y2="24"/>
        <line x1="4" y1="31" x2="11" y2="31"/>
        <line x1="37" y1="17" x2="44" y2="17"/>
        <line x1="37" y1="24" x2="44" y2="24"/>
        <line x1="37" y1="31" x2="44" y2="31"/>
      `
    }
  };

  const cfg = configs[project.category] || configs['Backend & Enterprise'];
  const techSnippet = (project.tech_stack || []).slice(0, 4).join('  •  ');
  const rawTitle = project.title || 'Dokumentasi Project';
  const cleanTitle = rawTitle.length > 44 ? rawTitle.substring(0, 44) + '…' : rawTitle;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" width="100%" height="100%">
    <defs>
      <pattern id="dot-grid-${project.id || 'x'}" width="22" height="22" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#334155" opacity="0.35" />
      </pattern>
      <radialGradient id="glow-${project.id || 'x'}" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="${cfg.color}" stop-opacity="0.25" />
        <stop offset="50%" stop-color="${cfg.color}" stop-opacity="0.06" />
        <stop offset="100%" stop-color="#0B0F19" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="badge-grad-${project.id || 'x'}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95" />
      </linearGradient>
    </defs>

    <!-- Deep Modern Slate Canvas -->
    <rect width="640" height="360" fill="#0B0F19"/>
    <rect width="640" height="360" fill="url(#dot-grid-${project.id || 'x'})" />
    <rect width="640" height="360" fill="url(#glow-${project.id || 'x'})" />

    <!-- Subtle Geometric Rings -->
    <circle cx="320" cy="140" r="78" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1.2" stroke-dasharray="4 4"/>
    <circle cx="320" cy="140" r="118" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    <circle cx="320" cy="140" r="158" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>

    <!-- Top Left Discreet Tag -->
    <text x="36" y="38" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="#64748B" letter-spacing="0.5">ELSA INSANI · PROJECT SHOWCASE</text>

    <!-- Top Right Verified Badge -->
    <rect x="496" y="24" width="108" height="22" rx="11" fill="rgba(16, 185, 129, 0.12)" stroke="rgba(16, 185, 129, 0.3)" stroke-width="1"/>
    <circle cx="510" cy="35" r="3" fill="#10B981"/>
    <text x="520" y="39" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="700" fill="#10B981">VERIFIED SPEC</text>

    <!-- Center Icon Badge Squircle -->
    <g filter="drop-shadow(0 12px 28px rgba(0,0,0,0.45))">
      <rect x="272" y="92" width="96" height="96" rx="24" fill="url(#badge-grad-${project.id || 'x'})" stroke="${cfg.color}" stroke-width="1.8" stroke-opacity="0.8"/>
    </g>

    <!-- Center SVG Icon (48x48) -->
    <g transform="translate(296, 116)" stroke="${cfg.color}" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      ${cfg.icon}
    </g>

    <!-- Category Label Pill below Icon -->
    <text x="320" y="222" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" fill="${cfg.color}" letter-spacing="1.2">${escapeHTML(cfg.label)}</text>

    <!-- Documentation & Module Title Hint -->
    <text x="320" y="248" text-anchor="middle" font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#F8FAFC">${escapeHTML(cleanTitle)}</text>
    <text x="320" y="272" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11.5" font-weight="500" fill="#94A3B8">Dokumentasi Proyek &amp; Modul Implementasi</text>

    <!-- Bottom Bar Tech Stack Tags -->
    <line x1="48" y1="306" x2="592" y2="306" stroke="#1E293B" stroke-width="1"/>
    <text x="320" y="328" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" fill="#64748B">${escapeHTML(techSnippet)}</text>
  </svg>`;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function resolveProjectImage(project) {
  return safeURL(project.image_url) || generateProjectCover(project);
}

/* ----------------------------------------------------------
   CUSTOM TOAST NOTIFICATION
---------------------------------------------------------- */
function showToast(title, message = '', type = 'success', duration = 4500) {
  if (!els.toasts) return;
  const toast = document.createElement('div');
  toast.className = 'toast' + (type === 'error' ? ' error' : '');
  toast.innerHTML = `
    <div>
      <strong>${escapeHTML(title)}</strong>
      <span>${escapeHTML(message)}</span>
    </div>
  `;
  els.toasts.appendChild(toast);

  const dismiss = () => {
    toast.classList.add('leaving');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  };

  const timer = setTimeout(dismiss, duration);
  toast.addEventListener('click', () => {
    clearTimeout(timer);
    dismiss();
  });
}

/* ----------------------------------------------------------
   SINKRONISASI ASET GAMBAR DENGAN SUPABASE STORAGE CDN
---------------------------------------------------------- */
function initSupabaseStorageAssets() {
  if (!USE_SUPABASE) return;
  const cdnBase = `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/img/`;

  // 1. Ganti src pada semua elemen <img> yang merujuk ke folder img/
  document.querySelectorAll('img[src^="img/"]').forEach((img) => {
    const rawPath = img.getAttribute('src');
    const fileName = rawPath.replace(/^img\//, '');
    const remoteUrl = cdnBase + encodeURIComponent(fileName).replace(/%2F/g, '/');

    // Jika file di Supabase belum selesai diunggah atau offline, fallback otomatis ke file lokal
    img.addEventListener('error', function fallback() {
      img.removeEventListener('error', fallback);
      img.src = rawPath;
    });

    img.src = remoteUrl;
  });

  // 2. Ganti atribut data-gallery-img pada kartu galeri agar lightbox membuka versi Supabase
  document.querySelectorAll('.gallery-card[data-gallery-img^="img/"]').forEach((card) => {
    const rawPath = card.getAttribute('data-gallery-img');
    const fileName = rawPath.replace(/^img\//, '');
    const remoteUrl = cdnBase + encodeURIComponent(fileName).replace(/%2F/g, '/');
    card.setAttribute('data-gallery-img', remoteUrl);
  });
}

/* ----------------------------------------------------------
   THEME SWITCHER (Dark & Light Mode)
---------------------------------------------------------- */
function initTheme() {
  if (!els.themeToggle) return;
  const root = document.documentElement;
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  els.themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  });

  systemPrefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
}

/* ----------------------------------------------------------
   SKELETON LOADER
---------------------------------------------------------- */
function renderSkeletons(count = 4) {
  if (!els.grid) return;
  els.grid.innerHTML = Array.from({ length: count }, () => `
    <div class="card skeleton" aria-hidden="true">
      <div class="card-media sk sk-media"></div>
      <div class="card-body">
        <div class="sk sk-line sk-short"></div>
        <div class="sk sk-title"></div>
        <div class="sk sk-line"></div>
        <div class="sk sk-line" style="width:85%"></div>
      </div>
    </div>
  `).join('');
}

/* ----------------------------------------------------------
   FETCH PROJECTS (Supabase Client v2 / Fallback)
---------------------------------------------------------- */
function normalizeProjectData(row) {
  let docUrl = row.document_url || '';
  if (!docUrl && row.document_path && db) {
    const { data } = db.storage.from(STORAGE_BUCKET).getPublicUrl(row.document_path);
    docUrl = data?.publicUrl || '';
  }
  return {
    ...row,
    tech_stack: Array.isArray(row.tech_stack) ? row.tech_stack : [],
    document_url: docUrl
  };
}

async function fetchProjects() {
  renderSkeletons();
  if (els.empty) els.empty.hidden = true;

  if (!USE_SUPABASE) {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return FALLBACK_PROJECTS;
  }

  try {
    const { data, error } = await db
      .from('projects')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    if (data && data.length > 0) {
      return data.map(normalizeProjectData);
    }
    return FALLBACK_PROJECTS;
  } catch (err) {
    console.error('Gagal mengambil data dari Supabase:', err);
    showToast('Koneksi Supabase', 'Memuat data cadangan CV Elsa Insani.', 'error');
    return FALLBACK_PROJECTS;
  }
}

/* ----------------------------------------------------------
   CATEGORY FILTER & LIVE SEARCH
---------------------------------------------------------- */
function getUniqueCategories() {
  const categories = [...new Set(state.projects.map((p) => p.category).filter(Boolean))];
  return ['All', ...categories];
}

function renderCategoryFilters() {
  if (!els.filters) return;
  const categories = getUniqueCategories();
  els.filters.innerHTML = categories.map((cat) => `
    <button type="button" class="chip${cat === state.category ? ' is-active' : ''}"
            data-category="${escapeHTML(cat)}"
            aria-pressed="${cat === state.category}">
      ${escapeHTML(cat)}
    </button>
  `).join('');
}

function getFilteredProjects() {
  const query = state.query.trim().toLowerCase();
  return state.projects.filter((p) => {
    const matchCategory = state.category === 'All' || p.category === state.category;
    if (!matchCategory) return false;
    if (!query) return true;

    const searchableText = [
      p.title,
      p.summary,
      p.category,
      p.role,
      p.client,
      ...(p.tech_stack || [])
    ].join(' ').toLowerCase();

    return searchableText.includes(query);
  });
}

function applyFilters() {
  if (!els.grid) return;
  els.grid.classList.add('is-filtering');
  setTimeout(() => {
    const filtered = getFilteredProjects();
    renderProjectCards(filtered);
    els.grid.classList.remove('is-filtering');
  }, 120);
}

function getCategoryBadgeClass(category = '') {
  if (category.includes('Backend') || category.includes('Enterprise')) return 'badge-indigo';
  if (category.includes('Mobile')) return 'badge-teal';
  if (category.includes('Web')) return 'badge-amber';
  return 'badge-rose';
}

function renderProjectCards(list) {
  if (!els.grid) return;
  if (els.empty) els.empty.hidden = list.length > 0;
  els.grid.hidden = list.length === 0;
  if (els.count) {
    els.count.textContent = `Menampilkan ${list.length} dari ${state.projects.length} project`;
  }

  els.grid.innerHTML = list.map((item, index) => {
    const badgeClass = getCategoryBadgeClass(item.category);
    return `
      <button type="button" class="card" data-id="${escapeHTML(item.id)}" data-category="${escapeHTML(item.category)}"
              style="animation-delay: ${index * 40}ms"
              aria-label="Lihat detail lengkap untuk ${escapeHTML(item.title)}">
        <div class="card-media">
          <img src="${resolveProjectImage(item)}" alt="Preview ${escapeHTML(item.title)}" loading="lazy" />
        </div>
        <div class="card-body">
          <div class="card-top label">
            <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
              <span class="badge ${badgeClass}">${escapeHTML(item.category)}</span>
              <span class="badge" style="background: var(--surface-subtle); color: var(--text); border-color: var(--border); font-size: 11px; padding: 3px 8px;">${escapeHTML(item.role || 'Developer')}</span>
            </div>
            <span>${escapeHTML(item.year || '')}</span>
          </div>
          <h3>${escapeHTML(item.title)}</h3>
          <p class="card-summary">${escapeHTML(item.summary)}</p>
          <div class="card-foot">
            <ul class="tags">
              ${(item.tech_stack || []).slice(0, 3).map((t) => `<li>${escapeHTML(t)}</li>`).join('')}
              ${(item.tech_stack || []).length > 3 ? `<li>+${(item.tech_stack || []).length - 3}</li>` : ''}
            </ul>
            <span class="card-action">Detail &amp; Dokumen →</span>
          </div>
        </div>
      </button>
    `;
  }).join('');

  init3DTiltCards();
}

function resetAllFilters() {
  state.category = 'All';
  state.query = '';
  if (els.search) els.search.value = '';
  renderCategoryFilters();
  applyFilters();
}

/* ----------------------------------------------------------
   3D PERSPECTIVE TILT & SPOTLIGHT HOVER (Anti-Duplicate Bound)
---------------------------------------------------------- */
function init3DTiltCards() {
  const cards = document.querySelectorAll('.card, .role-card');
  cards.forEach((card) => {
    if (card.dataset.tiltBound === 'true') return;
    card.dataset.tiltBound = 'true';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update variabel CSS untuk efek spotlight
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      if (prefersReducedMotion()) return;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      // Kosongkan inline transform agar aturan :hover di style.css kembali bekerja normal
      card.style.transform = '';
    });
  });
}

/* ----------------------------------------------------------
   ANIMATED NUMBER COUNTER & CIRCULAR PROGRESS (Per-Element Observer)
---------------------------------------------------------- */
function animateNumber(element, target, decimals = 0, duration = 1400) {
  if (prefersReducedMotion()) {
    element.textContent = decimals > 0 ? target.toFixed(decimals) : target;
    return;
  }

  let startTimestamp = null;
  const startVal = 0;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentVal = startVal + (target - startVal) * easeProgress;
    element.textContent = decimals > 0 ? currentVal.toFixed(decimals) : Math.floor(currentVal);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = decimals > 0 ? target.toFixed(decimals) : target;
    }
  };
  window.requestAnimationFrame(step);
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const circle = $('#gpa-circle');

  // Set offset awal lingkaran ke 226 (kosong) agar transisi ke 14 terlihat saat di-scroll
  if (circle && !prefersReducedMotion()) {
    circle.style.strokeDashoffset = '226';
  }

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      if (el.classList.contains('counter') && el.dataset.animated !== 'true') {
        el.dataset.animated = 'true';
        const target = parseFloat(el.dataset.target || 0);
        const decimals = parseInt(el.dataset.decimals || 0, 10);
        animateNumber(el, target, decimals);
      }

      if (el.id === 'gpa-circle') {
        requestAnimationFrame(() => {
          el.style.strokeDashoffset = '14';
        });
      }

      observer.unobserve(el);
    });
  }, { threshold: 0.35 });

  counters.forEach((el) => counterObserver.observe(el));
  if (circle) counterObserver.observe(circle);
}

/* ----------------------------------------------------------
   INTERACTIVE YEAR TABS (SECTION 04 - AKTIVITAS)
---------------------------------------------------------- */
function initYearTabs() {
  if (!els.yearTabs || !els.eventsContainer) return;

  const tabButtons = els.yearTabs.querySelectorAll('.tab-btn');
  const eventItems = els.eventsContainer.querySelectorAll('.event-item');
  const totalEvents = eventItems.length;

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      const selectedYear = btn.dataset.year;
      state.activeYear = selectedYear;

      els.eventsContainer.style.opacity = '0.35';
      setTimeout(() => {
        let visibleCount = 0;
        eventItems.forEach((item) => {
          const itemYear = item.dataset.year;
          const isMatch = selectedYear === 'all' || itemYear === selectedYear;
          item.hidden = !isMatch;
          if (isMatch) visibleCount++;
        });
        els.eventsContainer.style.opacity = '1';

        if (els.eventFilterCount) {
          const yearLabel = selectedYear === '2024' ? '2024–2022' : selectedYear;
          els.eventFilterCount.textContent = selectedYear === 'all'
            ? `Menampilkan semua ${totalEvents} event`
            : `Menampilkan ${visibleCount} event untuk periode ${yearLabel}`;
        }
      }, 150);
    });
  });
}

/* ----------------------------------------------------------
   INTERACTIVE LIGHTBOX & DYNAMIC SUPABASE GALLERY
---------------------------------------------------------- */
function resolveGalleryImageUrl(rawUrl) {
  if (!rawUrl) return '';
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    return rawUrl;
  }
  const cleanPath = rawUrl.replace(/^img\//, '');
  if (USE_SUPABASE) {
    return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/img/${encodeURIComponent(cleanPath).replace(/%2F/g, '/')}`;
  }
  return `img/${cleanPath}`;
}

async function fetchGallery() {
  if (!USE_SUPABASE) {
    return FALLBACK_GALLERY;
  }

  try {
    const { data, error } = await db
      .from('gallery')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('id', { ascending: true });

    if (error) throw error;
    if (data && data.length > 0) {
      return data;
    }
    return FALLBACK_GALLERY;
  } catch (err) {
    console.error('Gagal mengambil data galeri dari Supabase:', err);
    return FALLBACK_GALLERY;
  }
}

function refreshGalleryCardListeners() {
  const galleryCards = document.querySelectorAll('.gallery-card');
  state.galleryItems = Array.from(galleryCards).map((card) => ({
    img: card.dataset.galleryImg,
    fallback: card.dataset.galleryFallback || '',
    title: card.dataset.galleryTitle,
    role: card.dataset.galleryRole
  }));

  galleryCards.forEach((card, index) => {
    if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
    if (!card.hasAttribute('role')) card.setAttribute('role', 'button');

    card.onclick = () => openLightbox(index);
    card.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    };
  });
}

function renderGallery(items) {
  const container = $('#gallery-masonry');
  const countBadge = $('#gallery-count-badge');
  if (!container || !items || items.length === 0) return;

  if (countBadge) {
    countBadge.textContent = `📸 ${items.length} Dokumentasi Foto`;
  }

  container.innerHTML = items.map((item) => {
    const remoteUrl = resolveGalleryImageUrl(item.image_url);
    const localFallback = (item.image_url.startsWith('http://') || item.image_url.startsWith('https://'))
      ? ''
      : (item.image_url.startsWith('img/') ? item.image_url : `img/${item.image_url}`);
    const fallbackAttr = localFallback ? `onerror="this.onerror=null; this.src='${escapeHTML(localFallback)}';"` : '';

    return `
      <div class="gallery-card${item.is_wide ? ' gallery-card-wide' : ''}"
           data-gallery-img="${escapeHTML(remoteUrl)}"
           data-gallery-fallback="${escapeHTML(localFallback)}"
           data-gallery-title="${escapeHTML(item.title)}"
           data-gallery-role="${escapeHTML(item.role)}">
        <img src="${escapeHTML(remoteUrl)}" alt="${escapeHTML(item.title)}" loading="lazy" ${fallbackAttr} />
        <div class="gallery-overlay">
          <span class="gallery-role">${escapeHTML(item.role)}</span>
          <span class="gallery-title">${escapeHTML(item.title)}</span>
        </div>
      </div>
    `;
  }).join('');

  refreshGalleryCardListeners();
}

function initLightbox() {
  refreshGalleryCardListeners();

  if (els.lightboxClose) {
    els.lightboxClose.addEventListener('click', closeLightbox);
  }
  if (els.lightboxPrev) {
    els.lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
  }
  if (els.lightboxNext) {
    els.lightboxNext.addEventListener('click', () => navigateLightbox(1));
  }

  if (els.lightbox) {
    els.lightbox.addEventListener('click', (e) => {
      if (e.target === els.lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!els.lightbox || els.lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function openLightbox(index) {
  if (!els.lightbox) return;
  state.lastLightboxFocus = document.activeElement;
  state.lightboxIndex = index;
  updateLightboxContent();
  els.lightbox.hidden = false;
  requestAnimationFrame(() => {
    els.lightbox.classList.add('is-open');
  });
  syncBodyScrollLock();
  if (els.lightboxClose) els.lightboxClose.focus();
}

function closeLightbox() {
  if (!els.lightbox) return;
  els.lightbox.classList.remove('is-open');
  setTimeout(() => {
    els.lightbox.hidden = true;
    syncBodyScrollLock();
    if (state.lastLightboxFocus) state.lastLightboxFocus.focus();
  }, 280);
}

function navigateLightbox(direction) {
  const total = state.galleryItems.length;
  if (!total) return;
  state.lightboxIndex = (state.lightboxIndex + direction + total) % total;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item = state.galleryItems[state.lightboxIndex];
  if (!item) return;

  if (els.lightboxImg) {
    els.lightboxImg.onerror = function() {
      this.onerror = null;
      if (item.fallback) {
        this.src = item.fallback;
      }
    };
    els.lightboxImg.src = item.img;
    els.lightboxImg.alt = item.title || 'Dokumentasi Kegiatan';
  }
  if (els.lightboxTitle) els.lightboxTitle.textContent = item.title;
  if (els.lightboxRole) els.lightboxRole.textContent = item.role;
  if (els.lightboxCounter) {
    els.lightboxCounter.textContent = `${state.lightboxIndex + 1} / ${state.galleryItems.length}`;
  }
}

/* ----------------------------------------------------------
   STAGGERED SCROLL-REVEAL ANIMATION
---------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el) => revealObserver.observe(el));
}

/* ----------------------------------------------------------
   MAGNETIC BUTTON EFFECT (Anti-Duplicate Bound)
---------------------------------------------------------- */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.magnetic-btn');
  buttons.forEach((btn) => {
    if (btn.dataset.magneticBound === 'true') return;
    btn.dataset.magneticBound = 'true';

    btn.addEventListener('mousemove', (e) => {
      if (prefersReducedMotion() || btn.disabled) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${(x * 0.22).toFixed(2)}px, ${(y * 0.22).toFixed(2)}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      // Kosongkan inline transform agar aturan :hover & :active di style.css tetap berjalan
      btn.style.transform = '';
    });
  });
}

/* ----------------------------------------------------------
   PROJECT DETAIL DRAWER / MODAL
---------------------------------------------------------- */
function renderProjectDetail(project) {
  const github = safeURL(project.github_url);
  const demo = safeURL(project.demo_url);
  const docAnalysis = safeURL(project.doc_analysis_url);
  const docFile = safeURL(project.document_url);

  const section = (title, content, delay) => content ? `
    <div class="doc-section" style="animation-delay: ${delay}ms;">
      <h4>${title}</h4>
      <p>${escapeHTML(content)}</p>
    </div>
  ` : '';

  if (els.drawerCategory) {
    els.drawerCategory.textContent = `${project.category} · ${project.year || ''}`;
  }

  if (els.drawerContent) {
    els.drawerContent.innerHTML = `
      <div class="drawer-media">
        <img src="${resolveProjectImage(project)}" alt="Preview ${escapeHTML(project.title)}" />
      </div>

      <div class="drawer-meta-pills">
        <span class="badge badge-indigo">${escapeHTML(project.role || 'System Analyst & Developer')}</span>
        ${project.client ? `<span class="badge badge-teal">${escapeHTML(project.client)}</span>` : ''}
      </div>

      <h2 id="drawer-title">${escapeHTML(project.title)}</h2>
      <p class="drawer-summary">${escapeHTML(project.summary)}</p>

      ${section('Problem Statement', project.problem, 60)}
      ${section('Solution & Business Value', project.solution, 120)}
      ${section('Architecture & Methodology', project.architecture, 180)}

      <div class="doc-section" style="animation-delay: 240ms;">
        <h4>Tech Stack &amp; Tools</h4>
        <ul class="tags">
          ${(project.tech_stack || []).map((t) => `<li>${escapeHTML(t)}</li>`).join('')}
        </ul>
      </div>

      <div class="drawer-links" style="animation-delay: 300ms;">
        ${docFile ? `
          <a class="btn btn-primary magnetic-btn" href="${docFile}" target="_blank" rel="noopener" download>
            <svg class="icon icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 20h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Unduh Dokumen (PDF)
          </a>
        ` : ''}

        ${docAnalysis ? `
          <a class="btn btn-primary magnetic-btn" href="${docAnalysis}" target="_blank" rel="noopener">
            <svg class="icon icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
            Dokumen Analisis (Drive) ↗
          </a>
        ` : ''}

        ${demo ? `
          <a class="btn btn-ghost magnetic-btn" href="${demo}" target="_blank" rel="noopener">
            <svg class="icon icon-sm" viewBox="0 0 24 24" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
            Video Demo ↗
          </a>
        ` : ''}

        ${github ? `
          <a class="btn btn-ghost magnetic-btn" href="${github}" target="_blank" rel="noopener">
            <svg class="icon icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            GitHub Repository ↗
          </a>
        ` : ''}

        ${!docFile && !docAnalysis && !demo && !github ? `
          <span class="label">Dokumen dan repositori bersifat internal institusi/perusahaan.</span>
        ` : ''}
      </div>
    `;
    els.drawerContent.scrollTop = 0;
  }

  initMagneticButtons();
}

function openDrawer(project) {
  if (!els.drawer || !els.overlay) return;
  state.lastFocus = document.activeElement;
  renderProjectDetail(project);
  els.overlay.hidden = false;
  requestAnimationFrame(() => {
    els.overlay.classList.add('is-open');
    els.drawer.classList.add('is-open');
    syncBodyScrollLock();
  });
  els.drawer.setAttribute('aria-hidden', 'false');
  els.drawer.focus();
}

function closeDrawer() {
  if (!els.drawer || !els.overlay) return;
  els.overlay.classList.remove('is-open');
  els.drawer.classList.remove('is-open');
  els.drawer.setAttribute('aria-hidden', 'true');
  syncBodyScrollLock();
  setTimeout(() => {
    els.overlay.hidden = true;
  }, 320);
  if (state.lastFocus) state.lastFocus.focus();
}

/* ----------------------------------------------------------
   PROFILE QUICK INFO POPUP MODAL (POINT-ONLY)
---------------------------------------------------------- */
function openProfileModal() {
  if (!els.profileModal) return;
  state.lastFocus = document.activeElement;
  els.profileModal.hidden = false;
  requestAnimationFrame(() => {
    els.profileModal.classList.add('is-open');
  });
  if (els.profileTrigger) {
    els.profileTrigger.setAttribute('aria-expanded', 'true');
  }
  syncBodyScrollLock();
  if (els.profileModalClose) {
    els.profileModalClose.focus();
  }
}

function closeProfileModal() {
  if (!els.profileModal) return;
  els.profileModal.classList.remove('is-open');
  if (els.profileTrigger) {
    els.profileTrigger.setAttribute('aria-expanded', 'false');
  }
  setTimeout(() => {
    els.profileModal.hidden = true;
    syncBodyScrollLock();
    if (state.lastFocus && typeof state.lastFocus.focus === 'function') {
      state.lastFocus.focus();
    }
  }, 260);
}

function handleTrapFocus(event) {
  if (event.key !== 'Tab') return;
  let activeModal = null;
  if (els.drawer && els.drawer.classList.contains('is-open')) {
    activeModal = els.drawer;
  } else if (els.profileModal && !els.profileModal.hidden) {
    activeModal = els.profileModal;
  }
  if (!activeModal) return;

  const focusable = activeModal.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]');
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

/* ----------------------------------------------------------
   CONTACT FORM SUBMISSION KE SUPABASE
---------------------------------------------------------- */
const validators = {
  name: (val) => (val.length < 2 ? 'Nama wajib diisi minimal 2 karakter.' : ''),
  email: (val) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val) ? '' : 'Harap masukkan alamat email yang valid.'),
  subject: (val) => (val.length < 3 ? 'Subjek pesan minimal 3 karakter.' : ''),
  message: (val) => (val.length < 10 ? 'Isi pesan minimal 10 karakter.' : '')
};

function validateField(fieldName, value) {
  if (!els.form || !validators[fieldName]) return true;
  const errorMsg = validators[fieldName](value.trim());
  const inputEl = els.form.elements[fieldName];
  const fieldElement = inputEl ? inputEl.closest('.field') : null;
  if (fieldElement) {
    fieldElement.classList.toggle('invalid', Boolean(errorMsg));
  }
  const errorTarget = els.form.querySelector(`[data-error-for="${fieldName}"]`);
  if (errorTarget) errorTarget.textContent = errorMsg;
  return !errorMsg;
}

function clearFormValidationState() {
  if (!els.form) return;
  els.form.querySelectorAll('.field.invalid').forEach((f) => f.classList.remove('invalid'));
  els.form.querySelectorAll('[data-error-for]').forEach((err) => {
    err.textContent = '';
  });
}

function setFormSubmittingState(isLoading) {
  if (!els.submitBtn) return;
  els.submitBtn.disabled = isLoading;
  els.submitBtn.classList.toggle('is-loading', isLoading);
  const btnText = els.submitBtn.querySelector('.btn-text');
  if (btnText) {
    btnText.textContent = isLoading ? 'Mengirim pesan…' : 'Kirim Pesan';
  }
}

async function handleContactSubmit(event) {
  event.preventDefault();
  if (!els.form) return;

  const formData = {
    name: els.form.elements.name.value.trim(),
    email: els.form.elements.email.value.trim(),
    subject: els.form.elements.subject.value.trim(),
    message: els.form.elements.message.value.trim()
  };

  const isFormValid = Object.keys(validators)
    .map((key) => validateField(key, formData[key]))
    .every(Boolean);

  if (!isFormValid) {
    showToast('Form Belum Lengkap', 'Silakan periksa kembali isian formulir Anda.', 'error');
    const firstInvalid = els.form.querySelector('.invalid input, .invalid textarea');
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  setFormSubmittingState(true);

  try {
    if (USE_SUPABASE) {
      const { error } = await db.from('messages').insert([formData]);
      if (error) throw error;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 900));
      console.info('[Mode Demo] Pesan tersimpan secara lokal:', formData);
    }

    showToast('Pesan Berhasil Terkirim', 'Terima kasih telah menghubungi Elsa Insani. Pesan Anda telah diterima!');
    els.form.reset();
    clearFormValidationState();
  } catch (err) {
    console.error('Gagal mengirim pesan ke Supabase:', err);
    showToast('Gagal Mengirim', 'Terjadi gangguan koneksi. Silakan hubungi via WhatsApp atau email langsung.', 'error');
  } finally {
    setFormSubmittingState(false);
  }
}

/* ----------------------------------------------------------
   NAVBAR ACTIVE SCROLLSPY
---------------------------------------------------------- */
function initScrollSpy() {
  const links = document.querySelectorAll('.nav-link');
  const sections = [...links].map((link) => document.querySelector(link.getAttribute('href')));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });

  sections.forEach((sec) => sec && observer.observe(sec));
}

/* ----------------------------------------------------------
   EVENT BINDINGS & INISIALISASI
---------------------------------------------------------- */
function bindEventListeners() {
  if (els.filters) {
    els.filters.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      state.category = chip.dataset.category;
      renderCategoryFilters();
      applyFilters();
    });
  }

  if (els.search) {
    els.search.addEventListener('input', debounce((e) => {
      state.query = e.target.value;
      applyFilters();
    }));
  }

  if (els.resetBtn) {
    els.resetBtn.addEventListener('click', resetAllFilters);
  }

  if (els.grid) {
    els.grid.addEventListener('click', (e) => {
      const card = e.target.closest('.card[data-id]');
      if (!card) return;
      const project = state.projects.find((p) => String(p.id) === card.dataset.id);
      if (project) openDrawer(project);
    });
  }

  if (els.drawerClose) els.drawerClose.addEventListener('click', closeDrawer);
  if (els.overlay) els.overlay.addEventListener('click', closeDrawer);

  if (els.profileTrigger) {
    els.profileTrigger.addEventListener('click', openProfileModal);
  }
  if (els.profileModalClose) {
    els.profileModalClose.addEventListener('click', closeProfileModal);
  }
  if (els.profileModal) {
    els.profileModal.addEventListener('click', (e) => {
      if (e.target === els.profileModal) closeProfileModal();
    });
  }

  // Mobile Navigation Drawer Toggle & Link Handler
  if (els.mobileMenuToggle && els.mobileNav) {
    const iconMenu = els.mobileMenuToggle.querySelector('.icon-hamburger');
    const iconClose = els.mobileMenuToggle.querySelector('.icon-close-menu');

    const setMobileNavState = (open) => {
      els.mobileNav.hidden = !open;
      els.mobileNav.classList.toggle('is-open', open);
      els.mobileMenuToggle.setAttribute('aria-expanded', String(open));
      if (iconMenu && iconClose) {
        iconMenu.style.display = open ? 'none' : 'block';
        iconClose.style.display = open ? 'block' : 'none';
      }
    };

    els.mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = els.mobileNav.classList.contains('is-open');
      setMobileNavState(!isOpen);
    });

    els.mobileNav.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        setMobileNavState(false);
      });
    });

    document.addEventListener('click', (e) => {
      if (!els.mobileNav.hidden && !els.mobileNav.contains(e.target) && !els.mobileMenuToggle.contains(e.target)) {
        setMobileNavState(false);
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (els.drawer && els.drawer.classList.contains('is-open')) {
        closeDrawer();
      }
      if (els.profileModal && !els.profileModal.hidden) {
        closeProfileModal();
      }
    }
    handleTrapFocus(e);
  });

  // Tombol Salin Cepat pada Kartu Kontak (WhatsApp, Email, Kampus)
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.copy-btn[data-copy]');
    if (!copyBtn) return;
    const textToCopy = copyBtn.dataset.copy;
    if (!textToCopy) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        copyBtn.classList.add('copied');
        const span = copyBtn.querySelector('span');
        const originalText = span ? span.textContent : '';
        if (span) span.textContent = 'Tersalin! ✓';
        showToast('Berhasil Disalin', textToCopy + ' telah disalin ke clipboard.');
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          if (span) span.textContent = originalText;
        }, 2400);
      }).catch(() => {
        showToast('Salin Manual', textToCopy);
      });
    } else {
      // Fallback untuk browser lama
      const tempInput = document.createElement('input');
      tempInput.value = textToCopy;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      showToast('Berhasil Disalin', textToCopy);
    }
  });

  if (els.form) {
    els.form.addEventListener('submit', handleContactSubmit);
    Array.from(els.form.elements).forEach((el) => {
      if (el.name && validators[el.name]) {
        el.addEventListener('blur', () => validateField(el.name, el.value));
        el.addEventListener('input', () => {
          const field = el.closest('.field');
          if (field && field.classList.contains('invalid')) {
            validateField(el.name, el.value);
          }
        });
      }
    });
  }
}

async function initializeApp() {
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initSupabaseStorageAssets();
  initTheme();
  initScrollSpy();
  initScrollReveal();
  initCounters();
  initYearTabs();
  initLightbox();
  initMagneticButtons();
  init3DTiltCards();
  bindEventListeners();

  if (!USE_SUPABASE) {
    console.info('Kredensial Supabase kosong. Menjalankan portofolio dalam mode demo lengkap dengan data CV Elsa Insani.');
  }

  state.projects = await fetchProjects();
  renderCategoryFilters();
  applyFilters();

  state.gallery = await fetchGallery();
  renderGallery(state.gallery);
}

document.addEventListener('DOMContentLoaded', initializeApp);