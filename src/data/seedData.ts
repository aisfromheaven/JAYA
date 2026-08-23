import {
  UserProfile,
  Beneficiary,
  DonationProgram,
  DonationTransaction,
  TrainingCourse,
  TransparencyReport,
  StoryFeedPost,
  RtRwPartner,
  InstructorApplication
} from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user_admin_1',
    name: 'Admin Utama JAYA BOGOR',
    email: 'admin@jayabogor.id',
    role: 'ADMIN',
    phone: '081298765432',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isVerified: true
  },
  {
    id: 'user_donor_1',
    name: 'Budi Rahardjo, S.Kom',
    email: 'budi.rahardjo@gmail.com',
    role: 'DONATUR',
    phone: '081311223344',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    subscription: {
      active: true,
      amount: 50000,
      billingDay: 1,
      targetType: 'SEMBAKO',
      createdAt: '2026-07-01T10:00:00.000Z'
    },
    instructorProfile: {
      skill: 'Digital Marketing & Foto Produk HP',
      experience: '5 Tahun Konsultan UMKM Bogor',
      portfolioUrl: 'https://instagram.com/budi_umkm_bogor',
      feeType: 'GRATIS',
      status: 'APPROVED'
    }
  },
  {
    id: 'user_rtrw_1',
    name: 'H. Suryadi (Ketua RT 03/RW 05)',
    email: 'suryadi.rt03@bogor.go.id',
    role: 'RT_RW',
    phone: '085777889900',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    rtRwNumber: 'RT 03 / RW 05',
    kelurahan: 'Baranangsiang',
    kecamatan: 'Bogor Timur',
    isVerified: true
  },
  {
    id: 'user_rtrw_2',
    name: 'Ahmad Fauzi (Ketua RW 02)',
    email: 'ahmad.rw02@bogor.go.id',
    role: 'RT_RW',
    phone: '085811992288',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rtRwNumber: 'RT 01-05 / RW 02',
    kelurahan: 'Babakan Pasar',
    kecamatan: 'Bogor Tengah',
    isVerified: true
  },
  {
    id: 'user_penerima_1',
    name: 'Ibu Ratnasari',
    email: 'ratnasari.jaya@gmail.com',
    role: 'PENERIMA',
    phone: '089612345678',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    rtRwNumber: 'RT 03 / RW 05',
    kelurahan: 'Baranangsiang',
    kecamatan: 'Bogor Timur',
    beneficiaryCategory: 'JANDA',
    isVerified: true
  }
];

export const INITIAL_RTRW_PARTNERS: RtRwPartner[] = [
  {
    id: 'rtrw_1',
    userId: 'user_rtrw_1',
    name: 'H. Suryadi',
    phone: '085777889900',
    kecamatan: 'Bogor Timur',
    kelurahan: 'Baranangsiang',
    rtRwNumber: 'RT 03 / RW 05',
    registeredWargaCount: 6,
    verifiedAt: '2026-06-15T08:00:00Z',
    status: 'VERIFIED',
    joinedDate: '2026-06-10'
  },
  {
    id: 'rtrw_2',
    userId: 'user_rtrw_2',
    name: 'Ahmad Fauzi',
    phone: '085811992288',
    kecamatan: 'Bogor Tengah',
    kelurahan: 'Babakan Pasar',
    rtRwNumber: 'RT 02 / RW 02',
    registeredWargaCount: 4,
    verifiedAt: '2026-07-01T09:30:00Z',
    status: 'VERIFIED',
    joinedDate: '2026-06-28'
  },
  {
    id: 'rtrw_3',
    userId: 'user_rtrw_3',
    name: 'Drs. Bambang Sudrajat',
    phone: '081299881122',
    kecamatan: 'Tanah Sareal',
    kelurahan: 'Kebon Pedes',
    rtRwNumber: 'RT 04 / RW 08',
    registeredWargaCount: 3,
    status: 'PENDING',
    joinedDate: '2026-08-16'
  }
];

