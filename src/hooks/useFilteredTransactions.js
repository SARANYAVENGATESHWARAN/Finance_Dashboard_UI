// src/hooks/useFilteredTransactions.js
import { useMemo } from 'react'
import { useApp } from '../context/AppContext'

export function useFilteredTransactions() {
  const { transactions, filters } = useApp()
  const { search, type, category, sortField, sortDir } = filters

  return useMemo(() => {
    let result = [...transactions]

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(t =>
        t.desc.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      )
    }

    // Type filter
    if (type) result = result.filter(t => t.type === type)

    // Category filter
    if (category) result = result.filter(t => t.category === category)

    // Sort
    result.sort((a, b) => {
      let va = a[sortField]
      let vb = b[sortField]
      if (typeof va === 'string') { va = va.toLowerCase(); vb = vb.toLowerCase() }
      if (va < vb) return sortDir === 'asc' ? -1 : 1
      if (va > vb) return sortDir === 'asc' ? 1 : -1
      return 0
    })

    return result
  }, [transactions, search, type, category, sortField, sortDir])
}
