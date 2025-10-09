// src/pages/auth/AuthComponents/LoginPage.jsx - FIXED PATHS
import { useState } from 'react';
import LoginForm from './LoginForm';
import LoginHero from './LoginHero';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import useLogin from '../../../hooks/useLogin';

const LoginPage = () => {
  const {
    formData,
    setFormData,
    isLoading,
    showSpinner,
    handleSubmit,
  } = useLogin();

  return (
    <>
      <div className="flex h-screen font-sans">
        <LoginHero />
        <LoginForm
          formData={formData}
          setFormData={setFormData}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </div>
      <LoadingSpinner show={showSpinner} />
    </>
  );
};

export default LoginPage;