import { useState } from 'react'
import { checkHealth } from './healthApi'

export function useHealthCheck() {
  const [busy, setBusy] = useState(false)
  const [api, setApi] = useState('Belum diperiksa')
  const [database, setDatabase] = useState('Belum diperiksa')

  async function checkConnections() {
    setBusy(true)
    const [apiStatus, dbStatus] = await Promise.all([
      checkHealth('/api/health'),
      checkHealth('/api/health/database'),
    ])
    setApi(apiStatus)
    setDatabase(dbStatus)
    setBusy(false)
  }

  return { busy, api, database, checkConnections }
}