export const INITIAL_BENEFICIARIES: Beneficiary[] = [
  {
    id: 'ben_1',
    name: 'Muhammad Rizky Pratama',
    category: 'YATIM',
    age: 10,
    rtRw: 'RT 03 / RW 05',
    kelurahan: 'Baranangsiang',
    kecamatan: 'Bogor Timur',
    address: 'Jl. Riau No. 14 Gang Kenanga',
    story: 'Rizky kehilangan ayahnya 2 tahun lalu karena sakit paru-paru. Sekarang tinggal bersama ibunya yang bekerja serabutan mencuci pakaian.',
    photoUrl: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=500&auto=format&fit=crop&q=80',
    schoolYearTarget: 2400000,
    currentEducationSavings: 1450000,
    registeredByRtRwId: 'rtrw_1',
    registeredByRtRwName: 'H. Suryadi (RT 03/RW 05)',
    status: 'VERIFIED',
    totalAssistanceReceived: 1850000,
    lastAssistanceDate: '2026-08-05',
    dreamBook: {
      dreamCareer: 'Dokter Anak & Peneliti Robotika',
      gradeLevel: 'Kelas 4 SDN Baranangsiang 01',
      desiredBooks: [
        'Ensiklopedia Tubuh Manusia',
        'Komik Sains Kuark',
        'Buku Kumpulan Doa Sehari-hari'
      ],
      wishList: 'Sepatu sekolah ukuran 36 dan tas ransel yang tidak bocor saat hujan Bogor.',
      favoriteQuote: 'Aku ingin sembuhkan banyak anak-anak yang sakit seperti almarhum Ayah.',
      hobbies: ['Membaca Komik', 'Merakit kardus bekas', 'Sepak bola']
    }
  },
  {
    id: 'ben_2',
    name: 'Siti Nur Aisyah',
    category: 'YATIM',
    age: 12,
    rtRw: 'RT 02 / RW 02',
    kelurahan: 'Babakan Pasar',
    kecamatan: 'Bogor Tengah',
    address: 'Pegangsaan Gg. Roda RT 02/02',
    story: 'Aisyah adalah siswa berprestasi peringkat 1 di sekolahnya. Ibunya bekerja menjahit permak di teras kontrakan kecil.',
    photoUrl: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop&q=80',
    schoolYearTarget: 3000000,
    currentEducationSavings: 2150000,
    registeredByRtRwId: 'rtrw_2',
    registeredByRtRwName: 'Ahmad Fauzi (RW 02)',
    status: 'VERIFIED',
    totalAssistanceReceived: 2150000,
    lastAssistanceDate: '2026-08-01',
    dreamBook: {
      dreamCareer: 'Guru Matematika & Penulis Cerpen',
      gradeLevel: 'Kelas 6 SDN Babakan',
      desiredBooks: [
        'Kumpulan Soal Olimpiade Matematika SD',
        'Novel Laskar Pelangi karya Andrea Hirata',
        'Kamus Lengkap Bahasa Inggris - Indonesia'
      ],
      wishList: 'Meja belajar lipat kecil dan buku-buku latihan ujian kelulusan SD.',
      favoriteQuote: 'Dengan ilmu, aku ingin membanggakan Ibu dan mendidik adik-adik di Bogor.',
      hobbies: ['Menulis Puisi', 'Menghitung Cepat', 'Menanam Bunga']
    }
  },
  {
    id: 'ben_3',
    name: 'Fadhil Rahman',
    category: 'YATIM',
    age: 8,
    rtRw: 'RT 03 / RW 05',
    kelurahan: 'Baranangsiang',
    kecamatan: 'Bogor Timur',
    address: 'Jl. Babakan Undak No. 8',
    story: 'Fadhil adalah anak bungsu dari 3 bersaudara yang yatim sejak usia 4 tahun. Gemar menggambar dan bercita-cita membuat jembatan kokoh di Bogor.',
    photoUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&auto=format&fit=crop&q=80',
    schoolYearTarget: 1800000,
    currentEducationSavings: 750000,
    registeredByRtRwId: 'rtrw_1',
    registeredByRtRwName: 'H. Suryadi (RT 03/RW 05)',
    status: 'VERIFIED',
    totalAssistanceReceived: 750000,
    lastAssistanceDate: '2026-07-20',
    dreamBook: {
      dreamCareer: 'Arsitek & Desainer Taman Kota',
      gradeLevel: 'Kelas 2 SD',
      desiredBooks: [
        'Buku Gambar & Mewarnai Arsitektur',
        'Kisah 25 Nabi dan Rasul',
        'Buku Mengenal Tata Surya'
      ],
      wishList: 'Pensil warna 24 warna dan penggaris set lengkap.',
      favoriteQuote: 'Nanti Fadhil mau buatkan rumah yang luas dan hangat untuk Ibu.',
      hobbies: ['Menggambar Rumah', 'Bermain Origami']
    }
  },
  {
    id: 'ben_4',
    name: 'Ibu Ratnasari (46 Thn)',
    category: 'JANDA',
    age: 46,
    rtRw: 'RT 03 / RW 05',
    kelurahan: 'Baranangsiang',
    kecamatan: 'Bogor Timur',
    address: 'Jl. Riau Gang Melati No. 5',
    phone: '089612345678',
    story: 'Menghidupi 3 anak yang masih sekolah setelah suami wafat 3 tahun lalu. Sehari-hari membuat peyek dan kripik singkong keliling dengan keuntungan pas-pasan.',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80',
    dependentsCount: 3,
    skillNeeds: ['Olahan Keripik Talas', 'Kemasan Higienis', 'Pemasaran Online'],
    registeredByRtRwId: 'rtrw_1',
    registeredByRtRwName: 'H. Suryadi (RT 03/RW 05)',
    status: 'VERIFIED',
    totalAssistanceReceived: 1200000,
    lastAssistanceDate: '2026-08-10'
  },
  {
    id: 'ben_5',
    name: 'Ibu Maryati (52 Thn)',
    category: 'JANDA',
    age: 52,
    rtRw: 'RT 02 / RW 02',
    kelurahan: 'Babakan Pasar',
    kecamatan: 'Bogor Tengah',
    address: 'Gang Kelinci No. 12',
    phone: '085712889911',
    story: 'Tinggal sendiri di kontrakan petak, memiliki keahlian menjahit dasar namun mesin jahit tuanya rusak. Membutuhkan modal peralatan dan bahan baku kain.',
    photoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&auto=format&fit=crop&q=80',
    dependentsCount: 1,
    skillNeeds: ['Jahit Gamis & Hijab', 'Servis Mesin Jahit Dasar'],
    registeredByRtRwId: 'rtrw_2',
    registeredByRtRwName: 'Ahmad Fauzi (RW 02)',
    status: 'VERIFIED',
    totalAssistanceReceived: 950000,
    lastAssistanceDate: '2026-08-01'
  },
  {
    id: 'ben_6',
    name: 'Ibu Neng Rukmini (39 Thn)',
    category: 'JANDA',
    age: 39,
    rtRw: 'RT 04 / RW 08',
    kelurahan: 'Kebon Pedes',
    kecamatan: 'Tanah Sareal',
    address: 'Jl. Pemuda Gang Buntu No. 3',
    story: 'Memiliki 2 balita dan anak sulung kelas 1 SMP. Saat ini mencari penghasilan dari jasa setrika baju tetangga dan butuh bantuan sembako rutin.',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    dependentsCount: 3,
    skillNeeds: ['Pembuatan Kue Kering', 'Manajemen Keuangan Rumah Tangga'],
    registeredByRtRwId: 'rtrw_3',
    registeredByRtRwName: 'Drs. Bambang Sudrajat',
    status: 'VERIFIED',
    totalAssistanceReceived: 500000,
    lastAssistanceDate: '2026-07-28'
  }
];

