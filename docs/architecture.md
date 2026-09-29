# Struktur proyek

```text
Bridge AI/
├── .github/workflows/ci.yml   # Build, lint, dan tes pada push/PR
├── frontend/
│   ├── public/               # Aset statis tanpa pemrosesan Vite
│   ├── src/
│   │   ├── app/App.jsx       # Komposisi aplikasi; provider/router nantinya
│   │   ├── pages/            # Halaman utama
│   │   ├── components/ui/    # Komponen presentasi yang dapat digunakan ulang
│   │   ├── features/health/  # Hook dan API khusus pengecekan koneksi
│   │   ├── lib/              # HTTP client dan utilitas lintas fitur
│   │   ├── styles/           # Tailwind dan style global
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

Frontend: buat `src/features/<nama-fitur>/` untuk hook, API, dan komponen khusus fitur. Letakkan halaman di `pages/`; pindahkan komponen ke `components/ui/` hanya jika digunakan lintas fitur. Komponen React memakai `.jsx`, sedangkan utilitas dan hook memakai `.js`.

Backend: buat route di `api/routes/`, definisikan kontrak data di `schemas/`, dan tempatkan logika di `services/`. Daftarkan router baru di `api/router.py`. Tambahkan tes pada `tests/`. Integrasi provider AI nantinya ditempatkan di `services/`, dengan kredensial di environment backend.

Database: tambahkan file SQL baru dengan timestamp berurutan di `supabase/migrations/`; jangan mengubah migrasi yang sudah dijalankan. Aktifkan RLS dan kebijakan akses untuk setiap tabel baru.

## Alur data

`Page → feature hook → feature API → API client → FastAPI route → service → Supabase`

Environment backend dibaca dari `backend/.env` menggunakan lokasi file konfigurasi, sehingga perpindahan folder kerja tidak mengubah lokasi environment.
