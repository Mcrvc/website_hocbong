import { Scholarship, User, UserRole, Comment } from '../types';
import { MOCK_SCHOLARSHIPS, MOCK_USERS } from '../data/mockData';

// Simulate network delay
const networkDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

// This is a mutable in-memory "database" for the purpose of this simulation.
// In a real app, this data would live in a MySQL database.
let scholarshipsDB: Scholarship[] = JSON.parse(JSON.stringify(MOCK_SCHOLARSHIPS));
let usersDB: User[] = JSON.parse(JSON.stringify(MOCK_USERS));

export const api = {
  getScholarships: async (): Promise<Scholarship[]> => {
    await networkDelay(500);
    // In a real app, this would be: fetch('/api/scholarships')
    return JSON.parse(JSON.stringify(scholarshipsDB));
  },

  getScholarshipById: async (id: string): Promise<Scholarship | undefined> => {
    await networkDelay(500);
    // In a real app, this would be: fetch(`/api/scholarships/${id}`)
    const scholarship = scholarshipsDB.find(s => s.id === id);
    return scholarship ? JSON.parse(JSON.stringify(scholarship)) : undefined;
  },

  login: async (username: string, password?: string): Promise<User | null> => {
    await networkDelay(700);
    // NOTE: Password is not checked in this mock implementation
    const foundUser = usersDB.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (foundUser) {
      return JSON.parse(JSON.stringify(foundUser));
    }
    return null;
  },

  signup: async (username: string, fullName: string, password?: string): Promise<User | null> => {
    await networkDelay(1000);
    const existingUser = usersDB.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (existingUser) {
      return null; // Username already exists
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      username,
      fullName,
      role: UserRole.USER,
    };
    usersDB.push(newUser);
    return JSON.parse(JSON.stringify(newUser));
  },

  postComment: async (scholarshipId: string, commentText: string, author: User): Promise<Comment> => {
    await networkDelay(600);
    
    const scholarship = scholarshipsDB.find(s => s.id === scholarshipId);
    if (!scholarship) {
      throw new Error('Scholarship not found');
    }

    const newComment: Comment = {
      id: `cmt-${Date.now()}`,
      author: {
        id: author.id,
        username: author.username,
        fullName: author.fullName,
        role: author.role,
      },
      text: commentText,
      timestamp: new Date(),
    };

    scholarship.comments.push(newComment);
    return JSON.parse(JSON.stringify(newComment));
  },
};
