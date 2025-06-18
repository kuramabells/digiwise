import api from '../../lib/api';

export interface UserFormData {
  first_name: string;
  email: string;
  age_range: string;
  region: string;
  role?: string;
}

export interface Answer {
  questionId: number;
  value: number;
}

export const examineeApi = {
  register: (data: UserFormData) =>
    api.post('/users/register', data),
  login: (email: string, password: string) =>
    api.post('/users/login', { email, password }),
  getProfile: () =>
    api.get('/users/me'),
  getQuestions: () =>
    api.get('/assessment/questions'),
  startExamination: (userId: number) =>
    api.post('/assessment/start', { userId }),
  submitUserInfo: (info: UserFormData & { examination_id: number }) =>
    api.post('/assessment/user-info', info),
  submitAnswers: (examId: number, answers: Answer[]) =>
    api.post(`/assessment/${examId}/answers`, { answers }),
  completeExamination: (examId: number) =>
    api.post(`/assessment/${examId}/complete`),
  getExaminationHistory: (userId: number) =>
    api.get(`/users/${userId}/examinations`),
};
