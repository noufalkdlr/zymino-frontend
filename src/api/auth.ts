import { api } from './axios';


export const loginUser = async (email, password) => {
  try {
    // Django URL: path("api/", include("users.urls")) -> path("login/", ...)
    // So full path is /api/login/
    const response = await api.post('/api/login/', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
