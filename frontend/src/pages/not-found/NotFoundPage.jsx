import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <>
      <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-teal-300">404 / Halaman tidak ditemukan</p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">Sepertinya kamu salah jalan.</h1>
      <p className="mt-6 text-lg text-slate-400">Halaman yang kamu cari tidak tersedia. Kembali ke beranda untuk melanjutkan.</p>
      <Link to="/" className="mt-8 self-start rounded-xl bg-teal-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-teal-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300">
        Kembali ke beranda
      </Link>
    </>
  )
}
