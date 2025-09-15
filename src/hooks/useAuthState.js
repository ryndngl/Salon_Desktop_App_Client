import { useState, useRef } from 'react';

const useAuthState = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const usernameRef = useRef(null);

  const handleLogout = (resetForm) => {
    setIsLoggedIn(false);
    
    // Call resetForm function if provided
    if (resetForm) {
      resetForm();
    }
    
    // Multiple attempts to fix Electron focus issue
    setTimeout(() => {
      // Method 1: Electron focus
      if (window.electronAPI && window.electronAPI.focusWindow) {
        window.electronAPI.focusWindow();
      }
      
      // Method 2: Force click on document body
      document.body.click();
      document.body.focus();
      
      // Method 3: Force input focus with multiple attempts
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
    
    console.log('Logged out successfully');
  };

  return {
    isLoggedIn,
    setIsLoggedIn,
    handleLogout,
    usernameRef
  };
};

export default useAuthState;