import { api } from "./axios";


export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('login/', {
      email,
      password,
    });
    return response.data
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (email: string, username: string, password: string) => {
  try {
    const response = await api.post('signup/', {
      user: {
        email,
        username,
        password,
      }
    });
    return response.data

  } catch (error) {
    throw error
  }
}
