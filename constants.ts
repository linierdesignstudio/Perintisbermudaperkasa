import { Product, Translation, Language } from './types';
import homeBulkCarrier from './src/assets/images/home-bulk-carrier.jpg';
import homeCargoOperations from './src/assets/images/catalog-marine-cranes.jpg';

// --- 1. LANGUAGE CONFIGURATION ---
export const LANG_CONFIG: Record<Language, { label: string; flag: string }> = {
  EN: { label: 'English', flag: '🇺🇸' },
  ID: { label: 'Indonesia', flag: '🇮🇩' },
};

// --- 2. BASE PRODUCT DATA & TRANSLATION ---
export const PRODUCTS: Record<Language, Product[]> = {
  EN: [
    {
      id: 'shipping-agency',
      title: 'Ship Agency & Port Services',
      description: 'Port-call support covering arrival and departure coordination, CIQP clearances, vessel husbandry, crew changes, and arrangements for fresh water, bunkers, and other port services.',
      image: homeBulkCarrier,
      tags: ['Port-call Coordination', 'Vessel Husbandry', 'Crew-change Support'],
      specs: [
        { name: 'Average Turnaround', value: 24, standard: 36, unit: 'hrs', type: 'count' },
        { name: 'Clearance Accuracy', value: 100, standard: 98, unit: '%', type: 'percentage' },
        { name: 'Daily Reports Rate', value: 100, standard: 100, unit: '%', type: 'percentage' },
        { name: 'Active Port Network', value: 15, standard: 10, unit: 'ports', type: 'count' },
      ],
    },
    {
      id: 'pbm-stevedoring',
      title: 'Cargo Handling & Stevedoring (PBM)',
      description: 'Cargo handling support for stevedoring, cargodoring, receiving, and delivery. Services can be arranged for dry bulk cargo such as coal, nickel ore, and silica sand, as well as clinker, cement, and general cargo.',
      image: homeCargoOperations,
      tags: ['Bulk Cargo', 'Cargo Handling', 'Receiving & Delivery'],
      specs: [
        { name: 'Average Handling Rate', value: 8500, standard: 7500, unit: 't/day', type: 'count' },
        { name: 'Supervision Presence', value: 100, standard: 100, unit: '%', type: 'percentage' },
        { name: 'Cargo Defect Rate', value: 0, standard: 0.1, unit: '%', type: 'percentage' },
        { name: 'Heavy Equipment Ready', value: 100, standard: 100, unit: '%', type: 'percentage' },
      ],
    },
  ],
  ID: [
    {
      id: 'shipping-agency',
      title: 'Keagenan Kapal dan Layanan Pelabuhan',
      description: 'Dukungan untuk kunjungan kapal, mulai dari koordinasi kedatangan dan keberangkatan, pengurusan clearance CIQP, ship husbandry, pergantian kru, hingga pengaturan air tawar, bahan bakar, dan kebutuhan kapal lainnya.',
      image: homeBulkCarrier,
      tags: ['Koordinasi Kunjungan Kapal', 'Ship Husbandry', 'Dukungan Pergantian Kru'],
      specs: [
        { name: 'Waktu Bongkar-Muat', value: 24, standard: 36, unit: 'jam', type: 'count' },
        { name: 'Akurasi Clearance', value: 100, standard: 98, unit: '%', type: 'percentage' },
        { name: 'Laporan Berkala', value: 100, standard: 100, unit: '%', type: 'percentage' },
        { name: 'Jaringan Pelabuhan', value: 15, standard: 10, unit: 'lokasi', type: 'count' },
      ],
    },
    {
      id: 'pbm-stevedoring',
      title: 'Bongkar Muat Kargo (PBM)',
      description: 'Penanganan kargo yang mencakup stevedoring, cargodoring, receiving, dan delivery. Layanan dapat disesuaikan untuk muatan curah kering seperti batu bara, bijih nikel, dan pasir kuarsa, serta klinker, semen, dan general cargo.',
      image: homeCargoOperations,
      tags: ['Kargo Curah', 'Penanganan Kargo', 'Receiving & Delivery'],
      specs: [
        { name: 'Laju Bongkar Muat', value: 8500, standard: 7500, unit: 'ton/hari', type: 'count' },
        { name: 'Pengawasan Lapangan', value: 100, standard: 100, unit: '%', type: 'percentage' },
        { name: 'Rasio Klaim Rusak', value: 0, standard: 0.1, unit: '%', type: 'percentage' },
        { name: 'Kesiapan Alat Berat', value: 100, standard: 100, unit: '%', type: 'percentage' },
      ],
    },
  ],
};

