const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '')

export async function apiGet(path) {
  const response = await fetch(`${API_URL}${path}`, { signal: AbortSignal.timeout(10000) })
  const data = await response.json()
  if (!response.ok) throw new Error(data.detail || 'Permintaan gagal.')
  return data
}
