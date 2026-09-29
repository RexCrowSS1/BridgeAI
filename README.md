# Bridge AI

Starter website AI dengan React + JavaScript (JSX) + Vite, Tailwind CSS, FastAPI, dan Supabase PostgreSQL. Provider/model AI belum diintegrasikan.

## Struktur

Panduan detail: [Arsitektur dan penambahan fitur](docs/architecture.md) · [Git dan push pertama](docs/git.md).

- `frontend/`: aplikasi React, halaman status, dan HTTP client ke FastAPI.
- `backend/app/`: API, pengaturan environment, dan Supabase client.
- `backend/tests/`: tes kesehatan API dan penanganan kegagalan database.
- `supabase/migrations/`: SQL awal dengan Row Level Security (RLS).

## Persiapan

Gunakan Node.js 22.12+ dan Python 3.11+. Setup ini diuji menggunakan Node 22 dan Python 3.14.

### Backend

```sh
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements-dev.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

API: http://localhost:8000/api/health · Swagger: http://localhost:8000/docs

### Frontend (terminal kedua)

```sh
cd frontend
npm ci
cp .env.example .env
npm run dev
```

Buka http://localhost:5173. Klik **Periksa koneksi** untuk memeriksa API dan database secara terpisah. Aplikasi tetap bisa dijalankan tanpa Supabase; pemeriksaan database akan menjelaskan konfigurasi yang belum tersedia.

### Hubungkan Supabase

1. Buat atau pilih proyek Supabase milik Anda.
2. Isi `SUPABASE_URL` dan `SUPABASE_KEY` di `backend/.env` dari pengaturan API proyek. Gunakan publishable key atau legacy anon key.
3. Jalankan `supabase/migrations/202609280001_app_health.sql` satu kali di SQL Editor proyek Supabase.
4. Restart backend lalu klik **Periksa koneksi**.

Migrasi hanya membuat marker koneksi yang dapat dibaca publik. Untuk tabel pengguna nantinya, tambahkan kebijakan RLS berdasarkan pengguna terautentikasi. Jangan simpan service-role key atau API key provider AI di environment `VITE_*`, karena nilainya masuk ke bundle browser. File `.env` diabaikan oleh Git.

Alur koneksi: browser → FastAPI → Supabase. Koneksi Supabase terpusat di backend; autentikasi pengguna, chat, dan provider AI belum diimplementasikan.

## Validasi

```sh
cd frontend
npm run lint
npm run build
```

```sh
cd backend
.venv/bin/python -m pytest -q
```

`npm run preview` menyajikan hasil build frontend untuk pemeriksaan lokal. Untuk deployment, sesuaikan `VITE_API_URL` sebelum build dan `FRONTEND_ORIGIN` pada backend dengan origin frontend. Backend dijalankan tanpa `--reload` pada production.

Untuk memasang versi Python dependency yang sama dengan hasil pengujian dan CI, gunakan `pip install -r requirements-lock.txt`. File ini mencakup dependency runtime dan pengembangan. Setelah memperbarui dependency, jalankan tes lalu perbarui lockfile dari virtual environment bersih.

## Referensi

- [Tailwind + Vite](https://tailwindcss.com/docs/installation/using-vite)
- [FastAPI CORS](https://fastapi.tiangolo.com/tutorial/cors/)
- [Supabase Python](https://supabase.com/docs/reference/python/initializing)
