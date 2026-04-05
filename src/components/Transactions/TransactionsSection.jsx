// src/components/Transactions/TransactionsSection.jsx
import { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { useFilteredTransactions } from '../../hooks/useFilteredTransactions'
import { TransactionModal } from './TransactionModal'
import { CategoryBadge, TypeBadge, EmptyState, SectionHeading, Select } from '../UI'
import { CATEGORY_EMOJI, ALL_CATEGORIES } from '../../data/transactions'
import { formatCurrency, exportToCSV } from '../../utils/finance'

export function TransactionsSection({ showToast }) {
  const { role, filters, setFilter, deleteTx, transactions } = useApp()
  const filtered = useFilteredTransactions()
  const isAdmin = role === 'admin'

  const [modalOpen, setModalOpen] = useState(false)
  const [editTx, setEditTx] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const uniqueCategories = useMemo(
    () => [...new Set(transactions.map(t => t.category))].sort(),
    [transactions]
  )

  function openAdd() { setEditTx(null); setModalOpen(true) }
  function openEdit(tx) { setEditTx(tx); setModalOpen(true) }
  function closeModal() { setModalOpen(false); setEditTx(null) }

  function handleSave(action) {
    showToast(`✓ Transaction ${action} successfully`, 'success')
  }

  function confirmDelete(tx) { setDeleteConfirm(tx) }
  function handleDelete() {
    deleteTx(deleteConfirm.id)
    setDeleteConfirm(null)
    showToast('🗑 Transaction deleted', 'success')
  }

  function handleExportCSV() {
    exportToCSV(filtered)
    showToast('✓ CSV exported', 'success')
  }

  function handleSort(field) {
    if (filters.sortField === field) {
      setFilter('sortDir', filters.sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setFilter('sortField', field)
      setFilter('sortDir', 'desc')
    }
  }

  function sortIcon(field) {
    if (filters.sortField !== field) return ' ↕'
    return filters.sortDir === 'asc' ? ' ↑' : ' ↓'
  }

  return (
    <div className="animate-fade-up">
      <SectionHeading
        title="Transactions"
        subtitle="All financial activity"
        action={
          isAdmin && (
            <button className="btn-primary" onClick={openAdd}>
              + Add Transaction
            </button>
          )
        }
      />

      {/* Controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#55537a] text-sm pointer-events-none">
            🔍
          </span>
          <input
            className="input-field pl-9"
            placeholder="Search transactions…"
            value={filters.search}
            onChange={e => setFilter('search', e.target.value)}
          />
        </div>

        <Select value={filters.type} onChange={v => setFilter('type', v)}>
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </Select>

        <Select value={filters.category} onChange={v => setFilter('category', v)}>
          <option value="">All Categories</option>
          {uniqueCategories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>

        <button className="btn-outline text-[12px]" onClick={handleExportCSV}>
          ↓ Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface2 border-b border-border">
                {[
                  { key: 'date',     label: 'Date' },
                  { key: 'desc',     label: 'Description' },
                  { key: 'category', label: 'Category' },
                  { key: 'type',     label: 'Type' },
                  { key: 'amount',   label: 'Amount', right: true },
                ].map(col => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className={`px-4 py-3 font-mono text-[10px] tracking-[1.5px] uppercase text-[#55537a]
                      font-normal cursor-pointer hover:text-[#8884a8] select-none whitespace-nowrap
                      ${col.right ? 'text-right' : 'text-left'}`}
                  >
                    {col.label}{sortIcon(col.key)}
                  </th>
                ))}
                {isAdmin && (
                  <th className="px-4 py-3 text-left font-mono text-[10px] tracking-[1.5px] uppercase text-[#55537a] font-normal">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx, i) => (
                <tr
                  key={tx.id}
                  className="border-b border-border last:border-0 hover:bg-surface2 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-[11px] text-[#8884a8] whitespace-nowrap">
                    {tx.date}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{CATEGORY_EMOJI[tx.category] || '💳'}</span>
                      <span className="text-[13px]">{tx.desc}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <CategoryBadge category={tx.category} />
                  </td>
                  <td className="px-4 py-3">
                    <TypeBadge type={tx.type} />
                  </td>
                  <td className={`px-4 py-3 text-right whitespace-nowrap ${tx.type === 'income' ? 'amount-positive' : 'amount-negative'}`}>
                    {tx.type === 'income' ? '+' : '−'}{formatCurrency(tx.amount)}
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(tx)}
                          className="btn-outline text-[11px] py-1 px-2.5"
                        >
                          ✎ Edit
                        </button>
                        <button
                          onClick={() => confirmDelete(tx)}
                          className="text-[11px] py-1 px-2.5 rounded-lg border
                            bg-fin-red/10 text-fin-red border-fin-red/20 hover:bg-fin-red/20 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <EmptyState
              title="No transactions found"
              subtitle="Try adjusting your search or filters"
            />
          )}
        </div>
      </div>

      {/* Count */}
      <p className="mt-2 font-mono text-[11px] text-[#55537a]">
        Showing {filtered.length} of {transactions.length} transactions
      </p>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <TransactionModal
          editTx={editTx}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={e => { if (e.target === e.currentTarget) setDeleteConfirm(null) }}
        >
          <div className="bg-surface border border-border2 rounded-2xl p-6 max-w-sm mx-4 shadow-2xl animate-fade-up">
            <h3 className="font-display text-lg mb-2">Delete Transaction?</h3>
            <p className="text-sm text-[#8884a8] mb-5">
              "{deleteConfirm.desc}" will be permanently removed.
            </p>
            <div className="flex gap-3 justify-end">
              <button className="btn-outline" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button
                onClick={handleDelete}
                className="btn-primary"
                style={{ background: '#ef4444' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
