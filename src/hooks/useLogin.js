import { useState } from 'react';

const useLogin = (setIsLoggedIn) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('🔄 Attempting login...');
      const result = await window.electronAPI.login(formData);
      console.log('🔥 Login result:', result);
      
      if (result.success || result.isSuccess) {
        setShowSpinner(true);
        setTimeout(() => {
          setShowSpinner(false);
          setIsLoggedIn(true);
        }, 1500);
      } else {
        alert(`Login failed: ${result.message}`);
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
      username: '',
      password: '',
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