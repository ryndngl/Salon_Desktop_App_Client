// src/pages/auth/AuthComponents/LoginForm.jsx
import { useRef, useEffect } from 'react';
import PasswordInput from './PasswordInput';
import LoginButton from "./LoginButton";

const LoginForm = ({ formData, setFormData, isLoading, onSubmit, usernameRef, selectedRole, onForgotPassword }) => {
  const localUsernameRef = useRef(null);
  const finalUsernameRef = usernameRef || localUsernameRef;

  useEffect(() => {
    if (finalUsernameRef.current) {
      setTimeout(() => {
        finalUsernameRef.current.focus();
      }, 100);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit(e, selectedRole); 
    }
  };

  const handleLoginClick = (e) => {
    onSubmit(e, selectedRole);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {selectedRole === 'admin' ? 'Admin' : 'Staff'}
        </h2>
      </div>
      
      <div onKeyUp={handleKeyPress} className="space-y-6">
        {/* Username Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email 
          </label>
          <input
            ref={finalUsernameRef}
            type="email"  
            name="username"
            placeholder="Enter email" 
            value={formData.username}
            onChange={handleInputChange}
            disabled={isLoading}
            autoComplete="email" 
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none disabled:opacity-50 disabled:bg-gray-50"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <PasswordInput 
            value={formData.password}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>

        {/* Login Button */}
        <LoginButton 
          isLoading={isLoading}
          onClick={handleLoginClick}
        />

        {/* Forgot Password - ONLY show for Admin */}
        {selectedRole === 'admin' && (
          <div className="text-center">
            <button
              type="button"
              onClick={onForgotPassword}
              disabled={isLoading}
              className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-200 bg-transparent border-none outline-none cursor-pointer disabled:opacity-50"
            >
              Forgot your password?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;