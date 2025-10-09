// src/hooks/useLogin.js - UPDATED to use useAuthState
import { useState } from 'react';
import { useAuthState } from './useAuthState'; 

const useLogin = () => { // ✅ No more setIsLoggedIn parameter
  const { login } = useAuthState(); // ✅ Get login function from context
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('🔥 Attempting login...');
      
      if (window.electronAPI?.login) {
        const result = await window.electronAPI.login(formData);
        console.log('🔥 Login result:', result);

        if (result.success || result.isSuccess) {
          // ✅ Save to context (which saves to localStorage automatically)
          const adminData = result.admin || result.user || { username: formData.username };
          login(adminData, result.token);
          console.log('✅ Logged in via Electron API');
          
          setShowSpinner(true);
          setTimeout(() => {
            setShowSpinner(false);
          }, 1500);
        } else {
          alert(`Login failed: ${result.message}`);
          setIsLoading(false);
        }
      } else {
        // Fallback - call server API directly
        console.log('🌐 Calling server API directly...');
        
        const response = await fetch('http://localhost:5000/api/auth/admin-signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password
          })
        });

        const result = await response.json();
        console.log('API Response:', result);

        if (result.success || result.isSuccess) {
          // ✅ Save to context (which saves to localStorage automatically)
          const adminData = result.admin || result.user || { username: formData.username };
          login(adminData, result.token);
          console.log('✅ Logged in via direct API');
          
          setShowSpinner(true);
          setTimeout(() => {
            setShowSpinner(false);
          }, 1500);
        } else {
          alert(`Login failed: ${result.message || 'Invalid credentials'}`);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error occurred. Check console for details.');
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
      rememberMe: false
    });
    setIsLoading(false);
    setShowSpinner(false);
  };

  return {
    formData,
    setFormData,
    isLoading,
    showSpinner,
    handleSubmit,
    resetForm
  };
};

export default useLogin;