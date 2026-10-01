# Struktur proyek

```text
Bridge AI/
├── .github/workflows/ci.yml   # Build, lint, dan tes pada push/PR
├── frontend/
│   ├── public/               # Aset statis tanpa pemrosesan Vite
│   ├── src/
│   │   ├── app/              # App.jsx, routes.jsx, dan layouts/
│   │   ├── pages/            # home/ dan not-found/: komposisi halaman
│   │   ├── features/health/  # api/, hooks/, dan components/ milik fitur
│   │   ├── shared/           # api/ dan styles/ lintas fitur
│   │   └── main.jsx          # Entry point React
│   ├── .env.example
│   ├── jsconfig.json
│   └── vite.config.js
├── backend/
│   ├── app/
│   │   ├── api/routes/       # Endpoint HTTP, dikelompokkan per domain
│   │   ├── api/router.py    # Registrasi route di bawah /api
│   │   ├── core/            # Pengaturan environment aplikasi
│   │   ├── db/              # Client dan koneksi database
│   │   ├── schemas/         # Model request/response Pydantic
│   │   ├── services/        # Logika aplikasi dan integrasi layanan
│   │   └── main.py          # Inisialisasi FastAPI dan middleware
│   ├── tests/
│   ├── .env.example
│   ├── requirements.txt     # Dependency runtime
│   ├── requirements-dev.txt # Dependency pengembangan
│   └── requirements-lock.txt # Versi terpasang yang diuji, termasuk dev
├── supabase/migrations/      # Riwayat perubahan SQL
└── docs/                    # Arsitektur dan panduan kontribusi
```

## Menambahkan fitur

Frontend: buat `src/features/<nama-fitur>/` dengan subfolder `api/`, `hooks/`, dan `components/` sesuai kebutuhan. Letakkan halaman di `pages/<nama-halaman>/`. Kode lintas fitur masuk ke `shared/`; komponen UI bersama dapat ditambahkan ke `shared/ui/` ketika dibutuhkan. Komponen React memakai `.jsx`, sedangkan utilitas dan hook memakai `.js`. Lihat [panduan frontend](../frontend/README.md) untuk struktur lengkap.

Backend: buat route di `api/routes/`, definisikan kontrak data di `schemas/`, dan tempatkan logika di `services/`. Daftarkan router baru di `api/router.py`. Tambahkan tes pada `tests/`. Integrasi provider AI nantinya ditempatkan di `services/`, dengan kredensial di environment backend.

Database: tambahkan file SQL baru dengan timestamp berurutan di `supabase/migrations/`; jangan mengubah migrasi yang sudah dijalankan. Aktifkan RLS dan kebijakan akses untuk setiap tabel baru.

## Routing frontend

Routing menggunakan React Router melalui `react-router-dom`. `app/App.jsx` memasang `RouterProvider`, sedangkan `app/routes.jsx` membuat instance router satu kali di luar komponen menggunakan `createBrowserRouter` dengan pemetaan URL ke halaman:

`MainLayout` di `app/layouts/MainLayout.jsx` menjadi parent route dan menyediakan container serta elemen `<main>` bersama. `Outlet` merender child route yang aktif. Halaman hanya berisi kontennya, sehingga tidak ada `<main>` bertingkat.

- `/`: `HomePage` sebagai index route.
- `*`: `NotFoundPage` untuk URL yang tidak dikenal, dengan tautan kembali ke beranda.

Untuk menambah halaman, buat komponen JSX di `pages/<nama-halaman>/`, lalu import dan tambahkan objek `{ path: 'nama-halaman', element: <NamaHalaman /> }` ke array `children` milik `MainLayout` di `app/routes.jsx`. Gunakan `Link` atau `NavLink` dari `react-router-dom` untuk navigasi internal tanpa memuat ulang halaman. Route dapat dikembangkan dengan `children`, `loader`, dan `action` sesuai kebutuhan fitur.

Saat deployment, konfigurasikan hosting frontend agar URL aplikasi yang bukan file statis diarahkan ke `index.html` (SPA fallback). Ini diperlukan agar membuka URL secara langsung atau melakukan refresh tetap menjalankan router. Jika frontend dan API memakai domain yang sama, kecualikan `/api` dari fallback. Vite sudah menyediakan fallback saat pengembangan lokal.

## Alur request

`Page → feature hook → feature API → API client → FastAPI route → service → Supabase`

Environment backend dibaca dari `backend/.env` menggunakan lokasi file konfigurasi, sehingga perpindahan folder kerja tidak mengubah lokasi environment.
