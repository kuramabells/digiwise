import api from '../../lib/api';

export interface RegisterAdminData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const registerAdmin = (data: RegisterAdminData) =>
  api.post('/admins/register', data);

export const loginAdmin = (email: string, password: string) =>
  api.post('/admins/login', { email, password });

export const fetchDashboardStats = () =>
  api.get('/admins/dashboard');
