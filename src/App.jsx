// src/App.jsx - UPDATED with correct imports
import { useAuthState } from './hooks/useAuthState';
import { LoginPage } from './pages/auth/AuthComponents';
import Dashboard from './pages/dashboard/DashboardComponents/Dashboard'; 

function App() {
  const { isLoggedIn, handleLogout } = useAuthState();

  return (
    <div className="App">
      {!isLoggedIn ? (
        <LoginPage />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App