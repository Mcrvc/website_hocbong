import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Comment, UserRole, Scholarship } from '../types';
import { CheckBadgeIcon } from '../components/icons';

const ScholarshipDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [scholarship, setScholarship] = useState<Scholarship | null | undefined>(undefined);
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchScholarship = async () => {
      if (!id) return;
      try {
        setScholarship(undefined); // Set to loading state
        const data = await api.getScholarshipById(id);
        if (data) {
          // Convert date strings back to Date objects
          const formattedData = {
              ...data,
              deadline: new Date(data.deadline),
              comments: data.comments.map(c => ({...c, timestamp: new Date(c.timestamp)}))
          };
          setScholarship(formattedData);
        } else {
          setScholarship(null); // Not found
        }
      } catch (error) {
        console.error("Failed to fetch scholarship details:", error);
        setScholarship(null); // Error state
      }
    };

    fetchScholarship();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && user && scholarship && id) {
      try {
        const postedComment = await api.postComment(id, newComment.trim(), user);
        
        // Optimistically update UI
        const newCommentWithDate = {
          ...postedComment,
          timestamp: new Date(postedComment.timestamp)
        }
        
        setScholarship(prev => {
          if (!prev) return null;
          return {
            ...prev,
            comments: [...prev.comments, newCommentWithDate],
          };
        });

        setNewComment('');
      } catch (error) {
        console.error("Failed to post comment:", error);
        alert("Không thể gửi bình luận. Vui lòng thử lại.");
      }
    }
  };

  if (scholarship === undefined) {
    return <div className="text-center text-lg font-semibold mt-10">Đang tải chi tiết học bổng...</div>;
  }

  if (!scholarship) {
    return <div className="text-center text-2xl font-bold mt-10">Không tìm thấy học bổng.</div>;
  }

  const formattedDate = scholarship.deadline.toLocaleDateString('vi-VN', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
  });

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2">
          <img src={scholarship.imageUrl} alt={scholarship.title} className="w-full h-64 md:h-96 object-cover rounded-lg mb-6 shadow-md" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-900 mb-2">{scholarship.title}</h1>
          <p className="text-lg text-gray-500 mb-6 font-medium">Cung cấp bởi: {scholarship.provider}</p>
          <div className="prose max-w-none text-gray-700 text-lg" dangerouslySetInnerHTML={{ __html: scholarship.description.replace(/\n/g, '<br/>') }}></div>

           {/* Comment Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 text-primary-900">Thảo luận ({scholarship.comments.length})</h2>
            <div className="space-y-6">
              {scholarship.comments.map(comment => (
                <div key={comment.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-200 rounded-full flex items-center justify-center font-bold text-primary-700">
                    {comment.author.fullName.charAt(0)}
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-primary-800 flex items-center">
                        {comment.author.fullName}
                        {comment.author.role === UserRole.ADMIN && <CheckBadgeIcon className="w-5 h-5 ml-1.5 text-blue-500" title="Quản trị viên" />}
                      </p>
                      <span className="text-xs text-gray-500">{comment.timestamp.toLocaleDateString('vi-VN')}</span>
                    </div>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              {user ? (
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={4}
                    placeholder="Viết bình luận của bạn..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                  ></textarea>
                  <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-6 rounded-lg transition">Gửi bình luận</button>
                </form>
              ) : (
                <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-600">Vui lòng <span className="font-bold text-primary-600">đăng nhập</span> để tham gia thảo luận.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-primary-50 p-6 rounded-lg border border-primary-200">
                <h3 className="text-xl font-bold text-primary-900 mb-4">Thông tin chi tiết</h3>
                <div className="space-y-3 text-gray-700">
                    <p><strong>Giá trị:</strong> <span className="text-green-600 font-semibold">{scholarship.amount}</span></p>
                    <p><strong>Hạn chót:</strong> <span className="text-red-600 font-semibold">{formattedDate}</span></p>
                    <div>
                        <h4 className="font-bold mb-2">Đối tượng:</h4>
                        <ul className="list-disc list-inside space-y-1 pl-2">
                        {scholarship.eligibility.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetailPage;