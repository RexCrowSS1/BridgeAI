# Frontend Bridge AI

Lihat [panduan proyek](../README.md) untuk konfigurasi, menjalankan aplikasi, dan validasi.

## Struktur source

```text
src/
├── app/
│   ├── App.jsx                  # RouterProvider
│   ├── routes.jsx               # createBrowserRouter dan child routes
│   └── layouts/MainLayout.jsx   # Container halaman dan Outlet
├── pages/
│   ├── home/HomePage.jsx
│   └── not-found/NotFoundPage.jsx
├── features/
│   └── health/
│       ├── api/healthApi.js
│       ├── hooks/useHealthCheck.js
│       └── components/StatusCard.jsx
├── shared/
│   ├── api/apiClient.js
│   └── styles/globals.css
└── main.jsx
```

## Aturan penempatan

- `app`: konfigurasi aplikasi, routing, provider, dan layout.
- `pages`: komposisi halaman berdasarkan URL. Satu folder per halaman.
- `features`: API, state/hook, dan komponen khusus sebuah fitur. Buat subfolder hanya saat dibutuhkan.
- `shared`: kode yang tidak bergantung pada halaman atau fitur tertentu. Tambahkan `shared/ui/` untuk komponen UI lintas fitur jika diperlukan.
- `public`: aset yang diakses langsung melalui URL. Aset yang di-import dapat diletakkan bersama fitur pemakainya.

Alur dependensi: `app → pages → features → shared`. Kode di `shared` tidak meng-import fitur atau halaman. File komponen memakai PascalCase dan `.jsx`; hook memakai awalan `use` dan `.js`; folder memakai huruf kecil dengan tanda hubung bila terdiri dari beberapa kata.

Untuk halaman baru, buat `pages/<nama-halaman>/<NamaHalaman>.jsx` dan tambahkan route di `app/routes.jsx` sebagai child `MainLayout`. Untuk fitur baru, buat `features/<nama-fitur>/` dan pisahkan logika API, hook, serta komponennya sesuai kebutuhan.

## Pemeriksaan

```sh
npm run lint
npm run build
```
