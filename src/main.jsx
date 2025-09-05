import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './pages/auth/LoginPage.jsx'
import './index.css'

// Simple - just load LoginPage directly
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>,
)