export const INITIAL_PROGRAMS: DonationProgram[] = [
  {
    id: 'prog_sembako_50k',
    title: 'Paket Sembako Berkah Rp 50.000',
    type: 'SEMBAKO_50K',
    category: 'SEMBAKO',
    description: 'Penyaluran paket pangan pokok untuk janda dhuafa dan keluarga yatim di wilayah pemukiman padat Bogor.',
    targetAmount: 15000000,
    collectedAmount: 11450000,
    donorCount: 229,
    packagePrice: 50000,
    packageItems: ['Beras Premium 3 Kg', 'Minyak Goreng 1 Liter', 'Telur Ayam 1/2 Kg', 'Mie Instan 5 Bungkus'],
    coverImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&auto=format&fit=crop&q=80',
    location: 'Seluruh Kelurahan Kota & Kab. Bogor',
    badge: 'Terpopuler',
    isUrgent: true,
    createdAt: '2026-07-01'
  },
  {
    id: 'prog_sembako_100k',
    title: 'Paket Sembako Keluarga Bahagia Rp 100.000',
    type: 'SEMBAKO_100K',
    category: 'SEMBAKO',
    description: 'Paket sembako lengkap kapasitas 1 bulan untuk keluarga janda dengan 2 anak yatim atau lebih.',
    targetAmount: 20000000,
    collectedAmount: 14800000,
    donorCount: 148,
    packagePrice: 100000,
    packageItems: ['Beras 5 Kg', 'Minyak Goreng 2 Liter', 'Telur 1 Kg', 'Gula Pasir 1 Kg', 'Teh Celup & Kecap', 'Mie Instan 10 Bungkus'],
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80',
    location: 'Bogor Timur, Bogor Tengah & Tanah Sareal',
    badge: 'Paling Lengkap',
    createdAt: '2026-07-05'
  },
  {
    id: 'prog_santunan_janda',
    title: 'Santunan Tunai & Nafkah Janda Dhuafa Rp 100.000/bln',
    type: 'SANTUNAN_JANDA',
    category: 'SANTUNAN',
    description: 'Bantuan biaya hidup langsung dan modal usaha mikro bergulir bagi ibu-ibu pejuang keluarga tanpa suami.',
    targetAmount: 12000000,
    collectedAmount: 8900000,
    donorCount: 89,
    packagePrice: 100000,
    coverImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
    location: 'Wilayah Binaan RT/RW Kota Bogor',
    badge: 'Rutin Bulanan',
    createdAt: '2026-07-10'
  },
  {
    id: 'prog_santunan_yatim',
    title: 'Santunan Kasih Sayang Yatim Rp 50.000/bln',
    type: 'SANTUNAN_YATIM',
    category: 'SANTUNAN',
    description: 'Santunan uang saku harian dan nutrisi tambahan susu bagi anak-anak yatim usia sekolah.',
    targetAmount: 10000000,
    collectedAmount: 7650000,
    donorCount: 153,
    packagePrice: 50000,
    coverImage: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=600&auto=format&fit=crop&q=80',
    location: 'Bogor Selatan & Bogor Utara',
    createdAt: '2026-07-12'
  },
  {
    id: 'prog_tabungan_rizky',
    title: 'Tabungan Pendidikan Muhammad Rizky Pratama',
    type: 'TABUNGAN_YATIM',
    category: 'TABUNGAN',
    description: 'Bantu wujudkan mimpi Rizky menjadi Dokter. Dana digunakan untuk SPP, seragam, sepatu, dan buku sekolah.',
    targetAmount: 2400000,
    collectedAmount: 1450000,
    donorCount: 29,
    beneficiaryId: 'ben_1',
    beneficiaryName: 'Muhammad Rizky Pratama',
    coverImage: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=600&auto=format&fit=crop&q=80',
    location: 'Kel. Baranangsiang, Bogor Timur',
    badge: 'Buku Mimpi',
    createdAt: '2026-07-15'
  },
  {
    id: 'prog_tabungan_aisyah',
    title: 'Tabungan Pendidikan Siti Nur Aisyah',
    type: 'TABUNGAN_YATIM',
    category: 'TABUNGAN',
    description: 'Dukungan biaya masuk SMP & buku olimpiade matematika untuk Aisyah, siswa berprestasi Babakan Pasar.',
    targetAmount: 3000000,
    collectedAmount: 2150000,
    donorCount: 43,
    beneficiaryId: 'ben_2',
    beneficiaryName: 'Siti Nur Aisyah',
    coverImage: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=600&auto=format&fit=crop&q=80',
    location: 'Kel. Babakan Pasar, Bogor Tengah',
    badge: 'Buku Mimpi',
    createdAt: '2026-07-18'
  },
  {
    id: 'prog_pelatihan_keripik',
    title: 'Pelatihan & Modal Olahan Keripik Talas Bogor',
    type: 'PELATIHAN',
    category: 'PELATIHAN',
    description: 'Program pemberdayaan ibu janda: resep gurih khas Bogor, pengemasan kedap udara, dan jualan online.',
    targetAmount: 4500000,
    collectedAmount: 3600000,
    donorCount: 48,
    coverImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&auto=format&fit=crop&q=80',
    location: 'Akademi Tibersa Bogor & Balai Warga Baranangsiang',
    badge: 'Akademi Tibersa',
    createdAt: '2026-07-22'
  }
];

