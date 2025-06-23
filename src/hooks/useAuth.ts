import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { apiClient } from '@/lib/apiClient';

export const useAuth = () => {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  const handleLogin = async (email: string, password: string) => {
    try {
      const { user, accessToken, refreshToken } = await apiClient.login(email, password);
      login(user, accessToken, refreshToken);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.response.data.message };
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const checkAuth = async () => {
    if (isAuthenticated && user) {
      try {
        const profile = await apiClient.getProfile();
        useAuthStore.getState().setUser(profile);
      } catch (error: any) {
        logout();
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    user,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
  };
}; 