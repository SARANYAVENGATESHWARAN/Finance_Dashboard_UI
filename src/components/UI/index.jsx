// src/components/UI/index.jsx
// Shared atomic UI components

import { CATEGORY_COLORS, CATEGORY_EMOJI } from '../../data/transactions'

/** Summary card */
export function SummaryCard({ icon, label, value, change, changeUp, accentClass, delay = '' }) {
  return (
    <div className={`relative overflow-hidden bg-surface border border-border rounded-2xl p-5 card-hover cursor-default animate-fade-up ${delay}`}>
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${accentClass}`} />
      <div className="text-2xl mb-3">{icon}</div>
      <p className="font-mono text-[10px] tracking-[1.5px] uppercase text-[#55537a] mb-1">{label}</p>
      <p className="font-display text-3xl tracking-tight mb-1">{value}</p>
      {change && (
        <p className={`font-mono text-[11px] ${changeUp ? 'text-fin-green' : 'text-fin-red'}`}>
          {change}
        </p>
      )}
    </div>
  )
}

/** Category badge */
export function CategoryBadge({ category }) {
  const color = CATEGORY_COLORS[category] || '#94a3b8'
  const emoji = CATEGORY_EMOJI[category] || '💳'
  return (
    <span
      className="badge"
      style={{
        background: color + '18',
        color,
        border: `1px solid ${color}28`,
      }}
    >
      {emoji} {category}
    </span>
  )
}

/** Type badge */
export function TypeBadge({ type }) {
  return type === 'income' ? (
    <span className="badge bg-fin-green/10 text-fin-green border border-fin-green/20">↑ Income</span>
  ) : (
    <span className="badge bg-fin-red/10 text-fin-red border border-fin-red/20">↓ Expense</span>
  )
}

/** Empty state */
export function EmptyState({ icon = '🔍', title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-3 opacity-30">{icon}</div>
      <p className="text-sm font-semibold text-[#8884a8] mb-1">{title}</p>
      {subtitle && <p className="text-xs text-[#55537a]">{subtitle}</p>}
    </div>
  )
}

/** Section heading */
export function SectionHeading({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
      <div>
        <h2 className="font-display text-2xl tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-[#8884a8] mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

/** Chart container */
export function ChartBox({ title, subtitle, children, className = '' }) {
  return (
    <div className={`bg-surface border border-border rounded-2xl p-5 ${className}`}>
      <div className="mb-4">
        <p className="text-sm font-semibold text-[#f0eff8]">{title}</p>
        {subtitle && <p className="font-mono text-[10px] text-[#55537a] mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

/** Toast notification */
export function Toast({ toast }) {
  if (!toast) return null
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium
        bg-surface2 border animate-fade-up
        ${toast.type === 'error' ? 'border-fin-red/30 text-fin-red' : 'border-fin-green/30 text-fin-green'}`}
      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
    >
      {toast.message}
    </div>
  )
}

/** Simple select input */
export function Select({ value, onChange, children, className = '' }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`bg-surface border border-border rounded-lg px-3 py-2 text-[13px] font-sans
        text-[#f0eff8] outline-none cursor-pointer focus:border-accent transition-colors ${className}`}
    >
      {children}
    </select>
  )
}

/** Text input */
export function Input({ value, onChange, placeholder, type = 'text', className = '' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`input-field ${className}`}
    />
  )
}

/** Progress bar */
export function ProgressBar({ value, max, color }) {
  const pct = max ? Math.min((value / max) * 100, 100) : 0
  return (
    <div className="h-1.5 bg-surface3 rounded-full overflow-hidden mt-1 mb-2">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  )
}
