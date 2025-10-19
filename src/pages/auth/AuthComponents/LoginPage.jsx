// src/pages/auth/AuthComponents/LoginPage.jsx
import { useState } from 'react';
import LoginForm from './LoginForm';
import LoginHero from './LoginHero';
import useLogin from '../../../hooks/useLogin';
import LoadingSpinner from '../../../components/ui/LoadingSpinner'; 
const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  
  const {
    formData,
    setFormData,
    isLoading,
    showSpinner,
    handleSubmit,
  } = useLogin();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleBack = () => {
    setSelectedRole(null);
    setFormData({ username: '', password: '' });
  };

  return (
    <>
      <div className="flex h-screen font-sans">
        <LoginHero />
        
        {!selectedRole ? (
          // Role Selection Component
          <div className="flex-1 bg-white flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Login</h2>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleRoleSelect('admin')}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  Login as Admin
                </button>

                <button
                  onClick={() => handleRoleSelect('staff')}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  Login as Staff
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Login Form with Back Button
          <div className="flex-1 bg-white flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              {/* Back Button */}
              <div className="text-center mb-6">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 mb-4"
                  disabled={isLoading}
                >
                  ← Back to role selection
                </button>
              </div>

              {/* Your existing LoginForm */}
              <LoginForm
                formData={formData}
                setFormData={setFormData}
                isLoading={isLoading}
                onSubmit={handleSubmit}
                selectedRole={selectedRole}
              />
            </div>
          </div>
        )}
      </div>
      <LoadingSpinner show={showSpinner} />
    </>
  );
};

export default LoginPage;