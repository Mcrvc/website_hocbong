
import React from 'react';
import { GraduationCapIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <GraduationCapIcon className="h-8 w-8 text-white" />
            <span className="font-bold text-xl">Học Bổng Việt</span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-primary-300">&copy; {new Date().getFullYear()} Học Bổng Việt. All rights reserved.</p>
            <p className="text-xs text-primary-400">Một sản phẩm dành cho sinh viên Việt Nam.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
