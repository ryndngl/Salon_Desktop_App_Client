// src/App.jsx - UPDATED with currentUser prop
import { useAuthState } from './hooks/useAuthState';
import { LoginPage } from './pages/auth/AuthComponents';
import Dashboard from './pages/dashboard/DashboardComponents/Dashboard';

function App() {
  const { isLoggedIn, handleLogout, currentUser } = useAuthState(); 

  return (
    <div className="App">
      {!isLoggedIn ? (
        <LoginPage />
      ) : (
        <Dashboard 
          onLogout={handleLogout} 
          currentUser={currentUser} 
        />
      )}
    </div>
  );
}

export default App;