// --- 3. FULL UI TRANSLATIONS ---
export const TRANSLATIONS: Record<Language, Translation> = {
  EN: {
    nav: {
      home: "Home",
      whyChooseUs: "Why Us",
      services: "Services",
      products: "Business Lines",
      sustainability: "Compliance",
      traceability: "Operational Flow",
      contact: "Contact",
      client: "Client Portal",
      about: "About Us",
      themeSettings: "Theme Settings",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      selectLanguage: "Language"
    },
    hero: {
      badge: "Ship Agency & Cargo Handling",
      titleLine1: "Port-call support for",
      titleLine2: "ships and cargo",
      subtitle: "PT Perintis Bermuda Perkasa coordinates ship agency and cargo handling services around each port call, from pre-arrival arrangements through departure.",
      ctaPrimary: "Explore Our Services",
      ctaSecondary: "Talk to Our Team",
      currentVol: "Port Operations"
    },
    marquee: "PT PERINTIS BERMUDA PERKASA • RELIABLE • PROFESSIONAL • COMPLIANT • EFFICIENT • TRANSPARENT • ",
    stats: {
      farmers: "Vessels Serviced",
      countries: "Ports Under Service",
      shipping: "Total Cargo Handled (Tons)"
    },
    whyChooseUs: {
      title: "Why PT Perintis Bermuda Perkasa?",
      subtitle: "Clear communication and careful preparation matter at every port call. Our team coordinates with vessel representatives, port authorities, and service providers to keep each step moving.",
      heading: "Practical support at every port call",
      reasons: [
        {
          title: "Port-call coordination",
          desc: "One point of coordination",
          detail: "We help coordinate arrival and departure requirements with the relevant port parties and service providers."
        },
        {
          title: "Clear cost estimates",
          desc: "Itemized Proforma D/A",
          detail: "A Proforma D/A outlines anticipated port-call expenses so the principal can review expected disbursements before operations."
        },
        {
          title: "Clearance coordination",
          desc: "Support for CIQP procedures",
          detail: "We coordinate the required clearance documentation and communication with Customs, Immigration, Quarantine, and port health authorities."
        },
        {
          title: "Departure preparation",
          desc: "Support for sailing clearance",
          detail: "We help prepare departure requirements and coordinate the process for the Sailing Approval Letter (SPB) with the relevant authorities."
        },
        {
          title: "Vessel husbandry",
          desc: "Arranging supplies and services",
          detail: "Fresh water, provisions, bunkers, spare parts, and other vessel requirements can be coordinated according to the port call."
        },
        {
          title: "Kendari-based operations",
          desc: "Local coordination in Southeast Sulawesi",
          detail: "Based in Kendari, Southeast Sulawesi, we support port-call coordination for vessels and cargo operations in the region."
        }
      ],
      comparison: {
        tag: "Operational Integration",
        title: "A coordinated port call",
        subtitle: "Advance preparation and communication help vessel operators plan port requirements and respond to changes during operations.",
        directImpact: "Inbound & Outbound Clearances",
        farmer: "Vessel Clearance",
        farmerDesc: "Coordinating with Syahbandar, Customs, and Immigration authorities",
        hub: "Local Operations Center",
        hubDesc: "Real-time communication, weather reports, and draft inspections",
        buyer: "Indonesian Smelters & Terminals",
        buyerDesc: "Timely delivery and optimized cargo handling procedures",
        statTraceable: "Clear port-call updates",
        statMiddlemen: "Coordinated service providers"
      },
      visual: {
        moisture: "Operational Activity Index",
        grading: "Pre-arrival Safety Match",
        packaging: "Agent Years of Service"
      },
      learnMore: "Vessel Checklist"
    },
    services: {
      title: "Ship Agency & Port Services",
      subtitle: "Coordination for vessel clearances, berthing arrangements, crew changes, and port-call supplies.",
      items: [
        {
          title: "Clearance In and Out",
          desc: "Coordinating arrival and departure documentation with the relevant port authorities, Customs, Immigration, and Quarantine (CIQP).",
          features: ["CIQP Port Clearance", "Official Port Authorities Coordination"]
        },
        {
          title: "Vessel Operations and Berthing",
          desc: "Arranging berths, pilotage, and tug assistance in coordination with the port and vessel schedule.",
          features: ["Berth and tug arrangements", "Pilotage coordination"]
        },
        {
          title: "Logistics and Chandlery",
          desc: "Coordinating requested provisions, fresh water, spare parts, and other vessel supplies.",
          features: ["Fresh Provisions & Water", "Engine & Deck Spare Parts"]
        },
        {
          title: "Bunkering Services",
          desc: "Coordinating marine fuel and lubricant supply based on the vessel's requirements and port arrangements.",
          features: ["Marine fuel arrangements", "Lubricant supply coordination"]
        },
        {
          title: "Crew Management (Crewing/Husbandry)",
          desc: "Coordinating crew changes, relevant immigration documentation, ground transport, accommodation, and medical assistance when requested.",
          features: ["Crew change coordination", "Travel and welfare assistance"]
        },
        {
          title: "Stevedoring & Cargo Handling (PBM)",
          desc: "Stevedoring, cargodoring, receiving, and delivery for dry bulk minerals, clinker, cement, and general cargo.",
          features: ["Stevedoring and cargodoring", "Bulk and general cargo"]
        }
      ]
    },
    products: {
      title: "Our Services",
      subtitle: "Ship agency and cargo handling services for vessel operators, cargo owners, and their local representatives.",
      viewCatalog: "View Service Details"
    },
    catalogPage: {
      title: "Ship Agency and Cargo Handling",
      subtitle: "An overview of our port-call coordination and cargo handling services.",
      backToHome: "Back to Home"
    },
    sustainability: {
      title: "Regulatory Compliance & Standards",
      subtitle: "PT Perintis Bermuda Perkasa is fully licensed and compliant with national maritime regulations and international safety guidelines.",
      tagline: "Safety First",
      cards: [
        { title: "BKI Certified", value: "100%", desc: "Full compliance with BKI and national safety standards." },
        { title: "Clearance Record", value: "0 incident", desc: "No quarantine or customs infractions." },
        { title: "Efficiency Index", value: "98%", desc: "Optimal berthing times with zero unnecessary delays." }
      ],
      metrics: [
        { label: "Vessels Serviced", value: "480+" },
        { label: "Water Safety Level", value: "1.0 Perfect" },
        { label: "Certified Port Crew", value: "100%" }
      ]
    },
    specs: {
      title: "Vessel Suitability Limits",
      analysisLabel: "Business Line Capabilities & Parameters",
      grade: "Licensed Shipping Agency (AL-Agen)"
    },
    traceability: {
      title: "Port-call coordination",
      subtitle: "A typical port call involves several coordinated steps. The sequence may vary by vessel, port, and cargo requirements.",
      steps: {
        farm: "Pre-arrival information and documents",
        process: "Arrival, clearance, and berthing arrangements",
        qc: "Cargo operations and vessel requirements",
        export: "Departure clearance coordination"
      }
    },
    clientForm: {
      title: "Discuss a port call",
      subtitle: "Share your vessel, port, and service requirements so our team can review the request and advise on next steps.",
      name: "Vessel Owner / Operator Name",
      origin: "Port or operational route",
      whatsapp: "Contact number / WhatsApp",
      email: "Business email",
      product: "Service required",
      submit: "Send an Inquiry",
      successMsg: "Thank you. Your inquiry is ready to send."
    },
    inquiry: {
      title: "Planning a port call or cargo operation?",
      subtitle: "Tell us what you need, and our team will discuss the relevant arrangements with you.",
      namePlaceholder: "Company Name",
      emailPlaceholder: "Business Email",
      productLabel: "Servicable Ship Type",
      submitBtn: "Request Proforma D/A"
    },
    cookieConsent: {
      text: "We use cookies to improve your browsing experience on our website.",
      accept: "Accept Cookies",
      decline: "Decline"
    },
    footer: {
      ctaPrefix: "Discuss your",
      ctaHighlight: "next port call.",
      startSourcing: "Talk to Our Team",
      exploreLabel: "[ Navigation Directory ]",
      connectLabel: "[ Communication ]",
      officeLabel: "[ Head Office ]",
      tagline: "Ship agency and cargo handling support, coordinated around the requirements of each port call.",
      addressTitle: "Headquarters",
      address: "Perumahan Kendari Indah Blok F/7\nKendari, Sulawesi Tenggara, Indonesia",
      contactTitle: "Business Contacts",
      legalTitle: "Information & Compliance",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookies: "Cookie Settings",
      systemStatus: "Port-call support",
      rights: "PT Perintis Bermuda Perkasa.",
      rightsReserved: "All rights reserved.",
      worldClock: {
        wita: "Kendari Base (WITA)",
        wit: "Maluku Base (WIT)",
        wib: "Jakarta HQ (WIB)"
      }
    },
    aboutPage: {
      tagline: "About the Company",
      location: "Kendari, Southeast Sulawesi",
      introBold: "PT Perintis Bermuda Perkasa provides ship agency and cargo handling services, coordinating the people, documentation, and port arrangements involved in a vessel's call.",
      introText: "Our work includes arrival and departure coordination, clearance documentation, vessel husbandry, crew-change arrangements, and cargo handling. Each port call has its own requirements, so we work with the vessel's representative and relevant local service providers to plan the necessary steps.",
      visionTitle: "Our Vision",
      visionText: "To be the most reliable, compliant, and efficient general shipping agency and cargo handling (PBM) partner in Indonesian maritime logistics.",
      missionTitle: "Our Mission",
      missionPoints: [
        "Prepare port-call requirements in coordination with the vessel's representative.",
        "Coordinate clearance documentation with the relevant authorities.",
        "Arrange requested vessel services and crew-change support.",
        "Provide clear information on anticipated port-call disbursements."
      ],
      imageDesc: "Vessel operations at port.",
      originLabel: "Bases of Operation",
      empoweringLabel: "Supporting Ship Operations",
      exportStandardLabel: "BKI Vessel Safety Compliance"
    },
    privacyPage: {
      lastUpdated: "May 2026",
      introTitle: "Privacy Policy & Disclosure",
      introText: "We handle your business coordinates and ship specifications with high confidentiality.",
      collectTitle: "Information We Process",
      collectText: "To draft a correct Proforma D/A, we collect standard voyage details such as:",
      collectList: [
        { title: "Vessel Parameters", desc: "Vessel size, draft, loading/discharging rates, port coordinates, and timeline." }
      ],
      useTitle: "Operational Usage",
      useText: "Data is strictly processed to initiate and fulfill agency coordinates:",
      useList: [
        "Filing harbor clearances with state port authorities.",
        "Preparing official manifest reports and harbor master records."
      ],
      securityTitle: "Security",
      securityText: "We follow strict guidelines and use encrypted communication channels to prevent information leakage.",
      contactTitle: "Contact Shipping Hub",
      contactText: "Direct coordinate inquiries to legal@perintisbermuda.co.id."
    },
    termsPage: {
      effectiveDate: "May 2026",
      agreementTitle: "Standard Ship Agency Terms",
      agreementText: "All general shipping appointments are subject to the regulations of the Indonesian Ministry of Transportation and standard agency service agreements.",
      ipTitle: "Intellectual Property",
      ipText: "All visual media, layouts, and textual content on this website are owned by PT Perintis Bermuda Perkasa.",
      userRepTitle: "Principal Understandings",
      userRepText: "Vessel operators must provide correct certificates, safe load declarations, and prompt advance deposits for the agreed Proforma D/A.",
      productsTitle: "Force Majeure",
      productsText1: "Agency actions are provided in good faith and with professional diligence.",
      productsText2: "Delays caused by extreme weather, port congestion, or state authority checks are subject to standard force majeure clauses.",
      lawTitle: "Governing Law",
      lawText: "These terms are governed and construed in accordance with the laws of the Republic of Indonesia."
    }
  },
  ID: {
    nav: {
      home: "Beranda",
      whyChooseUs: "Keunggulan Kami",
      services: "Layanan Kami",
      products: "Lini Bisnis",
      sustainability: "Kepatuhan",
      traceability: "Alur Operasional",
      contact: "Hubungi Kami",
      client: "Portal Klien",
      about: "Tentang Kami",
      themeSettings: "Tema",
      lightMode: "Terang",
      darkMode: "Gelap",
      selectLanguage: "Bahasa"
    },
    hero: {
      badge: "Keagenan Kapal & Penanganan Kargo",
      titleLine1: "Koordinasi pelabuhan",
      titleLine2: "untuk kapal dan kargo",
      subtitle: "PT Perintis Bermuda Perkasa mendukung operasional kapal melalui layanan keagenan dan penanganan kargo, dengan koordinasi yang disesuaikan untuk setiap kunjungan kapal.",
      ctaPrimary: "Kenali Layanan Kami",
      ctaSecondary: "Hubungi Tim Kami",
      currentVol: "Dukungan Operasional Pelabuhan"
    },
    marquee: "PT PERINTIS BERMUDA PERKASA • KEAGENAN KAPAL • LAYANAN PELABUHAN • PENANGANAN KARGO • ",
    stats: {
      farmers: "Kapal yang Dilayani",
      countries: "Pelabuhan yang Dilayani",
      shipping: "Kargo yang Dikelola (Ton)"
    },
    whyChooseUs: {
      title: "Mitra koordinasi operasional di pelabuhan",
      subtitle: "Setiap kunjungan kapal memiliki kebutuhan dan jadwal yang berbeda. Tim kami membantu menyelaraskan dokumen, layanan kapal, dan komunikasi dengan pihak-pihak terkait.",
      heading: "Dukungan yang bertumpu pada koordinasi",
      reasons: [
        {
          title: "Koordinasi kunjungan kapal",
          desc: "Satu alur komunikasi",
          detail: "Kami membantu menyelaraskan kebutuhan kedatangan dan keberangkatan kapal dengan pihak pelabuhan serta penyedia layanan terkait."
        },
        {
          title: "Rincian biaya yang jelas",
          desc: "Proforma D/A terperinci",
          detail: "Proforma D/A merangkum perkiraan pengeluaran selama kunjungan kapal agar prinsipal dapat meninjau kebutuhan biaya sebelum operasi."
        },
        {
          title: "Koordinasi clearance",
          desc: "Dukungan dokumen CIQP",
          detail: "Kami membantu menyiapkan dokumen dan mengoordinasikan proses dengan Bea Cukai, Imigrasi, Karantina, kesehatan pelabuhan, dan Syahbandar."
        },
        {
          title: "Persiapan keberangkatan",
          desc: "Koordinasi persyaratan SPB",
          detail: "Kami membantu menyiapkan kebutuhan keberangkatan kapal dan mengoordinasikan proses Surat Persetujuan Berlayar (SPB) dengan pihak terkait."
        },
        {
          title: "Kebutuhan kapal",
          desc: "Pengaturan perbekalan dan layanan",
          detail: "Pengadaan air tawar, bahan makanan, bahan bakar, pelumas, suku cadang, dan kebutuhan lainnya dapat dikoordinasikan sesuai permintaan."
        },
        {
          title: "Berbasis di Kendari",
          desc: "Koordinasi lokal Sulawesi Tenggara",
          detail: "Berbasis di Kendari, Sulawesi Tenggara, kami mendukung koordinasi kunjungan kapal dan kegiatan kargo di kawasan tersebut."
        }
      ],
      comparison: {
        tag: "Integrasi Operasional",
        title: "Kunjungan kapal yang terkoordinasi",
        subtitle: "Persiapan dan komunikasi yang jelas membantu operator merencanakan kebutuhan pelabuhan dan menyesuaikan langkah saat kondisi berubah.",
        directImpact: "Proses Masuk & Keluar Pelabuhan",
        farmer: "Clearance Dokumen",
        farmerDesc: "Koordinasi intensif dengan Bea Cukai, Syahbandar, Imigrasi & Karantina Kesehatan Pelabuhan",
        hub: "Kantor Koordinasi Lokal",
        hubDesc: "Komunikasi radio, pemantauan cuaca, dan laporan harian kapal dari lapangan",
        buyer: "Dermaga Tambangan Industri",
        buyerDesc: "Pemuatan kargo yang efisien dan sandar kapal yang aman",
        statTraceable: "Informasi operasional yang jelas",
        statMiddlemen: "Koordinasi layanan terkait"
      },
      visual: {
        moisture: "Indeks Kesiapan Keagenan",
        grading: "Kepatuhan Keselamatan Pra-Kedatangan",
        packaging: "Pengalaman Agen Lapangan (Tahun)"
      },
      learnMore: "Daftar Persyaratan Kapal"
    },
    services: {
      title: "Keagenan Kapal dan Layanan Pelabuhan",
      subtitle: "Koordinasi clearance kapal, pengaturan sandar, pergantian kru, dan kebutuhan kapal selama kunjungan di pelabuhan.",
      items: [
        {
          title: "Clearance In dan Out",
          desc: "Mengoordinasikan dokumen kedatangan dan keberangkatan kapal dengan otoritas pelabuhan, Bea Cukai, Imigrasi, dan Karantina (CIQP).",
          features: ["Koordinasi clearance CIQP", "Dokumen kedatangan dan keberangkatan"]
        },
        {
          title: "Operasional dan Sandar Kapal",
          desc: "Mengatur kebutuhan dermaga, pemanduan, dan kapal tunda dengan mempertimbangkan jadwal kapal serta ketentuan pelabuhan.",
          features: ["Pengaturan dermaga dan kapal tunda", "Koordinasi pemanduan"]
        },
        {
          title: "Logistik dan Perbekalan (Chandlery)",
          desc: "Mengoordinasikan permintaan bahan makanan, air tawar, suku cadang, dan perlengkapan kapal lainnya.",
          features: ["Bahan Makanan & Air Bersih", "Suku Cadang Deck & Mesin"]
        },
        {
          title: "Bunkering",
          desc: "Mengoordinasikan pasokan bahan bakar laut dan minyak pelumas sesuai kebutuhan kapal serta pengaturan di pelabuhan.",
          features: ["Pengaturan pasokan bahan bakar", "Koordinasi minyak pelumas"]
        },
        {
          title: "Manajemen Kru (Crewing/Husbandry)",
          desc: "Mengoordinasikan pergantian kru, dokumen keimigrasian, transportasi, akomodasi, dan bantuan medis bila diperlukan.",
          features: ["Koordinasi pergantian kru", "Dukungan perjalanan dan kesejahteraan"]
        },
        {
          title: "Jasa Bongkar Muat Kargo (PBM)",
          desc: "Layanan stevedoring, cargodoring, receiving, dan delivery untuk muatan mineral curah, batu bara, semen, dan general cargo.",
          features: ["Stevedoring dan cargodoring", "Kargo curah dan general cargo"]
        }
      ]
    },
    products: {
      title: "Layanan Kami",
      subtitle: "Layanan keagenan kapal dan penanganan kargo bagi operator kapal, pemilik muatan, serta perwakilannya.",
      viewCatalog: "Lihat Rincian Layanan"
    },
    catalogPage: {
      title: "Keagenan Kapal dan Penanganan Kargo",
      subtitle: "Gambaran layanan koordinasi kunjungan kapal dan penanganan kargo kami.",
      backToHome: "Kembali ke Beranda"
    },
    sustainability: {
      title: "Standar Keamanan & Kepatuhan Regulasi",
      subtitle: "PT Perintis Bermuda Perkasa menjunjung kepatuhan hukum setinggi 100% pada aturan pelayaran nasional dan kenyamanan lingkungan laut.",
      tagline: "Utamakan Keselamatan",
      cards: [
        { title: "Tersertifikasi BKI", value: "100%", desc: "Kepatuhan penuh pada aturan Biro Klasifikasi Indonesia dan Syahbandar." },
        { title: "Bebas Masalah Hukum", value: "0 insiden", desc: "Tidak ada sanksi administratif, karantina kapal, atau penahanan dokumen." },
        { title: "Efisiensi Sandar", value: "98%", desc: "Proses sandar yang cepat dengan draf navigasi yang akurat." }
      ],
      metrics: [
        { label: "Armada yang Dilayani", value: "480+" },
        { label: "Indeks Keamanan Air", value: "1.0 Sempurna" },
        { label: "Petugas Port Bersertifikat", value: "100%" }
      ]
    },
    specs: {
      title: "Batas Kemampuan Dermaga & Kapal",
      analysisLabel: "Analisis Kapabilitas Lini Bisnis",
      grade: "Layanan Keagenan Kapal Resmi Berizin (AL-Agen)"
    },
    traceability: {
      title: "Koordinasi kunjungan kapal",
      subtitle: "Kunjungan kapal melibatkan beberapa tahapan koordinasi. Urutannya dapat berbeda sesuai kapal, pelabuhan, dan kebutuhan kargo.",
      steps: {
        farm: "Informasi dan dokumen pra-kedatangan",
        process: "Kedatangan, clearance, dan pengaturan sandar",
        qc: "Operasi kargo dan kebutuhan kapal",
        export: "Koordinasi clearance keberangkatan"
      }
    },
    clientForm: {
      title: "Diskusikan kebutuhan kunjungan kapal",
      subtitle: "Sampaikan informasi kapal, pelabuhan, dan layanan yang dibutuhkan agar tim kami dapat meninjau permintaan dan membahas langkah selanjutnya.",
      name: "Nama perusahaan atau perwakilan",
      origin: "Pelabuhan atau rute operasional",
      whatsapp: "Nomor kontak / WhatsApp",
      email: "Email bisnis",
      product: "Layanan yang dibutuhkan",
      submit: "Kirim Permintaan",
      successMsg: "Terima kasih. Rincian permintaan Anda siap dikirim."
    },
    inquiry: {
      title: "Merencanakan kunjungan kapal atau operasi kargo?",
      subtitle: "Ceritakan kebutuhan Anda agar tim kami dapat membahas pengaturan layanan yang relevan.",
      namePlaceholder: "Nama Perusahaan",
      emailPlaceholder: "Alamat Email",
      productLabel: "Spesifikasi Jenis Kapal",
      submitBtn: "Minta Penawaran Proforma D/A"
    },
    cookieConsent: {
      text: "Kami menggunakan cookies untuk meningkatkan kenyamanan Anda menelusuri website kami.",
      accept: "Setujui",
      decline: "Tolak"
    },
    footer: {
      ctaPrefix: "Diskusikan",
      ctaHighlight: "kebutuhan operasional Anda.",
      startSourcing: "Hubungi Tim Kami",
      exploreLabel: "[ Direktori Navigasi ]",
      connectLabel: "[ Kontak Bisnis ]",
      officeLabel: "[ Lokasi ]",
      tagline: "Layanan keagenan kapal dan penanganan kargo yang dikoordinasikan sesuai kebutuhan setiap kunjungan kapal.",
      addressTitle: "Kantor Pusat",
      address: "Perumahan Kendari Indah Blok F/7\nKendari, Sulawesi Tenggara, Indonesia",
      contactTitle: "Hubungi Kami",
      legalTitle: "Informasi",
      privacy: "Kebijakan Privasi",
      terms: "Syarat & Ketentuan Pengangkutan",
      cookies: "Pengaturan Cookie",
      systemStatus: "Dukungan operasional pelabuhan",
      rights: "PT Perintis Bermuda Perkasa.",
      rightsReserved: "Hak cipta dilindungi undang-undang.",
      worldClock: {
        wita: "WITA Kendari",
        wit: "WIT Maluku",
        wib: "WIB Jakarta"
      }
    },
    aboutPage: {
      tagline: "Profil Perusahaan",
      location: "Kendari, Sulawesi Tenggara",
      introBold: "PT Perintis Bermuda Perkasa menyediakan layanan keagenan kapal dan penanganan kargo, termasuk koordinasi dokumen, kebutuhan kapal, dan pengaturan di pelabuhan.",
      introText: "Layanan kami mencakup koordinasi kedatangan dan keberangkatan kapal, dokumen clearance, ship husbandry, pergantian kru, serta penanganan kargo. Setiap kunjungan kapal memiliki kebutuhan tersendiri. Karena itu, kami berkoordinasi dengan perwakilan kapal dan penyedia layanan setempat untuk menyusun langkah yang diperlukan.",
      visionTitle: "Visi Kami",
      visionText: "Menjadi mitra layanan keagenan kapal dan penanganan kargo yang konsisten, bertanggung jawab, dan memahami kebutuhan operasional pelabuhan.",
      missionTitle: "Cara Kami Bekerja",
      missionPoints: [
        "Mempersiapkan kebutuhan kunjungan kapal bersama perwakilan kapal.",
        "Mengoordinasikan dokumen clearance dengan pihak berwenang terkait.",
        "Mengatur layanan kapal dan dukungan pergantian kru sesuai permintaan.",
        "Menyampaikan rincian perkiraan pengeluaran kunjungan kapal dengan jelas."
      ],
      imageDesc: "Kegiatan kapal di area pelabuhan.",
      originLabel: "Kantor Pelayanan & Cabang",
      empoweringLabel: "Mendukung Kelancaran Operasional Pelayaran",
      exportStandardLabel: "Kepatuhan Standar Keselamatan BKI"
    },
    privacyPage: {
      lastUpdated: "Mei 2026",
      introTitle: "Kebijakan Privasi & Data Layanan",
      introText: "Kami berkomitmen untuk menjaga kerahasiaan draf kargo, koordinat rute pelayaran, dan data pemilik kapal milik klien.",
      collectTitle: "Jenis Data yang Diproses",
      collectText: "Untuk merumuskan draf Proforma D/A, kami mengumpulkan data pelayaran umum seperti:",
      collectList: [
        { title: "Klausa Kapal & Muatan", desc: "Dimensi kapal, data draf, laju bongkar muat kargo, nama nakhoda, serta jadwal tiba." }
      ],
      useTitle: "Penggunaan Data",
      useText: "Data yang terkumpul dimanfaatkan penuh secara eksklusif untuk:",
      useList: [
        "Pengajuan permohonan sandar jangkar kepada Otoritas Pelabuhan setempat.",
        "Penyusunan manifest kapal resmi serta laporan kepada Kantor Syahbandar."
      ],
      securityTitle: "Keamanan Informasi",
      securityText: "Kami menggunakan perlindungan komunikasi internal guna meminimalkan risiko perpindahan bocoran data kepada pihak ketiga.",
      contactTitle: "Hubungi Hub Legal Maritim",
      contactText: "Direksi penanganan hukum keagenan diajukan melalui legal@perintisbermuda.co.id."
    },
    termsPage: {
      effectiveDate: "Mei 2026",
      agreementTitle: "Syarat dan Ketentuan Keagenan",
      agreementText: "Seluruh penunjukan keagenan kapal pelabuhan tunduk pada ketentuan hukum Kementerian Perhubungan Republik Indonesia.",
      ipTitle: "Hak Milik Informasi",
      ipText: "Segala bentuk teks, gambar, bagan, dan draf kalkulator di dalam website ini adalah milik sah PT Perintis Bermuda Perkasa.",
      userRepTitle: "Tanggung Jawab Pemilik Kapal",
      userRepText: "Pemilik kapal atau operator bertanggung jawab atas keabsahan dokumen kapal, jaminan kelayakan armada, serta penyelesaian dana Proforma D/A.",
      productsTitle: "Penolakan & Kondisi Force Majeure",
      productsText1: "Kami senantiasa berupaya melaksanakan pelayanan dengan kecakapan dan ketekunan profesional terbaik.",
      productsText2: "Keterlambatan rute pandu atau operasional pelabuhan akibat badai laut, cuaca ekstrem, atau penutupan pelabuhan adalah kondisi di luar kendali agen.",
      lawTitle: "Yurisdiksi Hukum",
      lawText: "Peraturan keagenan ini ditafsirkan dan diselesaikan sesuai dengan ketentuan hukum Republik Indonesia."
    }
  }
};
