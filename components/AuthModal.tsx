import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { XMarkIcon } from './icons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    let result = false;
    try {
        if (isLogin) {
            if (!username || !password) {
                setError("Vui lòng nhập tên đăng nhập và mật khẩu.");
                return;
            }
            result = await login(username, password);
            if (result) {
                setSuccess("Đăng nhập thành công!");
                setTimeout(onClose, 1000);
            } else {
                setError("Tên đăng nhập hoặc mật khẩu không đúng.");
            }
        } else {
            if (!username || !password || !fullName) {
                setError("Vui lòng điền đầy đủ thông tin.");
                return;
            }
            result = await signup(username, fullName, password);
            if (result) {
                setSuccess("Đăng ký thành công! Đang đăng nhập...");
                setTimeout(onClose, 1000);
            } else {
                setError("Tên đăng nhập đã tồn tại.");
            }
        }
    } catch (err) {
        setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
        setIsLoading(false);
    }
  };

  if (!isOpen) return null;
  
  const resetForm = () => {
    setUsername('');
    setPassword('');
    setFullName('');
    setError('');
    setSuccess('');
    setIsLoading(false);
  }

  const handleTabChange = (loginTab: boolean) => {
    setIsLogin(loginTab);
    resetForm();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full relative transform transition-all animate-fade-in-down">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled={isLoading}>
          <XMarkIcon className="h-6 w-6" />
        </button>
        
        <div className="flex border-b border-gray-200 mb-6">
          <button 
            onClick={() => handleTabChange(true)}
            disabled={isLoading}
            className={`flex-1 py-3 text-center font-semibold transition-colors disabled:cursor-not-allowed ${isLogin ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Đăng Nhập
          </button>
          <button 
            onClick={() => handleTabChange(false)}
            disabled={isLoading}
            className={`flex-1 py-3 text-center font-semibold transition-colors disabled:cursor-not-allowed ${!isLogin ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Đăng Ký
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}</h2>
        
        <form onSubmit={handleSubmit}>
          {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
          {success && <p className="bg-green-100 text-green-700 p-3 rounded-md mb-4 text-sm">{success}</p>}
          
          <fieldset disabled={isLoading} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="fullName">Họ và Tên</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:bg-gray-50"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="username">Tên đăng nhập</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Mật khẩu</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:bg-gray-50"
                required
              />
            </div>
          </fieldset>
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 disabled:bg-primary-300 disabled:cursor-wait flex justify-center items-center"
          >
            {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : null}
            {isLoading ? 'Đang xử lý...' : (isLogin ? 'Đăng Nhập' : 'Đăng Ký')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;