// src/context/AppContext.jsx
// Central state management using React Context + useReducer

import { createContext, useContext, useReducer, useCallback } from 'react'
import { INITIAL_TRANSACTIONS } from '../data/transactions'

// ─── Initial State ──────────────────────────────────────────
const initialState = {
  transactions: INITIAL_TRANSACTIONS,
  role: 'admin',            // 'admin' | 'viewer'
  activeSection: 'dashboard',
  filters: {
    search: '',
    type: '',
    category: '',
    sortField: 'date',
    sortDir: 'desc',
  },
  nextId: INITIAL_TRANSACTIONS.length + 1,
}

// ─── Reducer ────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {

    case 'SET_ROLE':
      return { ...state, role: action.payload }

    case 'SET_SECTION':
      return { ...state, activeSection: action.payload }

    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.key]: action.value },
      }

    case 'RESET_FILTERS':
      return {
        ...state,
        filters: initialState.filters,
      }

    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [
          { ...action.payload, id: state.nextId },
          ...state.transactions,
        ],
        nextId: state.nextId + 1,
      }

    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      }

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      }

    default:
      return state
  }
}

// ─── Context ────────────────────────────────────────────────
const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setRole        = useCallback(role    => dispatch({ type: 'SET_ROLE',    payload: role }),    [])
  const setSection     = useCallback(section => dispatch({ type: 'SET_SECTION', payload: section }), [])
  const setFilter      = useCallback((key, value) => dispatch({ type: 'SET_FILTER', key, value }), [])
  const resetFilters   = useCallback(() => dispatch({ type: 'RESET_FILTERS' }), [])
  const addTx          = useCallback(tx => dispatch({ type: 'ADD_TRANSACTION',    payload: tx }), [])
  const updateTx       = useCallback(tx => dispatch({ type: 'UPDATE_TRANSACTION', payload: tx }), [])
  const deleteTx       = useCallback(id => dispatch({ type: 'DELETE_TRANSACTION', payload: id }), [])

  return (
    <AppContext.Provider value={{
      ...state,
      setRole,
      setSection,
      setFilter,
      resetFilters,
      addTx,
      updateTx,
      deleteTx,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
