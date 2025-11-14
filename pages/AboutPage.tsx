
import React from 'react';
import { MOCK_TEAM_MEMBERS } from '../data/mockData';

const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Mission Section */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold text-primary-900 text-center mb-4">Sứ Mệnh Của Chúng Tôi</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
          Chúng tôi tin rằng mọi sinh viên Việt Nam đều xứng đáng có cơ hội tiếp cận nền giáo dục tốt nhất. Sứ mệnh của "Học Bổng Việt" là tạo ra một nền tảng tập trung, dễ sử dụng, giúp kết nối sinh viên với các cơ hội học bổng phù hợp, từ đó chắp cánh cho những ước mơ và hoài bão vươn xa.
        </p>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10 text-primary-900">Đội Ngũ Phát Triển</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_TEAM_MEMBERS.map(member => (
            <div key={member.id} className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <img 
                src={member.avatarUrl} 
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary-300"
              />
              <h3 className="text-xl font-bold text-primary-800">{member.name}</h3>
              <p className="text-sm text-gray-500 mb-3">MSV: {member.studentId}</p>
              <p className="text-gray-600 text-sm">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
