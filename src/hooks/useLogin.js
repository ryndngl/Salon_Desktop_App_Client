import { useState } from 'react';

const useLogin = (setIsLoggedIn) => {
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
          // SAVE TOKEN TO LOCALSTORAGE
          if (result.token) {
            localStorage.setItem('token', result.token);
            console.log('✅ Token saved to localStorage');
          }
          
          setShowSpinner(true);
          setTimeout(() => {
            setShowSpinner(false);
            setIsLoggedIn(true);
          }, 1500);
        } else {
          alert(`Login failed: ${result.message}`);
        }
      } else {
        // Fallback - call server API directly
        console.log('🌐 Calling server API directly...');
        
        const response = await fetch('http://localhost:5000/api/auth/admin/sign-in', {
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
          // SAVE TOKEN
          if (result.token) {
            localStorage.setItem('token', result.token);
            console.log('✅ Token saved to localStorage');
          }
          
          setShowSpinner(true);
          setTimeout(() => {
            setShowSpinner(false);
            setIsLoggedIn(true);
          }, 1500);
        } else {
          alert(`Login failed: ${result.message || 'Invalid credentials'}`);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error occurred. Check console for details.');
    } finally {
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