export const INITIAL_TRAINING_COURSES: TrainingCourse[] = [
  {
    id: 'course_1',
    title: 'Pembuatan Aneka Keripik Talas & Kue Basah Khas Bogor',
    category: 'KULINER',
    instructorType: 'TIBERSA',
    instructorName: 'Chef Diana Wardhani',
    instructorTitle: 'Instruktur Kuliner Akademi Tibersa',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    feeType: 'GRATIS',
    coursePrice: 0,
    honorariumTarget: 1500000,
    honorariumCollected: 1500000,
    scheduleDate: '2026-08-25',
    time: '09:00 - 13:00 WIB',
    location: 'Sentra Pelatihan Tibersa Jl. Pajajaran No. 45 Bogor',
    description: 'Pelatihan praktis cara mengolah talas Bogor agar tidak gatal, varian rasa modern (balado, keju, truffle), serta teknik packing kedap udara agar tahan 6 bulan.',
    targetAudience: 'JANDA',
    enrolledCount: 18,
    maxParticipants: 20,
    isVerifiedByAdmin: true,
    curriculum: [
      'Pemilihan talas berkualitas dan penghilangan getah gatal',
      'Teknik perendaman dan penggorengan suhu stabil',
      'Pembuatan bumbu tabur higienis non-MSG',
      'Perhitungan modal HPP dan harga jual pasar oleh-oleh Bogor'
    ],
    coverImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&auto=format&fit=crop&q=80',
    tibersaUrl: 'https://akademitibersa.com/courses/kuliner-talas-bogor'
  },
  {
    id: 'course_2',
    title: 'Dasar Menjahit, Pola Busana Muslim & Permak Cepat',
    category: 'JAHIT',
    instructorType: 'DONATUR',
    instructorId: 'user_donor_1',
    instructorName: 'Hj. Endang Sulastri',
    instructorTitle: 'Praktisi Butik Muslimah & Donatur Pengajar',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    feeType: 'GRATIS',
    coursePrice: 0,
    honorariumTarget: 2000000,
    honorariumCollected: 1750000,
    scheduleDate: '2026-08-28',
    time: '13:30 - 16:30 WIB',
    location: 'Balai RT 03 Baranangsiang & Live Streaming Tibersa',
    description: 'Membekali ibu janda keterampilan menjahit langsung siap terima order: permak celana/baju, jahit mukena katun, dan jilbab instan.',
    targetAudience: 'JANDA',
    enrolledCount: 15,
    maxParticipants: 15,
    isVerifiedByAdmin: true,
    curriculum: [
      'Pengenalan mesin jahit portable dan perawatan rutin',
      'Pengukuran badan akurat dan pembuatan pola dasar',
      'Jahit lurus, obras, dan pasang resleting jepang',
      'Kiat menerima pesanan jahitan di lingkungan RT/RW'
    ],
    coverImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&auto=format&fit=crop&q=80',
    tibersaUrl: 'https://akademitibersa.com/courses/menjahit-busana-muslim'
  },
  {
    id: 'course_3',
    title: 'Desain Grafis Canva & Pemasaran Konten Media Sosial',
    category: 'DIGITAL',
    instructorType: 'DONATUR',
    instructorId: 'user_donor_1',
    instructorName: 'Budi Rahardjo, S.Kom',
    instructorTitle: 'Digital Marketer & Donatur Pemateri JAYA BOGOR',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    feeType: 'GRATIS',
    coursePrice: 0,
    honorariumTarget: 1200000,
    honorariumCollected: 1200000,
    scheduleDate: '2026-09-02',
    time: '10:00 - 12:00 WIB',
    location: 'Online via Zoom Akademi Tibersa',
    description: 'Khusus remaja yatim dan ibu binaan untuk belajar membuat poster jualan, banner WhatsApp, dan feed Instagram bisnis rumahan dengan ponsel.',
    targetAudience: 'UMUM',
    enrolledCount: 32,
    maxParticipants: 50,
    isVerifiedByAdmin: true,
    curriculum: [
      'Dasar komposisi warna dan font yang menarik',
      'Membuat katalog produk makanan dan jasa di Canva HP',
      'Foto produk dengan pencahayaan alami di rumah',
      'Menulis caption promosi yang memikat pembeli'
    ],
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    tibersaUrl: 'https://akademitibersa.com/courses/canva-umkm'
  },
  {
    id: 'course_4',
    title: 'Dasar Servis HP & Elektronik Ringan untuk Remaja Yatim',
    category: 'USAHA_RUMAHAN',
    instructorType: 'TIBERSA',
    instructorName: 'Kang Ridwan Hakim',
    instructorTitle: 'Teknisi Senior Tibersa Tech Hub',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    feeType: 'BERBAYAR',
    coursePrice: 25000,
    honorariumTarget: 2500000,
    honorariumCollected: 2100000,
    scheduleDate: '2026-09-05',
    time: '09:00 - 15:00 WIB',
    location: 'Workshop Tibersa Jl. Sudirman No. 12 Bogor',
    description: 'Pelatihan vokasi praktis untuk anak yatim usia 15-20 tahun agar memiliki skill ganti baterai, ganti LCD, dan flashing software HP.',
    targetAudience: 'YATIM',
    enrolledCount: 12,
    maxParticipants: 15,
    isVerifiedByAdmin: true,
    curriculum: [
      'Keselamatan kerja dan alat servis elektronik',
      'Diagnosa kerusakan hardware dan software smartphone',
      'Teknik bongkar pasang layar LCD dan baterai tanam',
      'Studi kasus perbaikan HP Android populer'
    ],
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    tibersaUrl: 'https://akademitibersa.com/courses/servis-hp-vokasi'
  }
];

