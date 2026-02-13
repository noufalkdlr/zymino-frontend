import { api } from "./axios";


export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('api/login/', {
      email,
      password,
    });
    return response.data
  } catch (error) {
    throw error;
  }
};


