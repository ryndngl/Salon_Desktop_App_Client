// src/hooks/useLogin.js - UPDATED to use EMAIL instead of USERNAME
import { useState } from 'react';
import { useAuthState } from './useAuthState'; 

const useLogin = () => {
  const { login } = useAuthState();
  
  const [formData, setFormData] = useState({
    username: "",  // Note: this field will contain EMAIL (we keep name for compatibility)
    password: "",
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('🔐 Attempting login...');
      
      if (window.electronAPI?.login) {
        // ELECTRON IPC PATH
        const result = await window.electronAPI.login({
          email: formData.username,  // ✅ Send as EMAIL
          password: formData.password,
          rememberMe: formData.rememberMe
        });
        
        console.log('📱 Login result:', result);

        if (result.success || result.isSuccess) {
          const adminData = result.admin || result.user || { 
            email: formData.username 
          };
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
        // DIRECT HTTP PATH (Fallback)
        console.log('🌐 Calling server API directly...');
        
        const response = await fetch('http://localhost:5000/api/auth/admin/sign-in', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.username,  // ✅ Send as EMAIL
            password: formData.password
          })
        });

        const result = await response.json();
        console.log('📡 API Response:', result);

        if (result.success || result.isSuccess) {
          const adminData = result.admin || result.user || { 
            email: formData.username 
          };
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
      console.error('❌ Login error:', error);
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