export const INITIAL_TRANSPARENCY_REPORTS: TransparencyReport[] = [
  {
    id: 'rep_1',
    title: 'Penyaluran 105 Paket Sembako Berkah Wilayah Baranangsiang',
    programId: 'prog_sembako_50k',
    programTitle: 'Paket Sembako Berkah Rp 50.000',
    disbursedAmount: 5250000,
    packageCount: 105,
    beneficiaryCategory: 'GABUNGAN',
    rtRw: 'RT 03 / RW 05',
    kelurahan: 'Baranangsiang',
    kecamatan: 'Bogor Timur',
    distributionDate: '2026-08-10',
    photoUrls: [
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80'
    ],
    summaryText: 'Rp 5.250.000 telah disalurkan untuk 105 paket sembako kepada warga binaan RT 03/RW 05 di Kelurahan Baranangsiang, Kecamatan Bogor Timur.',
    documentationStory: 'Penyaluran berjalan lancar bertempat di Balai Warga RT 03 dengan didampingi langsung oleh Ketua RT Bpk. H. Suryadi. Seluruh paket berisi beras 3kg, minyak 1L, telur, dan mie instan diterima oleh ibu-ibu janda dhuafa dan wali anak yatim.',
    verifiedByAdminName: 'Admin Utama JAYA BOGOR',
    receiptNumber: 'JB-DISB-20260810-001',
    donorCountBenefited: 105
  },
  {
    id: 'rep_2',
    title: 'Pencairan Beasiswa & Alat Sekolah Yatim Babakan Pasar',
    programId: 'prog_tabungan_aisyah',
    programTitle: 'Tabungan Pendidikan Siti Nur Aisyah',
    disbursedAmount: 1200000,
    packageCount: 1,
    beneficiaryCategory: 'YATIM',
    rtRw: 'RT 02 / RW 02',
    kelurahan: 'Babakan Pasar',
    kecamatan: 'Bogor Tengah',
    distributionDate: '2026-08-05',
    photoUrls: [
      'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&auto=format&fit=crop&q=80'
    ],
    summaryText: 'Rp 1.200.000 telah disalurkan untuk biaya seragam baru, buku pelajaran kelas 6, dan pelunasan administrasi sekolah adik Siti Nur Aisyah.',
    documentationStory: 'Aisyah sangat terharu menerima buku-buku impiannya dari "Buku Mimpi" serta perlengkapan belajar. Terima kasih kepada seluruh donatur yang telah menyisihkan rezekinya.',
    verifiedByAdminName: 'Admin Utama JAYA BOGOR',
    receiptNumber: 'JB-DISB-20260805-004',
    donorCountBenefited: 24
  },
  {
    id: 'rep_3',
    title: 'Penyaluran Honor & Bahan Praktik Pelatihan Olahan Keripik',
    programId: 'prog_pelatihan_keripik',
    programTitle: 'Pelatihan & Modal Olahan Keripik Talas Bogor',
    disbursedAmount: 1500000,
    packageCount: 20,
    beneficiaryCategory: 'JANDA',
    rtRw: 'RT 03 / RW 05',
    kelurahan: 'Baranangsiang',
    kecamatan: 'Bogor Timur',
    distributionDate: '2026-08-01',
    photoUrls: [
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80'
    ],
    summaryText: 'Rp 1.500.000 telah disalurkan untuk honor pemateri dan penyediaan bahan baku talas serta sealer kemasan bagi 20 peserta janda.',
    documentationStory: 'Dana donasi pelatihan Akademi Tibersa telah digunakan untuk membiayai honor instruktur dan starter kit usaha untuk 20 ibu janda yang kini telah mulai memproduksi keripik talas rumahan.',
    verifiedByAdminName: 'Admin Utama JAYA BOGOR',
    receiptNumber: 'JB-DISB-20260801-012',
    donorCountBenefited: 30
  }
];

