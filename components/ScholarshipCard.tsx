
import React from 'react';
import { Link } from 'react-router-dom';
import { Scholarship } from '../types';
import { CalendarIcon, BanknotesIcon, BuildingLibraryIcon } from './icons';

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
  const formattedDate = scholarship.deadline.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <img className="h-48 w-full object-cover" src={scholarship.imageUrl} alt={scholarship.title} />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <BuildingLibraryIcon className="h-4 w-4 mr-1.5" />
          <span>{scholarship.provider}</span>
        </div>
        <h3 className="text-xl font-bold text-primary-800 mb-2">{scholarship.title}</h3>
        <div className="flex-grow">
            <div className="flex items-center text-sm text-gray-700 mb-2">
            <BanknotesIcon className="h-4 w-4 mr-1.5 text-green-500" />
            <span className="font-semibold">{scholarship.amount}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
            <CalendarIcon className="h-4 w-4 mr-1.5 text-red-500" />
            <span className="font-semibold">Hạn chót: {formattedDate}</span>
            </div>
        </div>
        <div className="mt-6 text-right">
          <Link
            to={`/scholarship/${scholarship.id}`}
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Xem Chi Tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
