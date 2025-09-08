// Clean LoginPage.jsx - removed connection status display
import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
    setIsLoading(true);
    
    try {
      console.log('🔄 Attempting login...');
      const result = await window.electronAPI.login(formData);
      console.log('📥 Login result:', result);
      
      if (result.success || result.isSuccess) {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          console.log('Navigating to dashboard...');
        }, 2000);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex h-screen font-sans">
        {/* Left Panel */}
        <div className="flex-1 bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center text-white text-center p-8">
          <div>
            <h1 className="text-3xl font-bold mb-3 tracking-wider">
              WELCOME!
            </h1>
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
              ADMIN
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
                  disabled={isLoading}
                  className="w-full px-4 py-3.5 border-none rounded-lg text-sm outline-none bg-white shadow-md focus:shadow-lg transition-shadow duration-200 disabled:opacity-50"
                  required
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
                  disabled={isLoading}
                  className="w-full px-4 py-3.5 pr-12 border-none rounded-lg text-sm outline-none bg-white shadow-md focus:shadow-lg transition-shadow duration-200 disabled:opacity-50"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1 cursor-pointer bg-transparent border-none outline-none disabled:opacity-50"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg border-none outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>

              {/* Forgot Password */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  disabled={isLoading}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 bg-transparent border-none outline-none cursor-pointer disabled:opacity-50"
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Login Successful!</h3>
              <p className="text-gray-600">Welcome back, Admin</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;