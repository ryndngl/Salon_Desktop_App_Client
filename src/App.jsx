import { useState } from 'react'
import { LoginPage } from './pages/auth/AuthComponents';
import { Dashboard } from './pages/dashboard/DashboardComponents';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="App">
      {!isLoggedIn ? (
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <Dashboard onLogout={() => setIsLoggedIn(false)} />
      )}
    </div>
  )
}

export default App