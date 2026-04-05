// src/components/Insights/InsightsSection.jsx
import { useMemo } from 'react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, Cell,
} from 'recharts'
import { useApp } from '../../context/AppContext'
import { ChartBox, SectionHeading, ProgressBar } from '../UI'
import { CATEGORY_COLORS } from '../../data/transactions'
import {
  buildTrendData, buildAllTimeCategoryTotals,
  computeSummary, formatCurrency, getMonthLabel, filterByMonth, sumByType, getMonthKey,
} from '../../utils/finance'

const CHART_TICK_STYLE = {
  fill: '#55537a',
  fontFamily: 'DM Mono',
  fontSize: 10,
}

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

export function InsightsSection() {
  const { transactions } = useApp()

  const summary = useMemo(() => computeSummary(transactions), [transactions])

  const allTimeCats = useMemo(
    () => buildAllTimeCategoryTotals(transactions),
    [transactions]
  )

  const trendData = useMemo(() => buildTrendData(transactions), [transactions])

  const comparisonData = trendData.labels.map((label, i) => ({
    month: label,
    Income: trendData.incomes[i],
    Expenses: trendData.expenses[i],
  }))

  const catChartData = allTimeCats.slice(0, 8).map(([name, value]) => ({ name, value }))

  // Savings rate
  const totalIncome  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const savingsRate  = totalIncome ? ((totalIncome - totalExpense) / totalIncome * 100).toFixed(1) : 0

  // Average expense
  const expTxs = transactions.filter(t => t.type === 'expense')
  const avgExpense = expTxs.length ? (totalExpense / expTxs.length).toFixed(0) : 0

  // Monthly expense change
  const currExp = filterByMonth(transactions, getMonthKey(0)).filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const prevExp = filterByMonth(transactions, getMonthKey(1)).filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const expDiff = currExp - prevExp

  const topCat = allTimeCats[0]
  const topCatMax = topCat ? topCat[1] : 1

  return (
    <div className="animate-fade-up">
      <SectionHeading
        title="Insights"
        subtitle="Spending patterns and financial observations"
      />

      {/* Insight Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        {/* Top Category */}
        <InsightCard icon="🏆" label="Top Spending Category" delay="animate-delay-1">
          <p className="font-display text-2xl text-fin-amber mb-1">
            {topCat ? topCat[0] : '—'}
          </p>
          <p className="text-xs text-[#8884a8]">
            {topCat ? `${formatCurrency(topCat[1])} total spent` : 'No data yet'}
          </p>
          {allTimeCats.slice(0, 4).map(([cat, val]) => (
            <div key={cat} className="mt-1">
              <div className="flex justify-between font-mono text-[9px] text-[#55537a]">
                <span>{cat}</span>
                <span>{formatCurrency(val)}</span>
              </div>
              <ProgressBar value={val} max={topCatMax} color={CATEGORY_COLORS[cat] || '#94a3b8'} />
            </div>
          ))}
        </InsightCard>

        {/* Monthly Expense Change */}
        <InsightCard icon="📅" label="Monthly Expense Change" delay="animate-delay-2">
          <p className={`font-display text-2xl mb-1 ${expDiff > 0 ? 'text-fin-red' : 'text-fin-green'}`}>
            {expDiff >= 0 ? '+' : ''}{formatCurrency(expDiff)}
          </p>
          <p className="text-xs text-[#8884a8]">
            {expDiff > 0 ? 'Spending increased' : 'Spending decreased'} vs last month
          </p>
          <p className="font-mono text-[10px] text-[#55537a] mt-2">
            This month: {formatCurrency(currExp)}<br />
            Last month: {formatCurrency(prevExp)}
          </p>
        </InsightCard>

        {/* Savings Rate */}
        <InsightCard icon="💎" label="Overall Savings Rate" delay="animate-delay-3">
          <p className="font-display text-2xl text-accent mb-1">{savingsRate}%</p>
          <p className="text-xs text-[#8884a8] mb-2">Of total income saved</p>
          <div>
            <div className="flex justify-between font-mono text-[9px] text-[#55537a] mb-1">
              <span>Saved</span><span>{savingsRate}%</span>
            </div>
            <ProgressBar value={parseFloat(savingsRate)} max={100} color="#a78bfa" />
          </div>
          <p className="font-mono text-[10px] text-[#55537a] mt-1">
            Earned {formatCurrency(totalIncome)} · Spent {formatCurrency(totalExpense)}
          </p>
        </InsightCard>

        {/* Avg Transaction */}
        <InsightCard icon="🧾" label="Avg. Expense Size" delay="animate-delay-4">
          <p className="font-display text-2xl text-fin-blue mb-1">{formatCurrency(parseFloat(avgExpense))}</p>
          <p className="text-xs text-[#8884a8]">
            Per expense transaction
          </p>
          <p className="font-mono text-[10px] text-[#55537a] mt-2">
            Across {expTxs.length} expense entries
          </p>
        </InsightCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly comparison bar chart */}
        <ChartBox
          title="Monthly Comparison"
          subtitle="Income vs Expenses — last 6 months"
          className="animate-fade-up animate-delay-3"
        >
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={comparisonData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }} barGap={4}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={CHART_TICK_STYLE} axisLine={false} tickLine={false} />
              <YAxis
                tick={CHART_TICK_STYLE}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => '₹' + (v / 1000).toFixed(0) + 'k'}
                width={44}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontFamily: 'Syne', fontSize: 11, color: '#8884a8', paddingTop: 8 }}
              />
              <Bar dataKey="Income"   fill="#34d399" radius={[5, 5, 0, 0]} />
              <Bar dataKey="Expenses" fill="#f87171" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* Category spending horizontal bar */}
        <ChartBox
          title="Category Spending"
          subtitle="All-time totals, ranked"
          className="animate-fade-up animate-delay-4"
        >
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={catChartData}
              layout="vertical"
              margin={{ top: 4, right: 8, bottom: 0, left: 4 }}
            >
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                tick={CHART_TICK_STYLE}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => '₹' + (v / 1000).toFixed(0) + 'k'}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ ...CHART_TICK_STYLE, fill: '#8884a8', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={80}
              />
              <Tooltip
                content={({ active, payload }) =>
                  active && payload?.[0] ? (
                    <div className="bg-surface2 border border-border2 rounded-xl px-3 py-2 shadow-xl font-mono text-[12px]"
                      style={{ color: CATEGORY_COLORS[payload[0].payload.name] || '#f0eff8' }}>
                      {payload[0].payload.name}: {formatCurrency(payload[0].value)}
                    </div>
                  ) : null
                }
              />
              <Bar dataKey="value" radius={[0, 5, 5, 0]}>
                {catChartData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={CATEGORY_COLORS[entry.name] || '#94a3b8'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>
    </div>
  )
}

// ─── Insight Card wrapper ────────────────────────────────────
function InsightCard({ icon, label, children, delay = '' }) {
  return (
    <div className={`bg-surface border border-border rounded-2xl p-5 card-hover animate-fade-up ${delay}`}>
      <div className="text-2xl mb-3">{icon}</div>
      <p className="font-mono text-[9px] tracking-[1.5px] uppercase text-[#55537a] mb-2">{label}</p>
      {children}
    </div>
  )
}
