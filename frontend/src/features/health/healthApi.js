import { apiGet } from '../../lib/apiClient'

export async function checkHealth(path) {
  try {
    await apiGet(path)
    return 'Terhubung'
  } catch (error) {
    if (error instanceof TypeError) return 'Tidak dapat terhubung. Pastikan backend berjalan.'
    return error instanceof Error ? error.message : 'Pemeriksaan gagal.'
  }
}
