import React, { useState, useMemo, useEffect } from 'react';
import { api } from '../services/api';
import ScholarshipCard from '../components/ScholarshipCard';
import { Scholarship } from '../types';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getScholarships();
        // The API returns dates as strings, so we need to convert them back to Date objects
        const formattedData = data.map(s => ({
            ...s,
            deadline: new Date(s.deadline)
        }));
        setScholarships(formattedData);
      } catch (err) {
        setError("Không thể tải danh sách học bổng. Vui lòng thử lại sau.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  const filteredScholarships = useMemo(() => {
    if (!searchTerm) {
      return scholarships;
    }
    return scholarships.filter(scholarship =>
      scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, scholarships]);

  const renderContent = () => {
    if (loading) {
      return <div className="text-center py-16"><p className="text-lg font-semibold">Đang tải dữ liệu học bổng...</p></div>;
    }

    if (error) {
       return <div className="text-center py-16 px-6 bg-red-100 text-red-700 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Đã xảy ra lỗi</h3>
            <p className="mt-2">{error}</p>
          </div>
    }

    if (filteredScholarships.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredScholarships.map(scholarship => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>
      );
    }

    return (
      <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700">Không tìm thấy kết quả</h3>
        <p className="text-gray-500 mt-2">Rất tiếc, không có học bổng nào phù hợp với tìm kiếm của bạn. Vui lòng thử lại với từ khóa khác.</p>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center bg-primary-800 text-white rounded-lg p-10 md:p-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Tìm kiếm cơ hội, Vươn tới tương lai</h1>
        <p className="text-lg md:text-xl text-primary-200 max-w-3xl mx-auto mb-8">
          Khám phá hàng ngàn cơ hội học bổng trong và ngoài nước dành cho sinh viên Việt Nam.
        </p>
        <div className="max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Nhập tên học bổng, trường hoặc nhà tài trợ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-primary-300 transition-shadow"
          />
        </div>
      </section>

      {/* Scholarships Grid */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-primary-900 border-b-4 border-primary-500 pb-2 inline-block">Học bổng nổi bật</h2>
        {renderContent()}
      </section>
    </div>
  );
};

export default HomePage;