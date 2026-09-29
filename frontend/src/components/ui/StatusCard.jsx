export default function StatusCard({ label, title, status }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <p className="text-sm text-slate-400">{label}</p>
      <h2 className="mt-2 text-lg font-medium">{title}</h2>
      <p className="mt-6 text-sm leading-relaxed text-teal-200">{status}</p>
    </section>
  )
}
