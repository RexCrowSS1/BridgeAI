import { useHealthCheck } from '../features/health/useHealthCheck'
import StatusCard from '../components/ui/StatusCard'

export default function HomePage() {
  const { busy, api, database, checkConnections } = useHealthCheck()

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
      <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-teal-300">Bridge AI / Development</p>
      <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-7xl">Fondasi untuk ide AI berikutnya.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">React dan Tailwind untuk antarmuka, FastAPI untuk layanan backend, dan Supabase untuk database.</p>
      <div className="mt-12 grid gap-4 sm:grid-cols-3" aria-live="polite">
        {[
          ['Frontend', 'React + Tailwind', 'Siap digunakan'],
          ['Backend', 'Python + FastAPI', api],
          ['Database', 'Supabase', database],
        ].map(([label, stack, status]) => (
          <StatusCard key={label} label={label} title={stack} status={status} />
        ))}
      </div>
      <button onClick={checkConnections} disabled={busy} className="mt-8 self-start rounded-xl bg-teal-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-teal-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300 disabled:opacity-50">
        {busy ? 'Memeriksa…' : 'Periksa koneksi'}
      </button>
      <p className="mt-8 text-sm text-slate-500">Starter proyek • Provider AI belum dikonfigurasi</p>
    </main>
  )
}
