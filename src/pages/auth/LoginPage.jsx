import LoginForm from '../../components/auth/LoginForm';
import LoginHero from '../../components/auth/LoginHero';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Dashboard from '../dashboard/Dashboard';
import useAuthState from '../../hooks/useAuthState';
import useLogin from '../../hooks/useLogin';

const LoginPage = () => {
  const { isLoggedIn, setIsLoggedIn, handleLogout, usernameRef } = useAuthState();
  const { 
    formData, 
    setFormData,
    isLoading, 
    showSpinner, 
    handleSubmit,
    resetForm
  } = useLogin(setIsLoggedIn);

  // Modified logout handler that also resets form
  const onLogout = () => {
    handleLogout(resetForm);
  };

  // If logged in, show dashboard
  if (isLoggedIn) {
    return <Dashboard onLogout={onLogout} />;
  }

  return (
    <>
      <div className="flex h-screen font-sans">
        <LoginHero />
        <LoginForm 
          formData={formData}
          setFormData={setFormData}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          usernameRef={usernameRef}
        />
      </div>
      
      <LoadingSpinner show={showSpinner} />
    </>
  );
};

export default LoginPage;