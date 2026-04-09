import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout as logoutThunk, clearAuth } from '@/redux/auth/auth.slice';
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { sileo } from 'sileo';

/**
 * useSession Hook
 * 
 * Provides session management, authentication status, and cross-tab synchronization.
 * If a session is closed in another tab, it notifies the user and redirects to login.
 */
export const useSession = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);

  const logout = useCallback(async (isExternal = false) => {
    try {
      if (isExternal) {
        // Just clear local state if logout happened elsewhere
        dispatch(clearAuth());
        sileo.info({
          title: 'Sesión Finalizada',
          description: 'Tu sesión se ha cerrado en otra pestaña. Inicia Sesión de nuevo para continuar.',
          fill: '#e9e9e9ff',
          duration: 5000,
        });
      } else {
        // Call logout thunk (handles API + state clearing)
        await dispatch(logoutThunk());
      }
      
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      dispatch(clearAuth());
      navigate('/login');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      // detect if 'user' or 'authProvider' was removed (logout in another tab)
      if (
        (event.key === 'user' || event.key === 'authProvider') &&
        event.oldValue &&
        !event.newValue
      ) {
        logout(true);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [logout]);

  return {
    isLogged: auth.isLogged,
    user: auth.user,
    authProvider: auth.authProvider,
    status: auth.isLogged ? 'authenticated' : 'unauthenticated',
    logout: () => logout(false),
  };
};
