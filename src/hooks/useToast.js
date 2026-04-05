// src/hooks/useToast.js
import { useState, useCallback, useRef } from 'react'

export function useToast() {
  const [toast, setToast] = useState(null) // { message, type }
  const timerRef = useRef(null)

  const showToast = useCallback((message, type = 'success') => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setToast({ message, type })
    timerRef.current = setTimeout(() => setToast(null), 3200)
  }, [])

  return { toast, showToast }
}
