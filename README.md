# User Management Dashboard - Frontend Assessment

Aplikasi web dashboard responsif berbasis **React 19**, **TypeScript**, dan **Tailwind CSS** untuk mengelola dan menampilkan data pengguna (*Users Directory*). Aplikasi ini terintegrasi dengan REST API eksternal (JSONPlaceholder) serta dilengkapi fitur pencarian *real-time*, modal detail pengguna, navigasi sidebar modern, dan penanganan status *loading* serta *error* yang ramah pengguna.

---

## 🛠️ Tech Stack

- **Core Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) & PostCSS
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Linter & Code Quality**: [ESLint](https://eslint.org/) dengan konfigurasi TypeScript & React Hooks

---

## ✨ Fitur Utama (Features)

1. **Dashboard Layout & Fixed Sidebar**:
   - Layout dashboard modern di mana sidebar tetap terkunci (*fixed / sticky*) saat halaman di-scroll.
   - Indikator menu aktif (*active button state*) menggunakan `NavLink` dari React Router.
   
2. **User Management Table**:
   - Menampilkan data pengguna dalam bentuk tabel rapi (ID, Name, Username, Email, Phone, Address, Website, dan Company).
   - Mendukung **Horizontal Scroll (Slide Kiri/Kanan)** pada tabel saat ukuran layar lebih kecil daripada lebar data, sehingga tabel tidak terpotong atau merusak layout.

3. **Real-time Search Filter**:
   - Pencarian pengguna secara langsung (*real-time*) berdasarkan nama, username, atau email.
   - Menampilkan *empty state* yang informatif jika pencarian tidak menemukan hasil.

4. **User Detail Modal**:
   - Modal popup interaktif untuk melihat rincian lengkap data pengguna (info kontak, alamat lengkap dengan koordinat geolokasi, dan profil perusahaan).
   - Dapat ditutup melalui tombol silang (**✕**), tombol **Tutup**, atau dengan mengklik area luar modal (*backdrop click*).

5. **Loading & Error Handling**:
   - **Loading State**: Animasi *spinner* interaktif saat data sedang diambil dari API.
   - **Error Handling**: Tampilan pesan error yang ramah jika API gagal dipanggil atau koneksi terputus.
   - **Retry Mechanism**: Dilengkapi tombol **"Coba Lagi"** untuk memicu ulang pemanggilan data tanpa perlu me-refresh halaman browser.

---

## 📁 Struktur Folder (Project Structure)

```text
frontend-test/
├── src/
│   ├── assets/              # Asset statis (gambar, SVG, logo)
│   ├── components/          # Komponen UI modular yang dapat digunakan kembali
│   │   ├── SearchBar.tsx        # Komponen input pencarian
│   │   ├── Sidebar.tsx          # Navigasi sidebar dengan indikator aktif
│   │   ├── TableUsers.tsx       # Tabel data pengguna
│   │   └── UserDetailModal.tsx  # Modal detail pengguna
│   ├── Layouts/             # Layout utama pembungkus halaman
│   │   └── DashboardLayout.tsx  # Shell layout (Sidebar + Main Content)
│   ├── pages/               # Halaman utama aplikasi (Routes)
│   │   ├── Dashboard.tsx        # Halaman ringkasan dashboard
│   │   └── Users.tsx            # Halaman pengelolaan pengguna
│   ├── types/               # Type definition TypeScript
│   │   └── user.ts              # Interface User, Address, Company, Geo
│   ├── utils/               # Helper & integrasi API eksternal
│   │   └── network-data.tsx     # Layanan pemanggilan data API
│   ├── App.tsx              # Konfigurasi Routing
│   ├── main.tsx             # Entry point aplikasi
│   └── index.css            # Base CSS & konfigurasi Tailwind
├── .env                     # Konfigurasi Environment Variable
├── .env.example             # Contoh template Environment Variable
├── package.json             # Dependensi dan script proyek
├── tailwind.config.js       # Konfigurasi Tailwind CSS
└── vite.config.ts           # Konfigurasi Vite
```

---

## 🚀 Panduan Instalasi & Menjalankan Proyek (Installation)

### 1. Prasyarat
Pastikan sistem Anda sudah terinstal:
- [Node.js](https://nodejs.org/) (versi 18 ke atas disarankan)
- Package Manager: `npm`, `yarn`, atau `pnpm`

### 2. Clone Repository
```bash
git clone <url-repository-anda>
cd frontend-test
```

### 3. Instal Dependensi
```bash
npm install
```

### 4. Konfigurasi Environment Variable
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Isi variabel `VITE_BASE_URL` di dalam file `.env`:
```env
VITE_BASE_URL=https://jsonplaceholder.typicode.com/users
```

### 5. Jalankan Aplikasi dalam Mode Pengembangan
```bash
npm run dev
```
Aplikasi akan berjalan secara lokal di alamat `http://localhost:5173`.

### 6. Build untuk Produksi
```bash
# Melakukan type-check dan build bundle produksi
npm run build

# Menjalankan preview dari hasil build
npm run preview
```

### 7. Menjalankan Linter
```bash
npm run lint
```

---

## 📝 Pertanyaan & Jawaban Teknis (Technical Q&A)

### 1. State Management & Lifecycle: 
> **Pertanyaan**: Bagaimana cara Anda melakukan fetching data di React? Jika Anda menggunakan useEffect, jelaskan bagaimana cara Anda mencegah terjadinya memory leak atau pemanggilan API berulang (infinite loop).

**Jawaban**:  
Untuk melakukan fetching data di React, saya biasanya menggunakan hook `useEffect` untuk memanggil API saat komponen pertama kali dirender. Saya juga menggunakan `useState` untuk menyimpan data yang diambil dari API. lalu untuk mencegah terjadinya memory leak atau pemanggilan API berulang (infinite loop), saya memastikan bahwa dependency array pada `useEffect` diisi dengan variabel yang relevan. Jika tidak ada variabel yang perlu dipantau, saya akan menggunakan array kosong `[]` sebagai dependency, sehingga `useEffect` hanya akan dijalankan sekali saat komponen dirender pertama kali. Selain itu, saya juga bisa menggunakan cleanup function di dalam `useEffect` untuk membatalkan permintaan API jika komponen akan di-unmount sebelum permintaan selesai, sehingga mencegah memory leak.

---

### 2. Struktur Folder:
> **Pertanyaan**: Mengapa Anda menstrukturisasi folder/file seperti yang ada di project Anda saat ini? Jelaskan alasannya.

**Jawaban**:  
Saya mengikuti struktur folder yang saya pelajari dari bootcamp yang bertujuan untuk memisahkan komponen, halaman, dan utilitas agar lebih mudah dalam pengelolaan dan pemeliharaan kode. Dengan memisahkan komponen menjadi folder tersendiri, saya dapat dengan mudah menemukan dan mengedit komponen tertentu tanpa harus mencari di seluruh proyek. Halaman (pages) juga dipisahkan untuk memudahkan navigasi dan pengelolaan rute. Selain itu, utilitas atau helper functions ditempatkan di folder terpisah agar dapat digunakan kembali di berbagai bagian aplikasi. Struktur ini membantu menjaga kode tetap bersih, terorganisir, dan mudah dipahami oleh tim pengembang lainnya.

---

### 3. Optimasi Kinerja (Performance):
> **Pertanyaan**: Anggaplah API tiba-tiba mengembalikan 10.000 data user sekaligus dan membuat aplikasi lag saat diketik di kolom pencarian. Pendekatan apa (fitur React apa) yang akan Anda gunakan untuk mengatasi lag tersebut?

**Jawaban**:  
Untuk mengatasi lag ini, saya akan menggunakan fitur `useDeferredValue` dari React 18. Caranya, state `keyword` tetap diupdate langsung setiap kali user mengetik agar input terasa responsif, sementara nilai yang dipakai untuk proses filtering menggunakan `deferredQuery` hasil dari `useDeferredValue(keyword)`. Dengan begini, React akan menunda proses filtering data yang berat ke waktu senggang dan memprioritaskan update pada input terlebih dahulu, sehingga mengetik tidak pernah terasa nge-drag meskipun sedang memfilter 10.000 data.

Selain itu, proses filtering dibungkus dengan `useMemo` agar operasi filter hanya dijalankan ulang saat `deferredQuery` atau data `users` benar-benar berubah, bukan setiap kali komponen re-render karena sebab lain. Kombinasi `useDeferredValue` dan `useMemo` ini merupakan solusi native React tanpa perlu library tambahan.