export const INITIAL_STORIES: StoryFeedPost[] = [
  {
    id: 'story_1',
    authorId: 'user_admin_1',
    authorName: 'Admin JAYA BOGOR',
    authorRole: 'ADMIN',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    title: 'Penyaluran 105 Paket Sembako Berkah untuk Janda Dhuafa Baranangsiang',
    summary: 'Rasa haru dan syukur terpancar dari wajah ibu-ibu tangguh saat menerima paket pangan pokok lengkap di Balai Warga RT 03.',
    content: `Alhamdulillah, puji syukur ke hadirat Allah SWT, amanah donasi dari para donatur JAYA BOGOR telah sukses kami salurkan secara langsung kepada 105 kepala keluarga janda dhuafa dan wali anak yatim di Kelurahan Baranangsiang, Kecamatan Bogor Timur.

Penyaluran ini didampingi langsung oleh Ketua RT 03 Bapak H. Suryadi untuk memastikan ketepatan sasaran. Setiap keluarga binaan menerima paket sembako lengkap berisikan beras kualitas super 3 kg, minyak goreng 1 liter, gula pasir, telur ayam, dan biskuit gizi.

"Bantuan sembako ini sangat berarti bagi kami di tengah naiknya harga kebutuhan pokok. Anak-anak bisa makan dengan tenang tanpa khawatir belanja besok," ungkap Ibu Ratnasari penuh haru.

Terima kasih yang tak terhingga kepada seluruh donatur dan mitra relawan. Mari terus jaga estafet kepedulian ini agar semakin banyak keluarga di Bogor yang terbantukan.`,
    photoUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80',
    category: 'PENYALURAN',
    readingTime: '3 menit baca',
    tags: ['#JAYABOGOR', '#PenyaluranSembako', '#BogorBerbagi', '#ZakatInfaq'],
    beneficiaryName: 'Ibu Ratnasari & 104 Warga',
    kelurahan: 'Baranangsiang',
    kecamatan: 'Bogor Timur',
    likesCount: 58,
    likedByUserIds: ['user_donor_1'],
    linkedProgramId: 'prog_sembako_50k',
    linkedProgramTitle: 'Paket Sembako Berkah Rp 50.000',
    createdAt: '2026-08-18T10:30:00Z',
    comments: [
      {
        id: 'c_1',
        userId: 'user_donor_1',
        userName: 'Budi Rahardjo',
        userRole: 'DONATUR',
        text: 'Alhamdulillah barakallah. Senang sekali melihat dokumentasi transparansi nyata seperti ini.',
        createdAt: '2026-08-18T11:10:00Z'
      }
    ]
  },
  {
    id: 'story_2',
    authorId: 'user_admin_1',
    authorName: 'Admin JAYA BOGOR',
    authorRole: 'ADMIN',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    title: 'Kisah Muhammad Rizky: Tekun Meraih Cita-Cita Menjadi Dokter',
    summary: 'Meskipun telah menjadi yatim sejak usia 5 tahun, Rizky tak pernah patah semangat belajar berkat buku ensiklopedia & tabungan pendidikan dari donatur.',
    content: `Muhammad Rizky Pratama (9 tahun) adalah salah satu anak yatim binaan yang terdaftar di Buku Mimpi JAYA BOGOR. Sehari-hari Rizky membantu ibunya merapikan dagangan kerupuk sebelum berangkat ke sekolah dasar di Baranangsiang.

Saat tim kami berkunjung menyerahkan buku Ensiklopedia Tubuh Manusia dan sepatu sekolah baru dari tabungan donatur, senyum lebar terpancar dari wajah polosnya.

"Rizky ingin jadi dokter yang bisa mengobati orang-orang di kampung tanpa bayar mahal," ujarnya penuh keyakinan.

Melalui program Tabungan Pendidikan JAYA BOGOR, setiap rupiah yang disalurkan dikelola secara transparan untuk memenuhi kebutuhan seragam, buku, dan uang saku sekolah Rizky secara berkelanjutan.`,
    photoUrl: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=800&auto=format&fit=crop&q=80',
    category: 'PRESTASI_YATIM',
    readingTime: '2 menit baca',
    tags: ['#BukuMimpi', '#AnakYatimBogor', '#TabunganPendidikan', '#MasaDepanCerah'],
    beneficiaryName: 'Muhammad Rizky Pratama',
    kelurahan: 'Baranangsiang',
    kecamatan: 'Bogor Timur',
    likesCount: 74,
    likedByUserIds: ['user_donor_1', 'user_admin_1'],
    linkedProgramId: 'prog_tabungan_rizky',
    linkedProgramTitle: 'Tabungan Pendidikan Muhammad Rizky Pratama',
    createdAt: '2026-08-16T09:15:00Z',
    comments: [
      {
        id: 'c_3',
        userId: 'user_donor_1',
        userName: 'Budi Rahardjo',
        userRole: 'DONATUR',
        text: 'Tetap semangat ya Nak Rizky, doa kami menyertaimu agar kelak jadi dokter kebanggaan Bogor!',
        createdAt: '2026-08-16T10:00:00Z'
      }
    ]
  },
  {
    id: 'story_3',
    authorId: 'user_admin_1',
    authorName: 'Admin JAYA BOGOR',
    authorRole: 'ADMIN',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    title: 'Pemberdayaan Janda Mandiri: 20 Ibu Binaan Lulus Pelatihan Keripik Talas',
    summary: 'Kolaborasi JAYA BOGOR bersama Akademi Tibersa mencetak pengusaha rumahan baru yang mandiri secara ekonomi.',
    content: `Pemberdayaan bukan sekadar memberi ikan, melainkan mengajarkan cara memancing. Hari ini, sebanyak 20 ibu janda dhuafa di wilayah Bogor Timur resmi menyelesaikan pelatihan intensif pembuatan keripik talas higienis dan teknik kemasan modern bersama mentor kuliner dari Akademi Tibersa.

Dalam pelatihan ini, peserta tidak hanya diajarkan resep renyah khas Bogor, tetapi juga diberikan pemahaman tentang sanitasi pangan, perhitungan harga pokok penjualan (HPP), dan cara memasarkan produk lewat WhatsApp Bisnis.

Para peserta juga menerima starter kit wajan besar, mesin sealer kemasan, serta bahan baku talas segar untuk memulai produksi mandiri di rumah masing-masing.`,
    photoUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80',
    category: 'AKADEMI_TIBERSA',
    readingTime: '4 menit baca',
    tags: ['#AkademiTibersa', '#IbuBerdaya', '#UMKMBogor', '#KemandirianEkonomi'],
    beneficiaryName: '20 Ibu Binaan Tibersa',
    kelurahan: 'Baranangsiang',
    kecamatan: 'Bogor Timur',
    likesCount: 89,
    likedByUserIds: ['user_donor_1'],
    linkedProgramId: 'prog_pelatihan_keripik',
    linkedProgramTitle: 'Pelatihan & Modal Olahan Keripik Talas Bogor',
    createdAt: '2026-08-14T15:00:00Z',
    comments: []
  }
];

