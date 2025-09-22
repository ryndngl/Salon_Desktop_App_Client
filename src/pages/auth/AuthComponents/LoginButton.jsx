import { Loader2 } from 'lucide-react';

const LoginButton = ({ isLoading, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
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
  );
};

export default LoginButton;
