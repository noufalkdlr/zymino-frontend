import { api } from './axios';

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/api/login/', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
