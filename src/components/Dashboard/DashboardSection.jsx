// src/components/Dashboard/DashboardSection.jsx
import { useMemo } from 'react'
import {
  ResponsiveContainer, LineChart, Line, AreaChart, Area,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import { useApp } from '../../context/AppContext'
import { SummaryCard, ChartBox, EmptyState } from '../UI'
import { CATEGORY_COLORS, CATEGORY_EMOJI } from '../../data/transactions'
import {
  computeSummary, buildTrendData, buildCategoryBreakdown,
  formatCurrency, pctLabel,
} from '../../utils/finance'

// ─── Custom Tooltip ─────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-surface2 border border-border2 rounded-xl px-4 py-3 shadow-2xl">
      <p className="font-mono text-[10px] text-[#55537a] uppercase tracking-widest mb-2">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-mono text-[12px] font-medium" style={{ color: p.color }}>
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  )
}

// ─── Recent Transactions preview ────────────────────────────
function RecentTxRow({ tx }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <span className="text-xl">{CATEGORY_EMOJI[tx.category] || '💳'}</span>
        <div>
          <p className="text-[13px] font-medium leading-tight">{tx.desc}</p>
          <p className="font-mono text-[10px] text-[#55537a] mt-0.5">{tx.date} · {tx.category}</p>
        </div>
      </div>
      <span className={tx.type === 'income' ? 'amount-positive' : 'amount-negative'}>
        {tx.type === 'income' ? '+' : '−'}{formatCurrency(tx.amount)}
      </span>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────
export function DashboardSection({ onNavigate }) {
  const { transactions } = useApp()

  const summary = useMemo(() => computeSummary(transactions), [transactions])
  const trendData = useMemo(() => buildTrendData(transactions), [transactions])
  const categoryData = useMemo(() => buildCategoryBreakdown(transactions, 0), [transactions])

  const chartData = trendData.labels.map((label, i) => ({
    month: label,
    Balance: trendData.balances[i],
    Income: trendData.incomes[i],
    Expenses: trendData.expenses[i],
  }))

  const donutData = categoryData.map(([name, value]) => ({ name, value }))

  const recent = useMemo(
    () => [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5),
    [transactions]
  )

  const CHART_TICK_STYLE = {
    fill: '#55537a',
    fontFamily: 'DM Mono',
    fontSize: 10,
  }

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          icon="💰"
          label="Total Balance"
          value={formatCurrency(summary.totalBalance)}
          change="Across all time"
          changeUp
          accentClass="bg-gradient-to-r from-accent to-transparent"
          delay="animate-delay-1"
        />
        <SummaryCard
          icon="📈"
          label="Monthly Income"
          value={formatCurrency(summary.income)}
          change={pctLabel(summary.incomePct)}
          changeUp={parseFloat(summary.incomePct) >= 0}
          accentClass="bg-gradient-to-r from-fin-green to-transparent"
          delay="animate-delay-2"
        />
        <SummaryCard
          icon="📉"
          label="Monthly Expenses"
          value={formatCurrency(summary.expenses)}
          change={pctLabel(summary.expensePct)}
          changeUp={parseFloat(summary.expensePct) < 0}
          accentClass="bg-gradient-to-r from-fin-red to-transparent"
          delay="animate-delay-3"
        />
        <SummaryCard
          icon="🏦"
          label="Net Savings"
          value={formatCurrency(summary.savings)}
          change="This month"
          changeUp={summary.savings >= 0}
          accentClass="bg-gradient-to-r from-fin-blue to-transparent"
          delay="animate-delay-4"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Trend Chart — 2/3 width */}
        <ChartBox
          title="Balance Trend"
          subtitle="Last 6 months — balance + cash flow"
          className="lg:col-span-2 animate-fade-up animate-delay-3"
        >
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={CHART_TICK_STYLE} axisLine={false} tickLine={false} />
              <YAxis
                tick={CHART_TICK_STYLE}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => '₹' + (v / 1000).toFixed(0) + 'k'}
                width={48}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontFamily: 'Syne', fontSize: 11, color: '#8884a8', paddingTop: 8 }}
              />
              <Area type="monotone" dataKey="Balance"  stroke="#a78bfa" fill="url(#balGrad)" strokeWidth={2} dot={{ r: 3, fill: '#a78bfa' }} />
              <Area type="monotone" dataKey="Income"   stroke="#34d399" fill="url(#incGrad)" strokeWidth={2} dot={{ r: 3, fill: '#34d399' }} />
              <Area type="monotone" dataKey="Expenses" stroke="#f87171" fill="none"           strokeWidth={2} dot={{ r: 3, fill: '#f87171' }} strokeDasharray="4 2" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* Donut chart — 1/3 width */}
        <ChartBox
          title="Spending Breakdown"
          subtitle="This month by category"
          className="animate-fade-up animate-delay-4"
        >
          {donutData.length === 0 ? (
            <EmptyState icon="📊" title="No expense data" subtitle="Add some transactions first" />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {donutData.map((entry, i) => (
                    <Cell
                      key={entry.name}
                      fill={CATEGORY_COLORS[entry.name] || '#94a3b8'}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.[0] ? (
                      <div className="bg-surface2 border border-border2 rounded-xl px-3 py-2 text-[12px] font-mono shadow-xl">
                        <span style={{ color: CATEGORY_COLORS[payload[0].name] }}>
                          {payload[0].name}: {formatCurrency(payload[0].value)}
                        </span>
                      </div>
                    ) : null
                  }
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontFamily: 'Syne', fontSize: 10, color: '#8884a8', paddingTop: 4 }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartBox>
      </div>

      {/* Recent Transactions */}
      <ChartBox
        title="Recent Transactions"
        subtitle="Latest 5 activity items"
        className="animate-fade-up animate-delay-5"
      >
        <div className="flex items-center justify-between mb-3">
          <span />
          <button
            className="btn-outline text-[12px] py-1.5 px-3"
            onClick={() => onNavigate('transactions')}
          >
            View All →
          </button>
        </div>
        {recent.length === 0 ? (
          <EmptyState icon="💸" title="No transactions yet" subtitle="Add some to get started" />
        ) : (
          recent.map(tx => <RecentTxRow key={tx.id} tx={tx} />)
        )}
      </ChartBox>
    </div>
  )
}
