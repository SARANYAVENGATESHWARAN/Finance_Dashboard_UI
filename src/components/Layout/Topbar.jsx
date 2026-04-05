// src/components/Layout/Topbar.jsx
import { useApp } from '../../context/AppContext'

const SECTION_TITLES = {
  dashboard:    'Dashboard',
  transactions: 'Transactions',
  insights:     'Insights',
}

export function Topbar({ onMenuToggle }) {
  const { activeSection, role } = useApp()

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <header className="sticky top-0 z-50 glass border-b border-border px-6 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuToggle}
          className="md:hidden flex flex-col gap-1.5 p-1.5 text-[#8884a8] hover:text-[#f0eff8]"
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-current rounded" />
          <span className="block w-5 h-0.5 bg-current rounded" />
          <span className="block w-5 h-0.5 bg-current rounded" />
        </button>
        <h1 className="font-display text-xl tracking-tight">
          {SECTION_TITLES[activeSection]}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden sm:block font-mono text-[11px] text-[#55537a]">{today}</span>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold cursor-pointer select-none"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #60a5fa)' }}
          title={`Logged in as ${role}`}
        >
          {role === 'admin' ? 'A' : 'V'}
        </div>
      </div>
    </header>
  )
}
