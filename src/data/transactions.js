// src/data/transactions.js
// Mock financial data — 30 transactions across 6 months

export const INITIAL_TRANSACTIONS = [
  { id: 1,  date: '2026-04-01', desc: 'Groceries at D-Mart',        category: 'Food',          type: 'expense', amount: 2340 },
  { id: 2,  date: '2026-04-01', desc: 'Uber ride to office',         category: 'Transport',     type: 'expense', amount: 320  },
  { id: 3,  date: '2026-03-31', desc: 'Monthly Salary',              category: 'Salary',        type: 'income',  amount: 85000 },
  { id: 4,  date: '2026-03-28', desc: 'Netflix subscription',        category: 'Entertainment', type: 'expense', amount: 649  },
  { id: 5,  date: '2026-03-25', desc: 'Pharmacy — cold medicine',    category: 'Health',        type: 'expense', amount: 1200 },
  { id: 6,  date: '2026-03-22', desc: 'Freelance — Web project',     category: 'Freelance',     type: 'income',  amount: 18000 },
  { id: 7,  date: '2026-03-20', desc: 'Electricity bill',            category: 'Utilities',     type: 'expense', amount: 1875 },
  { id: 8,  date: '2026-03-18', desc: 'Amazon Shopping haul',        category: 'Shopping',      type: 'expense', amount: 4580 },
  { id: 9,  date: '2026-03-15', desc: 'Doctor consultation',         category: 'Health',        type: 'expense', amount: 800  },
  { id: 10, date: '2026-03-12', desc: 'Dinner at Taj',               category: 'Food',          type: 'expense', amount: 3540 },
  { id: 11, date: '2026-03-10', desc: 'Mutual Fund SIP',             category: 'Investment',    type: 'income',  amount: 5000 },
  { id: 12, date: '2026-03-08', desc: 'Petrol — bike',               category: 'Transport',     type: 'expense', amount: 2100 },
  { id: 13, date: '2026-03-05', desc: 'Internet bill',               category: 'Utilities',     type: 'expense', amount: 999  },
  { id: 14, date: '2026-03-01', desc: 'Monthly Salary',              category: 'Salary',        type: 'income',  amount: 85000 },
  { id: 15, date: '2026-02-28', desc: 'Zomato — lunch order',        category: 'Food',          type: 'expense', amount: 620  },
  { id: 16, date: '2026-02-25', desc: 'Freelance — Logo design',     category: 'Freelance',     type: 'income',  amount: 8000 },
  { id: 17, date: '2026-02-20', desc: 'Gym membership',              category: 'Health',        type: 'expense', amount: 1500 },
  { id: 18, date: '2026-02-15', desc: 'Movie tickets — PVR',         category: 'Entertainment', type: 'expense', amount: 760  },
  { id: 19, date: '2026-02-12', desc: 'Clothing haul — Myntra',      category: 'Shopping',      type: 'expense', amount: 3200 },
  { id: 20, date: '2026-02-01', desc: 'Monthly Salary',              category: 'Salary',        type: 'income',  amount: 85000 },
  { id: 21, date: '2026-01-28', desc: 'Annual insurance premium',    category: 'Health',        type: 'expense', amount: 12000 },
  { id: 22, date: '2026-01-22', desc: 'Freelance — App UI design',   category: 'Freelance',     type: 'income',  amount: 22000 },
  { id: 23, date: '2026-01-18', desc: 'Petrol — car',                category: 'Transport',     type: 'expense', amount: 1800 },
  { id: 24, date: '2026-01-12', desc: 'Sony headphones',             category: 'Shopping',      type: 'expense', amount: 6500 },
  { id: 25, date: '2026-01-01', desc: 'Monthly Salary',              category: 'Salary',        type: 'income',  amount: 85000 },
  { id: 26, date: '2025-12-25', desc: 'Christmas family dinner',     category: 'Food',          type: 'expense', amount: 3200 },
  { id: 27, date: '2025-12-20', desc: 'Year-end performance bonus',  category: 'Salary',        type: 'income',  amount: 25000 },
  { id: 28, date: '2025-12-15', desc: 'Udemy — React courses',       category: 'Entertainment', type: 'expense', amount: 2999 },
  { id: 29, date: '2025-12-01', desc: 'Monthly Salary',              category: 'Salary',        type: 'income',  amount: 85000 },
  { id: 30, date: '2025-11-28', desc: 'Freelance — UI audit',        category: 'Freelance',     type: 'income',  amount: 12000 },
  { id: 31, date: '2025-11-20', desc: 'Swiggy — weekend orders',     category: 'Food',          type: 'expense', amount: 1840 },
  { id: 32, date: '2025-11-15', desc: 'Water + gas bill',            category: 'Utilities',     type: 'expense', amount: 750  },
  { id: 33, date: '2025-11-01', desc: 'Monthly Salary',              category: 'Salary',        type: 'income',  amount: 85000 },
]

export const EXPENSE_CATEGORIES = ['Food', 'Transport', 'Health', 'Shopping', 'Entertainment', 'Utilities']
export const INCOME_CATEGORIES  = ['Salary', 'Freelance', 'Investment', 'Other']
export const ALL_CATEGORIES     = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]

export const CATEGORY_COLORS = {
  Food:          '#fbbf24',
  Transport:     '#60a5fa',
  Health:        '#2dd4bf',
  Shopping:      '#f472b6',
  Entertainment: '#f87171',
  Utilities:     '#818cf8',
  Salary:        '#34d399',
  Freelance:     '#a78bfa',
  Investment:    '#fb923c',
  Other:         '#94a3b8',
}

export const CATEGORY_EMOJI = {
  Food:          '🍔',
  Transport:     '🚗',
  Health:        '💊',
  Shopping:      '🛍️',
  Entertainment: '🎬',
  Utilities:     '💡',
  Salary:        '💼',
  Freelance:     '🧑‍💻',
  Investment:    '📊',
  Other:         '📦',
}
