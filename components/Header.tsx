
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import { GraduationCapIcon } from './icons';

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary-700 text-white'
        : 'text-white hover:bg-primary-600 hover:text-white'
    }`;

  return (
    <>
      <header className="bg-primary-800 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
                <GraduationCapIcon className="h-8 w-8 text-white" />
                <span>Học Bổng Việt</span>
              </Link>
              <nav className="hidden md:ml-10 md:flex md:space-x-4">
                <NavLink to="/" className={navLinkClasses} end>Trang Chủ</NavLink>
                <NavLink to="/about" className={navLinkClasses}>Giới Thiệu</NavLink>
              </nav>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              {user ? (
                <>
                  <span className="font-medium text-sm">Chào, {user.fullName}!</span>
                  <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Đăng Xuất
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Đăng Nhập / Đăng Ký
                </button>
              )}
            </div>
             <div className="md:hidden flex items-center">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-primary-200 hover:text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {/* Icon for menu */}
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isMenuOpen ? "M4 6h16M4 12h16m-7 6h7" : "M6 18L18 6M6 6l12 12"} />
                  </svg>
                </button>
              </div>
          </div>
        </div>
        {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <NavLink to="/" className={navLinkClasses} end onClick={() => setIsMenuOpen(false)}>Trang Chủ</NavLink>
                <NavLink to="/about" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Giới Thiệu</NavLink>
                 {user ? (
                <div className="pt-4 pb-3 border-t border-primary-700">
                    <div className="flex items-center px-5">
                        <div className="ml-3">
                            <div className="text-base font-medium leading-none text-white">{user.fullName}</div>
                            <div className="text-sm font-medium leading-none text-primary-300">{user.username}</div>
                        </div>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                        <button
                          onClick={() => { logout(); setIsMenuOpen(false); }}
                          className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-primary-200 hover:text-white hover:bg-primary-700"
                        >
                          Đăng Xuất
                        </button>
                    </div>
                </div>
              ) : (
                 <div className="mt-3 px-2">
                    <button
                    onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }}
                    className="w-full text-left bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
                    >
                    Đăng Nhập / Đăng Ký
                    </button>
                </div>
              )}
              </div>
            </div>
          )}
      </header>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;
