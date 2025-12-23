export type Category = 'TODOS' | 'APP' | 'JUEGO' | 'LIBRO';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: Category;
  author: string;
  image: string;
  donationGoal: number;
  currentDonation: number;
  downloadCount: number;
  likes: number; // Nuevo campo para sistema de likes
  repositoryUrl?: string;
  createdAt: string;
}

export interface Donation {
  projectId: string;
  amount: number;
  donorName: string;
  message?: string;
}

export type UserRole = 'USER' | 'DEVELOPER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean; // True si ha pagado la cuota de desarrollador
}
