import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { AuthProvider } from './pages/context/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
    <AuthProvider>
      <App />
      </AuthProvider>
      </HashRouter>
  </React.StrictMode>,
)
