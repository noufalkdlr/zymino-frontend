api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        let refreshResponse;
        if (isWeb) {
          refreshResponse = await axios.post(
            `${BASE_URL}token/refresh/`,
            { platform: 'web' },
            { withCredentials: true }
          );
        } else {
          const refreshToken = await getToken('refresh_token');
          if (!refreshToken) throw new Error("No refresh token");

          refreshResponse = await axios.post(`${BASE_URL}token/refresh/`, {
            refresh: refreshToken,
            platform: 'mobile',
          });

          const { access, refresh } = refreshResponse.data;
          await setToken('access_token', access);
          await setToken('refresh_token', refresh);
        }

        if (!isWeb) {
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
        }
        return api(originalRequest);

      } catch (refreshError) {
        if (!isWeb) {
          await deleteToken('access_token');
          await deleteToken('refresh_token');
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
