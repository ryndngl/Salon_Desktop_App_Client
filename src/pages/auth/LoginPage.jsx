// src/pages/auth/LoginPage.jsx
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await window.electronAPI.login(formData);
      if (result.success) {
        console.log('Login successful!');
      } else {
        console.log('Login failed:', result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Left Panel */}
      <div className="flex-1 bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center text-white text-center p-8">
        <div>
          <h1 className="text-3xl font-bold mb-3 tracking-wider">
            VAN'S GLOW UP SALON
          </h1>
          <p className="text-lg opacity-90">Beauty & Wellness Center</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-10">
        <div className="w-full max-w-sm bg-white/80 backdrop-blur-md rounded-2xl p-9 shadow-xl animate-fadeIn">
          <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">
            Welcome Back! Admin
          </h2>
          
          <form onSubmit={handleSubmit}>
            {/* Username Input */}
            <div className="mb-5">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 border-none rounded-lg text-sm outline-none bg-white shadow-md focus:shadow-lg transition-shadow duration-200"
              />
            </div>

            {/* Password Input */}
            <div className="mb-5 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 pr-12 border-none rounded-lg text-sm outline-none bg-white shadow-md focus:shadow-lg transition-shadow duration-200"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1 cursor-pointer bg-transparent border-none outline-none"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg border-none outline-none"
            >
              Login
            </button>

            {/* Additional Options */}
            <div className="flex justify-between items-center mt-4 text-xs">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="mr-2 w-3 h-3 accent-green-600"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a 
                href="#" 
                className="text-red-700 hover:underline transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Forgot password clicked');
                }}
              >
                Forgot password?
              </a>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;