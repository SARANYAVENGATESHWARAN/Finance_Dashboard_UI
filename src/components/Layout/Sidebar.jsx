// src/components/Layout/Sidebar.jsx
import { useApp } from '../../context/AppContext'

const NAV_ITEMS = [
  { section: 'dashboard',    icon: '◈', label: 'Dashboard' },
  { section: 'transactions', icon: '⇌', label: 'Transactions' },
  { section: 'insights',     icon: '◎', label: 'Insights' },
]

export function Sidebar({ onClose }) {
  const { activeSection, setSection, role, setRole } = useApp()

  function handleNav(section) {
    setSection(section)
    onClose?.()
  }

  return (
    <aside className="flex flex-col h-full bg-surface border-r border-border w-60">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-border">
        <div
          className="font-display text-[22px] tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Finvault
        </div>
        <p className="font-mono text-[9px] tracking-[2px] uppercase text-[#55537a] mt-0.5">
          Finance Dashboard
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3">
        <p className="font-mono text-[9px] tracking-[2px] uppercase text-[#55537a] px-3 py-2 mt-2">
          Overview
        </p>
        {NAV_ITEMS.slice(0, 2).map(({ section, icon, label }) => (
          <NavItem
            key={section}
            icon={icon}
            label={label}
            active={activeSection === section}
            onClick={() => handleNav(section)}
          />
        ))}

        <p className="font-mono text-[9px] tracking-[2px] uppercase text-[#55537a] px-3 py-2 mt-4">
          Analysis
        </p>
        {NAV_ITEMS.slice(2).map(({ section, icon, label }) => (
          <NavItem
            key={section}
            icon={icon}
            label={label}
            active={activeSection === section}
            onClick={() => handleNav(section)}
          />
        ))}
      </nav>

      {/* Role switcher */}
      <div className="p-3 border-t border-border">
        <div className="bg-surface2 border border-border rounded-xl p-3">
          <p className="font-mono text-[9px] tracking-[2px] uppercase text-[#55537a] mb-2">
            Active Role
          </p>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full bg-surface3 border border-border rounded-lg px-2 py-1.5 text-[13px]
              font-semibold text-[#f0eff8] outline-none cursor-pointer"
          >
            <option value="admin">⚡ Admin</option>
            <option value="viewer">👁 Viewer</option>
          </select>
          <p className={`font-mono text-[10px] mt-2 ${role === 'admin' ? 'text-accent' : 'text-[#8884a8]'}`}>
            {role === 'admin' ? '⚡ Full access — can edit data' : '👁 Read-only — view only'}
          </p>
        </div>
      </div>
    </aside>
  )
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-semibold
        transition-all duration-150 mb-0.5 text-left
        ${active ? 'nav-active' : 'text-[#8884a8] hover:bg-surface2 hover:text-[#f0eff8]'}`}
    >
      <span className="text-base w-5 text-center">{icon}</span>
      {label}
    </button>
  )
}
