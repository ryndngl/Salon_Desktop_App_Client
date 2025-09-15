import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({ value, onChange, disabled }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        name="password"
        placeholder="Enter password"
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete="current-password"
        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none disabled:opacity-50 disabled:bg-gray-50"
        required
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        disabled={disabled}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 cursor-pointer bg-transparent border-none outline-none disabled:opacity-50"
      >
        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
    </div>
  );
};

export default PasswordInput;