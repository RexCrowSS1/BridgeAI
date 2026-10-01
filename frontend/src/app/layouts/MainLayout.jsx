import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
      <Outlet />
    </main>
  )
}
