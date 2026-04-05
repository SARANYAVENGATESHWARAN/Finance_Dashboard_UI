// src/components/Transactions/TransactionModal.jsx
import { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../data/transactions'

const DEFAULT_FORM = {
  desc: '',
  amount: '',
  date: new Date().toISOString().split('T')[0],
  type: 'expense',
  category: 'Food',
}

export function TransactionModal({ editTx, onClose, onSave }) {
  const { addTx, updateTx } = useApp()
  const [form, setForm] = useState(DEFAULT_FORM)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editTx) {
      setForm({
        desc: editTx.desc,
        amount: String(editTx.amount),
        date: editTx.date,
        type: editTx.type,
        category: editTx.category,
      })
    } else {
      setForm(DEFAULT_FORM)
    }
    setErrors({})
  }, [editTx])

  const categories = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  function setField(key, value) {
    setForm(f => {
      const next = { ...f, [key]: value }
      // Auto-reset category when type changes
      if (key === 'type') {
        const cats = value === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
        next.category = cats[0]
      }
      return next
    })
    setErrors(e => ({ ...e, [key]: undefined }))
  }

  function validate() {
    const e = {}
    if (!form.desc.trim()) e.desc = 'Description is required'
    if (!form.amount || isNaN(form.amount) || parseFloat(form.amount) <= 0)
      e.amount = 'Enter a valid amount'
    if (!form.date) e.date = 'Date is required'
    return e
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    const payload = {
      ...form,
      amount: parseFloat(form.amount),
    }

    if (editTx) {
      updateTx({ ...editTx, ...payload })
      onSave('updated')
    } else {
      addTx(payload)
      onSave('added')
    }
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-surface border border-border2 rounded-2xl p-7 w-full max-w-md mx-4 animate-fade-up shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl">
            {editTx ? 'Edit Transaction' : 'Add Transaction'}
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 bg-surface2 border border-border rounded-lg flex items-center justify-center
              text-[#8884a8] hover:text-[#f0eff8] hover:border-border2 transition-all text-sm"
          >
            ✕
          </button>
        </div>

        {/* Description */}
        <FormField label="Description" error={errors.desc}>
          <input
            className={`input-field ${errors.desc ? 'border-fin-red' : ''}`}
            value={form.desc}
            onChange={e => setField('desc', e.target.value)}
            placeholder="e.g. Grocery run…"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          {/* Amount */}
          <FormField label="Amount (₹)" error={errors.amount}>
            <input
              className={`input-field ${errors.amount ? 'border-fin-red' : ''}`}
              type="number"
              value={form.amount}
              onChange={e => setField('amount', e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </FormField>

          {/* Date */}
          <FormField label="Date" error={errors.date}>
            <input
              className={`input-field ${errors.date ? 'border-fin-red' : ''}`}
              type="date"
              value={form.date}
              onChange={e => setField('date', e.target.value)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Type */}
          <FormField label="Type">
            <select
              className="input-field cursor-pointer"
              value={form.type}
              onChange={e => setField('type', e.target.value)}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </FormField>

          {/* Category */}
          <FormField label="Category">
            <select
              className="input-field cursor-pointer"
              value={form.category}
              onChange={e => setField('category', e.target.value)}
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </FormField>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end mt-6">
          <button className="btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit}>
            {editTx ? 'Update' : 'Save Transaction'}
          </button>
        </div>
      </div>
    </div>
  )
}

function FormField({ label, error, children }) {
  return (
    <div className="mb-4">
      <label className="block font-mono text-[10px] tracking-[1.5px] uppercase text-[#55537a] mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[11px] text-fin-red mt-1 font-mono">{error}</p>
      )}
    </div>
  )
}
