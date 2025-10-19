// src/hooks/useLogin.js - UPDATED to support both admin and staff login
import { useState } from 'react';
import { useAuthState } from './useAuthState'; 

const useLogin = () => {
  const { login } = useAuthState();
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  // ✅ ADD selectedRole parameter
  const handleSubmit = async (e, selectedRole = 'admin') => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(`🔐 Attempting ${selectedRole} login...`);
      
      // ✅ Determine correct endpoint based on role
      const endpoint = selectedRole === 'staff' 
        ? 'http://localhost:5000/api/staff/sign-in'
        : 'http://localhost:5000/api/auth/admin/sign-in';
      
      if (window.electronAPI?.login) {
        // ELECTRON IPC PATH
        const result = await window.electronAPI.login({
          email: formData.username,
          password: formData.password,
          rememberMe: formData.rememberMe,
          role: selectedRole  // ✅ Pass role
        });
        
        console.log(`📱 ${selectedRole} login result:`, result);

// In handleSubmit function, after successful login:
if (result.success || result.isSuccess) {
  const userData = result.admin || result.staff || result.user || { 
    email: formData.username,
    type: selectedRole
  };
  
  if (selectedRole === 'staff') {
    localStorage.setItem('salon_staff', JSON.stringify(userData));
    localStorage.removeItem('salon_admin'); // Remove admin if exists
  } else {
    localStorage.setItem('salon_admin', JSON.stringify(userData));
    localStorage.removeItem('salon_staff'); // Remove staff if exists
  }
  
  login(userData, result.token);
  console.log(`✅ Logged in as ${selectedRole}`);
  
  setShowSpinner(true);
  setTimeout(() => {
    setShowSpinner(false);
  }, 1500);
}

         else {
          alert(`Login failed: ${result.message}`);
          setIsLoading(false);
        }
      } else {
        // DIRECT HTTP PATH (Fallback)
        console.log(`🌐 Calling ${endpoint}...`);
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.username,
            password: formData.password
          })
        });

        const result = await response.json();
        console.log('📡 API Response:', result);

        if (result.success || result.isSuccess) {
          const userData = result.admin || result.staff || result.user || { 
            email: formData.username,
            type: selectedRole
          };
          login(userData, result.token);
          console.log(`✅ Logged in via direct API as ${selectedRole}`);
          
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