export const INITIAL_TRANSACTIONS: DonationTransaction[] = [
  {
    id: 'trx_1',
    donorId: 'user_donor_1',
    donorName: 'Budi Rahardjo',
    donorEmail: 'budi.rahardjo@gmail.com',
    programId: 'prog_sembako_50k',
    programTitle: 'Paket Sembako Berkah Rp 50.000',
    amount: 100000,
    paymentMethod: 'QRIS',
    status: 'VERIFIED',
    message: 'Semoga berkah untuk ibu-ibu pejuang di Bogor.',
    isAnonymous: false,
    createdAt: '2026-08-10T08:20:00Z',
    verifiedAt: '2026-08-10T08:30:00Z',
    disbursedAt: '2026-08-10T14:00:00Z',
    disbursedReportId: 'rep_1'
  },
  {
    id: 'trx_2',
    donorId: 'user_donor_1',
    donorName: 'Budi Rahardjo',
    donorEmail: 'budi.rahardjo@gmail.com',
    programId: 'prog_tabungan_rizky',
    programTitle: 'Tabungan Pendidikan Muhammad Rizky Pratama',
    beneficiaryId: 'ben_1',
    beneficiaryName: 'Muhammad Rizky Pratama',
    amount: 250000,
    paymentMethod: 'BCA',
    transferProofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&auto=format&fit=crop&q=80',
    status: 'VERIFIED',
    message: 'Untuk tambahan beli buku ensiklopedia Rizky.',
    isAnonymous: false,
    createdAt: '2026-08-12T11:45:00Z',
    verifiedAt: '2026-08-12T12:00:00Z'
  },
  {
    id: 'trx_3',
    donorId: 'user_anon_1',
    donorName: 'Hamba Allah',
    donorEmail: 'anonim@gmail.com',
    programId: 'prog_sembako_100k',
    programTitle: 'Paket Sembako Keluarga Bahagia Rp 100.000',
    amount: 500000,
    paymentMethod: 'MANDIRI',
    transferProofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&auto=format&fit=crop&q=80',
    status: 'PENDING',
    message: 'Niat ikhlas untuk 5 paket sembako.',
    isAnonymous: true,
    createdAt: '2026-08-18T16:20:00Z'
  }
];

