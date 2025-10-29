// src/hooks/useLogin.js - FINAL WORKING VERSION
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

  const handleSubmit = async (e, selectedRole = 'admin') => {
    e.preventDefault();
    setIsLoading(true);

    try {
      
      // ✅ CORRECT ENDPOINTS
      const endpoint = selectedRole === 'staff' 
        ? 'http://192.168.100.6:5000/api/staff/sign-in'
        : 'http://192.168.100.6:5000/api/auth/admin/sign-in';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.username,
          password: formData.password
        })
      });

      
      let result;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text();
        console.error('❌ Non-JSON response:', text);
        throw new Error('Server returned non-JSON response');
      }
      

      if (response.ok && (result.success || result.isSuccess)) {
        const userData = result.admin || result.staff || result.user || { 
          email: formData.username,
          type: selectedRole,
          role: selectedRole,
          ...result.data
        };
        
        // Store in localStorage based on role
        if (selectedRole === 'staff') {
          localStorage.setItem('salon_staff', JSON.stringify(userData));
          localStorage.setItem('userType', 'staff');
          localStorage.removeItem('salon_admin');
        } else {
          localStorage.setItem('salon_admin', JSON.stringify(userData));
          localStorage.setItem('userType', 'admin');
          localStorage.removeItem('salon_staff');
        }
        
        // Store token
        if (result.token) {
          localStorage.setItem('token', result.token);
        }
        
        login(userData, result.token);    
        setShowSpinner(true);
        setTimeout(() => {
          setShowSpinner(false);
        }, 1500);
      } else {
        console.error('❌ Login failed:', result);
        alert(`Login failed: ${result.message || 'Invalid credentials'}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      alert(`Login error: ${error.message || 'Network error'}`);
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