# Finvault — Finance Dashboard

A clean, interactive finance dashboard built with **React + Vite + Tailwind CSS + Recharts**.

---

## 🌐 Live Demo

After deployment: 'https://saranyavengateshwaran.github.io/Finance_Dashboard_UI/'

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Local Development

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/finvault.git
cd finvault

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 🌐 Deploying to GitHub Pages

This project is pre-configured for automatic GitHub Pages deployment via GitHub Actions.

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — Finvault finance dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2 — Update `vite.config.js`

Change the `base` field to match your **exact repository name**:

```js
base: '/YOUR_REPO_NAME/',
```

For example if your repo URL is `github.com/john/finvault`, set `base: '/finvault/'`.

### Step 3 — Enable GitHub Pages

- Go to your repo on GitHub
- Navigate to **Settings → Pages**
- Under **Source**, select **GitHub Actions**
- Click **Save**

### Step 4 — Deploy

Push any commit to `main` — the workflow in `.github/workflows/deploy.yml` runs automatically and builds + deploys the app.

Or manually trigger: **Actions → Deploy to GitHub Pages → Run workflow**

### Step 5 — Access your site

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

---

## 📁 Project Structure

```
finvault/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions CI/CD pipeline
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   └── DashboardSection.jsx    # Overview with cards + charts
│   │   ├── Insights/
│   │   │   └── InsightsSection.jsx     # Spending analytics + insights
│   │   ├── Layout/
│   │   │   ├── Sidebar.jsx             # Navigation + role switcher
│   │   │   └── Topbar.jsx              # Top header bar
│   │   ├── Transactions/
│   │   │   ├── TransactionsSection.jsx # Table, filters, search
│   │   │   └── TransactionModal.jsx    # Add / edit modal with validation
│   │   └── UI/
│   │       └── index.jsx               # Shared atomic components
│   ├── context/
│   │   └── AppContext.jsx              # Global state via useReducer
│   ├── data/
│   │   └── transactions.js             # Mock data + constants
│   ├── hooks/
│   │   ├── useFilteredTransactions.js  # Memoized filter + sort logic
│   │   └── useToast.js                 # Toast notification hook
│   ├── utils/
│   │   └── finance.js                  # Pure financial calculation utils
│   ├── App.jsx                         # Root shell + routing
│   ├── main.jsx                        # React entry point
│   └── index.css                       # Tailwind + global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## ✅ Features

### 1. Dashboard Overview
- **4 Summary Cards** — Total Balance, Monthly Income, Expenses, Net Savings with % change vs prior month
- **Balance Trend Chart** (AreaChart) — 6-month view of balance, income, and expenses
- **Spending Breakdown** (PieChart) — Current month expenses by category
- **Recent Transactions** — Last 5 entries with quick-nav to full list

### 2. Transactions Section
- Full table: Date, Description, Category, Type, Amount
- **Real-time search** across description and category
- **Filter by Type** (Income / Expense / All) and **by Category**
- **Multi-column sort** — click any header, toggles asc/desc
- **CSV Export** — exports the currently filtered view
- **Add / Edit / Delete** transactions (Admin only) with confirmation dialog
- Form validation with field-level error messages
- Empty state for no results

### 3. Role-Based UI

Switch roles via the sidebar dropdown:

| Feature               | Viewer | Admin |
|-----------------------|--------|-------|
| View dashboard        | ✅     | ✅    |
| View transactions     | ✅     | ✅    |
| View insights         | ✅     | ✅    |
| Add transactions      | ❌     | ✅    |
| Edit transactions     | ❌     | ✅    |
| Delete transactions   | ❌     | ✅    |

### 4. Insights Section
- Top spending category with ranked progress bars
- Monthly expense change vs prior month
- Overall savings rate (all-time) with progress bar
- Average expense per transaction
- Monthly Income vs Expenses comparison bar chart
- All-time category spending horizontal bar chart

### 5. State Management
Uses **React Context + useReducer** — no external library needed.

All mutations go through typed actions (`ADD_TRANSACTION`, `UPDATE_TRANSACTION`, `DELETE_TRANSACTION`, etc.). Filtering is extracted into `useFilteredTransactions` — a memoized custom hook that avoids unnecessary re-renders.

---

## 🎨 Design

- Dark theme — deep navy/charcoal base
- **DM Serif Display** — headings
- **Syne** — body text
- **DM Mono** — numbers and labels
- Color-coded categories consistent across all views
- Responsive layout — sidebar becomes a mobile drawer
- Fade-up entrance animations

---

## 🛠 Tech Stack

| Tool         | Purpose                        |
|--------------|--------------------------------|
| React 18     | UI framework                   |
| Vite 5       | Build tool + dev server        |
| Tailwind CSS | Utility-first styling          |
| Recharts     | Charts (Area, Bar, Pie)        |
| date-fns     | Date utilities                 |

---

*Built for Zorvyn FinTech Pvt. Ltd. — Frontend Developer Intern Assignment*
