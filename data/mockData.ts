
import { Scholarship, TeamMember, User, UserRole } from '../types';

export const MOCK_USERS: User[] = [
  { id: 'user-1', username: 'thanhle', fullName: 'Lê Văn Thành', role: UserRole.USER },
  { id: 'user-2', username: 'minhtran', fullName: 'Trần Thị Minh', role: UserRole.USER },
  { id: 'admin-1', username: 'admin', fullName: 'Quản trị viên', role: UserRole.ADMIN },
];

export const MOCK_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'hb-vin-01',
    title: 'Học bổng Vingroup cho Sinh viên KHTN & CN',
    provider: 'Tập đoàn Vingroup',
    amount: 'Toàn phần',
    deadline: new Date('2024-12-31'),
    description: 'Học bổng Vingroup dành cho các sinh viên xuất sắc theo học các ngành khoa học và công nghệ tại các trường đại học hàng đầu Việt Nam. Học bổng bao gồm toàn bộ học phí, chi phí sinh hoạt và cơ hội thực tập tại các công ty con của Vingroup.',
    eligibility: ['Sinh viên năm 2-3', 'GPA > 8.5', 'Ngành Khoa học máy tính, Kỹ thuật'],
    imageUrl: 'https://picsum.photos/seed/vingroup/800/600',
    comments: [
      { id: 'cmt-1', author: MOCK_USERS[0], text: 'Học bổng này có yêu cầu tiếng Anh không ạ?', timestamp: new Date() },
      { id: 'cmt-2', author: MOCK_USERS[2], text: 'Chào bạn, học bổng Vingroup ưu tiên các ứng viên có chứng chỉ IELTS 6.5 trở lên nhé.', timestamp: new Date() },
    ]
  },
  {
    id: 'hb-fpt-01',
    title: 'Học bổng Tài năng FPT University',
    provider: 'Đại học FPT',
    amount: '50-100% học phí',
    deadline: new Date('2024-10-30'),
    description: 'Đại học FPT tìm kiếm và trao tặng các suất học bổng cho các học sinh THPT có thành tích học tập và hoạt động ngoại khóa xuất sắc trên toàn quốc. Ứng viên sẽ trải qua một kỳ thi đánh giá năng lực riêng của trường.',
    eligibility: ['Học sinh lớp 12', 'Thành tích học tập tốt', 'Vượt qua kỳ thi của FPT'],
    imageUrl: 'https://picsum.photos/seed/fpt/800/600',
    comments: []
  },
  {
    id: 'hb-rmit-01',
    title: 'Học bổng Chắp cánh ước mơ - RMIT Việt Nam',
    provider: 'Đại học RMIT Việt Nam',
    amount: 'Toàn phần',
    deadline: new Date('2024-11-15'),
    description: 'Học bổng "Chắp cánh ước mơ" là học bổng toàn phần danh giá nhất của RMIT Việt Nam, dành cho các học sinh có hoàn cảnh khó khăn nhưng có thành tích học tập vượt trội và khát vọng vươn lên.',
    eligibility: ['Hoàn cảnh khó khăn', 'Thành tích học tập xuất sắc', 'Khả năng lãnh đạo'],
    imageUrl: 'https://picsum.photos/seed/rmit/800/600',
    comments: [
       { id: 'cmt-3', author: MOCK_USERS[1], text: 'Mình có thể nộp hồ sơ online không?', timestamp: new Date() }
    ]
  },
  {
    id: 'hb-fulbright-01',
    title: 'Học bổng Fulbright',
    provider: 'Chính phủ Hoa Kỳ',
    amount: 'Toàn phần',
    deadline: new Date('2025-04-01'),
    description: 'Chương trình Fulbright tại Việt Nam tìm kiếm các ứng viên chất lượng cho chương trình học bổng Thạc sĩ và Tiến sĩ tại Hoa Kỳ. Chương trình tài trợ toàn phần học phí, vé máy bay, sinh hoạt phí và bảo hiểm sức khỏe.',
    eligibility: ['Có bằng cử nhân', 'Ít nhất 2 năm kinh nghiệm làm việc', 'Trình độ tiếng Anh tốt'],
    imageUrl: 'https://picsum.photos/seed/fulbright/800/600',
    comments: []
  },
];

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Nguyễn Văn An',
    studentId: '20201234',
    avatarUrl: 'https://picsum.photos/seed/an/200/200',
    bio: 'Là trưởng nhóm, chịu trách nhiệm phát triển frontend và thiết kế UI/UX cho dự án. Đam mê tạo ra các giao diện người dùng đẹp và hiệu quả.'
  },
  {
    id: 'tm-2',
    name: 'Trần Thị Bích',
    studentId: '20205678',
    avatarUrl: 'https://picsum.photos/seed/bich/200/200',
    bio: 'Chịu trách nhiệm quản lý dự án và thu thập dữ liệu học bổng. Luôn đảm bảo dự án đi đúng tiến độ và đáp ứng yêu cầu người dùng.'
  },
  {
    id: 'tm-3',
    name: 'Lê Minh Cường',
    studentId: '20209012',
    avatarUrl: 'https://picsum.photos/seed/cuong/200/200',
    bio: 'Phụ trách phần backend và cơ sở dữ liệu (mô phỏng). Có kinh nghiệm làm việc với các hệ thống phức tạp và đảm bảo tính toàn vẹn dữ liệu.'
  },
];
