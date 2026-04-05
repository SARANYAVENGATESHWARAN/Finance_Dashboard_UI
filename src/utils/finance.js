// src/utils/finance.js
// Pure utility functions for financial calculations

/**
 * Format a number as Indian Rupee currency
 */
export function formatCurrency(amount) {
  return '₹' + Math.abs(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

/**
 * Get YYYY-MM string for a date offset by N months
 */
export function getMonthKey(offsetMonths = 0) {
  const d = new Date()
  d.setMonth(d.getMonth() - offsetMonths)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

/**
 * Get short month label like "Apr" for offset
 */
export function getMonthLabel(offsetMonths = 0) {
  const d = new Date()
  d.setMonth(d.getMonth() - offsetMonths)
  return d.toLocaleString('default', { month: 'short' })
}

/**
 * Filter transactions to a specific YYYY-MM month
 */
export function filterByMonth(transactions, monthKey) {
  return transactions.filter(t => t.date.startsWith(monthKey))
}

/**
 * Sum transaction amounts by type
 */
export function sumByType(transactions, type) {
  return transactions
    .filter(t => t.type === type)
    .reduce((sum, t) => sum + t.amount, 0)
}

/**
 * Compute dashboard summary from all transactions
 */
export function computeSummary(transactions) {
  const currKey  = getMonthKey(0)
  const prevKey  = getMonthKey(1)
  const currTxs  = filterByMonth(transactions, currKey)
  const prevTxs  = filterByMonth(transactions, prevKey)

  const income   = sumByType(currTxs, 'income')
  const expenses = sumByType(currTxs, 'expense')
  const pIncome  = sumByType(prevTxs, 'income')
  const pExpense = sumByType(prevTxs, 'expense')

  const totalBalance = transactions.reduce(
    (s, t) => (t.type === 'income' ? s + t.amount : s - t.amount),
    0
  )

  const incomePct  = pIncome  ? ((income  - pIncome)  / pIncome  * 100).toFixed(1) : null
  const expensePct = pExpense ? ((expenses - pExpense) / pExpense * 100).toFixed(1) : null

  return {
    totalBalance,
    income,
    expenses,
    savings: income - expenses,
    incomePct,
    expensePct,
  }
}

/**
 * Build 6-month trend data for charts
 */
export function buildTrendData(transactions) {
  const labels    = []
  const incomes   = []
  const expenseArr = []

  for (let i = 5; i >= 0; i--) {
    const key  = getMonthKey(i)
    const txs  = filterByMonth(transactions, key)
    labels.push(getMonthLabel(i))
    incomes.push(sumByType(txs, 'income'))
    expenseArr.push(sumByType(txs, 'expense'))
  }

  // Running balance per month (simple approximation)
  let bal = transactions.reduce(
    (s, t) => (t.type === 'income' ? s + t.amount : s - t.amount),
    0
  )
  const balances = []
  for (let i = 0; i < 6; i++) {
    balances.unshift(bal)
    const m = filterByMonth(transactions, getMonthKey(i))
    bal -= sumByType(m, 'income')
    bal += sumByType(m, 'expense')
  }

  return { labels, incomes, expenses: expenseArr, balances }
}

/**
 * Build category spending breakdown for current month
 */
export function buildCategoryBreakdown(transactions, monthOffset = 0) {
  const key  = getMonthKey(monthOffset)
  const txs  = filterByMonth(transactions, key).filter(t => t.type === 'expense')
  const map  = {}
  txs.forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount })
  return Object.entries(map).sort((a, b) => b[1] - a[1])
}

/**
 * Build all-time category totals (expenses only)
 */
export function buildAllTimeCategoryTotals(transactions) {
  const map = {}
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount })
  return Object.entries(map).sort((a, b) => b[1] - a[1])
}

/**
 * Export transactions array to CSV download
 */
export function exportToCSV(transactions, filename = 'finvault-transactions.csv') {
  const header = 'Date,Description,Category,Type,Amount\n'
  const rows   = transactions
    .map(t => `${t.date},"${t.desc}",${t.category},${t.type},${t.amount}`)
    .join('\n')
  const uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(header + rows)
  const a   = document.createElement('a')
  a.setAttribute('href', uri)
  a.setAttribute('download', filename)
  a.setAttribute('target', '_blank')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

/**
 * Percentage change label
 */
export function pctLabel(pct) {
  if (pct === null) return 'no prior data'
  const n = parseFloat(pct)
  return `${n >= 0 ? '▲' : '▼'} ${Math.abs(n)}% vs last month`
}
