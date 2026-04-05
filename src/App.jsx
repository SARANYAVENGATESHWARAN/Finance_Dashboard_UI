// src/App.jsx
import { useState } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import { Sidebar } from './components/Layout/Sidebar'
import { Topbar } from './components/Layout/Topbar'
import { DashboardSection } from './components/Dashboard/DashboardSection'
import { TransactionsSection } from './components/Transactions/TransactionsSection'
import { InsightsSection } from './components/Insights/InsightsSection'
import { Toast } from './components/UI'
import { useToast } from './hooks/useToast'

function AppShell() {
  const { activeSection, setSection } = useApp()
  const { toast, showToast } = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Sidebar — fixed on desktop, drawer on mobile */}
      <div className={`
        fixed inset-y-0 left-0 z-[100] w-60 transform transition-transform duration-300
        md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[90] bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-60 min-h-screen">
        <Topbar onMenuToggle={() => setSidebarOpen(o => !o)} />

        <main className="flex-1 p-5 md:p-8">
          {activeSection === 'dashboard' && (
            <DashboardSection onNavigate={setSection} />
          )}
          {activeSection === 'transactions' && (
            <TransactionsSection showToast={showToast} />
          )}
          {activeSection === 'insights' && (
            <InsightsSection />
          )}
        </main>
      </div>

      {/* Toast */}
      <Toast toast={toast} />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