export const INITIAL_INSTRUCTOR_APPLICATIONS: InstructorApplication[] = [
  {
    id: 'app_1',
    userId: 'user_donor_1',
    name: 'Budi Rahardjo, S.Kom',
    email: 'budi.rahardjo@gmail.com',
    phone: '081311223344',
    skill: 'Digital Marketing & Foto Produk Canva',
    experience: '5 Tahun Trainer UMKM & Pegiat Sosial Bogor',
    portfolioUrl: 'https://instagram.com/budi_umkm_bogor',
    proposedTopic: 'Cara Membuat Foto Produk Menarik Pakai Smartphone untuk Ibu Rumah Tangga',
    feePreference: 'GRATIS',
    status: 'APPROVED',
    createdAt: '2026-07-20'
  },
  {
    id: 'app_2',
    userId: 'user_donor_2',
    name: 'Ir. Hendra Kusuma',
    email: 'hendra.hidroponik@yahoo.com',
    phone: '081234889977',
    skill: 'Pertanian Urban & Hidroponik Sayur',
    experience: 'Pemilik Kebun Hidroponik Ciomas Bogor',
    portfolioUrl: 'https://kebunbogor.id',
    proposedTopic: 'Budidaya Sayuran Hidroponik Skala Rumah Tangga dengan Modal Terjangkau',
    feePreference: 'BERBAYAR',
    proposedHonorarium: 1000000,
    status: 'PENDING',
    createdAt: '2026-08-17'
  }
];

export const DEFAULT_SITE_SETTINGS = {
  siteTitle: 'JAYA BOGOR',
  siteTitleColor: '#064e3b',
  siteTagline: 'Janda Yatim Bogor',
  siteTaglineColor: '#92400e',
  siteDescription: 'Solidaritas & Pemberdayaan Janda Dhuafa & Tabungan Masa Depan Yatim Bogor',
  logoType: 'PRESET_VECTOR' as const,
  logoCustomUrl: '',
  logoColor: '#046A38',
  logoContainerStyle: 'TRANSPARENT' as const,
  themeMode: 'LIGHT' as const,
  darkModeBg: '#0c0a09',
  darkModeCardBg: '#1c1917',
  darkModeAccent: '#10b981',
  footerNote: 'Yayasan Solidaritas Janda Yatim Bogor | Amanah, Mandiri, Transparan',
  contactEmail: 'salam@jayabogor.id',
  contactPhone: '+62 812-9876-5432',
  adminSecretKey: 'admin123',
  adminRecoveryEmail: 'abdulmuisx@gmail.com',
  navigationItems: [
    { id: 'nav_home', viewId: 'home', label: 'Beranda', iconName: 'Home', isVisible: true, order: 1 },
    { id: 'nav_orphans', viewId: 'orphans', label: 'Tabungan Yatim', iconName: 'GraduationCap', badge: 'Mimpi', isVisible: true, order: 2 },
    { id: 'nav_training', viewId: 'training', label: 'Pelatihan', iconName: 'BookOpen', isVisible: true, order: 3 },
    { id: 'nav_feed', viewId: 'feed', label: 'Cerita', iconName: 'MessageSquareHeart', isVisible: true, order: 4 },
    { id: 'nav_transparency', viewId: 'transparency', label: 'Laporan', iconName: 'FileCheck2', isVisible: true, order: 5 },
    { id: 'nav_rtrw', viewId: 'rtrw', label: 'Mitra RT/RW', iconName: 'Building2', isVisible: true, order: 6 },
    { id: 'nav_profile', viewId: 'profile', label: 'Profil Saya', iconName: 'User', isVisible: true, order: 7 }
  ]
};
