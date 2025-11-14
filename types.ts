
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
}

export interface Comment {
  id: string;
  author: Pick<User, 'id' | 'username' | 'fullName' | 'role'>;
  text: string;
  timestamp: Date;
}

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  amount: string;
  deadline: Date;
  description: string;
  eligibility: string[];
  imageUrl: string;
  comments: Comment[];
}

export interface TeamMember {
  id: string;
  name: string;
  studentId: string;
  avatarUrl: string;
  bio: string;
}
