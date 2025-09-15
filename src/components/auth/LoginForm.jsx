import { useRef, useEffect } from 'react';
import PasswordInput from './PasswordInput';
import LoginButton from './LoginButton';

const LoginForm = ({ formData, setFormData, isLoading, onSubmit, usernameRef }) => {
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
      onSubmit(e);
    }
  };

  return (
    <div className="flex-1 bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin</h2>
        </div>
        
        <div onKeyUp={handleKeyPress} className="space-y-6">
          {/* Username Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              ref={finalUsernameRef}
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleInputChange}
              disabled={isLoading}
              autoComplete="username"
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
            onClick={onSubmit}
          />

          {/* Forgot Password */}
          <div className="text-center">
            <button
              type="button"
              disabled={isLoading}
              className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-200 bg-transparent border-none outline-none cursor-pointer disabled:opacity-50"
            >
              Forgot your password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;