import { createContext, useContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const usernameRef = useRef(null);
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('admin');
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  // ✅ NEW: Current user state with role and username
  const [currentUser, setCurrentUser] = useState(() => {
    const userType = localStorage.getItem('userType');
    if (userType === 'staff') {
      const staffData = localStorage.getItem('salon_staff');
      if (staffData) {
        const staff = JSON.parse(staffData);
        return {
          role: 'staff',
          username: staff.username || staff.email || 'Staff',
          email: staff.email,
          ...staff
        };
      }
    } else if (userType === 'admin') {
      const adminData = localStorage.getItem('salon_admin');
      if (adminData) {
        const admin = JSON.parse(adminData);
        return {
          role: 'admin',
          username: 'Admin',
          email: admin.email,
          ...admin
        };
      }
    }
    return null;
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    if (admin) {
      localStorage.setItem('admin', JSON.stringify(admin));
    } else {
      localStorage.removeItem('admin');
    }
  }, [admin]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  function login(adminData, authToken) {
    setIsLoggedIn(true);
    setAdmin(adminData);
    setToken(authToken);
    
    // ✅ Set currentUser based on userType
    const userType = localStorage.getItem('userType');
    if (userType === 'staff') {
      setCurrentUser({
        role: 'staff',
        username: adminData.username || adminData.email || 'Staff',
        email: adminData.email,
        ...adminData
      });
    } else {
      setCurrentUser({
        role: 'admin',
        username: 'Admin',
        email: adminData.email,
        ...adminData
      });
    }
  }

  function handleLogout(resetForm) {
    setIsLoggedIn(false);
    setAdmin(null);
    setToken(null);
    setCurrentUser(null); // ✅ Clear currentUser
    localStorage.clear();
    
    if (resetForm) {
      resetForm();
    }
    
    setTimeout(() => {
      if (window.electronAPI?.focusWindow) {
        window.electronAPI.focusWindow();
      }
      
      document.body.click();
      document.body.focus();
      
      const focusInput = () => {
        if (usernameRef.current) {
          usernameRef.current.focus();
          usernameRef.current.click();
          usernameRef.current.select();
        }
      };
      
      focusInput();
      setTimeout(focusInput, 100);
      setTimeout(focusInput, 300);
      setTimeout(focusInput, 500);
    }, 150);
    
  }

  function logout() {
    handleLogout(null);
  }

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    admin,
    setAdmin,
    token,
    setToken,
    currentUser, 
    setCurrentUser, 
    login,
    logout,
    handleLogout,
    usernameRef,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthState() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthState must be used within AuthProvider');
  }
  return context;
}