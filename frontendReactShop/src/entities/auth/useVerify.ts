import { useAuth, type LoginResponse } from '@/app/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { authApi } from './AuthApi';
import { useNavigate } from 'react-router-dom';

export const useVerify = () => {
  const { setUserData } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: { email: string; code: string }) => authApi.verify(data),
    onSuccess: (data) => {
      setUserData(data as LoginResponse);
      sessionStorage.setItem('userData', JSON.stringify(data));
      navigate('/');
    },
  });
};
